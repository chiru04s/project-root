// importFoodData.js
require('dotenv').config(); 
const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');


const Product = require('../models/Product'); // We will create this next

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  importData();
}).catch(err => console.error('MongoDB error:', err));

// Stream the JSONL file line-by-line
async function importData() {
const fileStream = fs.createReadStream('./data/en.openfoodfacts.org.products.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;

  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      if (!data.code || !data.product_name || !data.ingredients_text) continue;

      const product = new Product({
        code: data.code,
        name: data.product_name,
        ingredients: data.ingredients_text,
        brand: data.brands || '',
        categories: data.categories || '',
        image: data.image_url || '',
      });

      await product.save();
      count++;
      if (count % 1000 === 0) console.log(`Imported ${count} products...`);
    } catch (err) {
      continue; // skip bad lines
    }
  }

  console.log(`Finished importing ${count} products`);
  process.exit();
}
