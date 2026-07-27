import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../supabase';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  // Attach user to request object (needs extending Express Request in real app)
  (req as any).user = user;
  next();
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = (req as any).user;
  
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  
  // In a real app, check the `roles` table or user metadata for admin status
  const { data: roleData, error } = await supabaseAdmin
    .from('roles')
    .select('role')
    .eq('user_id', user.id)
    .single();
    
  if (error || roleData?.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }

  next();
};
