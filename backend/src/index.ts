import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

// Mount routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Shunya Backend listening on port ${port}`);
});
