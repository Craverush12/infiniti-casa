# 🚀 Deployment Guide

This guide covers deploying Infiniti Casa to various hosting platforms.

## 🎯 Recommended: Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub and create a new repository
   - Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/infiniti-casa.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Deploy**:
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Your site will be live in minutes!

### Step 3: Custom Domain (Optional)

1. **Add Domain**:
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🌐 Alternative: Netlify

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Or connect your GitHub repository for auto-deploy

### Step 3: Environment Variables
- Go to Site Settings → Environment Variables
- Add your Supabase credentials

## 📄 GitHub Pages

### Step 1: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/infiniti-casa",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Deploy
```bash
npm run deploy
```

## 🔥 Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase
```bash
firebase login
firebase init hosting
```

### Step 3: Build and Deploy
```bash
npm run build
firebase deploy
```

## 🔧 Environment Variables

### Local Development
Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production
Add these to your hosting platform's environment variables section.

## 📱 PWA Configuration

### Update manifest.json
```json
{
  "name": "Infiniti Casa",
  "short_name": "Infiniti Casa",
  "description": "Luxury boutique rentals in Mumbai",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000"
}
```

## 🔒 Security Checklist

- [ ] Environment variables are set
- [ ] HTTPS is enabled
- [ ] CORS is configured properly
- [ ] Supabase RLS policies are active
- [ ] Input validation is in place

## 📊 Performance Optimization

### Build Optimization
```bash
npm run build
```

### Bundle Analysis
```bash
npm install --save-dev vite-bundle-analyzer
```

### Image Optimization
- Use WebP format
- Implement lazy loading
- Use appropriate image sizes

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check environment variables
   - Ensure all dependencies are installed
   - Check TypeScript errors

2. **Environment Variables Not Working**:
   - Ensure they start with `VITE_`
   - Restart development server
   - Check hosting platform settings

3. **Supabase Connection Issues**:
   - Verify URL and API key
   - Check CORS settings in Supabase
   - Ensure RLS policies are correct

### Debug Commands
```bash
# Check build
npm run build

# Check types
npm run type-check

# Check linting
npm run lint

# Preview build
npm run preview
```

## 📈 Monitoring

### Vercel Analytics
- Built-in analytics in Vercel dashboard
- Performance monitoring
- Error tracking

### Custom Analytics
Consider adding:
- Google Analytics
- Hotjar for user behavior
- Sentry for error tracking

## 🔄 Continuous Deployment

### GitHub Actions
The included `.github/workflows/deploy.yml` will:
- Run tests on every push
- Deploy to Vercel on main branch
- Ensure code quality

### Manual Deployment
```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review hosting platform documentation
3. Create an issue in the repository
4. Contact support@infiniticasa.com

---

**Happy Deploying! 🚀** 