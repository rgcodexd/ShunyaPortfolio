import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import stripeRoutes from './routes/stripeRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Enable raw body parser for Stripe webhooks
app.use(express.json({
  verify: (req: any, res, buf) => {
    if (req.originalUrl.startsWith('/api/webhooks/stripe')) {
      req.rawBody = buf.toString();
    }
  }
}));

app.use(cors());

// Mount routes
app.use('/api', publicRoutes);
app.use('/api', stripeRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Shunya Backend listening on port ${port}`);
});
