# Product Requirements Document

## Shunya - Premium Portfolio Platform for Elite 3D Artists

<sub>Studio: Start from the Zero</sub>

Artist: Rakuma

Version: 2.0
Status: Master Product Specification

### Purpose of this document

This PRD defines the product, UX, visual language, data model, page behavior, motion system, backend rules, and implementation roadmap for Shunya. It is intended to be detailed enough for design, engineering, QA, and client review before build execution.

### Product summary

Shunya is a premium portfolio and business platform for world-class 3D artists. It combines an immersive portfolio, commerce, learning, blogging, booking, and community experience into a production architecture powered by Astro, GSAP, Vanilla CSS, Supabase, a Render-hosted backend, and Stripe for payments.

The project budget is positioned as a premium client build in the 4 lakh plus range, so the visual design, motion, structure, and polish must reflect that level of investment.

The product should feel more like a luxury creative studio experience than a conventional portfolio. The interface must communicate authority, precision, and craft while remaining fast, accessible, and easy to maintain.

### Primary goals

- Present artwork in a cinematic, editorial, and highly premium manner.
- Convert visitors into leads, clients, customers, and community participants.
- Allow the owner to manage the entire site without a traditional backend team.
- Keep the system secure, scalable, and performant with a managed backend and database layer.
- Establish a production-ready foundation that can support future modules such as licensing, memberships, AI search, and client dashboards.

### Success metrics

- Lighthouse performance score of 95+ on key public pages.
- First meaningful paint under 1.8 seconds on average on modern desktop connections.
- Booking and contact form completion rate improves after launch.
- Owner can publish projects, products, blog posts, and courses without developer support.
- The platform remains usable and polished on mobile, tablet, and desktop.

------------------------------------------------------------------------

## 1. Product Scope

### In scope

- Public marketing and portfolio experience.
- Project showcase and project detail pages.
- Services, pricing, contact, and booking flows.
- Blog and gaming editorial section.
- Merchandise storefront.
- Course catalog and lesson delivery.
- Comment system across supported content types.
- Owner dashboard for content, commerce, and moderation.
- Supabase-backed database, storage, authentication, and RLS.
- Render-hosted backend services for data fetching, business logic, Stripe integration, and secure server-side operations.
- SEO, analytics hooks, deployment, and operational documentation.

### Out of scope for version 1

- Native mobile application.
- Multi-tenant support.
- Real-time collaborative editing.
- Complex AI automation beyond roadmap placeholders.

------------------------------------------------------------------------

## 2. Personas and Roles

### Visitor

The visitor is a potential client, fan, buyer, or student. They need to quickly understand the artist, browse portfolio work, inspect credibility, and take action through booking, purchasing, or contacting.

Visitor actions:

- Explore the home page and featured work.
- Filter and open project details.
- Read blog posts and gaming articles.
- Review services, pricing, and availability.
- Book a consultation.
- Purchase merchandise or courses.
- Leave comments where permitted.

### Returning Client

The returning client is a qualified lead or previous customer who wants fast access to proof of work, project history, and direct next steps.

Returning client actions:

- Re-open featured case studies.
- Check service packages and booking availability.
- Submit a refined project brief.
- Review course and product offerings.

### Owner / Admin

The owner manages content, commerce, bookings, and moderation from a secure dashboard.

Owner actions:

- Create, edit, publish, and archive content.
- Upload media assets to storage.
- Update services, pricing, and homepage sections.
- Manage orders, bookings, and comments.
- Review analytics and operational status.

### Backend services

The backend layer handles authenticated API routes, secure data fetching, file-processing workflows, Stripe payment creation, webhook verification, and server-side business logic that should not run in the browser.

### Future staff role

The architecture should support optional future roles such as editor, moderator, support agent, or fulfillment staff without reworking the schema.

------------------------------------------------------------------------

## 3. Product Principles

- Premium first: every screen should feel curated, not templated.
- Motion with restraint: animations should guide attention, not distract.
- Editorial clarity: content must be highly legible and structured.
- Performance before spectacle: motion and visuals must respect speed budgets.
- Content composability: the owner should be able to assemble pages from reusable blocks.
- Secure by default: public reads and authenticated writes must be explicitly separated.
- Accessible by default: keyboard, contrast, focus, and reduced-motion behavior must be handled.
- Backend-assisted by default: sensitive operations, payments, and privileged reads must go through server-side endpoints.

