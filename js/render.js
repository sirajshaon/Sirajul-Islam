/* ================================================================
   render.js  —  RENDERING ENGINE
   ================================================================
   Reads from SiteData (data.js) and populates every page.
   This file should NOT need editing for content changes.
   ================================================================ */

const Render = (() => {

  /* ── Path helper (root vs /pages/ subdir) ─────────────────── */
  const inPages = window.location.pathname.includes('/pages/');
  const root    = inPages ? '../' : '';
  const p       = src => root + src;   // resolve asset path

  /* ── After render: re-init animations ────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => obs.observe(el));
  }

  function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const fill = e.target.querySelector('.skill-fill');
          if (fill) setTimeout(() => { fill.style.width = (e.target.dataset.level || 0) + '%'; }, 200);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-card[data-level]').forEach(c => obs.observe(c));
  }

  /* ── Shared modal system ──────────────────────────────────── */
  function buildModal(id) {
    if (document.getElementById(id)) return;
    const div = document.createElement('div');
    div.id = id;
    div.style.cssText = 'position:fixed;inset:0;z-index:8500;background:rgba(2,7,12,.92);backdrop-filter:blur(24px);display:flex;align-items:flex-start;justify-content:center;padding:2rem 1.5rem;opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s;overflow-y:auto';
    div.innerHTML = `
      <div style="background:rgba(8,18,28,.98);border:1px solid var(--glass-border);border-radius:var(--radius-xl);max-width:720px;width:100%;margin:auto;position:relative">
        <div style="padding:1.8rem 2rem 0;display:flex;justify-content:flex-end">
          <button onclick="Render.closeModal('${id}')" style="width:36px;height:36px;border-radius:50%;background:rgba(0,212,232,.1);border:1px solid rgba(0,212,232,.25);color:var(--text-primary);font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center">✕</button>
        </div>
        <div id="${id}-body" style="padding:.5rem 2rem 2.5rem"></div>
      </div>`;
    div.addEventListener('click', e => { if (e.target === div) Render.closeModal(id); });
    document.body.appendChild(div);
  }

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.opacity = '1'; m.style.visibility = 'visible';
    m.scrollTop = 0; document.body.style.overflow = 'hidden';
  }

  /* ── RENDER: About ─────────────────────────────────────────── */
  function about(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d  = SiteData.personal;
    el.innerHTML = `
    <div class="about-grid">
      <div class="about-img-wrap reveal">
        <img src="${p('assets/images/profile/profile_1.jpg')}" alt="${d.name}"
             onerror="this.parentNode.innerHTML='<div class=&quot;about-img-ph&quot;><span>👤</span></div>'">
        <div class="about-img-badge">
          <div class="lbl">Current Role</div>
          <div class="val">${d.role.split(' ').slice(0,2).join(' ')}</div>
        </div>
      </div>
      <div class="reveal reveal-d1">
        <div class="section-label">About Me</div>
        <h2 class="section-title">Bridging Engineering<br>Precision with Vision</h2>
        <div class="quote-block">"${d.quote}"</div>
        <div class="about-text">${d.bio.map(b=>`<p>${b}</p>`).join('')}</div>
        <div class="chips-row">${d.chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div>
        <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap">
          <a href="${p('pages/resume.html')}" class="btn-primary">📄 Full Resume</a>
          <a href="${p('pages/cv.html')}" target="_blank" class="btn-outline">⬇ Download CV</a>
        </div>
      </div>
    </div>
    <div class="stat-row reveal" style="margin-top:3.5rem;padding-top:2rem;border-top:1px solid var(--glass-border)">
      ${d.stats.map(s=>`<div class="stat-item"><div class="stat-val">${s.val}</div><div class="stat-lbl">${s.lbl}</div></div>`).join('')}
    </div>`;
    initReveal();
  }

  /* ── RENDER: Skills grid ─────────────────────────────────── */
  function skills(containerId, limit = Infinity) {
    const el = document.getElementById(containerId); if (!el) return;
    const items = SiteData.skills.slice(0, limit === Infinity ? undefined : limit);
    el.innerHTML = items.map((s, i) => `
      <div class="skill-card reveal${i%3===1?' reveal-d1':i%3===2?' reveal-d2':''}" data-level="${s.level}">
        <div class="skill-icon">${s.icon}</div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-sub">${s.sub}</div>
        <div class="skill-pct">${s.level}%</div>
        <div class="skill-bar"><div class="skill-fill"></div></div>
      </div>`).join('');
    initReveal(); initSkillBars();
  }

  /* ── RENDER: Experience timeline ─────────────────────────── */
  function experience(containerId, showBullets = false) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = `<div class="timeline">` +
      SiteData.experience.map(e => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${e.date}</div>
          <div class="timeline-role">${e.role}</div>
          <div class="timeline-org">${e.org} · ${e.detail}</div>
          <div class="timeline-desc">${
            showBullets && e.bullets
              ? `<ul style="padding-left:1.1rem;margin-top:.5rem;display:flex;flex-direction:column;gap:.35rem">${e.bullets.map(b=>`<li style="list-style:disc;font-size:.88rem;color:var(--text-secondary)">${b}</li>`).join('')}</ul>`
              : e.desc
          }</div>
        </div>`).join('') + `</div>`;
    initReveal();
  }

  /* ── RENDER: Education timeline ──────────────────────────── */
  function education(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = `<div class="timeline">` +
      SiteData.education.map(e => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${e.date}</div>
          <div class="timeline-role">${e.degree}</div>
          <div class="timeline-org">${e.institution}</div>
          <div class="timeline-desc">${e.desc}</div>
        </div>`).join('') + `</div>`;
    initReveal();
  }

  /* ── RENDER: Projects ────────────────────────────────────── */
  function projects(containerId, opts = {}) {
    const el = document.getElementById(containerId); if (!el) return;
    const { limit = Infinity, featuredOnly = false, showFilter = false } = opts;

    let items = SiteData.projects;
    if (featuredOnly) items = items.filter(pr => pr.featured);
    if (limit !== Infinity) items = items.slice(0, limit);

    /* Filter buttons */
    let filterHtml = '';
    if (showFilter) {
      const cats = ['all','power','automation','research','design'];
      filterHtml = `<div class="filter-bar reveal" id="${containerId}-filters">
        ${cats.map(c=>`<button class="filter-btn${c==='all'?' active':''}" data-cat="${c}" onclick="Render.filterProjects('${containerId}','${c}',this)">${c==='all'?'All Projects':c.charAt(0).toUpperCase()+c.slice(1)}</button>`).join('')}
      </div>`;
    }

    el.innerHTML = filterHtml +
      `<div class="projects-grid" id="${containerId}-grid">` +
      items.map((pr, i) => {
        const delay = i%3===1?' reveal-d1':i%3===2?' reveal-d2':'';
        const img   = pr.image ? `<img src="${p(pr.image)}" alt="${pr.title}" onerror="this.style.display='none'">` : '';
        return `
        <div class="project-card reveal${delay}" data-cat="${pr.cat}"
             data-modal-icon="${pr.icon}" data-modal-title="${pr.title}"
             data-modal-tag="${pr.tag}"   data-modal-desc="${pr.fullDesc}"
             data-modal-tech="${pr.tech.join(',')}">
          <div class="project-thumb" style="${!pr.image?'background:linear-gradient(135deg,var(--dark-teal-3),var(--space-indigo))':''}">
            ${img}
            <div class="project-thumb-icon" ${pr.image?'style="display:none"':''}>${pr.icon}</div>
            <div class="project-thumb-overlay"></div>
            <span class="project-tag">${pr.tag}</span>
          </div>
          <div class="project-body">
            <div class="project-title">${pr.title}</div>
            <div class="project-desc">${pr.desc}</div>
            <button class="project-link" onclick="Render.openProjectModal(this.closest('.project-card'))">View Details →</button>
          </div>
        </div>`;
      }).join('') + `</div>`;
    initReveal();
  }

  /* ── RENDER: Blog ────────────────────────────────────────── */
  function blog(containerId, opts = {}) {
    const el = document.getElementById(containerId); if (!el) return;
    const { limit = Infinity, showFeatured = false, showSearch = false, showFilter = false } = opts;

    let items    = SiteData.blog;
    const feat   = items.find(b => b.featured) || items[0];
    const others = items.filter(b => !b.featured || !showFeatured);
    const shown  = limit === Infinity ? others : others.slice(0, limit);

    let html = '';

    /* Featured */
    if (showFeatured && feat) {
      html += `
      <div class="blog-featured reveal" data-article-idx="${SiteData.blog.indexOf(feat)}">
        <div class="blog-featured-thumb">
          <span style="font-size:3rem">⚡</span>
          <img src="${p('assets/images/substation/substation_1.jpg')}" alt="Featured" onerror="this.remove()">
        </div>
        <div class="blog-featured-body">
          <div class="blog-featured-label">Featured Article</div>
          <div class="blog-featured-title">${feat.title}</div>
          <div class="blog-featured-excerpt">${feat.excerpt}</div>
          <div class="blog-featured-meta"><span>${feat.date}</span><span>${feat.readTime}</span><span>${feat.tagLabel}</span></div>
          <button class="blog-read-more" style="align-self:flex-start"
                  onclick="Render.openArticleModal(${SiteData.blog.indexOf(feat)})">Read Full Article →</button>
        </div>
      </div>`;
    }

    /* Controls */
    if (showSearch || showFilter) {
      html += `<div class="blog-controls reveal">`;
      if (showSearch) html += `
        <div class="blog-search-wrap">
          <span class="blog-search-icon">🔍</span>
          <input class="blog-search" id="blog-search-input" type="search" placeholder="Search articles…"
                 oninput="Render.filterBlog('${containerId}')">
        </div>`;
      if (showFilter) {
        const tags = ['all','power-systems','smart-grid','career','technology','personal'];
        html += `<div id="blog-tag-filters" style="display:flex;flex-wrap:wrap;gap:.5rem">
          ${tags.map(t=>`<button class="filter-btn${t==='all'?' active':''}" data-tag="${t}"
                onclick="Render.setBlogTag('${containerId}','${t}',this)">
                ${t==='all'?'All':t.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
              </button>`).join('')}
        </div>`;
      }
      html += `</div>`;
    }

    /* Cards grid */
    html += `<div class="blog-grid" id="${containerId}-grid">` +
      shown.map((b, rawI) => {
        const gi = SiteData.blog.indexOf(b);
        const delay = rawI%3===1?' reveal-d1':rawI%3===2?' reveal-d2':'';
        return `
        <article class="blog-card reveal${delay}"
                 data-tag="${b.tag}" data-title="${b.id} ${b.title.toLowerCase()}"
                 data-article-idx="${gi}">
          <span class="badge">${b.tagLabel}</span>
          <div class="blog-title">${b.title}</div>
          <div class="blog-excerpt">${b.excerpt}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-top:1rem">
            <div class="blog-meta">${b.date} · ${b.readTime}</div>
            <button class="blog-read-more" onclick="Render.openArticleModal(${gi})">Read →</button>
          </div>
        </article>`;
      }).join('') + `</div>`;

    if (showSearch || showFilter) html += `<div class="blog-empty" id="${containerId}-empty" style="text-align:center;padding:4rem 2rem;color:var(--text-muted);font-family:var(--font-mono);font-size:.85rem;display:none">No articles match your search.</div>`;

    el.innerHTML = html;
    initReveal();
  }

  /* ── RENDER: Services ────────────────────────────────────── */
  function services(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = SiteData.services.map((s, i) => {
      const delay = i%3===1?' reveal-d1':i%3===2?' reveal-d2':'';
      return `
      <div class="service-card reveal${delay}">
        <div class="service-icon">${s.icon}</div>
        <div class="service-title">${s.title}</div>
        <div class="service-desc">${s.desc}</div>
        <div style="display:flex;flex-direction:column;gap:.45rem;margin-top:1rem">
          ${s.features.map(f=>`<div style="display:flex;align-items:center;gap:.55rem;font-size:.82rem;color:var(--text-secondary)"><span style="color:var(--accent-cyan);font-weight:700;font-size:.65rem;width:16px;height:16px;background:rgba(0,212,232,.1);border-radius:50%;display:flex;align-items:center;justify-content:center">✓</span>${f}</div>`).join('')}
        </div>
      </div>`;
    }).join('');
    initReveal();
  }

  /* ── RENDER: Gallery ─────────────────────────────────────── */
  function gallery(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const g  = SiteData.gallery;
    const all = [
      ...g.substation.map(i=>({...i, cat:'substation'})),
      ...g.portrait  .map(i=>({...i, cat:'portrait'})),
      ...g.lifestyle .map(i=>({...i, cat:'lifestyle'})),
      ...g.sports    .map(i=>({...i, cat:'sports'})),
    ];

    el.innerHTML = all.map(item => `
      <div class="gallery-item" data-cat="${item.cat}">
        <img src="${p(item.src)}" alt="${item.caption}" loading="lazy"
             onerror="this.parentNode.innerHTML=this.parentNode.innerHTML+'<div class=&quot;gallery-ph&quot; style=&quot;position:absolute;inset:0;opacity:1&quot;>${item.icon}</div>';this.remove()">
        <div class="gallery-overlay">
          <div>
            <div class="gallery-caption">${item.caption}</div>
            <div class="gallery-sub">${item.sub}</div>
          </div>
        </div>
      </div>`).join('');

    /* Tabs count update */
    const cats = ['substation','portrait','lifestyle','sports'];
    cats.forEach(c => {
      const el = document.getElementById('count-' + c);
      if (el) el.textContent = g[c].length;
    });
    const allEl = document.getElementById('count-all');
    if (allEl) allEl.textContent = all.length;
    const countEl = document.getElementById('gallery-count');
    if (countEl) countEl.textContent = all.length + ' photos';

    /* Rebind gallery.js lightbox */
    if (window.Gallery && Gallery.rebind) Gallery.rebind();
    initReveal();
  }

  /* ── RENDER: Certifications ──────────────────────────────── */
  function certifications(containerId, catFilter = null) {
    const el = document.getElementById(containerId); if (!el) return;
    let items = SiteData.certifications;
    if (catFilter) items = items.filter(c => c.cat === catFilter);
    el.innerHTML = items.map(c => `
      <div class="cert-item" data-cat="${c.cat}">
        ${c.image
          ? `<img class="cert-thumb" src="${p(c.image)}" alt="${c.title}"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="cert-ph" style="display:${c.image?'none':'flex'}">
          <div class="cert-ph-icon">${c.icon}</div>
          <div class="cert-ph-type">${c.type}</div>
        </div>
        <div class="cert-info">
          <div class="cert-title">${c.title}</div>
          <div class="cert-issuer">${c.issuer}</div>
        </div>
        <div class="cert-overlay">
          <button class="cert-btn cert-btn-view">🔍 View</button>
        </div>
      </div>`).join('');
    if (window.Gallery && Gallery.rebind) Gallery.rebind();
    initReveal();
  }

  /* ── RENDER: Social cards ────────────────────────────────── */
  function social(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = '';
    SiteData.social.forEach(plat => {
      const a = document.createElement('a');
      a.href = plat.url; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'social-profile-card';

      const avatarWrap = document.createElement('div');
      avatarWrap.className = 'social-profile-img';
      avatarWrap.style.cssText = `background:${(plat.gradient||plat.color)+'22'};border-color:${plat.color}55;position:relative`;

      const fallback = document.createElement('div');
      fallback.style.cssText = `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${plat.gradient||plat.color+'33'};font-size:1.2rem;font-weight:800;color:${plat.color};font-family:var(--font-display);z-index:0`;
      fallback.textContent = plat.abbr;
      avatarWrap.appendChild(fallback);

      function tryImg(srcs, idx) {
        if (idx >= srcs.length) return;
        const img = document.createElement('img');
        img.alt = plat.name;
        img.style.cssText = 'position:relative;z-index:1;border-radius:50%;width:100%;height:100%;object-fit:cover';
        img.onerror = () => tryImg(srcs, idx + 1);
        img.onload  = () => avatarWrap.appendChild(img);
        img.src = srcs[idx].startsWith('http') ? srcs[idx] : p(srcs[idx]);
      }
      tryImg(plat.imgSrcs, 0);

      a.addEventListener('mouseenter', () => { avatarWrap.style.borderColor = plat.color + 'aa'; avatarWrap.style.boxShadow = `0 0 20px ${plat.color}44`; });
      a.addEventListener('mouseleave', () => { avatarWrap.style.borderColor = ''; avatarWrap.style.boxShadow = ''; });

      a.appendChild(avatarWrap);
      a.innerHTML += `<div class="social-profile-name">${plat.name}</div>
                      <div class="social-profile-handle">${plat.handle}</div>
                      <span class="badge">${plat.badge}</span>`;
      a.prepend(avatarWrap);
      el.appendChild(a);
    });
  }

  /* ── RENDER: Contact info ────────────────────────────────── */
  function contactInfo(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d = SiteData.personal;
    el.innerHTML = `
      <div class="contact-info-item">
        <div class="contact-icon">✉</div>
        <div><div class="contact-lbl">Email</div><div class="contact-val">${d.email}</div></div>
      </div>
      <div class="contact-info-item">
        <div class="contact-icon">📍</div>
        <div><div class="contact-lbl">Location</div><div class="contact-val">${d.location}</div></div>
      </div>
      <div class="contact-info-item">
        <div class="contact-icon">💼</div>
        <div><div class="contact-lbl">Organisation</div><div class="contact-val">${d.org}</div></div>
      </div>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1rem">
        <a href="https://wa.me/${d.whatsapp}" target="_blank" class="btn-primary btn-sm">📱 WhatsApp</a>
        <a href="mailto:${d.email}" class="btn-outline btn-sm">✉ Email</a>
      </div>
      <div class="social-row" style="margin-top:2rem">
        ${SiteData.social.slice(0,3).map(s=>`<a href="${s.url}" target="_blank" class="social-card"><div class="social-avatar">${s.abbr}</div>${s.name}</a>`).join('')}
      </div>`;
  }

  /* ── RENDER: Contact form ────────────────────────────────── */
  function contactForm(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d  = SiteData.personal;
    el.innerHTML = `
      <div class="glass-card">
        <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">Send a Message</h3>
        <form class="contact-form" id="contact-form">
          <input type="hidden" name="access_key"  value="${d.web3formsKey}">
          <input type="hidden" name="subject"     value="Portfolio Contact — ${d.name}">
          <input type="hidden" name="from_name"   value="${d.name} Portfolio">
          <div class="form-row">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" name="first_name" placeholder="your first name" required></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" name="last_name" placeholder="your last name"></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" name="email" placeholder="you@example.com" required></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="form-input" name="subject_line" placeholder="write your subject here"></div>
          <div class="form-group"><label class="form-label">Message</label><textarea class="form-input" name="message" placeholder="Tell me about your thought…" required></textarea></div>
          <button type="submit" class="btn-primary">✉ Send Message</button>
        </form>
        <div class="form-success-msg" id="form-success"><div class="form-success-icon">✅</div><div class="form-success-title">Message Sent!</div><div class="form-success-sub">Thank you. I'll respond within 24 hours.</div></div>
      </div>`;
    /* Init form handler */
    if (window.Contact && Contact.initForm) Contact.initForm();
    else if (typeof initContactForm === 'function') initContactForm();
  }

  /* ── RENDER: Personality traits + sports ─────────────────── */
  function personality(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d  = SiteData.personal;
    el.innerHTML = `
    <div class="reveal">
      <div class="section-label">Character</div>
      <h2 class="section-title">More Than<br>an Engineer</h2>
      <p class="section-subtitle">Discipline forged on the pitch. Calm under pressure. A leader in every arena.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:.5rem">
        ${d.traits.map(t=>`
          <div class="glass-card" style="padding:1.4rem">
            <div style="font-size:1.7rem;margin-bottom:.65rem">${t.icon}</div>
            <div style="font-family:var(--font-display);font-weight:700;color:var(--text-primary);margin-bottom:.3rem">${t.title}</div>
            <div style="font-size:.8rem;color:var(--text-secondary);line-height:1.6">${t.desc}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="reveal reveal-d2">
      <div class="glass-card" style="padding:0;overflow:hidden">
        <div style="position:relative;aspect-ratio:4/3;background:linear-gradient(135deg,var(--dark-teal-3),var(--space-indigo),var(--midnight-violet));display:flex;align-items:center;justify-content:center;font-size:4rem">
          <img src="${p(d.sports.image)}" alt="Cricket" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.85" onerror="this.remove()">
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(4,12,18,.88));z-index:1"></div>
          <span style="position:relative;z-index:2;opacity:.2">${d.sports.icon}</span>
        </div>
        <div style="padding:1.8rem">
          <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:800;color:var(--text-primary);margin-bottom:.6rem">${d.sports.title}</div>
          <p style="font-size:.88rem;color:var(--text-secondary);line-height:1.75">${d.sports.desc}</p>
          <div style="margin-top:1.2rem;font-family:var(--font-mono);font-size:.68rem;color:var(--accent-cyan);letter-spacing:.18em">${d.sports.motto}</div>
        </div>
      </div>
    </div>`;
    initReveal();
  }

  /* ── RENDER: Resume sidebar ──────────────────────────────── */
  function resumeSidebar(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d  = SiteData.personal;
    el.innerHTML = `
      <div class="glass-card reveal" style="padding:1.8rem">
  <div style="text-align:center">
        <div class="sidebar-avatar">
          <img src="${p('assets/images/profile/profile_1.jpg')}" alt="${d.name}" onerror="this.outerHTML='<span>👤</span>'">
        </div>
        <div class="sidebar-name">${d.name}</div>
        <div class="sidebar-role">${d.role} · ${d.orgShort}</div>
        <div class="sidebar-divider"></div></div>
        <div class="sidebar-info-row"><span class="sidebar-info-icon">✉</span><div><div class="sidebar-info-label">Email</div><div class="sidebar-info-val"><a href="mailto:${d.email}">${d.email}</a></div></div></div>
        <div class="sidebar-info-row"><span class="sidebar-info-icon">📍</span><div><div class="sidebar-info-label">Location</div><div class="sidebar-info-val">${d.location}</div></div></div>
        <div class="sidebar-info-row"><span class="sidebar-info-icon">🔗</span><div><div class="sidebar-info-label">LinkedIn</div><div class="sidebar-info-val"><a href="${SiteData.social[0].url}" target="_blank">${SiteData.social[0].handle}</a></div></div></div>
        <div class="sidebar-info-row"><span class="sidebar-info-icon">🐙</span><div><div class="sidebar-info-label">GitHub</div><div class="sidebar-info-val"><a href="${SiteData.social[1].url}" target="_blank">${SiteData.social[1].handle}</a></div></div></div>
      </div>
      <div class="glass-card reveal reveal-d1" style="padding:1.8rem">
        <div class="resume-section-h" style="margin-bottom:1rem">Languages</div>
        ${d.languages.map(l=>`
          <div style="margin-bottom:.7rem">
            <div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:.35rem">
              <span style="color:var(--text-secondary)">${l.name}</span>
              <span style="color:var(--accent-cyan);font-family:var(--font-mono);font-size:.7rem">${l.level}</span>
            </div>
            <div class="skill-bar"><div class="skill-fill" style="width:${l.pct}%"></div></div>
          </div>`).join('')}
      </div>
      <div class="glass-card reveal reveal-d2" style="padding:1.8rem">
        <div class="resume-section-h" style="margin-bottom:1rem">Soft Skills</div>
        <div style="display:flex;flex-wrap:wrap">${d.softSkills.map(s=>`<span class="soft-skill-tag">${s}</span>`).join('')}</div>
      </div>`;
    initReveal();
  }

  /* ── RENDER: Activities list ─────────────────────────────── */
  function activities(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = SiteData.activities.map(a=>`
      <div class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-text">${a}</div>
      </div>`).join('');
  }

  /* ── RENDER: Software pills ──────────────────────────────── */
  function softwareSkills(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = `<div class="software-grid">` +
      SiteData.softwareSkills.map(s=>`<div class="software-pill"><span class="software-pill-icon">${s.icon}</span>${s.name}</div>`).join('') +
      `</div>`;
  }

  /* ── RENDER: CV page ─────────────────────────────────────── */
  function cv(containerId) {
    const el = document.getElementById(containerId); if (!el) return;
    const d  = SiteData.personal;
    el.innerHTML = `
    <div class="cv-sheet">
      <aside class="cv-sidebar">
        <div>
          <div class="cv-avatar"><img src="${p('assets/images/profile/profile_1.jpg')}" alt="${d.name}" onerror="this.outerHTML='<span>👤</span>'"></div>
          <div class="cv-sidebar-name">${d.name}</div>
          <div class="cv-sidebar-role">${d.role} · ${d.orgShort}</div>
        </div>
        <div class="cv-sidebar-section">
          <div class="cv-sidebar-h">Contact</div>
          <div class="cv-contact-item"><span class="cv-contact-icon">✉</span><a href="mailto:${d.email}" class="cv-contact-link">${d.email}</a></div>
          <div class="cv-contact-item"><span class="cv-contact-icon">📍</span><span>${d.location}</span></div>
          <div class="cv-contact-item"><span class="cv-contact-icon">🔗</span><a href="${SiteData.social[0].url}" class="cv-contact-link">linkedin/${SiteData.social[0].handle.replace('@','')}</a></div>
          <div class="cv-contact-item"><span class="cv-contact-icon">🐙</span><a href="${SiteData.social[1].url}" class="cv-contact-link">github/${SiteData.social[1].handle.replace('@','')}</a></div>
        </div>
        <div class="cv-sidebar-section">
          <div class="cv-sidebar-h">Core Skills</div>
          ${SiteData.skills.map(s=>`<div class="cv-skill-item"><div class="cv-skill-label">${s.name}<span class="cv-skill-pct">${s.level}%</span></div><div class="cv-skill-bar"><div class="cv-skill-fill" style="width:${s.level}%"></div></div></div>`).join('')}
        </div>
        <div class="cv-sidebar-section">
          <div class="cv-sidebar-h">Languages</div>
          ${d.languages.map(l=>`<div class="cv-lang-item"><span>${l.name}</span><span class="cv-lang-level">${l.level}</span></div>`).join('')}
        </div>
        <div class="cv-sidebar-section">
          <div class="cv-sidebar-h">Interests</div>
          <div class="cv-interest-chips">${d.interests.map(i=>`<span class="cv-chip">${i}</span>`).join('')}</div>
        </div>
      </aside>
      <main class="cv-main">
        <div class="cv-section">
          <div class="cv-h2">Career Summary</div>
          <p class="cv-summary">${d.summary}</p>
        </div>
        <div class="cv-section">
          <div class="cv-h2">Experience</div>
          ${SiteData.experience.map(e=>`
            <div class="cv-entry">
              <div class="cv-entry-header"><div class="cv-entry-title">${e.role}</div><div class="cv-entry-date">${e.date}</div></div>
              <div class="cv-entry-org">${e.org} · ${e.detail}</div>
              <ul class="cv-entry-bullets">${(e.bullets||[]).map(b=>`<li>${b}</li>`).join('')}</ul>
            </div>`).join('')}
        </div>
        <div class="cv-section">
          <div class="cv-h2">Education</div>
          ${SiteData.education.map(e=>`
            <div class="cv-entry">
              <div class="cv-entry-header"><div class="cv-entry-title">${e.degree}</div><div class="cv-entry-date">${e.date}</div></div>
              <div class="cv-entry-org">${e.institution}</div>
              <div class="cv-entry-desc">${e.desc}</div>
            </div>`).join('')}
        </div>
        <div class="cv-section">
          <div class="cv-h2">Software & Tools</div>
          <div style="display:flex;flex-wrap:wrap;gap:.4rem">${SiteData.softwareSkills.map(s=>`<span style="font-size:.78rem;padding:.28rem .7rem;background:rgba(0,100,102,.15);border:1px solid rgba(0,180,200,.2);border-radius:6px;color:#7aaabb">${s.icon} ${s.name}</span>`).join('')}</div>
        </div>
        <div class="cv-section">
          <div class="cv-h2">Activities & Leadership</div>
          <div class="cv-entry"><div class="cv-entry-desc">${SiteData.activities.map(a=>`• ${a}`).join('<br>')}</div></div>
        </div>
      </main>
    </div>`;
  }

  /* ── Project Modal ────────────────────────────────────────── */
  function openProjectModal(card) {
    buildModal('proj-modal');
    document.getElementById('proj-modal-body').innerHTML = `
      <div style="margin-bottom:.9rem"><span class="badge">${card.dataset.modalTag}</span></div>
      <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;color:var(--text-primary);margin-bottom:.9rem">${card.dataset.modalTitle}</div>
      <div style="font-size:.92rem;color:var(--text-secondary);line-height:1.8;margin-bottom:1.5rem">${card.dataset.modalDesc}</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent-cyan);margin-bottom:.7rem">Technologies Used</div>
      <div class="chips-row">${card.dataset.modalTech.split(',').map(t=>`<span class="chip">${t.trim()}</span>`).join('')}</div>`;
    openModal('proj-modal');
  }

  /* ── Article Modal ────────────────────────────────────────── */
  function openArticleModal(idx) {
    const b = SiteData.blog[idx];
    if (!b) return;
    buildModal('art-modal');
    document.getElementById('art-modal-body').innerHTML = `
      <div style="margin-bottom:.9rem"><span class="badge">${b.tagLabel}</span></div>
      <h2 style="font-family:var(--font-display);font-size:clamp(1.2rem,3vw,1.65rem);font-weight:800;color:var(--text-primary);line-height:1.3;margin-bottom:.8rem">${b.title}</h2>
      <div style="font-family:var(--font-mono);font-size:.72rem;color:var(--text-muted);margin-bottom:2rem;display:flex;gap:1.2rem;flex-wrap:wrap"><span>📅 ${b.date}</span><span>⏱ ${b.readTime}</span></div>
      <div style="display:flex;flex-direction:column;gap:1.3rem">${b.body.map(para=>`<p style="font-size:.95rem;color:var(--text-secondary);line-height:1.9">${para}</p>`).join('')}</div>
      <div style="margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid var(--glass-border);display:flex;gap:1rem;flex-wrap:wrap">
        <a href="${p('pages/blog.html')}" class="btn-primary btn-sm">📖 All Articles</a>
        <button onclick="Render.closeModal('art-modal')" class="btn-outline btn-sm">Close</button>
      </div>`;
    openModal('art-modal');
  }

  /* ── Filter helpers ───────────────────────────────────────── */
  function filterProjects(containerId, cat, btn) {
    document.querySelectorAll(`#${containerId}-filters .filter-btn`).forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll(`#${containerId}-grid .project-card`).forEach(c => {
      c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
  }

  let _blogTag = 'all';
  function setBlogTag(containerId, tag, btn) {
    _blogTag = tag;
    document.querySelectorAll('#blog-tag-filters .filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    filterBlog(containerId);
  }
  function filterBlog(containerId) {
    const q = (document.getElementById('blog-search-input')?.value || '').toLowerCase();
    const cards = document.querySelectorAll(`#${containerId}-grid .blog-card`);
    let visible = 0;
    cards.forEach(c => {
      const matchTag = _blogTag === 'all' || c.dataset.tag === _blogTag;
      const matchQ   = !q || c.dataset.title.includes(q) || c.querySelector('.blog-title')?.textContent.toLowerCase().includes(q);
      c.style.display = (matchTag && matchQ) ? '' : 'none';
      if (matchTag && matchQ) visible++;
    });
    const empty = document.getElementById(`${containerId}-empty`);
    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) { m.style.opacity = '0'; m.style.visibility = 'hidden'; document.body.style.overflow = ''; }
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal('proj-modal'); closeModal('art-modal'); } });

  /* ── AUTO-INIT: detect containers and render ─────────────── */
  function init() {
    if (document.getElementById('about-container'))        about('about-container');
    if (document.getElementById('skills-grid'))            skills('skills-grid');
    if (document.getElementById('experience-timeline'))    experience('experience-timeline');
    if (document.getElementById('experience-timeline-bullets')) experience('experience-timeline-bullets', true);
    if (document.getElementById('education-timeline'))     education('education-timeline');
    if (document.getElementById('projects-teaser-grid'))   projects('projects-teaser-grid', { limit:3, featuredOnly:true });
    if (document.getElementById('projects-full-grid'))     projects('projects-full-grid',   { showFilter:true });
    if (document.getElementById('blog-teaser-section'))    blog('blog-teaser-section', { limit:3 });
    if (document.getElementById('blog-full-section'))      blog('blog-full-section',   { showFeatured:true, showSearch:true, showFilter:true });
    if (document.getElementById('services-grid'))          services('services-grid');
    if (document.getElementById('gallery-grid-container')) {
      gallery('gallery-grid-container');
      // Set initial total count
      const g = SiteData.gallery;
      const total = Object.values(g).reduce((n,arr)=>n+arr.length, 0);
      const countEl = document.getElementById('gallery-count');
      if (countEl) countEl.textContent = total + ' photos';
    }
    if (document.getElementById('certs-grid'))             certifications('certs-grid');
    if (document.getElementById('social-grid'))            social('social-grid');
    if (document.getElementById('contact-info'))           contactInfo('contact-info');
    if (document.getElementById('contact-form-wrap'))      contactForm('contact-form-wrap');
    if (document.getElementById('personality-container'))  personality('personality-container');
    if (document.getElementById('resume-sidebar'))         resumeSidebar('resume-sidebar');
    if (document.getElementById('activities-list'))        activities('activities-list');
    if (document.getElementById('software-skills-wrap'))   softwareSkills('software-skills-wrap');
    if (document.getElementById('cv-container'))           cv('cv-container');
  }

  document.addEventListener('DOMContentLoaded', init);

  /* ── Public API ───────────────────────────────────────────── */
  return { openProjectModal, openArticleModal, closeModal, filterProjects, setBlogTag, filterBlog, certifications, gallery, social, init };
})();
