import { Router } from 'express';
import Stripe from 'stripe';
import { supabaseAdmin } from '../supabase';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

router.post('/checkout/stripe', async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;
    
    // In production, validate items against database prices here
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;
  try {
    // Note: requires raw body parser
    event = stripe.webhooks.constructEvent((req as any).rawBody, sig as string, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment was successful!', session);
      // Fulfill the purchase, update Supabase, grant access to course/files, etc.
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
});

export default router;
