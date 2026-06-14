import dotenv from 'dotenv';
dotenv.config();

import { searchContext } from './src/services/mossService.js';
import { supabase } from './src/config/supabase.js';

async function main() {
  console.log("Fetching all products from Supabase...");
  const { data: products } = await supabase.from('products').select('id, name');
  
  if (!products || products.length === 0) {
    console.log("No products found.");
    return;
  }
  
  console.log("Available Products:");
  products.forEach(p => console.log(`- ${p.name} (ID: ${p.id})`));
  
  const targetProduct = products[0];
  console.log(`\nFetching chunks for ${targetProduct.name} from MOSS Cloud...`);
  console.log("This might take a moment if the index is loading into memory...\n");
  
  // Empty query usually returns random chunks or fails, so let's query a common word
  const results = await searchContext(targetProduct.id, "maintenance schedule engine oil");
  
  if (results.length === 0) {
    console.log("No chunks found or index is empty.");
  } else {
    console.log(`Found ${results.length} chunks containing the query! Here is the first one:\n`);
    console.log("--------------------------------------------------");
    console.log(results[0]);
    console.log("--------------------------------------------------");
  }
  
  process.exit(0);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
