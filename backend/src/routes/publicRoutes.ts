import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../supabase';

const router = Router();

// Mock endpoints for the REST contract
router.get('/projects', async (req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin.from('projects').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/projects/:slug', async (req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin.from('projects').select('*').eq('slug', req.params.slug).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/blogs', async (req: Request, res: Response) => {
  res.json({ message: "Blogs list" });
});

router.get('/products', async (req: Request, res: Response) => {
  res.json({ message: "Products list" });
});

router.get('/courses', async (req: Request, res: Response) => {
  res.json({ message: "Courses list" });
});

router.post('/bookings', async (req: Request, res: Response): Promise<any> => {
  const bookingData = req.body;
  // insert to Supabase...
  res.status(201).json({ message: "Booking created successfully", booking: bookingData });
});

router.post('/comments', async (req: Request, res: Response): Promise<any> => {
  const commentData = req.body;
  // insert to Supabase...
  res.status(201).json({ message: "Comment posted", comment: commentData });
});

export default router;