------------------------------------------------------------------------

## 4. Information Architecture

### Public site map

- Home
- Portfolio
- Project detail
- Services
- Pricing
- Courses
- Course detail
- Merchandise
- Product detail
- Gaming blog
- Blog detail
- About
- Contact
- Booking
- Calendar scheduling
- Search results
- Comments surfaces
- Legal and policy pages

### Owner site map

- Dashboard home
- Content overview
- Projects manager
- Blog manager
- Products manager
- Courses manager
- Services and pricing manager
- Bookings manager
- Comments moderation
- Media library
- SEO settings
- Site settings
- Analytics

### Navigation rules

- Global navigation should expose the most important public sections only.
- Primary CTAs should be consistent: Explore Work, Book a Call, Shop, Learn.
- The header should condense on scroll and remain accessible.
- Footer navigation should include discovery, trust, and utility links.

------------------------------------------------------------------------

## 5. Page-by-Page UX Specification

### 5.1 Home page

Purpose: establish the brand, build trust, showcase best work, and route users into the right conversion path.

Section order:

1. Hero introduction with cinematic headline, short brand statement, and CTA cluster.
2. Featured project reel with strong visual hierarchy.
3. About/credibility strip with key metrics, awards, client logos, or stats.
4. Services preview with pricing anchors.
5. Selected categories or disciplines.
6. Testimonials or social proof.
7. Course and merchandise previews.
8. Featured blog or insight section.
9. Booking CTA and contact bridge.
10. Footer with social links and newsletter capture.

Behavior:

- Hero copy should animate in sequence.
- Featured projects should be horizontally scannable on large screens and swipeable on mobile.
- Scroll progression should feel continuous and cinematic.
- CTAs should remain visible without overwhelming the layout.

Acceptance criteria:

- A first-time user understands what the artist does within 5 seconds.
- The page presents at least one clear conversion path above the fold.
- Motion remains smooth and does not break layout flow.

### 5.2 Portfolio listing page

Purpose: help users browse all work and identify relevant case studies quickly.

UI structure:

- Filter bar with category, software, medium, and year.
- Search input for projects and tags.
- Sort options such as featured, latest, most viewed, or client type.
- Responsive masonry or editorial grid.
- Optional sticky category rail on desktop.

Behavior:

- Filters update results without hard reload where possible.
- Empty states must show helpful guidance and reset actions.
- Featured items should have stronger visual emphasis.

### 5.3 Project detail page

Purpose: act as a premium case study page that proves quality, process, and outcome.

Required modules:

- Hero cover image or video.
- Summary panel with category, client, software, timeline, and role.
- Media gallery with mixed asset support.
- Breakdown sections for brief, process, challenges, and outcome.
- Optional before/after comparisons.
- Credits and collaborators.
- Related projects.
- Comment area if enabled.

UX flow:

- Open from portfolio listing or featured sections.
- Hero loads first; secondary media lazy loads.
- User can expand, zoom, or focus media.
- User can move through gallery with keyboard or swipe gestures.

Acceptance criteria:

- Every project page supports a consistent content schema.
- Media and metadata remain aligned across responsive breakpoints.
- Downloadable assets are gated according to visibility rules.

### 5.4 Services page

Purpose: explain what the artist offers and how engagement works.

Required modules:

- Service cards with deliverables, starting price, and turnaround.
- Comparison table for package differences.
- Process explanation from inquiry to delivery.
- FAQ about revisions, usage, payment, and timelines.
- Booking CTA.

### 5.5 Pricing page

Purpose: reduce friction by presenting commercial ranges transparently.

Required modules:

- Base service price cards.
- Optional quote-based services.
- Rush fee and add-on logic.
- Timeline bands and availability notes.
- Project scope guidance.

### 5.6 Booking page

Purpose: collect qualified project requests with enough detail to respond effectively.

Form fields:

