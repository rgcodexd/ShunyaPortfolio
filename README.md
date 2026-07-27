# Shunya

<sub>Studio: Start from the Zero</sub>

Artist: Rakuma

Shunya is a premium portfolio website for elite 3D artists. It is designed as a cinematic, high-end experience for presenting artwork, selling merchandise and courses, publishing game-related blog content, and handling client bookings through a secure owner panel.

This is framed as a 4 lakh plus client project, so the site should look and behave like a top-tier studio build.

The build now assumes a real backend architecture with Supabase for data/auth/storage and a Render-hosted backend for secure API logic and Stripe payments.

## What this project includes

- Premium public portfolio with project case studies.
- Owner dashboard for uploading projects, products, courses, and blog posts.
- Merchandise storefront.
- Course sales section.
- Booking and 1:1 scheduling flow.
- Comment system on projects and products.
- Supabase-backed content, auth, storage, and moderation.
- Supabase-backed content, auth, storage, and moderation.
- Render-hosted backend for secure data fetching, API routes, and Stripe integration.
- Astro frontend with GSAP motion and Vanilla CSS.
- Render deployment for both frontend and backend.

## Tech stack

- Astro.js
- GSAP
- Vanilla CSS
- Supabase
- Render
- Stripe

## Core product rules

- Keep the architecture backend-assisted with a fast Astro frontend.
- Use Supabase for auth, storage, and database records.
- Use a backend service for secure reads, payment flows, and privileged operations.
- Keep animations smooth but lightweight.
- Make every public page feel premium and performance-focused.
- Keep owner workflows simple enough for non-technical content updates.

## Documentation

- [setup.md](setup.md)
- [PRD.md](PRD.md)

## Recommended project structure

```text
src/
  components/
  layouts/
  pages/
  sections/
  animations/
  lib/
  styles/
  utils/
  stores/
  content/

public/
supabase/
docs/
scripts/
```

## Content types

- Projects
- Blogs
- Merchandise products
- Courses
- Services
- Pricing
- Bookings
- Comments

## Owner panel capabilities

- Upload project images, videos, 3D assets, and reference files.
- Add title, description, category, tags, and SEO metadata.
- Add blog stories, game reviews, and criticism posts.
- Add merchandise products and course entries.
- View and manage booking requests.
- Moderate comments.

## Environment variables

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## Deployment

Deploy the frontend and backend to Render and connect the repository to GitHub for continuous deployment.

## Important note

This project is intended to be fully functional with a real backend layer. All sensitive behavior, secure data fetching, and payments should flow through backend APIs, while Supabase remains the primary database, auth, and storage layer.
