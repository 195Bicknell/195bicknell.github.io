# 195 RCSCC Bicknell — Website

Static website for 195 Royal Canadian Sea Cadet Corps Bicknell, Richmond, BC.

## Structure

```
bicknell-site/
├── index.html        Page content and sections
├── 404.html          "Page not found" page
├── css/style.css     Colours, layout, slideshow and gallery styles
├── js/main.js        Slideshow, gallery strip, mobile menu
├── images/           Photos and corps badge (see images/README.md)
├── .nojekyll         Tells GitHub Pages to serve files as-is
└── .gitignore
```

## Adding photos

Put these files in `images/` (exact names, lowercase):

| File | Used for |
|---|---|
| `badge.png` | Corps badge in the header (square, transparent PNG works best) |
| `slide1.jpg` – `slide4.jpg` | Hero slideshow (landscape, ~1920×1080) |
| `gallery1.jpg` – `gallery6.jpg` | Scrolling gallery strip (~900×600) |

Any missing photo shows a navy gradient instead, so the site works before every photo is in.
Compress images before uploading (e.g. squoosh.app) — aim for under 400 KB each.

## Editing

- **Slide captions, gallery labels, slide speed:** the config block at the top of `js/main.js`.
- **More or fewer slides:** add or remove a `<div class="slide">` line in `index.html` and a matching caption in `js/main.js`.
- **Text, FAQ, contact details:** `index.html`.
- **Colours:** the `:root` variables at the top of `css/style.css`.

## Preview locally

Open `index.html` in a browser, or run a local server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `bicknell-site`) and push this folder:
   ```
   git remote add origin https://github.com/<your-username>/bicknell-site.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. After a minute the site is live at `https://<your-username>.github.io/bicknell-site/`.

## Custom domain

1. In **Settings → Pages → Custom domain**, enter your new domain (e.g. `www.example.ca`) and save. GitHub adds a `CNAME` file to the repo.
2. At your domain registrar, add DNS records:
   - For `www.example.ca`: a **CNAME** record pointing to `<your-username>.github.io`
   - For the bare `example.ca`: **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Once DNS has propagated, tick **Enforce HTTPS** in the Pages settings.

## Moving off the old domain

To keep links and search rankings from `richmondseacadets.com`, ask the current host (PSICORP Web)
to set up a **301 redirect** from the old domain to the new one, or point the old domain's DNS at
GitHub Pages as well.