- Name.
- Email.
- Company or studio.
- Service selection.
- Budget range.
- Preferred timeline.
- Timezone.
- Meeting preference.
- Reference links or uploads.
- Project brief.
- Consent checkbox.

Flow:

1. User selects service.
2. User provides project scope and budget.
3. User chooses preferred meeting window.
4. User uploads references if needed.
5. Submission creates a booking record.
6. Owner receives notification.

Acceptance criteria:

- Validation prevents incomplete submissions.
- Uploads are restricted to supported file types and size limits.
- Confirmation state clearly explains next steps.

### 5.7 Calendar scheduling page

Purpose: allow structured meeting selection after booking interest is established.

Rules:

- Show available slots by timezone.
- Prevent double booking.
- Store selected slot and status in Supabase.
- Support reschedule and cancellation states.

### 5.8 Courses listing page

Purpose: market learning content with premium presentation and clear value.

Required modules:

- Featured course hero.
- Course cards with level, duration, outcomes, and price.
- Category filters.
- Preview and curriculum highlights.
- Social proof or learner outcomes.

### 5.9 Course detail page

Purpose: sell and deliver a course.

Required modules:

- Trailer or preview video.
- Curriculum outline.
- Lesson breakdown.
- Resources and downloads.
- Instructor credibility section.
- FAQ.
- Purchase or enroll CTA.

### 5.10 Merchandise listing page

Purpose: sell products and digital assets with premium retail presentation.

Required modules:

- Category filters.
- Product cards.
- Wishlist support.
- Inventory and variant states.
- Promotional badges such as limited or new.

### 5.11 Product detail page

Purpose: convert interest into purchase intent.

Required modules:

- Image gallery.
- Price and variant selector.
- Description and specs.
- Shipping or digital delivery notes.
- Related products.
- Review and rating section if enabled.

### 5.12 Gaming blog listing and detail pages

Purpose: support editorial content that deepens brand personality and SEO coverage.

Required modules:

- Topic filters.
- Featured article module.
- Search.
- Tag navigation.
- Reading time and publish date.
- Code, media, and embedded content support.

### 5.13 About page

Purpose: establish credibility, personality, and positioning.

Content blocks:

- Artist bio.
- Timeline of experience.
- Tools and workflow.
- Clients, awards, and achievements.
- Philosophy and approach.
- CTA to work together.

### 5.14 Contact page

Purpose: capture general inquiries and alternate business requests.

Contact types:

- Business inquiry.
- Collaboration.
- Media request.
- Hiring request.
- General question.

### 5.15 Dashboard pages

Purpose: enable the owner to manage the site efficiently.

Required dashboard modules:

- Overview with KPIs and recent activity.
- Content CRUD for projects, blog posts, products, courses, and services.
- Booking management with status workflow.
- Comment moderation queue.
- Storage library with asset metadata.
- Settings and SEO controls.
- Analytics dashboard.

------------------------------------------------------------------------

## 6. Wireframe and Hierarchy Rules

### Structural hierarchy

- Each page should begin with a strong headline or context block.
- Supporting content must follow a clear scan path.
- Primary action should always be visually distinct.
- Secondary actions should remain available but less dominant.

### Wireframe conventions

- Desktop layouts may use asymmetry and layered composition.
- Mobile layouts must collapse into a single readable column.
- Reusable blocks should maintain stable spacing and visual rhythm.
- Critical content should never rely on hover alone.

### Content density rules

- Hero sections should stay concise.
- Case studies can be detailed, but only when the structure remains scannable.
- Dashboard views should optimize for data density without visual clutter.

------------------------------------------------------------------------

## 7. Design System

### Visual direction

The visual language should feel like a luxury studio website with editorial discipline, cinematic contrast, and subtle futuristic detail. Avoid generic SaaS styling and avoid repetitive purple-on-white layouts.

### Color system

- Base background: deep charcoal or near-black.
- Surface layers: warm neutrals with soft elevation shifts.
- Accent color: a controlled highlight used sparingly for CTA and focus.
- Success, warning, and danger states must be reserved for system feedback.

Suggested token groups:

- Background.
- Surface.
- Surface elevated.
- Text primary.
- Text secondary.
- Border.
- Accent.
- Accent muted.
- Success.
- Warning.
- Error.

