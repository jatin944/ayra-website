# Ayra — Carbon Cycle Trace · Website

Single-page marketing site for Ayra Carbon Cycle Trace Pvt Ltd.
**Live at:** [ayracarbon.com](https://ayracarbon.com)

## Stack
- Pure HTML / CSS — no build step, no dependencies
- Hosted on Netlify with auto-deploy from `main`
- Custom domain via Squarespace (formerly Google Domains)

## Local preview
Just open `index.html` in any browser. There is no build step.

## Deployment
Pushes to `main` auto-deploy to Netlify. Production rules live in `netlify.toml`.

## File structure
```
.
├── index.html       # The site (single-file)
├── netlify.toml     # Netlify build & headers config
├── robots.txt       # Crawler rules
├── sitemap.xml      # Search engine sitemap
└── README.md        # This file
```

## Editing the site
The site is intentionally a single HTML file with embedded CSS so non-developers can edit it.
- Headlines, copy, customer logos, and stats are all in `index.html`
- Colours and fonts are defined as CSS variables at the top of the `<style>` block

## Contact
Jatin Garg · jatin@ayracarbon.com · +91 98339 39356
