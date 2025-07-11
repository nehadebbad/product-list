import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;
const DB_PATH = path.resolve('products.json');

app.use(cors());
app.use(express.json());

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products.' });
  }
});

// POST a new product (Doesn't have a UI)
app.post('/api/products', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const newProduct = { id: Date.now(), ...req.body };
    data.push(newProduct);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to write product.' });
  }
});

// DELETE a product (Doesn't have a UI)
app.delete('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    const initialLength = data.length;
    data = data.filter((product) => product.id !== id);

    if (data.length === initialLength) {
      return res.status(404).json({ error: 'Product not found' });
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