### Typography

- Use a premium display face for headlines.
- Use a highly legible sans-serif for body copy and UI controls.
- Maintain strong typographic contrast between headings, labels, and content.
- Ensure consistent line-height and measure on large screens.

### Spacing and grid

- Use an 8-point spacing system.
- Desktop content should sit inside a centered max-width with generous margins.
- Use a 12-column grid for marketing pages and a denser grid for dashboard pages.
- Maintain consistent vertical rhythm between sections.

### Radius, borders, and shadow

- Use restrained border radii.
- Prefer soft borders over heavy shadows.
- Elevation should come from contrast and layering, not blur alone.

### Component styling rules

- Buttons should have clear hierarchy and tactile hover feedback.
- Cards should feel precise and modular, not generic.
- Forms must be highly legible with obvious focus states.
- Chips, badges, and tabs should reinforce scanning, not decorate.

------------------------------------------------------------------------

## 8. Motion and Animation Specification

### Motion principles

- Motion should reveal structure.
- Motion should reinforce premium feel.
- Motion should never block interaction for too long.
- Motion must respect reduced-motion preferences.

### Global motion system

- Page entry transitions on route change.
- Smooth scroll behavior with controlled damping.
- Section reveal animations on scroll.
- Hover transitions on interactive cards and buttons.
- Modal and drawer transitions with consistent easing.

### Hero timeline specification

1. Initial loader fade-in.
2. Brand mark or title reveal.
3. Supporting line stagger.
4. CTA appearance.
5. Background shape or grid drift.
6. Optional parallax layer activation.

### Project card timeline

1. Thumbnail scale settles in.
2. Title and meta fade up.
3. Hover state introduces image shift and accent highlight.
4. Active state reinforces selection with border or overlay change.

### Scroll-triggered section behavior

- Headline enters first.
- Supporting copy follows.
- Media and cards animate last.
- Delays should be subtle and consistent across pages.

### Reduced-motion behavior

- Disable large transforms.
- Keep opacity transitions short and minimal.
- Retain content order and clarity without animation dependency.

------------------------------------------------------------------------

## 9. Functional Requirements

### Portfolio

- Support featured and standard project collections.
- Support categories, tags, and software metadata.
- Support image, video, and model embeds.
- Support draft, published, and archived states.
- Support SEO metadata per project.
- Support owner uploads for 3D artwork media, reference files, and preview assets from the dashboard.
- Support code-based or URL-based 3D embeds when the asset should be rendered from an external source.

### Blog

- Support markdown or rich text publishing.
- Support categories, tags, hero media, and SEO fields.
- Support comments and moderation.
- Support embedded media blocks.

### Merchandise

- Support digital and physical products.
- Support variants, stock, pricing, featured flags, and assets.
- Support reviews and related products.

### Courses

- Support course landing pages, modules, lessons, downloads, and preview content.
- Support difficulty, duration, outcomes, and pricing metadata.

### Bookings

- Support guided intake forms.
- Support availability states.
- Support file uploads.
- Support booking status lifecycle.

### 3D asset ingestion

- The owner panel must allow upload of still images, video, GLB, GLTF, and supporting reference files.
- The owner panel must also allow embed code or URL-based sources for Sketchfab, Spline, iframe previews, or similar 3D presentation methods.
- Each asset entry should store title, description, category, asset type, preview method, and publication state.
- The frontend must render uploaded and embedded 3D content without requiring a custom backend service.

### Comments

- Support nested replies.
- Support likes or reactions.
- Support moderation, delete, report, and edit flows.
- Support comments on projects, blogs, courses, and products when enabled.

### Search

- Support site-wide search over public content.
- Support title, tags, and metadata search.
- Support empty and no-result states.

------------------------------------------------------------------------

## 10. State Management

### Client state categories

- UI state: menus, modals, tabs, drawers, filters.
- Session state: auth state and role state.
- Content state: fetched lists, detail records, and cache.
- Form state: validation, draft input, submission state.
- Media state: loaded, error, expanded, and selected states.

### State management rules

