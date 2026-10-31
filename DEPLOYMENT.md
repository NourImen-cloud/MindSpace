# MINDSPACE — Web App Deployment Guide

Your MINDSPACE web application is production-ready. You can deploy it for free in less than 2 minutes using **Vercel** or **Netlify**.

---

## ⚡ Option 1: Deploy to Vercel (Recommended - Easiest)

1. Push your repository to your GitHub account (or drag & drop the project folder).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `MindSpace` repository.
4. Settings are detected automatically:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. Your live web app URL (e.g. `https://mindspace-yourname.vercel.app`) is generated instantly with free SSL!

---

## ⚡ Option 2: Deploy to Netlify (Drag & Drop in 30 Seconds)

1. Run `npm run build` in your terminal (already done, `dist` folder is created!).
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the **`dist`** folder from:
   ```
   C:\Users\lenovo\Documents\MindSpace\dist
   ```
4. Netlify will immediately publish your website with a free live URL!

---

## 🔗 Connecting the Browser Extension to your Deployed URL

Once your app is deployed:
1. Open `extension/popup.html` or click the extension popup in Chrome.
2. In `extension/background.js`, replace:
   ```javascript
   mindspace_app_url: 'http://localhost:4173'
   ```
   with your live deployed URL (e.g. `https://mindspace.vercel.app`).
3. Whenever an app like Instagram is paused, it will automatically connect with your live deployed sanctuary!
