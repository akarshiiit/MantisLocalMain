import re
import fitz  # PyMuPDF
import tiktoken
import hashlib
import asyncio
import os
from typing import List, Dict, Any, Optional

try:
    from moss import MossClient, DocumentInfo
except ImportError:
    pass

# Initialize tiktoken for token counting (OpenAI's encoding, standard for general LLMs)
encoder = tiktoken.get_encoding("cl100k_base")

def count_tokens(text: str) -> int:
    return len(encoder.encode(text))

def extract_blocks(file_path: str) -> List[Dict[str, Any]]:
    """
    Extracts text blocks from a PDF or TXT file.
    For PDF, it uses PyMuPDF to extract text, font size, and bold formatting.
    """
    blocks = []
    
    if file_path.lower().endswith('.pdf'):
        try:
            doc = fitz.open(file_path)
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                # Extract dictionary of text
                text_dict = page.get_text("dict")
                
                for b in text_dict.get("blocks", []):
                    if b.get("type") == 0:  # Text block
                        block_text = ""
                        max_font_size = 0.0
                        is_bold = False
                        
                        for line in b.get("lines", []):
                            for span in line.get("spans", []):
                                block_text += span.get("text", "") + " "
                                size = span.get("size", 0.0)
                                if size > max_font_size:
                                    max_font_size = size
                                font_flags = span.get("flags", 0)
                                # Flag 16 is bold in PyMuPDF
                                if font_flags & 16:
                                    is_bold = True
                        
                        block_text = block_text.strip()
                        if block_text:
                            blocks.append({
                                "text": block_text,
                                "font_size": round(max_font_size, 2),
                                "page_num": page_num + 1,
                                "bold": is_bold,
                                "is_blank_cluster": False
                            })
        except Exception as e:
            print(f"Error reading PDF {file_path}: {e}")
            
    elif file_path.lower().endswith('.txt'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Split by double newline to simulate blocks
            raw_blocks = content.split('\n\n')
            for b in raw_blocks:
                b = b.strip()
                if b:
                    blocks.append({
                        "text": b,
                        "font_size": 12.0,
                        "page_num": 1,
                        "bold": False,
                        "is_blank_cluster": False
                    })
        except Exception as e:
            print(f"Error reading TXT {file_path}: {e}")
            
    return blocks

def detect_boundary(block: Dict[str, Any], prev_block: Optional[Dict[str, Any]]) -> bool:
    """
    Returns True if this block starts a new subtopic based on 6 priority rules.
    """
    text = block["text"].strip()
    if not text:
        return False
        
    # Rule 1: Numbered headings -> "1.2 Engine Specifications", "3. Brakes"
    if re.match(r'^(\d+\.)+\d*\s+[A-Z]', text):
        return True
        
    # Rule 2: ALL CAPS lines -> "ELECTRICAL SYSTEM"
    # Needs to be a relatively short line, not an entire paragraph of caps
    if text.isupper() and len(text) < 100:
        return True
        
    if prev_block:
        # Rule 3: Bold/large font -> detect via PyMuPDF font size jump (>2pt increase)
        if block["font_size"] > prev_block["font_size"] + 2.0:
            return True
            
        if block["bold"] and not prev_block["bold"] and len(text) < 150:
            return True
            
        # Rule 4: Blank-line clusters -> Handled mostly by block extraction splitting,
        # but if we tracked it in extraction we would trigger here.
        if block.get("is_blank_cluster"):
            return True
            
    # Rule 5: Procedure blocks -> lines starting with Step 1 / 1) 2) 3)
    # If the CURRENT line is Step 1, it's a boundary.
    if re.match(r'^(Step 1|1\)|1\.)\s+', text, re.IGNORECASE):
        return True
        
    # Rule 6: Table + caption -> Caption line usually starts with Table/Figure
    if re.match(r'^(Table|Figure)\s+\d+', text, re.IGNORECASE):
        return True
        
    return False

def split_large_chunk(text: str, parent_heading: str, token_limit: int = 700) -> List[str]:
    """
    Splits a large chunk at sentence boundaries near the token limit.
    Prefixes each sub-chunk with the parent heading.
    """
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        temp_chunk = f"{current_chunk} {sentence}".strip()
        if count_tokens(temp_chunk) > token_limit and current_chunk:
            chunks.append(f"{parent_heading}\n{current_chunk}")
            current_chunk = sentence
        else:
            current_chunk = temp_chunk
            
    if current_chunk:
        chunks.append(f"{parent_heading}\n{current_chunk}")
        
    return chunks

def assemble_chunks(blocks: List[Dict[str, Any]], company_id: str, product_id: str, doc_hash: str) -> List[Dict[str, Any]]:
    """
    Walks blocks, groups by boundaries, applies size guards, and adds overlap.
    """
    if not blocks:
        return []
        
    raw_chunks = []
    current_chunk_text = ""
    current_heading = "General Information"
    current_page = blocks[0]["page_num"]
    
    for i, block in enumerate(blocks):
        prev_block = blocks[i-1] if i > 0 else None
        
        if i > 0 and detect_boundary(block, prev_block):
            if current_chunk_text.strip():
                raw_chunks.append({
                    "text": current_chunk_text.strip(),
                    "page_num": current_page,
                    "heading": current_heading
                })
            current_chunk_text = block["text"]
            current_page = block["page_num"]
            # If it's short, it's likely the heading itself
            if len(block["text"]) < 100:
                current_heading = block["text"]
        else:
            if current_chunk_text:
                current_chunk_text += "\n" + block["text"]
            else:
                current_chunk_text = block["text"]
                current_page = block["page_num"]
                
    if current_chunk_text.strip():
        raw_chunks.append({
            "text": current_chunk_text.strip(),
            "page_num": current_page,
            "heading": current_heading
        })

    # Apply Size Guards
    sized_chunks = []
    i = 0
    while i < len(raw_chunks):
        chunk = raw_chunks[i]
        text = chunk["text"]
        tokens = count_tokens(text)
        
        # Merge < 80 tokens with NEXT chunk
        if tokens < 80 and i + 1 < len(raw_chunks):
            raw_chunks[i+1]["text"] = text + "\n" + raw_chunks[i+1]["text"]
            # don't append this one, let the next iteration handle the merged text
            i += 1
            continue
            
        # Split > 800 tokens
        if tokens > 800:
            split_texts = split_large_chunk(text, chunk["heading"], 700)
            for split_text in split_texts:
                sized_chunks.append({
                    "text": split_text,
                    "page_num": chunk["page_num"],
                    "heading": chunk["heading"]
                })
        else:
            sized_chunks.append(chunk)
            
        i += 1

    # Add 1-2 sentence OVERLAP at seams
    final_chunks = []
    for i in range(len(sized_chunks)):
        text = sized_chunks[i]["text"]
        
        if i > 0:
            # Grab last 2 sentences of previous chunk
            prev_sentences = re.split(r'(?<=[.!?])\s+', sized_chunks[i-1]["text"])
            overlap = " ".join(prev_sentences[-2:]) if len(prev_sentences) >= 2 else " ".join(prev_sentences)
            text = f"{overlap}\n---\n{text}"
            
        chunk_type = "body"
        if "Table" in sized_chunks[i]["heading"] or "Figure" in sized_chunks[i]["heading"]:
            chunk_type = "table"
        elif re.search(r'(Step \d+|1\)|1\.)', text, re.IGNORECASE):
            chunk_type = "procedure"
            
        final_chunks.append({
            "content": text,
            "section_title": sized_chunks[i]["heading"],
            "chunk_type": chunk_type,
            "page_number": sized_chunks[i]["page_num"],
            "chunk_index": i,
            "token_count": count_tokens(text),
            "company_id": company_id,
            "product_id": product_id,
            "doc_hash": doc_hash
        })

    return final_chunks

def chunk_document(file_path: str, company_id: str, product_id: str) -> List[Dict[str, Any]]:
    """
    Top-level function. Extracts blocks, creates chunks.
    """
    # Compute SHA256
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    doc_hash = sha256_hash.hexdigest()
    
    blocks = extract_blocks(file_path)
    chunks = assemble_chunks(blocks, company_id, product_id, doc_hash)
    return chunks

async def batch_embed_and_store(chunks: List[Dict[str, Any]]):
    """
    Batch store chunks into MOSS vector database.
    Deduplication relies on MOSS internal document IDs or external tracking.
    """
    if not chunks:
        return {"inserted": 0, "skipped_dupes": 0}
        
    product_id = chunks[0]["product_id"]
    
    PROJECT_ID = os.getenv("MOSS_PROJECT_ID")
    PROJECT_KEY = os.getenv("MOSS_PROJECT_KEY")
    
    if not PROJECT_ID or not PROJECT_KEY:
        raise Exception("MOSS credentials missing")
        
    client = MossClient(project_id=PROJECT_ID, project_key=PROJECT_KEY)
    
    # Prefix the document text with metadata for better search context
    moss_docs = []
    for c in chunks:
        doc_id = f"{c['doc_hash']}_{c['chunk_index']}"
        full_text = f"Section: {c['section_title']}\nType: {c['chunk_type']}\n\n{c['content']}"
        moss_docs.append(DocumentInfo(id=doc_id, text=full_text))
        
    # MOSS currently throws 503 sometimes, but we proceed
    try:
        await client.create_index(name=product_id, docs=moss_docs)
    except Exception as create_err:
        err_msg = str(create_err).lower()
        if 'already exists' in err_msg or 'duplicate' in err_msg:
            await client.add_docs(name=product_id, docs=moss_docs)
        else:
            raise create_err
            
    return {"inserted": len(chunks), "skipped_dupes": 0}

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 3:
        path = sys.argv[1]
        comp = sys.argv[2]
        prod = sys.argv[3]
        res = chunk_document(path, comp, prod)
        print(f"Created {len(res)} chunks.")
        for i, c in enumerate(res[:3]):
            print(f"\n--- Chunk {i+1} ---")
            print(c)
    else:
        print("Usage: python semantic_chunker.py <pdf_path> <company_id> <product_id>")
