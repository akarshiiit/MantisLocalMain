import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
