# Setup Guide

Project: Shunya

Studio: Start from the Zero

Artist: Rakuma

Budget class: 4 lakh plus premium client build

This project is built as a production Astro frontend with a Render-hosted backend, Supabase as the database/auth/storage layer, and Stripe for payments. The goal is to keep the public site fast while using the backend for secure authentication checks, real data fetching, payment flows, comments moderation, bookings, and content management.

## 1. Create the Supabase project

1. Create a new Supabase project.
2. Enable email login or the auth method you want for the owner panel.
3. Create the required tables for projects, blogs, products, courses, bookings, comments, services, pricing, profiles, roles, and media assets.
4. Set up Row Level Security for all tables.
5. Create storage buckets for projects, products, courses, avatars, uploads, and documents.

## 2. Create the backend on Render

1. Create a Render web service for the API/backend.
2. Add server-side routes for secure data fetching, Stripe checkout creation, and webhook handling.
3. Store secret environment variables only in Render.
4. Keep public frontend variables separate from backend secrets.

## 3. Set environment variables

Add the following values to your Astro environment config and Render services as appropriate:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `BACKEND_API_URL`
- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` for server-side use only

If you add optional services later, keep those keys in a separate private environment config.

## 4. Content upload flow

The owner panel should handle uploads through the authenticated backend and Supabase storage.

Recommended flow:

1. Owner signs in through Supabase Auth.
2. Owner opens the dashboard create/edit form.
3. Owner fills title, description, tags, category, and SEO fields.
4. Owner uploads images, videos, GLB/GLTF files, or reference documents to Supabase Storage.
5. If the asset is hosted elsewhere, owner pastes an embed code or source URL instead.
6. The frontend saves the media metadata and content record in Supabase.
7. The public site reads the updated record and renders it automatically.

This keeps the public site fast while giving the system a real backend for secure operations.

## 5. Required content modules

- Projects with gallery, 3D embeds, and project metadata.
- Blog posts for game stories, reviews, and critique.
- Merchandise products with variants and stock.
- Courses with lessons, resources, and previews.
- Services and pricing pages.
- Booking requests and calendar states.
- Comments with moderation controls.

## 6. Payments and Stripe

1. Create Stripe products or payment links for relevant services, products, and courses.
2. Use the backend to create checkout sessions securely.
3. Handle Stripe webhooks on the backend to confirm payment status.
4. Save payment and order state in Supabase after webhook confirmation.

## 7. Backend route contract

Recommended backend routes:

- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/blogs`
- `GET /api/blogs/:slug`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/courses`
- `GET /api/courses/:slug`
- `GET /api/services`
- `POST /api/bookings`
- `POST /api/comments`
- `POST /api/checkout/stripe`
- `POST /api/webhooks/stripe`
- `GET /api/me`
- `POST /api/admin/*` for owner mutations

Backend rules:

1. Protect all admin mutation routes with auth and role middleware.
2. Verify Stripe webhook signatures before writing payment state.
3. Keep public read routes limited to published content.
4. Never expose service-role credentials to the browser.

## 8. Local development

1. Install dependencies for the Astro project.
2. Start the local dev server.
3. Start the backend service locally or with a dev proxy.
4. Connect the app to your Supabase project.
5. Test public pages, owner login, uploads, comments, booking forms, and Stripe checkout flows.

## 9. Deployment

1. Push the code to GitHub.
2. Connect the repository to Render for both the frontend and backend services.
3. Add the environment variables in Render.
4. Run a preview deployment.
5. Verify auth, uploads, payment flows, and all public pages after deployment.

## 10. Ongoing content workflow

- Add a new project from the dashboard.
- Upload or embed the 3D asset.
- Publish the item.
- The public site updates automatically from Supabase data.

## 11. Notes

- Keep media optimized before upload where possible.
- Use clear file naming.
- Keep RLS enabled on all writable tables.
- Do not expose secret keys in the frontend.
- Keep backend routes limited to authenticated or webhook-based operations.
