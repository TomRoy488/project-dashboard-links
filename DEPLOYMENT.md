# Deployment Guide

## Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
```bash
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Commit your changes**:
```bash
git commit -m "Initial commit: React app for project dashboard links"
```

4. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `project-dashboard-links`)
   - **Don't** initialize with README, .gitignore, or license (we already have these)

5. **Connect and push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Sign up/Login to Netlify**:
   - Go to https://app.netlify.com
   - Sign up or log in (you can use your GitHub account)

2. **Add a new site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository

3. **Configure build settings** (Netlify should auto-detect these):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - These are already configured in `netlify.toml`

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - You'll get a URL like `https://your-site-name.netlify.app`

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Deploy**:
```bash
# For production deployment
netlify deploy --prod

# Or for a draft/preview deployment first
netlify deploy
```

## Step 3: Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- Deploy when you push to the `main` branch
- Create preview deployments for pull requests
- Rebuild on every commit

## Custom Domain (Optional)

1. In Netlify dashboard, go to your site settings
2. Click "Domain settings"
3. Click "Add custom domain"
4. Follow the instructions to configure your domain

## Troubleshooting

- **Build fails**: Check the build logs in Netlify dashboard
- **Site not updating**: Make sure you've pushed changes to GitHub
- **404 errors**: The `netlify.toml` redirect rule should handle this, but verify it's present

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test the build)
npm run build

# Preview production build
npm run preview
```

