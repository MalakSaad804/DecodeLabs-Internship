/* ============================================================
   wishlist.js — Wishlist Management
   ============================================================ */

const WISHLIST = {
  KEY: 'smaa_wishlist',

  getItems() {
    const w = localStorage.getItem(this.KEY);
    return w ? JSON.parse(w) : [];
  },

  _save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  isWished(productId) {
    return this.getItems().includes(parseInt(productId));
  },

  toggle(productId) {
    productId = parseInt(productId);
    const items = this.getItems();
    const idx = items.indexOf(productId);
    if (idx === -1) {
      items.push(productId);
      this._save(items);
      UI.toast('Added to wishlist!', 'success', '❤️');
      return true;
    } else {
      items.splice(idx, 1);
      this._save(items);
      UI.toast('Removed from wishlist', 'info', '🤍');
      return false;
    }
  },

  remove(productId) {
    const items = this.getItems().filter(id => id !== parseInt(productId));
    this._save(items);
  },

  getCount() { return this.getItems().length; },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Update all wishlist buttons on page
  updateButtons() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = parseInt(btn.dataset.productId);
      if (this.isWished(id)) {
        btn.classList.add('wished');
        btn.title = 'Remove from Wishlist';
      } else {
        btn.classList.remove('wished');
        btn.title = 'Add to Wishlist';
      }
    });
  },

  getProducts() {
    return this.getItems().map(id => STORE.getProduct(id)).filter(Boolean);
  }
};

window.WISHLIST = WISHLIST;
