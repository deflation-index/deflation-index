# GitHub Deployment Guide for The Deflation Index

## Step-by-Step Instructions

### Prerequisites
- GitHub account (create one at github.com if you don't have one)
- All files from the deployment package downloaded to your computer

---

## STEP 1: Create GitHub Repository

1. Go to **github.com** and log in
2. Click the **green "New"** button (or go to github.com/new)
3. Fill in the details:
   - **Repository name**: `deflation-index`
   - **Description**: `Quantifying technological deflation across computing, communications, and energy`
   - **Visibility**: Choose **Public** (recommended - your data is not sensitive)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license yet
4. Click **"Create repository"**

You'll see a page with setup instructions. **Keep this page open** - we'll use it in Step 3.

---

## STEP 2: Prepare Your Local Files

### Option A: Using GitHub Desktop (Easiest for beginners)

1. **Download GitHub Desktop**: 
   - Go to desktop.github.com
   - Download and install for your operating system

2. **Create local folder**:
   - Create a folder on your computer: `deflation-index`
   - Extract all files from the deployment package into this folder
   
   Your folder structure should look like:
   ```
   deflation-index/
   ├── public/
   │   ├── index.html
   │   ├── master_deflation_index.xlsx
   │   ├── computing_deflation_index.xlsx
   │   ├── communications_deflation_index.xlsx
   │   ├── energy_deflation_index.xlsx
   │   └── METHODOLOGY.md
   ├── README.md
   └── LICENSE
   ```

3. **Open GitHub Desktop**:
   - Click "File" → "Add Local Repository"
   - Select your `deflation-index` folder
   - If it says "This directory does not appear to be a Git repository", click "create a repository"
   - Click "Create Repository"

4. **Connect to GitHub**:
   - Click "Publish repository" in the top bar
   - Uncheck "Keep this code private" (make it public)
   - Click "Publish Repository"

**Done!** Your code is now on GitHub. Skip to Step 4.

---

### Option B: Using Command Line (For developers)

1. **Open Terminal/Command Prompt**

2. **Navigate to your deflation-index folder**:
   ```bash
   cd path/to/deflation-index
   ```

3. **Initialize Git**:
   ```bash
   git init
   ```

4. **Add all files**:
   ```bash
   git add .
   ```

5. **Commit**:
   ```bash
   git commit -m "Initial commit: The Deflation Index"
   ```

6. **Connect to GitHub** (replace YOUR_USERNAME with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/deflation-index.git
   git branch -M main
   git push -u origin main
   ```

   You'll be prompted to log in to GitHub.

**Done!** Your code is now on GitHub.

---

## STEP 3: Verify Your Upload

1. Go to **github.com/YOUR_USERNAME/deflation-index**
2. You should see all your files:
   - `public/` folder with index.html and Excel files
   - `README.md`
   - `LICENSE`

---

## STEP 4: Set Up Cloudflare Pages (Deployment)

Now that your code is on GitHub, let's deploy it:

### 4.1: Create Cloudflare Account
1. Go to **cloudflare.com**
2. Click "Sign Up"
3. Create a free account
4. Verify your email

### 4.2: Connect Cloudflare to GitHub
1. In Cloudflare dashboard, go to **"Workers & Pages"** (left sidebar)
2. Click **"Create Application"**
3. Click **"Pages"** tab
4. Click **"Connect to Git"**
5. Click **"GitHub"**
6. Authorize Cloudflare to access your GitHub
7. Select **"deflation-index"** repository

### 4.3: Configure Build Settings
1. **Project name**: `deflation-index`
2. **Production branch**: `main`
3. **Build command**: Leave empty (it's a static site)
4. **Build output directory**: `public`
5. Click **"Save and Deploy"**

Cloudflare will now build and deploy your site. This takes about 1 minute.

### 4.4: Get Your Live URL
After deployment completes, you'll see:
- **Your site is live at**: `https://deflation-index-xxx.pages.dev`
- Click the URL to view your site!

---

## STEP 5: Add Custom Domain (deflationindex.com)

### 5.1: Point Domain to Cloudflare
1. Log in to **Namecheap** (where you bought the domain)
2. Go to **Domain List** → **Manage** (next to deflationindex.com)
3. Find **"Nameservers"** section
4. Select **"Custom DNS"**
5. Enter Cloudflare's nameservers (get these from Cloudflare):
   - In Cloudflare, go to **Websites** → **Add a site**
   - Enter: `deflationindex.com`
   - Choose **Free plan**
   - Cloudflare will show you 2 nameservers like:
     - `chad.ns.cloudflare.com`
     - `lucy.ns.cloudflare.com`
   - Copy these to Namecheap
6. Click **Save**

**Wait 1-24 hours** for DNS to propagate (usually 1-2 hours)

### 5.2: Connect Domain in Cloudflare Pages
1. In Cloudflare Pages, go to your **deflation-index** project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `deflationindex.com`
5. Click **Continue**
6. Cloudflare automatically configures DNS
7. Also add: `www.deflationindex.com` (will redirect to main domain)

**SSL certificate** automatically generates in ~15 minutes. Your site will be live at https://deflationindex.com!

---

## STEP 6: Making Updates

Whenever you want to update the site:

### Using GitHub Desktop:
1. Edit files on your computer
2. Open GitHub Desktop
3. You'll see changed files listed
4. Enter a commit message (e.g., "Updated data for Q1 2025")
5. Click **"Commit to main"**
6. Click **"Push origin"**

**Site auto-deploys in ~1 minute!**

### Using Command Line:
```bash
# Edit your files
# Then:
git add .
git commit -m "Updated data for Q1 2025"
git push origin main
```

**Site auto-deploys in ~1 minute!**

---

## Troubleshooting

### "Site not loading"
- Wait for DNS propagation (up to 24 hours)
- Check nameservers are correct in Namecheap
- Verify Cloudflare shows domain as "Active"

### "Changes not showing"
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Check Cloudflare Pages → Deployments → verify latest deployment succeeded
- Verify git push worked: check github.com/YOUR_USERNAME/deflation-index

### "Download buttons not working"
- Files must be in the `public/` folder
- Check capitalization of filenames matches exactly
- Verify files uploaded to GitHub

### "SSL not working"
- Wait 15 minutes after adding custom domain
- Check Cloudflare → SSL/TLS → should be "Full"

---

## File Structure Reference

Your final GitHub repository should look like this:

```
deflation-index/
├── public/                          ← Everything in here is public on the web
│   ├── index.html                   ← Main website
│   ├── METHODOLOGY.md               ← Methodology page
│   ├── master_deflation_index.xlsx  ← Downloadable data
│   ├── computing_deflation_index.xlsx
│   ├── communications_deflation_index.xlsx
│   └── energy_deflation_index.xlsx
├── README.md                        ← GitHub readme (not on website)
└── LICENSE                          ← License file (not on website)
```

---

## Next Steps After Deployment

1. ✅ Test site loads at deflationindex.com
2. ✅ Test all download buttons work
3. ✅ Test share buttons work
4. ✅ Test on mobile (open on your phone)
5. ⬜ Set up email forwarding: contact@deflationindex.com
6. ⬜ Add analytics (Cloudflare Web Analytics or Plausible)
7. ⬜ Submit to Google Search Console
8. ⬜ Share on social media

---

## Support

**GitHub Issues**: Open an issue at github.com/YOUR_USERNAME/deflation-index/issues
**Cloudflare Docs**: developers.cloudflare.com/pages
**This Project Chat**: Continue asking questions here!

---

**Time Estimate**: 
- Steps 1-3: 15 minutes
- Steps 4-5: 15 minutes  
- DNS propagation: 1-24 hours
- **Total active time**: ~30 minutes

Good luck! 🚀
