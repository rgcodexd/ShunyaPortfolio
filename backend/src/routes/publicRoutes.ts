import { Router } from 'express';
import { supabaseAdmin } from '../supabase';

const router = Router();

// Mock endpoints for the REST contract
router.get('/projects', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('projects').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/projects/:slug', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('projects').select('*').eq('slug', req.params.slug).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/blogs', async (req, res) => {
  res.json({ message: "Blogs list" });
});

router.get('/products', async (req, res) => {
  res.json({ message: "Products list" });
});

router.get('/courses', async (req, res) => {
  res.json({ message: "Courses list" });
});

router.post('/bookings', async (req, res) => {
  const bookingData = req.body;
  // insert to Supabase...
  res.status(201).json({ message: "Booking created successfully", booking: bookingData });
});

router.post('/comments', async (req, res) => {
  const commentData = req.body;
  // insert to Supabase...
  res.status(201).json({ message: "Comment posted", comment: commentData });
});

export default router;
