import { Router, Request, Response } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { supabaseAdmin } from '../supabase';

const router = Router();

// Secure admin endpoint
router.post('/projects', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const projectData = req.body;
  const { data, error } = await supabaseAdmin.from('projects').insert([projectData]);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.post('/blogs', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const blogData = req.body;
  const { data, error } = await supabaseAdmin.from('blogs').insert([blogData]);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// --- BOOKINGS ---
router.get('/bookings', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabaseAdmin.from('bookings').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch('/bookings/:id', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const { status } = req.body;
  const { data, error } = await supabaseAdmin.from('bookings').update({ status }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// --- COMMENTS ---
router.get('/comments', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabaseAdmin.from('comments').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch('/comments/:id', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const { is_approved } = req.body;
  const { data, error } = await supabaseAdmin.from('comments').update({ is_approved }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/comments/:id', requireAuth, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabaseAdmin.from('comments').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Mock me endpoint
router.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

export default router;