- Prefer local component state for isolated UI interactions.
- Use a shared store only when multiple distant components depend on the same state.
- Keep server data normalized where possible.
- Avoid over-centralizing ephemeral UI behavior.

### Dashboard state rules

- Tables should persist filters and sort preferences where helpful.
- Form drafts should protect against accidental loss.
- Saving should show clear pending and success feedback.

------------------------------------------------------------------------

## 11. Supabase Data Model

### Core tables

- profiles
- roles
- projects
- project_media
- project_categories
- project_tags
- blogs
- blog_categories
- blog_tags
- comments
- comment_likes
- products
- product_variants
- product_reviews
- courses
- course_modules
- course_lessons
- course_assets
- bookings
- booking_availability
- services
- pricing_plans
- site_settings
- seo_entries
- media_assets
- analytics_events
- notifications

### Table responsibilities

profiles stores owner and user profile data.
roles stores permission designations.
projects stores public portfolio records.
project_media stores galleries, videos, and embeds.
blogs stores editorial content.
comments stores threaded discussions.
products stores commerce items.
courses stores educational offerings.
bookings stores lead and scheduling requests.
services and pricing_plans store commercial packaging.
site_settings stores homepage, navigation, and global configuration.
media_assets stores uploaded file metadata.

### Core field expectations

Every public content table should have:

- id.
- slug.
- title.
- description or summary.
- status.
- published_at.
- created_at.
- updated_at.
- seo title and description fields where applicable.

------------------------------------------------------------------------

## 12. Supabase Schema Notes

### Projects

Should support:

- Client name.
- Role and contribution.
- Software used.
- Category.
- Tags.
- Thumbnail.
- Hero media.
- Gallery order.
- Featured flag.
- Timeline or process notes.
- Outcome and credits.

### Blogs

Should support:

- Article type.
- Content body.
- Excerpt.
- Cover media.
- Read time.
- Published and draft states.
- Embedded blocks.

### Products

Should support:

- SKU.
- Price.
- Currency.
- Inventory.
- Variant matrix.
- Physical or digital delivery type.
- Shipping metadata when relevant.

### Courses

Should support:

- Course level.
- Total duration.
- Lesson count.
- Preview content.
- Resource downloads.
- Enrollment visibility.

### Bookings

Should support:

- Contact identity.
- Requested service.
- Budget range.
- Time preference.
- Timezone.
- Attachments.
- Status workflow.
- Admin notes.

------------------------------------------------------------------------

## 13. Row Level Security Requirements

### General policy model

- Public read access only for published and approved records.
- Authenticated owner access for all admin writes.
- Comment authors may edit or delete their own comments where allowed.
- Bookings should be readable only by the owner and the submitting user, if a user account is used.

### Policy groups

- Public read.
- Owner full access.
- Author-owned write access.
- Moderate access for staff roles if introduced.

### Security rules

- Reject anonymous writes to privileged tables.
- Sanitize user-generated content before rendering.
- Restrict storage buckets by file type and ownership.
- Protect admin routes at the application layer in addition to database policies.

------------------------------------------------------------------------

## 14. Storage Buckets and Asset Rules

### Buckets

- projects
- project-thumbnails
- blogs
- products
- courses
- avatars
- uploads
- documents

### Asset rules

- Use descriptive file naming conventions.
- Store original and optimized variants where useful.
- Maintain metadata for mime type, size, dimensions, owner, and folder.
- Restrict unsafe file types.

### Media behavior

- Images should support responsive sizes.
- Videos should lazy load.
- Large 3D assets should be optional and progressively loaded.

------------------------------------------------------------------------

## 15. API and Data Flow

### Public content flow

Astro page -> server-rendered or statically generated content -> Supabase read query -> render public view.

### Backend-assisted public content flow

Astro page -> backend API on Render -> authenticated Supabase query or cached response -> render public view.

### Owner content upload flow

Owner dashboard form -> validation -> Supabase Auth session check -> upload media to Supabase Storage or save embed code and URL metadata -> insert or update content row -> publish to frontend views.

### Auth flow

User -> Supabase Auth -> session token -> backend session verification -> guarded dashboard route -> authorized CRUD.

### Booking flow

