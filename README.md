# Sirajul Islam — Portfolio Website

A futuristic, cinematic personal portfolio for **Sirajul Islam**, Sub-Assistant Engineer at Power Grid Bangladesh PLC.

---

## 📁 Folder Structure

```
portfolio/
├── index.html                    ← Homepage (Hero, About, Skills, Experience, Blog, Contact)
├── README.md
│
├── pages/
│   ├── resume.html               ← Full resume page
│   ├── cv.html                   ← Print-optimised CV (opens in new tab → Download PDF)
│   ├── projects.html             ← Projects gallery with filter & modal preview
│   ├── gallery.html              ← Photo gallery with 4 category tabs + lightbox
│   ├── services.html             ← Services page
│   ├── blog.html                 ← Blog with search & tag filter
│   └── certifications.html       ← Certification gallery with masonry layout
│
├── css/
│   ├── variables.css             ← 🎨 ALL colors, fonts, spacing — edit here to retheme
│   ├── base.css                  ← Reset, typography, section structure, scrollbar
│   ├── components.css            ← Buttons, cards, chips, forms, timeline, skill bars
│   ├── navbar.css                ← Navigation, hamburger, dark/light toggle
│   ├── hero.css                  ← Hero section, loading screen, custom cursor
│   ├── sections.css              ← About, skills, experience, projects, blog, contact, footer
│   ├── gallery.css               ← Gallery grid, lightbox, certifications masonry
│   └── responsive.css            ← All media queries + print styles for CV
│
├── js/
│   ├── cursor.js                 ← Custom soft-glow cursor with hover expansion
│   ├── canvas.js                 ← Animated particle field (responds to dark/light theme)
│   ├── main.js                   ← Loading screen, navbar, theme toggle, typewriter, scroll reveal
│   ├── gallery.js                ← Gallery filter, lightbox with keyboard navigation
│   └── contact.js                ← Web3Forms submission + contact modal + toast
│
└── assets/
    └── images/
        ├── hero/                 ← hero_1.png, hero_2.jpg, hero_3.png, cover.png
        ├── profile/              ← profile_1.jpg, profile_2.jpg
        ├── substation/           ← substation_1.jpg, substation_2.jpg, substation_3.jpg
        ├── lifestyle/            ← lifestyle_1.png … lifestyle_7.jpg
        ├── sports/               ← sports.jpg
        └── certifications/       ← cert_*.jpg / cert_*.png (add your certificates here)
```

---

## 🚀 Quick Start

### Option 1 — Open directly in browser
Just open `index.html` in any modern browser. No build step required.

### Option 2 — Local server (recommended)
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

### Option 3 — Deploy on Vercel / Netlify
1. Upload the entire `portfolio/` folder
2. Set the root to `index.html`
3. Deploy — no build config needed (pure HTML/CSS/JS)

---

## 🖼️ Adding Your Photos

Drop images into the correct subfolder under `assets/images/`:

| Folder | Files |
|--------|-------|
| `hero/` | `hero_1.png`, `hero_2.jpg`, `hero_3.png`, `cover.png` |
| `profile/` | `profile_1.jpg`, `profile_2.jpg` |
| `substation/` | `substation_1.jpg`, `substation_2.jpg`, `substation_3.jpg` |
| `lifestyle/` | `lifestyle_1.png` … `lifestyle_7.jpg` |
| `sports/` | `sports.jpg` |
| `certifications/` | Any `cert_*.jpg` or `cert_*.png` |

The HTML already references these exact filenames. No code changes needed — just drop the files in.

---

## ✉️ Setting Up Contact Form

