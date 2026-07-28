/* ============================================================
   ui.js — UI Utilities: Dark Mode, Language, Toast, Modals,
           WhatsApp Widget, Reveal Animations, Search Overlay
   ============================================================ */

const UI = {
  // ── DARK MODE ──────────────────────────────────────────
  initTheme() {
    const saved = localStorage.getItem('smaa_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeIcon(saved);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('smaa_theme', next);
    this.updateThemeIcon(next);
  },

  updateThemeIcon(theme) {
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  },

  // ── LANGUAGE ───────────────────────────────────────────
  TRANSLATIONS: {
    en: {
      'home': 'Home', 'shop': 'Shop', 'cart': 'Cart', 'wishlist': 'Wishlist',
      'about': 'About', 'contact': 'Contact', 'blog': 'Blog', 'account': 'Account',
      'add_to_cart': 'Add to Cart', 'buy_now': 'Buy Now',
      'search_placeholder': 'Search mobiles, accessories...',
      'featured': 'Featured Products', 'bestsellers': 'Best Sellers', 'new_arrivals': 'New Arrivals',
    },
    ur: {
      'home': 'ہوم', 'shop': 'شاپ', 'cart': 'کارٹ', 'wishlist': 'وش لسٹ',
      'about': 'ہمارے بارے میں', 'contact': 'رابطہ', 'blog': 'بلاگ', 'account': 'اکاؤنٹ',
      'add_to_cart': 'کارٹ میں شامل کریں', 'buy_now': 'ابھی خریدیں',
      'search_placeholder': 'موبائل اور اکسیسریز تلاش کریں...',
      'featured': 'نمایاں مصنوعات', 'bestsellers': 'بہترین فروخت', 'new_arrivals': 'نئی آمد',
    }
  },

  initLanguage() {
    const lang = localStorage.getItem('smaa_lang') || 'en';
    this.applyLanguage(lang);
  },

  toggleLanguage() {
    const current = localStorage.getItem('smaa_lang') || 'en';
    const next = current === 'en' ? 'ur' : 'en';
    localStorage.setItem('smaa_lang', next);
    this.applyLanguage(next);
  },

  applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.toggle('urdu', lang === 'ur');
    document.body.style.direction = lang === 'ur' ? 'rtl' : 'ltr';
    const t = this.TRANSLATIONS[lang] || this.TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key]) el.placeholder = t[key];
    });
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'en' ? 'اردو' : 'English';
    });
  },

  // ── TOAST NOTIFICATIONS ────────────────────────────────
  toast(message, type = 'info', icon = null) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toastEl = document.createElement('div');
    toastEl.className = `toast ${type}`;
    toastEl.innerHTML = `
      <span class="toast-icon">${icon || icons[type]}</span>
      <span class="toast-text">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toastEl);
    setTimeout(() => { toastEl.classList.add('removing'); setTimeout(() => toastEl.remove(), 300); }, 3500);
  },

  // ── MODALS ─────────────────────────────────────────────
  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  },

  initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) this.closeAllModals();
      });
    });
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => this.openModal(btn.dataset.modalOpen));
    });
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => this.closeModal(btn.dataset.modalClose || btn.closest('.modal-overlay').id));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeAllModals();
    });
  },

  // ── NAVBAR ─────────────────────────────────────────────
  initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
      const btt = document.querySelector('.back-to-top');
      if (btt) btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Mobile sub-menus
    document.querySelectorAll('.mobile-nav-link[data-toggle]').forEach(link => {
      link.addEventListener('click', () => {
        const target = document.getElementById(link.dataset.toggle);
        if (target) target.classList.toggle('open');
      });
    });

    // Active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  },

  // ── SEARCH OVERLAY ─────────────────────────────────────
  initSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input   = document.getElementById('searchInput');
    if (!overlay || !input) return;

    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.classList.add('open');
        setTimeout(() => input.focus(), 100);
      });
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') overlay.classList.remove('open');
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.add('open'); setTimeout(() => input.focus(), 100); }
    });

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const q = input.value.trim();
        const results = document.getElementById('searchResults');
        if (!results) return;
        if (q.length < 2) { results.style.display = 'none'; return; }
        const found = STORE.search(q).slice(0, 6);
        if (found.length === 0) {
          results.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-3)">No products found</div>';
        } else {
          results.innerHTML = found.map(p => `
            <a href="product-detail.html?slug=${p.slug}" class="search-result-item">
              <img src="${p.images[0]}" alt="${p.name}" onerror="this.src='assets/images/placeholder.png'">
              <div>
                <div style="font-weight:600;font-size:.875rem;color:var(--text)">${p.name}</div>
                <div style="font-size:.8rem;color:var(--text-3)">${p.brand} · ${STORE.formatPrice(p.price)}</div>
              </div>
              ${p.badge ? `<span class="badge badge-sale" style="margin-left:auto">${p.badge}</span>` : ''}
            </a>
          `).join('') + `<a href="products.html?q=${encodeURIComponent(q)}" style="display:block;text-align:center;padding:12px;font-size:.85rem;color:var(--primary);border-top:1px solid var(--border)">See all results →</a>`;
        }
        results.style.display = 'block';
      }, 300);
    });

    // Search form submit
    const form = document.getElementById('searchForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const q = input.value.trim();
        if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
      });
    }
  },

  // ── REVEAL ON SCROLL ───────────────────────────────────
  initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  },

  // ── TABS ───────────────────────────────────────────────
  initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-tabs]') || btn.closest('.tabs')?.parentElement;
        if (!group) return;
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = group.querySelector(`#${btn.dataset.tab}`);
        if (panel) panel.classList.add('active');
      });
    });
  },

  // ── ACCORDION ──────────────────────────────────────────
  initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        item.classList.toggle('open');
      });
    });
  },

  // ── COUNTER ANIMATION ──────────────────────────────────
  animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const update = () => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || '');
      if (start < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  initCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.count);
          this.animateCounter(e.target, target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  },

  // ── WHATSAPP WIDGET ────────────────────────────────────
  initWhatsApp() {
    const widget = document.querySelector('.whatsapp-widget');
    if (!widget) return;
    const btn = widget.querySelector('.whatsapp-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.open('https://wa.me/923197906166?text=Hello%20Shah%20Mobile%20%26%20Accessories%2C%20I%20need%20help.', '_blank');
      });
    }
  },

  // ── HERO SLIDER ────────────────────────────────────────
  initHeroSlider() {
    const slider = document.querySelector('.hero-slides');
    const dots   = document.querySelectorAll('.hero-dot');
    if (!slider) return;
    const slides = slider.children.length;
    let current = 0, autoplay;

    const go = (n) => {
      current = (n + slides) % slides;
      slider.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const startAuto = () => { autoplay = setInterval(() => go(current + 1), 5000); };
    const stopAuto  = () => clearInterval(autoplay);

    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); stopAuto(); startAuto(); }));

    document.querySelector('.hero-prev')?.addEventListener('click', () => { go(current - 1); stopAuto(); startAuto(); });
    document.querySelector('.hero-next')?.addEventListener('click', () => { go(current + 1); stopAuto(); startAuto(); });

    go(0); startAuto();
  },

  // ── COUNTDOWN TIMER ────────────────────────────────────
  initCountdown() {
    const end = new Date();
    end.setDate(end.getDate() + 2);
    end.setHours(23, 59, 59, 0);

    const update = () => {
      const diff = end - new Date();
      if (diff <= 0) return;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2, '0');
      document.querySelectorAll('[data-countdown-h]').forEach(el => el.textContent = pad(h));
      document.querySelectorAll('[data-countdown-m]').forEach(el => el.textContent = pad(m));
      document.querySelectorAll('[data-countdown-s]').forEach(el => el.textContent = pad(s));
    };
    update();
    setInterval(update, 1000);
  },

  // ── FILTER SIDEBAR (MOBILE) ────────────────────────────
  initFilterSidebar() {
    const toggleBtn = document.querySelector('[data-filter-toggle]');
    const sidebar   = document.querySelector('.filter-sidebar');
    if (!toggleBtn || !sidebar) return;
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
    });
    sidebar.querySelectorAll('.btn').forEach(btn => {
      if (btn.textContent.trim() === 'Apply Filters') {
        btn.addEventListener('click', () => {
          sidebar.classList.remove('mobile-open');
          document.body.style.overflow = '';
        });
      }
    });
  },

  // ── GALLERY (Product Detail) ───────────────────────────
  initGallery() {
    const mainImg = document.getElementById('galleryMain');
    const thumbs  = document.querySelectorAll('.gallery-thumb');
    if (!mainImg || !thumbs.length) return;
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        const src = thumb.querySelector('img')?.src;
        if (src) mainImg.src = src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      if (i === 0) thumb.classList.add('active');
    });
  },

  // ── NEWSLETTER FORM ────────────────────────────────────
  initNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type=email]')?.value;
        if (!email) return;
        // Save subscription
        const subs = JSON.parse(localStorage.getItem('smaa_subscribers') || '[]');
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem('smaa_subscribers', JSON.stringify(subs));
        }
        this.toast('🎉 Subscribed! Check your email for exclusive deals.', 'success');
        form.reset();
      });
    });
  },

  // ── PRODUCT CARD HELPERS ───────────────────────────────
  renderProductCard(product) {
    const disc = STORE.getDiscount(product.price, product.oldPrice);
    const isWished = typeof WISHLIST !== 'undefined' && WISHLIST.isWished(product.id);
    return `
      <div class="product-card reveal">
        <div class="product-card-img">
          <a href="product-detail.html?slug=${product.slug}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy"
              onerror="this.src='assets/images/placeholder.png'">
          </a>
          <div class="product-badges">
            ${product.badge === 'HOT'  ? '<span class="badge badge-hot">🔥 HOT</span>'    : ''}
            ${product.badge === 'NEW'  ? '<span class="badge badge-new">✨ NEW</span>'    : ''}
            ${product.badge === 'SALE' ? `<span class="badge badge-sale">-${disc}%</span>` : ''}
          </div>
          <div class="product-card-actions">
            <button class="product-card-action-btn ${isWished ? 'wished' : ''}"
              data-wishlist-btn data-product-id="${product.id}"
              onclick="WISHLIST.toggle(${product.id}); this.classList.toggle('wished'); WISHLIST.updateBadge();"
              title="Add to Wishlist">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <a href="product-detail.html?slug=${product.slug}" class="product-card-action-btn" title="Quick View">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </a>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-brand">${product.brand}</div>
          <a href="product-detail.html?slug=${product.slug}" class="product-name">${product.name}</a>
          <div class="product-rating">
            <span class="stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price">
            <span class="price-current">${STORE.formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old">${STORE.formatPrice(product.oldPrice)}</span>` : ''}
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn btn-primary btn-add-cart btn-sm"
            onclick="CART.add(${product.id})" id="addCart_${product.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    `;
  },

  // ── INIT ALL ───────────────────────────────────────────
  init() {
    this.initTheme();
    this.initLanguage();
    this.initNavbar();
    this.initSearch();
    this.initModals();
    this.initReveal();
    this.initTabs();
    this.initAccordion();
    this.initCounters();
    this.initWhatsApp();
    this.initHeroSlider();
    this.initCountdown();
    this.initFilterSidebar();
    this.initGallery();
    this.initNewsletter();

    // Theme toggle button
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
    });

    // Language toggle button
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggleLanguage());
    });

    // Back to top
    document.querySelector('.back-to-top')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Update cart & wishlist badges
    if (typeof CART !== 'undefined') CART.updateBadge();
    if (typeof WISHLIST !== 'undefined') WISHLIST.updateBadge();
    if (typeof AUTH !== 'undefined') AUTH.updateNavAuth();
  }
};

window.UI = UI;
document.addEventListener('DOMContentLoaded', () => UI.init());