Booking form -> validation -> insert into bookings table -> optional file upload -> notification event -> owner review.

### Comment flow

Comment form -> anti-spam checks -> insert into comments table -> moderation state -> publish or hide.

### Commerce flow

Product/course purchase intent -> backend creates Stripe checkout session -> Stripe payment confirmation webhook -> fulfillment state stored in database.

------------------------------------------------------------------------

## 16. Backend Architecture

### Backend responsibilities

The backend is responsible for secure data fetching, privileged writes, payment orchestration, webhook verification, authenticated admin operations, and any server-side logic that must not run in the browser.

The backend should expose a clean API surface for the Astro frontend and owner dashboard while using Supabase as the primary data store and Stripe as the payment processor.

### API route list

The backend should expose the following route groups:

- `GET /api/projects` - public project listing with filters, pagination, and featured ordering.
- `GET /api/projects/:slug` - single project detail payload.
- `GET /api/blogs` - public blog listing.
- `GET /api/blogs/:slug` - blog detail payload.
- `GET /api/products` - merchandise catalog listing.
- `GET /api/products/:slug` - product detail payload.
- `GET /api/courses` - course catalog listing.
- `GET /api/courses/:slug` - course detail payload.
- `GET /api/services` - services and pricing data.
- `POST /api/bookings` - create booking request.
- `POST /api/comments` - create comment or reply.
- `PATCH /api/comments/:id` - edit comment if permitted.
- `DELETE /api/comments/:id` - remove comment if permitted.
- `POST /api/admin/projects` - create project record.
- `PATCH /api/admin/projects/:id` - update project record.
- `DELETE /api/admin/projects/:id` - archive project record.
- `POST /api/admin/blogs` - create blog record.
- `PATCH /api/admin/blogs/:id` - update blog record.
- `POST /api/admin/products` - create product record.
- `PATCH /api/admin/products/:id` - update product record.
- `POST /api/admin/courses` - create course record.
- `PATCH /api/admin/courses/:id` - update course record.
- `POST /api/admin/services` - manage service pricing and offerings.
- `POST /api/checkout/stripe` - create Stripe checkout session.
- `POST /api/webhooks/stripe` - receive Stripe webhook events.
- `GET /api/me` - return authenticated session and role summary.
- `POST /api/uploads/presign` - request upload authorization or storage target details.

### Stripe webhook flow

1. Customer selects a product, course, or paid service.
2. Backend validates the purchase request and creates a Stripe checkout session.
3. Stripe handles payment collection.
4. Stripe sends webhook events to the backend.
5. Backend verifies the webhook signature using the Stripe webhook secret.
6. Backend confirms event type, such as checkout completion or payment success.
7. Backend writes payment status, order state, and fulfillment metadata into Supabase.
8. Frontend reads the updated state and shows success, access, or pending fulfillment views.
9. Failed or disputed payments are recorded as separate admin-visible states.

### Admin and auth middleware rules

- All `/api/admin/*` routes must require an authenticated session.
- Auth middleware must verify the Supabase session before any admin action is processed.
- Role middleware must confirm the caller is the owner or an approved staff role before mutation.
- Public `GET` routes may be cached only when they do not expose private fields.
- Booking, comment, upload, and checkout routes must validate input on the server before writing to Supabase.
- Stripe webhook routes must bypass normal user auth but must verify signatures and event integrity.
- Any route returning private data must strip secrets, service-role fields, and internal notes before responding.

------------------------------------------------------------------------

## 16. Folder Architecture

### Recommended structure

```text
src/
    components/
    layouts/
    pages/
    sections/
    templates/
    animations/
    hooks/
    stores/
    lib/
    services/
    utils/
    styles/
    content/
    types/
    config/

public/
supabase/
docs/
scripts/
```

### Organization rules

- Components should be grouped by responsibility, not by usage only.
- Shared design primitives should live separately from page-specific sections.
- Page templates should remain thin and compose reusable sections.
- Animation code should be isolated from business logic.

------------------------------------------------------------------------

## 17. Admin Dashboard Specification

### Dashboard home