1. Go to [web3forms.com](https://web3forms.com) → create a free account
2. Get your Access Key
3. In `index.html`, find:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE">
   ```
4. Replace `YOUR_WEB3FORMS_KEY_HERE` with your real key
5. Form submissions will arrive at `siraj.shaon.duet@gmail.com`

---

## 🌗 Dark / Light Mode

The theme toggle in the navbar switches between dark (default) and light mode.
The preference is saved to `localStorage` — visitors won't need to toggle it again.

To customise colours for each mode, edit:
- **Dark theme** → `:root { }` in `css/variables.css`
- **Light theme** → `body.light { }` in `css/variables.css`

---

## ⬇️ CV / Download Button

- **"Download CV"** button on the homepage opens `pages/cv.html` in a new tab
- On the CV page, click **"Download PDF"** → browser print dialog opens → Save as PDF
- The CV page is fully print-optimised (print CSS hides the action bar, resets colours)
- To update CV content, edit `pages/cv.html` directly

---

## ➕ Adding a New Project

In `pages/projects.html`, copy any `.project-card` block and update:

```html
<div class="project-card" data-cat="power"
     data-modal-icon="⚡"
     data-modal-title="Your Project Title"
     data-modal-tag="Power Systems"
     data-modal-desc="Full description shown in the modal popup."
     data-modal-tech="MATLAB,Excel,ETAP">
  <div class="project-thumb">
    <img src="../assets/images/substation/substation_1.jpg" alt="Project">
    ...
  </div>
  <div class="project-body">
    <div class="project-title">Your Project Title</div>
    <div class="project-desc">Short card description.</div>
    <button class="project-link" onclick="openProjectModal(this.closest('.project-card'))">View Details →</button>
  </div>
</div>
```

**`data-cat` options:** `power` | `automation` | `research` | `design`

---

## 📷 Adding a Gallery Photo

In `pages/gallery.html`, copy any `.gallery-item` block and update:

```html
<div class="gallery-item" data-cat="lifestyle">
  <img src="../assets/images/lifestyle/lifestyle_8.jpg" alt="Caption" loading="lazy">
  <div class="gallery-overlay">
    <div>
      <div class="gallery-caption">Your Caption</div>
      <div class="gallery-sub">Subtitle or location</div>
    </div>
  </div>
</div>
```

**`data-cat` options:** `substation` | `portrait` | `lifestyle` | `sports`

---

## 📜 Adding a Certificate

In `pages/certifications.html`, copy any `.cert-item` block:

```html
<div class="cert-item" data-cat="workshop">
  <img class="cert-thumb"
       src="../assets/images/certifications/my_cert.jpg"
       alt="Certificate Name"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
  <div class="cert-ph" style="display:none">
    <div class="cert-ph-icon">🏆</div>
    <div class="cert-ph-type">Certificate</div>
  </div>
  <div class="cert-info">
    <div class="cert-title">Certificate Title</div>
    <div class="cert-issuer">Issuing Organisation · Year</div>
  </div>
  <div class="cert-overlay">
    <button class="cert-btn cert-btn-view">🔍 View</button>
  </div>
</div>
```

**`data-cat` options:** `engineering` | `professional` | `education` | `workshop`

---

## ✍️ Adding a Blog Post

In `pages/blog.html`, copy any `.blog-card` block:

```html
<article class="blog-card" data-tag="power-systems" data-title="Searchable Title Keywords">
  <span class="badge">Power Systems</span>
  <div class="blog-title">Your Article Title</div>
  <div class="blog-excerpt">Short summary of the article content...</div>
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
    <div class="blog-meta">June 2025 · 5 min read</div>
    <a href="your-article-link.html" class="blog-read-more">Read →</a>
  </div>
</article>
```

**`data-tag` options:** `power-systems` | `smart-grid` | `career` | `technology` | `personal`

---

## 🎨 Retheme in 60 Seconds

Open `css/variables.css` and change the colour palette at the top.
Every component across the entire site updates automatically.

---

## 📱 Browser Support

Chrome · Firefox · Safari · Edge · (IE not supported — intentionally)

---

*Built with precision & passion · Sirajul Islam · 2025 🇧🇩*

---

## 🔄 Dynamic Data System (v2)

The site is now **fully data-driven**. All content is centralised in one file:

```
js/data.js  ←  Edit this file ONLY. Everything updates automatically.
js/render.js ← Rendering engine (don't edit unless adding new sections)
```

### How it works

```
data.js (content)
    ↓
render.js (engine) reads SiteData
    ↓
Detects which containers exist on the current page
    ↓
Renders the right content into each container
    ↓
All pages stay in sync automatically
```

### What syncs automatically when you edit data.js

| Edit in data.js | Updates on |
|---|---|
| `personal.name`, `personal.role`, etc. | Homepage, Resume, CV, Navbar, Footer |
| `personal.bio`, `personal.quote` | Homepage About, Resume |
| `personal.summary` | Resume, CV |
| `skills[]` | Homepage Skills, Resume |
| `experience[]` | Homepage Timeline, Resume, CV |
| `education[]` | Resume, CV |
| `projects[]` | Homepage Teaser (featured:true), Projects page |
| `blog[]` | Homepage Teaser (3 most recent), Blog page (featured + all) |
| `services[]` | Services page |
| `certifications[]` | Certifications page |
| `gallery.*` | Gallery page (all categories) |
| `social[]` | Homepage Social section |

### Adding a new project (example)

Open `js/data.js` and add to `SiteData.projects`:

```javascript
{
  id:       "my-new-project",
  featured: true,           // ← true = appears on homepage teaser
  cat:      "power",        // power | automation | research | design
  icon:     "⚡",
  tag:      "Power Systems",
  title:    "My New Project Title",
  desc:     "Short description for the card.",
  fullDesc: "Full description shown in the modal popup.",
  tech:     ["MATLAB", "Excel"],
  image:    "assets/images/substation/my_image.jpg",  // or "" for icon only
},
```

Save the file → the project appears on the homepage AND the projects page immediately.

### Adding a new blog post (example)

```javascript
{
  id:       "my-post-slug",
  featured: false,
  tag:      "power-systems",   // power-systems | smart-grid | career | technology | personal
  tagLabel: "Power Systems",
  title:    "My Article Title",
  excerpt:  "Short summary shown on cards.",
  date:     "June 2025",
  readTime: "5 min read",
  body: [
    "First paragraph text here.",
    "Second paragraph text here.",
    "Third paragraph.",
  ],
},
```

### Changing personal info (example)

```javascript
personal: {
  name:     "Sirajul Islam",       // ← Updates everywhere: navbar, hero, footer, CV
  email:    "new@email.com",       // ← Updates contact form, CV, modal
  whatsapp: "8801712345678",       // ← Updates WhatsApp buttons
  // ...
}
```
