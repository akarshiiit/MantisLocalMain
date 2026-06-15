import os
import asyncio
from dotenv import load_dotenv

try:
    from moss import MossClient
except ImportError:
    print("Please run: pip install inferedge-moss")
    exit(1)

# Load environment variables
load_dotenv()

PROJECT_ID = os.getenv("MOSS_PROJECT_ID")
PROJECT_KEY = os.getenv("MOSS_PROJECT_KEY")

async def main():
    if not PROJECT_ID or not PROJECT_KEY:
        print("Error: Missing MOSS_PROJECT_ID or MOSS_PROJECT_KEY in .env")
        return
        
    print("Connecting to MOSS Cloud...")
    client = MossClient(project_id=PROJECT_ID, project_key=PROJECT_KEY)
    
    indexes = await client.list_indexes()
    if not indexes:
        print("No indexes found in your MOSS project.")
        return
        
    print("\nAvailable Indexes (Products):")
    for idx in indexes:
        print(f" - {idx}")
        
    target_index = indexes[-1] # Pick the last one to show
    print(f"\n--- Loading chunks for {target_index} ---")
    
    await client.load_index(name=target_index)
    docs = await client.get_docs(name=target_index)
    
    print(f"Found {len(docs)} chunks. Here are the first 3:\n")
    for i, doc in enumerate(docs[:3]):
        print(f"[{i+1}] {getattr(doc, 'text', str(doc))}")
        print("-" * 50)

if __name__ == "__main__":
    asyncio.run(main())