- KPI cards for traffic, leads, sales, bookings, and published content.
- Recent activity feed.
- Quick actions for creating content.
- Status summary for storage, auth, and pending moderation items.

### Content managers

Each manager should support:

- List view.
- Search.
- Filter.
- Sort.
- Create.
- Edit.
- Delete or archive.
- Draft and publish states.

### Moderation tools

- Review comment queue.
- Hide, approve, delete, and report handling.
- Optional spam flagging.

### Media library

- Upload files.
- Preview assets.
- Copy URLs.
- Assign metadata.
- Reuse assets across modules.

### Settings panel

- Global branding.
- Navigation links.
- SEO defaults.
- Social links.
- Footer content.
- Homepage section toggles.

------------------------------------------------------------------------

## 18. SEO Strategy

### Requirements

- Unique title and description per important page.
- OpenGraph and Twitter metadata.
- Canonical URLs.
- XML sitemap.
- Robots directives.
- Structured data where appropriate.
- Image alt text coverage.
- Semantic heading order.

### Content strategy

- Portfolio pages should target project-specific and software-specific searches.
- Blog pages should target editorial and educational keywords.
- Service pages should target commercial intent queries.
- Course pages should target learning and outcome-focused keywords.

------------------------------------------------------------------------

## 19. Performance Optimization Plan

### Targets

- Fast interactive hero rendering.
- Minimal client-side JavaScript on marketing pages.
- Image optimization and responsive delivery.
- Lazy loading below the fold.
- Script isolation for rich interactions.

### Implementation rules

- Prefer static generation for most public pages.
- Load GSAP only where motion is required.
- Avoid shipping unused libraries globally.
- Split heavy components and media viewers.
- Cache aggressively at the edge where safe.

### Performance acceptance criteria

- Core pages should remain responsive on mid-range mobile devices.
- No animation may block input for an extended period.
- Media-heavy pages should degrade gracefully on slower connections.

------------------------------------------------------------------------

## 20. Accessibility Requirements

- WCAG AA contrast minimum.
- Full keyboard accessibility.
- Visible focus states.
- Semantic landmark structure.
- Descriptive labels for controls and media.
- Reduced-motion support.
- Screen-reader-friendly form feedback.

### Accessibility acceptance criteria

- All interactive elements are reachable without a mouse.
- Forms announce validation errors clearly.
- Dialogs and drawers trap focus correctly.
- Content remains understandable without motion cues.

------------------------------------------------------------------------

## 21. Security Requirements

- Supabase Auth for authentication.
- RLS for all mutable records.
- Protected dashboard routes.
- File upload restrictions.
- Input validation and content sanitization.
- Spam and abuse protections for forms and comments.
- Secure environment variable handling.

### Operational controls

- Use least-privilege permissions.
- Separate public and admin content reads.
- Store sensitive data only when required.
- Audit privileged actions where practical.

------------------------------------------------------------------------

### 22. Render Deployment Guide

### Deployment model

- Host the Astro frontend on Render.
- Host the backend API on Render as a separate service.
- Connect GitHub for continuous deployment.
- Use Render service environment variables for frontend, backend, Supabase, and Stripe.

### Required environment variables

- PUBLIC_SUPABASE_URL
- PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY for secure server-side operations
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- BACKEND_API_URL
- Any optional storage or analytics keys required by integrations

### Deployment checklist

- Build passes locally.
- Preview deployment works.
- Routes resolve correctly.
- SEO metadata renders in production.
- Forms, auth flows, and Stripe checkout/webhooks are verified after deployment.

------------------------------------------------------------------------

## 23. Development Roadmap

### Phase 1 - Foundation

- Finalize IA, design system, tokens, and content model.
- Scaffold Astro structure and base layouts.
- Set up Supabase project, auth, storage, and initial schema.
- Establish dashboard auth and protected routes.

### Phase 2 - Public Portfolio

- Build home page.
- Build portfolio listing and project detail pages.
- Implement motion system and media viewer.
- Add SEO foundations and analytics hooks.

### Phase 3 - Business Pages

- Build services, pricing, contact, and booking flows.
- Add scheduling logic.
- Configure notifications and submission handling.

### Phase 4 - Content Platform

