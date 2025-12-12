# Quick Start Guide

Get The Deflation Index live in 30 minutes.

## ✅ Prerequisites Checklist

- [x] Wyoming LLC formed (Deflation Index LLC)
- [ ] Domain purchased (deflationindex.com)
- [ ] GitHub account
- [ ] Cloudflare account (free)

## 🚀 30-Minute Deployment

### Step 1: Push to GitHub (5 minutes)

```bash
# Navigate to your project directory
cd deflation-index

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: The Deflation Index"

# Create GitHub repository
# Go to: github.com/new
# Name: deflation-index
# Description: Quantifying technological deflation
# Make it Public (no sensitive data)

# Connect and push (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/deflation-index.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Cloudflare (10 minutes)

1. **Create account**: cloudflare.com → Sign up (FREE plan)
2. **Add site**: Click "Add a Site" → Enter `deflationindex.com` → Free plan
3. **Get nameservers**: Cloudflare shows 2 nameservers (save these)

### Step 3: Update Domain Nameservers (5 minutes)

**At Namecheap:**
1. Domain List → Manage → Nameservers
2. Select "Custom DNS"
3. Paste Cloudflare's 2 nameservers
4. Save

**Wait 1-24 hours for DNS** (usually 1-2 hours)

### Step 4: Deploy to Cloudflare Pages (10 minutes)

1. **In Cloudflare**: Workers & Pages → Create → Pages → Connect to Git
2. **Authorize GitHub**: Allow access
3. **Select repo**: deflation-index
4. **Configure build**:
   - Production branch: `main`
   - Build command: (leave empty)
   - Build output directory: `public`
5. **Save and Deploy**

⏰ First deployment: ~1 minute

### Step 5: Add Custom Domain (2 minutes)

1. In Cloudflare Pages → Your project → Custom Domains
2. Click "Set up a custom domain"
3. Enter: `deflationindex.com` → Continue
4. Add: `www.deflationindex.com` (redirects to main)

✅ SSL auto-generates in ~15 minutes

### Step 6: Verify (1 minute)

Visit: https://deflationindex.com

🎉 **YOU'RE LIVE!**

## 🔄 Making Updates

```bash
# Edit files
nano public/index.html

# Commit and push
git add .
git commit -m "Update: describe your changes"
git push

# Site auto-deploys in ~1 minute
```

## 🎯 Next Steps

### Immediate (Today)
- [ ] Test site loads correctly
- [ ] Check HTTPS is working
- [ ] Test mobile responsiveness

### This Week
- [ ] Set up email forwarding (contact@deflationindex.com)
- [ ] Add analytics (Cloudflare or Plausible)
- [ ] Create social media accounts
- [ ] Share with friends for feedback

### This Month
- [ ] Add email capture for updates
- [ ] Submit to Google Search Console
- [ ] Write first blog post/update
- [ ] Plan API development

## 📊 Monitoring

**Check deployment status:**
```bash
# Test site
curl -I https://deflationindex.com

# Should return: HTTP/2 200
```

**Cloudflare Dashboard:**
- Analytics → Web Analytics (real-time visitors)
- Workers & Pages → deflation-index → Deployments

## 🆘 Troubleshooting

**Site not loading?**
- Wait for DNS propagation (up to 24 hours)
- Check nameservers: In Cloudflare, Overview tab should show ✅ Active

**Changes not showing?**
- Hard refresh: Cmd/Ctrl + Shift + R
- Check Cloudflare Pages deployment succeeded
- Verify git push worked: `git log`

**SSL not working?**
- Wait 15 minutes after adding custom domain
- Check Cloudflare → SSL/TLS → should be "Full"

## 💰 Costs

- Domain: $13/year
- Hosting: **FREE** (Cloudflare Pages)
- SSL: **FREE** (auto-included)
- Bandwidth: **FREE** (unlimited)

**Total: $13/year** 🎉

## 📞 Help

**Stuck?** Check the full [DEPLOYMENT.md](docs/DEPLOYMENT.md) guide.

**Questions?** Open a GitHub issue or email contact@deflationindex.com

---

**Remember**: You're not just deploying a website. You're quantifying and exposing a systematic economic phenomenon. The data speaks for itself. Let it.
