# Render Deployment Guide (Manual Setup)

This guide will walk you through deploying your decoupled Shunya Studio architecture to Render completely manually, avoiding the paid Blueprint feature. We will deploy the **Backend** first, and then the **Frontend**.

---

## Step 1: Push Your Code to GitHub

Render needs to pull your code directly from a Git repository.

1. Go to [GitHub](https://github.com/) and create a new, empty repository (e.g., `shunya-studio`).
2. Open your terminal in VS Code (make sure you are in the `d:\Project\Private\ShunyaPortfolio` directory).
3. Initialize Git and push your code by running these commands (replace the URL with your actual GitHub repo URL):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Shunya Studio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shunya-studio.git
   git push -u origin main
   ```

---

## Step 2: Deploy the Backend (Express/Node)

We must deploy the backend first so we have a live API URL to give to our frontend.

1. Go to [Render.com](https://render.com/) and sign in.
2. Click **New +** at the top and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and click Next.
4. Connect the `shunya-studio` repository.
5. Fill out the service details:
   - **Name:** `shunya-backend`
   - **Region:** Choose the one closest to you (e.g., Oregon or Frankfurt).
   - **Branch:** `main`
   - **Root Directory:** `backend` *(<- This is VERY important!)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx tsc`
   - **Start Command:** `node dist/index.js`
   - **Instance Type:** Free (or whatever tier you prefer).
6. Click **Advanced** to open the environment variables section and click **Add Environment Variable** to add the following:
   - Key: `NODE_ENV` | Value: `production`
   - Key: `PORT` | Value: `10000`
   - Key: `PUBLIC_SUPABASE_URL` | Value: *(Your Supabase URL)*
   - Key: `SUPABASE_SERVICE_ROLE_KEY` | Value: *(Your hidden Supabase admin key)*
7. Click **Create Web Service**. 
8. Once the build finishes and says "Live", copy the URL Render gives it (e.g., `https://shunya-backend.onrender.com`).

---

## Step 3: Deploy the Frontend (Astro)

Now that the backend is live, we will deploy the frontend and point it to the backend.

1. Go back to the Render dashboard, click **New +** and select **Web Service**.
2. Choose **Build and deploy from a Git repository** and connect your `shunya-studio` repository again.
3. Fill out the service details:
   - **Name:** `shunya-frontend`
   - **Region:** Choose the same region as your backend.
   - **Branch:** `main`
   - **Root Directory:** `frontend` *(<- This is VERY important!)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node ./dist/server/entry.mjs`
   - **Instance Type:** Free
4. Click **Advanced** and click **Add Environment Variable** to add the following:
   - Key: `NODE_ENV` | Value: `production`
   - Key: `PUBLIC_SUPABASE_URL` | Value: *(Your Supabase URL)*
   - Key: `PUBLIC_SUPABASE_ANON_KEY` | Value: *(Your Supabase Anon/Public Key)*
   - Key: `PUBLIC_BACKEND_API_URL` | Value: *(Paste the backend URL you copied in Step 2, and add `/api` to the end. Example: `https://shunya-backend.onrender.com/api`)*
5. Click **Create Web Service**.

---

## Step 4: Verify the Deployment

1. Once the `shunya-frontend` service says **"Live"**, click its URL to open your website.
2. **Tests to run:**
   - Browse the projects and blogs (they should be empty right now since your Supabase database is fresh).
   - Try submitting a form on the Contact/Booking page.
   - Go to your Supabase dashboard -> Table Editor -> `bookings` and verify the data arrived securely!

Congratulations, your Full-Stack studio platform is live, completely manually!