- Build blog and editorial workflows.
- Build comments architecture.
- Add moderation tools and search.

### Phase 5 - Commerce

- Build merchandise catalog.
- Build product detail page.
- Add variant logic, inventory, and related products.

### Phase 6 - Learning Platform

- Build courses listing and detail pages.
- Add lessons, downloads, previews, and enrollment states.

### Phase 7 - Admin Hardening

- Improve dashboard UX.
- Add analytics views.
- Refine moderation, uploads, and settings.

### Phase 8 - QA and Launch

- Cross-device QA.
- Accessibility testing.
- Performance profiling.
- Deployment verification.
- Launch checklist and handover.

------------------------------------------------------------------------

## 24. Testing Checklist

- Home page renders correctly across viewport sizes.
- All project cards open to the correct detail page.
- Filters and search return expected results.
- Booking form validates correctly.
- Authenticated dashboard routes reject unauthorized access.
- CRUD operations work for all admin entities.
- Comments can be created, moderated, and deleted as intended.
- Upload limits and file restrictions are enforced.
- Reduced-motion mode is respected.
- SEO metadata appears in output HTML.
- No critical console errors appear in core flows.

------------------------------------------------------------------------

## 25. UI and UX Acceptance Criteria

- The visual system appears premium, cohesive, and deliberate.
- Navigation is clear and predictable.
- CTA hierarchy is obvious on every major page.
- Content is readable, scannable, and responsive.
- Motion enhances perception of quality without causing friction.
- The dashboard is efficient for repeated owner use.
- Empty states and errors are helpful and on-brand.

------------------------------------------------------------------------

## 26. Feature Checklist

### Public experience

- Hero section.
- Project showcase.
- Category filtering.
- Project viewer.
- About page.
- Services and pricing.
- Booking flow.
- Contact form.
- Blog and gaming editorial.
- Merchandise store.
- Courses.
- Comments.

### Owner experience

- Login and protected routes.
- Dashboard overview.
- Content CRUD.
- Media uploads.
- Booking management.
- Comment moderation.
- SEO controls.
- Site settings.

### Platform experience

- Supabase schema.
- RLS policies.
- Storage buckets.
- Deployment pipeline.
- Performance budget.
- Analytics hooks.

------------------------------------------------------------------------

## 27. Documentation Deliverables

The project should include the following supporting documents:

- README.md
- setup.md
- contributing.md
- api.md
- database.md
- deployment.md
- security.md
- testing.md

These documents should be linked from the repository and kept consistent with implementation.

------------------------------------------------------------------------

## 28. Risks and Open Questions

- Which payment provider will be used for store and course checkout?
- Will comments require email verification or account-only participation?
- Will the booking flow use a third-party calendar embed or fully custom slot logic?
- Will the learning platform support gated lessons at launch or only catalog display?
- Will the owner need multi-language support in phase 1 or later?

------------------------------------------------------------------------

## 29. Definition of Done

AetherFrame is ready for launch when:

- All core public pages are implemented and responsive.
- The owner can manage content without developer intervention.
- Bookings, comments, and commerce flows are operational.
- Security and RLS policies are in place.
- SEO, performance, and accessibility targets are met.
- Documentation and handover materials are complete.

------------------------------------------------------------------------

## 30. Appendix

### Notes on future expansion

The PRD is intentionally structured to support later expansion into a client dashboard, digital licensing, advanced analytics, AI-powered discovery, memberships, and multi-language delivery without reworking the overall system architecture.

### Product positioning statement

AetherFrame is a high-end business platform for a premium 3D artist. It must feel like an award-level studio website, a polished commerce experience, and a robust operational system at the same time.

Phase 7 - Blog

Phase 8 - QA

Phase 9 - Deployment

------------------------------------------------------------------------

# 15. Future Enhancements

-   AI assistant
-   Multi-language
-   PWA
-   Digital asset licensing
-   Analytics dashboard
-   Newsletter
-   Client portal

------------------------------------------------------------------------

# Acceptance Criteria

-   Owner can manage all content without code changes.
-   Visitors can browse, comment, purchase, and book meetings.
-   Website remains fast, accessible, responsive, and visually premium.
