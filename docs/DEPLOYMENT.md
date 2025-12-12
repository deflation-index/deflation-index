# Deployment Guide

Complete guide to deploying The Deflation Index website to Cloudflare Pages.

## Prerequisites

- [x] Wyoming LLC formed (Deflation Index LLC)
- [x] Domain purchased (deflationindex.com) - via Namecheap or Porkbun
- [ ] Cloudflare account (free)
- [ ] GitHub account

## Step-by-Step Deployment

### 1. Set Up GitHub Repository

```bash
# Initialize git in your local directory
cd deflation-index
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: The Deflation Index website"

# Create repository on GitHub
# Go to github.com → New Repository
# Name: deflation-index
# Description: Quantifying technological deflation
# Public or Private: Your choice (can be public, no sensitive data)

# Connect local to GitHub
git remote add origin https://github.com/YOUR_USERNAME/deflation-index.git
git branch -M main
git push -u origin main
```

### 2. Set Up Cloudflare Account

1. **Create account**: Go to [cloudflare.com](https://cloudflare.com)
2. **Choose Free Plan**: Perfect for static sites
3. **Verify email**

### 3. Add Domain to Cloudflare

1. Click **"Add a Site"**
2. Enter: `deflationindex.com`
3. Select **Free Plan**
4. Cloudflare will scan your DNS records
5. Click **Continue**

### 4. Update Nameservers

Cloudflare will provide 2 nameservers (example: `chad.ns.cloudflare.com` and `lucy.ns.cloudflare.com`)

**If using Namecheap:**
1. Log into Namecheap
2. Go to **Domain List**
3. Click **Manage** next to deflationindex.com
4. Find **Nameservers** section
5. Select **Custom DNS**
6. Enter Cloudflare's nameservers
7. Save changes

**If using Porkbun:**
1. Log into Porkbun
2. Click domain name
3. Go to **DNS** tab
4. Update **Authoritative Nameservers**
5. Enter Cloudflare's nameservers
6. Save

⏰ **Wait 24-48 hours for DNS propagation** (usually much faster, often 1-2 hours)

### 5. Deploy to Cloudflare Pages

#### Option A: Connect GitHub (Recommended)

1. In Cloudflare dashboard, go to **Workers & Pages**
2. Click **Create Application**
3. Select **Pages** tab
4. Click **Connect to Git**
5. Authorize GitHub access
6. Select **deflation-index** repository
7. Configure build settings:
   - **Production branch**: `main`
   - **Build command**: Leave empty (static site)
   - **Build output directory**: `public`
8. Click **Save and Deploy**

✅ Site automatically deploys on every push to main!

#### Option B: Direct Upload (Quick Test)

1. Go to **Workers & Pages** → **Create Application** → **Pages**
2. Click **Upload assets**
3. Drag and drop your `public` folder
4. Click **Deploy**

### 6. Connect Custom Domain

1. In Cloudflare Pages, go to your project
2. Click **Custom Domains**
3. Click **Set up a custom domain**
4. Enter: `deflationindex.com`
5. Click **Continue**
6. Cloudflare auto-configures DNS
7. Also add: `www.deflationindex.com` (redirects to main)

✅ SSL certificate auto-generates (HTTPS enabled)

### 7. Verify Deployment

Visit your site:
- https://deflationindex.com
- https://www.deflationindex.com

Both should load your site with valid HTTPS.

## DNS Configuration

Cloudflare automatically creates these records:

```
Type    Name    Content
A       @       [Cloudflare Pages IP]
CNAME   www     deflationindex.com
```

## Future Updates

### Making Changes

```bash
# Make edits to files in /public
nano public/index.html

# Test locally
cd public && python3 -m http.server 8000

# Commit and push
git add .
git commit -m "Update: description of changes"
git push origin main

# Site automatically rebuilds and deploys in ~1 minute
```

### Rolling Back

```bash
# In Cloudflare Pages dashboard
# Go to Deployments
# Click "..." on any previous deployment
# Click "Rollback to this deployment"
```

## Performance Optimization

Cloudflare Pages automatically provides:
- ✅ Global CDN (300+ data centers)
- ✅ Automatic HTTPS
- ✅ HTTP/3 support
- ✅ Brotli compression
- ✅ DDoS protection
- ✅ 99.99% uptime SLA

## Monitoring

### Check Site Status
```bash
# Test from command line
curl -I https://deflationindex.com

# Should return: HTTP/2 200
```

### Analytics Setup (Optional)

**Cloudflare Web Analytics** (Free):
1. In Cloudflare: Analytics → Web Analytics
2. Enable for deflationindex.com
3. Add provided script to `<head>` in index.html

**Or use Plausible** (Privacy-focused, $9/month):
1. Sign up at plausible.io
2. Add deflationindex.com
3. Add script tag to index.html

## Troubleshooting

### Domain not resolving
- Wait for DNS propagation (up to 48 hours)
- Check nameservers: `dig deflationindex.com NS`
- Verify nameservers match Cloudflare's

### SSL not working
- Wait 10-15 minutes after domain setup
- Cloudflare auto-generates cert
- Check "SSL/TLS" in Cloudflare → should be "Full"

### Changes not showing
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check Cloudflare Pages deployment status
- Verify git push succeeded

### 404 Error
- Ensure file is named `index.html` (not deflationindex.html)
- Check "Build output directory" is set to `public`

## Security

### Recommended Settings

**In Cloudflare Dashboard:**

1. **SSL/TLS**: Set to "Full (strict)"
2. **Always Use HTTPS**: Enable
3. **Automatic HTTPS Rewrites**: Enable
4. **Minimum TLS Version**: TLS 1.2
5. **Security Level**: Medium
6. **Bot Fight Mode**: Enable

### Environment Variables (Future API)

When you add backend functionality:

```bash
# In Cloudflare Pages → Settings → Environment Variables
API_KEY=your_secret_key
DATABASE_URL=your_database_url
```

Never commit secrets to GitHub!

## Costs

**Current Stack:**
- Domain (Namecheap): ~$13/year
- Cloudflare Pages: **FREE**
- SSL Certificate: **FREE** (auto-included)
- CDN: **FREE**
- Bandwidth: **FREE** (unlimited)

**Total: $13/year** 🎉

## Next Steps After Deployment

1. ✅ Verify site loads at deflationindex.com
2. Set up email forwarding (contact@deflationindex.com)
3. Add analytics
4. Set up social media accounts
5. Submit to Google Search Console
6. Share with the world!

## Support

**Cloudflare Documentation**: https://developers.cloudflare.com/pages/  
**Community**: https://community.cloudflare.com/

**For project-specific issues**: Check GitHub issues or email contact@deflationindex.com

---

**Last Updated**: December 2024  
**Status**: Ready for deployment ✅
