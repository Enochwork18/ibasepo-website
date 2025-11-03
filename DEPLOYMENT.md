# Deployment Guide for Ìbáṣepọ̀ Website

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- Domain name (optional, Vercel provides default domain)

## Step 1: Prepare for Deployment

### Add environment variables if needed

Create `.env.production.local` (or use Vercel dashboard):

\`\`\`
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ibasepo
\`\`\`

### Test build locally

\`\`\`bash
npm run build
npm run start
\`\`\`

## Step 2: Deploy on Vercel

### Option A: Via Git Integration (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables (if needed)
6. Click "Deploy"

### Option B: Via Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts and confirm deployment
\`\`\`

## Step 3: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., ibasepo.org.uk)
4. Update DNS records with your domain provider
5. Wait for DNS propagation (can take 24 hours)

## Step 4: Post-Deployment

### Verify Site Functions

- [ ] Homepage loads correctly
- [ ] Services page loads and filters work
- [ ] Blog page renders markdown correctly
- [ ] Booking form submits successfully
- [ ] Contact form works
- [ ] Admin login accessible at /admin/login
- [ ] Client login accessible at /client/login

### Enable HTTPS

Vercel automatically provides HTTPS with Let's Encrypt (included with all deployments).

### Monitor Performance

- Use Vercel Analytics dashboard
- Check Lighthouse scores
- Monitor Core Web Vitals

## Updating After Deployment

### Simple Updates (content, blog posts)

1. Edit files in `src/data/*.json`
2. Commit and push to GitHub
3. Vercel automatically redeploys

### Code Changes

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically runs builds and deploys
5. Monitor deployment in Vercel dashboard

## Troubleshooting

### Build Failed

- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure all imports are correct

### Site Not Loading

- Check Vercel deployment status
- Verify DNS settings for custom domain
- Clear browser cache

### Booking Form Not Working

- Check that Calendly URL is correctly set in environment
- Verify form submission is working in browser console

## Performance Optimization

1. **Enable Image Optimization**
   - Vercel Image Optimization enabled by default
   - All images use Next Image component

2. **Database Caching** (when integrated)
   - Use ISR (Incremental Static Regeneration) for blog posts
   - Cache responses appropriately

3. **Monitor Analytics**
   - Use Vercel Web Analytics
   - Track page load times and user interactions

## Support

For Vercel-specific issues, visit: [vercel.com/help](https://vercel.com/help)
\`\`\`

```json file="" isHidden
