import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { processProductCatalog } from './server/filterEngine';
import { MASTER_PRODUCTS } from './src/data/products';
import { SortOption } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes FIRST
app.get('/api/products', (req, res) => {
  try {
    const categoriesParam = req.query.categories ? String(req.query.categories) : '';
    const categories = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];
    
    const minPrice = req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
    const minRating = req.query.minRating !== undefined ? Number(req.query.minRating) : undefined;
    const sortBy = (req.query.sortBy as SortOption) || 'featured';
    const searchQuery = req.query.searchQuery ? String(req.query.searchQuery) : (req.query.search ? String(req.query.search) : '');

    const result = processProductCatalog({
      categories,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      searchQuery
    });

    res.json(result);
  } catch (error) {
    console.error('Error processing product query:', error);
    res.status(500).json({ error: 'Internal server error while filtering products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = MASTER_PRODUCTS.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Vite Middleware & Static Serving Setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`E-Commerce Catalog Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
