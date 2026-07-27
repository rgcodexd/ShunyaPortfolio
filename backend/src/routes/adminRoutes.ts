import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { supabaseAdmin } from '../supabase';

const router = Router();

// Secure admin endpoint
router.post('/projects', requireAuth, requireAdmin, async (req, res) => {
  const projectData = req.body;
  const { data, error } = await supabaseAdmin.from('projects').insert([projectData]);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Mock me endpoint
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
