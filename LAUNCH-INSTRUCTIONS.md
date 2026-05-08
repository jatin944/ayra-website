# 🚀 Ayra Website — Launch Playbook

**Target domain:** ayracarbon.com
**Hosting:** Netlify (free tier)
**Registrar:** Squarespace (formerly Google Domains)
**Estimated time:** 30–60 minutes (mostly DNS propagation wait)

---

## What you're about to do (in plain English)

You'll do four things in order:

1. **Push the website files to GitHub** so Netlify can read them
2. **Connect the GitHub repo to Netlify** — this makes the site live on a temporary Netlify URL
3. **Tell Squarespace's DNS settings to point ayracarbon.com to Netlify** — this is where most people get stuck, but it's just two records to add
4. **Wait 10–60 minutes for the internet to update**, then your site is live on ayracarbon.com with auto-renewing free SSL

---

## STEP 1 — Push to GitHub (5 min)

### If you already have a GitHub account

1. Go to **github.com** → click the **+** in top right → **New repository**
2. Repository name: `ayra-website` (or anything you want)
3. Set it to **Public** (Netlify free tier works with private repos too, but public is simpler)
4. Do **not** initialize with README, .gitignore, or license — we have these already
5. Click **Create repository**
6. GitHub now shows you a setup page. Copy the URL it gives you (looks like `https://github.com/yourname/ayra-website.git`)

### Upload the files

The easiest way (no git knowledge needed):

1. On the empty repo page, click **uploading an existing file** (link in middle of page)
2. Drag these files from the launch package into the upload area:
   - `index.html`
   - `netlify.toml`
   - `robots.txt`
   - `sitemap.xml`
   - `README.md`
   - `.gitignore`
3. Scroll down → write commit message "Initial site launch" → click **Commit changes**

You now have a public GitHub repo with the site files.

### If you have git installed and prefer command line

```bash
cd ayra-website-launch
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ayra-website.git
git push -u origin main
```

---

## STEP 2 — Connect Netlify (5 min)

1. Go to **app.netlify.com** → sign up (use **Sign up with GitHub** — easier)
2. After login, click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub** → authorize Netlify to access your GitHub
4. Pick your `ayra-website` repo from the list
5. On the build settings screen, leave everything as default — Netlify auto-detects from `netlify.toml`
6. Click **Deploy site**

Netlify will now build and deploy. Within ~30 seconds you'll see a URL like `https://radiant-pixel-abc123.netlify.app`. Click it. **Your site is now live at that URL.**

### Rename the Netlify subdomain (optional but useful)

While we wait to set up the custom domain, give the Netlify URL a clean name:

1. In Netlify dashboard → **Site configuration** → **General** → **Site name** → **Change site name**
2. Set it to `ayra-carbon` → save
3. Your Netlify URL is now `https://ayra-carbon.netlify.app` (memorable, shareable while DNS propagates)

---

## STEP 3 — Connect ayracarbon.com (15 min + propagation wait)

This is the part that intimidates people but it's actually two record entries.

### Part A — In Netlify, register the custom domain

1. Netlify dashboard → **Domain management** (left sidebar) → **Add a domain**
2. Enter **ayracarbon.com** → click **Verify** → click **Add domain**
3. Netlify will say "Awaiting external DNS configuration" — that's correct, we'll fix that next
4. Click on **ayracarbon.com** in the list → Netlify will show you the DNS records you need to add. **Keep this tab open** — you'll come back to copy values from it.

