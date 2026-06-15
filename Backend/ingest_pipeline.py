import os
import hashlib
import asyncio
from fastapi import FastAPI, UploadFile, Form, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
import aiofiles
from dotenv import load_dotenv

# Supabase python client
from supabase import create_client, Client

# Import the semantic chunking logic
from semantic_chunker import chunk_document, batch_embed_and_store

load_dotenv()

app = FastAPI(title="Mantis Ingest Pipeline")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Warning: Missing Supabase credentials in .env")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

def compute_sha256(file_path: str) -> str:
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

async def process_pdf_background(file_path: str, company_id: str, product_id: str, doc_hash: str):
    """
    Background task to chunk and store the PDF.
    """
    try:
        # Run chunk_document in a thread pool to avoid blocking the event loop
        loop = asyncio.get_running_loop()
        chunks = await loop.run_in_executor(None, chunk_document, file_path, company_id, product_id)
        
        # Batch embed and store in MOSS
        result = await batch_embed_and_store(chunks)
        chunk_count = result.get("inserted", 0)
        
        # Update product status in Supabase
        if supabase:
            supabase.table("products").update({
                "doc_status": "ready",
                "chunk_count": chunk_count,
                "doc_hash": doc_hash
            }).eq("id", product_id).execute()
            
    except Exception as e:
        print(f"Error processing document: {e}")
        # Update status to error
        if supabase:
            supabase.table("products").update({
                "doc_status": "error"
            }).eq("id", product_id).execute()
            
    finally:
        # Cleanup temp file
        if os.path.exists(file_path):
            os.remove(file_path)

@app.post("/api/ingest")
async def ingest_document(
    background_tasks: BackgroundTasks,
    product_id: str = Form(...),
    company_id: str = Form(...),
    file: UploadFile = Form(...)
):
    if not file.filename.endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF or TXT files are supported")
        
    # Create temp directory if it doesn't exist
    os.makedirs("/tmp/mantis", exist_ok=True)
    file_path = f"/tmp/mantis/{file.filename}"
    
    # Save file to /tmp
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
        
    # Compute SHA256
    doc_hash = compute_sha256(file_path)
    
    # Check if doc_hash already in DB
    if supabase:
        try:
            response = supabase.table("products").select("doc_hash").eq("id", product_id).execute()
            if response.data and len(response.data) > 0:
                if response.data[0].get("doc_hash") == doc_hash:
                    # Cleanup
                    os.remove(file_path)
                    return JSONResponse(content={"status": "already_ingested"})
        except Exception as e:
            print(f"Supabase check failed: {e}")
            
    # Update status to processing
    if supabase:
        try:
            supabase.table("products").update({
                "doc_status": "processing"
            }).eq("id", product_id).execute()
        except Exception as e:
            print(f"Supabase update failed: {e}")
            
    # Queue background processing
    background_tasks.add_task(process_pdf_background, file_path, company_id, product_id, doc_hash)
    
    return JSONResponse(content={"status": "processing"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
