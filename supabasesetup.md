# Supabase Setup & Connection Guide

This document provides a complete step-by-step guide to creating your Supabase project, connecting it to your codebase, and setting up the database schema for the Shunya Studio platform.

---

## Part 1: Creating & Connecting Your Project

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account or log in.
2. Click **New Project** and select your organization.
3. Give your project a name (e.g., "Shunya Studio").
4. Generate a strong Database Password and save it somewhere safe.
5. Select a region close to your target audience.
6. Click **Create new project**. (It may take a few minutes to provision the database).

### 2. Get Your API Credentials
Once your project is ready, you need to grab the connection keys:
1. In the Supabase dashboard, go to **Project Settings** (the gear icon on the bottom left).
2. Click on **API** in the sidebar.
3. Locate the **Project URL**.
4. Locate the **`anon` `public`** key.
5. Locate the **`service_role` `secret`** key.

### 3. Connect the Codebase
You need to inject these keys into your local environment files so your frontend and backend can talk to Supabase.

**For the Frontend (Astro):**
1. Open `d:\Project\Private\ShunyaPortfolio\frontend\.env` (create the file if it doesn't exist).
2. Add the following variables:
   ```env
   PUBLIC_SUPABASE_URL="your-project-url-here"
   PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key-here"
   PUBLIC_BACKEND_API_URL="http://localhost:4000/api"
   ```

**For the Backend (Node/Express):**
1. Open `d:\Project\Private\ShunyaPortfolio\backend\.env`.
2. Add the following variables:
   ```env
   PORT=4000
   PUBLIC_SUPABASE_URL="your-project-url-here"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key-here"
   STRIPE_SECRET_KEY="sk_test_..."
   ```
> [!WARNING]
> NEVER put your `SUPABASE_SERVICE_ROLE_KEY` in the frontend `.env` file. It has full admin rights and bypasses all security rules. It should only exist in the backend!

### 4. Setup Authentication (Optional)
1. In the Supabase dashboard, go to **Authentication**.
2. Under **Providers**, ensure **Email** is enabled (it usually is by default).
3. If you want users to comment, you may want to disable "Confirm email" during local development for easier testing.

---

## Part 2: Database Schema & Configuration

You can execute these SQL commands directly in your Supabase **SQL Editor** (found in the left sidebar of your dashboard) to scaffold your database.

### 1. Tables & Schema

### `roles`
Stores authorization levels for users (Owner/Admin).
```sql
CREATE TABLE roles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamp with time zone DEFAULT now()
);
```

### `profiles`
Extended user data.
```sql
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);
```

### `projects`
Portfolio case studies and 3D embeds.
```sql
CREATE TABLE projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  client text,
  cover_image text,
  gallery text[],
  embed_url text,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

### `blogs`
Technical insights and game reviews.
```sql
CREATE TABLE blogs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  category text,
  cover_image text,
  read_time text,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

### `products` (Shop)
Merchandise and 3D assets.
```sql
CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  price_cents integer NOT NULL, -- Stored in cents for Stripe compatibility
  stripe_product_id text,
  stripe_price_id text,
  images text[],
  download_url text,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

### `courses` (Masterclasses)
```sql
CREATE TABLE courses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  level text,
  duration text,
  price_cents integer NOT NULL,
  stripe_product_id text,
  stripe_price_id text,
  cover_image text,
  curriculum jsonb,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

### `bookings`
Client inquiries and discovery calls.
```sql
CREATE TABLE bookings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  timezone text,
  budget text,
  project_brief text,
  reference_links text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);
```

### `comments`
Discussion system for blogs and projects.
```sql
CREATE TABLE comments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  resource_id text NOT NULL, -- references a slug or ID
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name text,
  content text NOT NULL,
  likes integer DEFAULT 0,
  is_approved boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);
```

---

## 2. Row Level Security (RLS) Policies

All tables should have RLS enabled to secure data. Execute this block to enable RLS and apply standard policies.

```sql
-- Enable RLS on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 1. Read access for everyone (only published content)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Published projects are viewable by everyone." ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Published blogs are viewable by everyone." ON blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Published products are viewable by everyone." ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Published courses are viewable by everyone." ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Approved comments are viewable by everyone." ON comments FOR SELECT USING (is_approved = true);

-- 2. Insert access for public (Bookings and Comments)
CREATE POLICY "Anyone can submit a booking." ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit a comment." ON comments FOR INSERT WITH CHECK (true);

-- 3. Admin Full Access Policy (Helper function)
CREATE FUNCTION public.is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM roles WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Apply Admin policies
CREATE POLICY "Admins have full access to projects" ON projects USING (public.is_admin());
CREATE POLICY "Admins have full access to blogs" ON blogs USING (public.is_admin());
CREATE POLICY "Admins have full access to products" ON products USING (public.is_admin());
CREATE POLICY "Admins have full access to courses" ON courses USING (public.is_admin());
CREATE POLICY "Admins have full access to bookings" ON bookings USING (public.is_admin());
CREATE POLICY "Admins have full access to comments" ON comments USING (public.is_admin());
```

---

## 3. Storage Buckets

Navigate to the **Storage** tab in your Supabase dashboard and create the following buckets. 

1. **`projects`**: For case study cover images and galleries. (Make Public)
2. **`products`**: For shop thumbnails. (Make Public)
3. **`courses`**: For course cover images. (Make Public)
4. **`avatars`**: For user and admin profile pictures. (Make Public)
5. **`uploads`**: General miscellaneous images for blogs. (Make Public)
6. **`documents`**: For secure digital asset downloads (GLB/GLTF/Zip files). **(Keep Private - Admin/Buyer access only)**

### Storage RLS Policies
By default, your buckets are locked down. You need to apply policies to the `storage.objects` table so the public can see images, and you (the admin) can upload files.

Copy and paste this into your **SQL Editor** and run it:

```sql
-- 1. Allow everyone to view files in the public buckets
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (
  bucket_id IN ('projects', 'products', 'courses', 'avatars', 'uploads')
);

-- 2. Allow Admins to upload, update, and delete files in ANY bucket (including private ones)
CREATE POLICY "Admin Full Access" ON storage.objects FOR ALL USING (
  public.is_admin()
) WITH CHECK (
  public.is_admin()
);
```

Once you run this, all your images will load properly on the frontend, and you will be able to securely upload premium assets to the `documents` bucket from your dashboard!

## 4. Trigger for Auto-Profile Creation (Optional)

If you want a profile row created automatically when a user signs up (e.g., for commenters):

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```