The values Netlify shows you will look like:
- An **A record** pointing to `75.2.60.5` (Netlify's load balancer IP)
- A **CNAME record** for `www` pointing to your Netlify subdomain (`ayra-carbon.netlify.app`)

### Part B — Open Squarespace DNS settings

1. Open a new tab → go to **domains.squarespace.com**
2. Sign in with the Google account you originally bought the domain on
3. Click on **ayracarbon.com** in your domain list
4. Find the **DNS** section in the left sidebar (it may say "DNS Settings" or just "DNS")
5. Scroll to **Custom Records** section

### Part C — Add the records

You'll add **two records** in the Custom Records section:

**Record 1 — Apex domain (ayracarbon.com → Netlify)**

| Field | Value |
|---|---|
| Host | `@` |
| Type | `A` |
| Priority | (leave blank) |
| Data | `75.2.60.5` *(use the IP Netlify showed you)* |

Click **Add record**.

**Record 2 — www subdomain**

| Field | Value |
|---|---|
| Host | `www` |
| Type | `CNAME` |
| Priority | (leave blank) |
| Data | `ayra-carbon.netlify.app` *(your Netlify subdomain, no https://, no trailing slash)* |

Click **Add record**.

### Part D — Remove conflicting default records (if any)

If Squarespace already has records for `@` or `www` pointing somewhere else (Squarespace's parking page, for example), **delete those** — otherwise they'll conflict with the new records.

Common ones to remove:
- Any existing `A` record for `@` not pointing to `75.2.60.5`
- Any existing `CNAME` for `www` not pointing to your Netlify URL

Squarespace's own service records (MX records for email, TXT records, etc.) — **leave those alone**. They control email and verification, not website routing.

---

## STEP 4 — Wait, then verify (10–60 min)

DNS propagation is a global process. It usually takes 10–30 minutes but the official upper bound is 48 hours. Most of the time you'll see it work in under 30 minutes.

### Check if it's working

Run this in your browser address bar every few minutes:
```
https://dnschecker.org/#A/ayracarbon.com
```
When you see most of the global checkmarks pointing to `75.2.60.5`, DNS has propagated.

### Then in Netlify

1. Netlify dashboard → **Domain management**
2. The status next to ayracarbon.com should change from "Awaiting external DNS" → "Netlify DNS" (✓)
3. Netlify will automatically provision a **free Let's Encrypt SSL certificate** — this takes another 5–10 minutes after DNS resolves
4. Once SSL is active, you'll see "🔒 Primary domain" with a padlock

### Visit https://ayracarbon.com

You should see your site, with a valid SSL padlock in the browser. **You are live.**

---

## STEP 5 — Post-launch checklist

Once the site is up, do these in order:

### Immediate (Day 1)
- [ ] Test the site on **mobile** (open on your phone)
- [ ] Test on **Safari** and **Chrome** — different rendering engines
- [ ] Verify the Robert Swan quote and footer are correct
- [ ] Click every nav link → confirm it scrolls to the right section
- [ ] Confirm SSL padlock shows on https://ayracarbon.com

### Week 1
- [ ] **Google Search Console** (search.google.com/search-console)
  - Add property → Domain → enter `ayracarbon.com`
  - Verify via DNS TXT record (Squarespace's DNS panel again)
  - Submit sitemap: `https://ayracarbon.com/sitemap.xml`
- [ ] **Google Analytics 4** if you want traffic data — add the GA4 snippet to `index.html` before the `</head>` tag and push the change to GitHub (Netlify auto-deploys)
- [ ] Update LinkedIn, business cards, email signatures with the live URL
- [ ] Send the link to your existing customers (3 MRFs + 2 recyclers) for feedback

### Month 1
- [ ] Set up email forwarding for `jatin@ayracarbon.com` if you don't have it (Squarespace email settings or Google Workspace)
- [ ] Run **PageSpeed Insights** at pagespeed.web.dev — confirm score >90
- [ ] Run accessibility check at wave.webaim.org

---

## Editing the site after launch

Because everything is in one `index.html` file, edits are simple:

1. Edit `index.html` on GitHub directly (click any file → pencil icon → edit → commit)
2. Within 30 seconds, Netlify auto-rebuilds and deploys
3. Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R) to see the change

For bigger changes, message me with what you want to update and I'll give you the exact code blocks to paste in.

---

## Troubleshooting

**Site not loading after 1 hour**
- Re-check the A record value matches what Netlify is showing (Netlify occasionally rotates IPs)
- Use `dnschecker.org` to confirm propagation
- Check if there are conflicting records in Squarespace DNS panel

**SSL certificate not provisioning**
- Wait — it can take up to an hour after DNS resolves
- In Netlify Domain settings, click **Renew certificate**

**"Site can't be reached" when typing ayracarbon.com (without https)**
- Browsers usually try http:// first → our config redirects to https
- Type `https://ayracarbon.com` explicitly the first time
- After a few visits the browser caches the HSTS rule

**Want to roll back a bad change**
- Netlify dashboard → **Deploys** → find the previous good deploy → click **Publish deploy**
- Instant rollback

---

## Total cost

- **Domain:** already paid (Squarespace)
- **Hosting:** ₹0 (Netlify free tier — supports up to 100GB bandwidth/month, plenty for a marketing site)
- **SSL:** ₹0 (Let's Encrypt, auto-renewed by Netlify)
- **GitHub:** ₹0 (public repo)

You go from zero to a production site at ayracarbon.com for nothing per month, forever.

---

**Stuck somewhere?** Take a screenshot of where you are and tell me what error or screen you're seeing. I'll guide you past it.
