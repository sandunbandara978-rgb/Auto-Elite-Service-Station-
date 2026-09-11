import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingsRouter from './routes/bookings.js';

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Basic CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ModiDrive backend is running' });
});

app.use('/api/bookings', bookingsRouter);

// Serve static frontend build in production
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('ModiDrive Backend API is running.');
    }
  });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`ModiDrive server listening on http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error('Server listen error:', err);
  process.exit(1);
});
