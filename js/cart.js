/* ============================================================
   cart.js — Shopping Cart Management
   ============================================================ */

const CART = {
  KEY: 'smaa_cart',

  // Get cart items
  getItems() {
    const c = localStorage.getItem(this.KEY);
    return c ? JSON.parse(c) : [];
  },

  // Save cart
  _save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
    this.dispatchEvent();
  },

  // Add item
  add(productId, qty = 1, variant = '') {
    const items = this.getItems();
    const key = `${productId}_${variant}`;
    const existing = items.find(i => i.key === key);
    const product = STORE.getProduct(productId);
    if (!product) return;

    if (existing) {
      existing.qty = Math.min(existing.qty + qty, product.stock);
    } else {
      items.push({
        key, productId, qty, variant,
        name: product.name,
        brand: product.brand,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0] || '',
        slug: product.slug
      });
    }
    this._save(items);
    UI.toast('Added to cart!', 'success', '🛒');
    this.animateBadge();
  },

  // Remove item
  remove(key) {
    const items = this.getItems().filter(i => i.key !== key);
    this._save(items);
    UI.toast('Removed from cart', 'info', '🗑️');
  },

  // Update quantity
  updateQty(key, qty) {
    const items = this.getItems();
    const item = items.find(i => i.key === key);
    if (item) {
      if (qty <= 0) { this.remove(key); return; }
      item.qty = qty;
      this._save(items);
    }
  },

  // Clear cart
  clear() {
    localStorage.removeItem(this.KEY);
    this.updateBadge();
  },

  // Get total count
  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  // Get subtotal
  getSubtotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  // Get total with shipping & discount
  getTotal(discount = 0, shipping = 0) {
    return Math.max(0, this.getSubtotal() - discount + shipping);
  },

  // Get shipping cost
  getShipping() {
    const sub = this.getSubtotal();
    if (sub === 0) return 0;
    if (sub >= 10000) return 0; // Free above Rs.10k
    return 200;
  },

  // Update cart badge
  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Animate badge
  animateBadge() {
    document.querySelectorAll('[data-cart-icon]').forEach(el => {
      el.classList.add('cart-animate');
      setTimeout(() => el.classList.remove('cart-animate'), 500);
    });
  },

  // Dispatch cart change event
  dispatchEvent() {
    window.dispatchEvent(new CustomEvent('cartChanged', { detail: { count: this.getCount() } }));
  },

  // Render cart items in a container
  renderItems(container, onUpdate) {
    const items = this.getItems();
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart" style="text-align:center;padding:80px 24px;">
          <div style="font-size:4rem;margin-bottom:16px;">🛒</div>
          <h3 style="margin-bottom:8px;">Your cart is empty</h3>
          <p style="color:var(--text-3);margin-bottom:24px;">Add some products to get started!</p>
          <a href="products.html" class="btn btn-primary">Start Shopping</a>
        </div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <tr data-key="${item.key}">
        <td>
          <div class="cart-product">
            <div class="cart-product-img">
              <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/placeholder.png'">
            </div>
            <div>
              <a href="product-detail.html?slug=${item.slug}" class="cart-product-name">${item.name}</a>
              ${item.variant ? `<div class="cart-product-variant">${item.variant}</div>` : ''}
              <div class="cart-product-variant">${item.brand}</div>
            </div>
          </div>
        </td>
        <td>${STORE.formatPrice(item.price)}</td>
        <td>
          <div class="quantity-selector">
            <button class="qty-btn" onclick="CART.updateQty('${item.key}', ${item.qty - 1}); if(typeof renderCart==='function') renderCart();">−</button>
            <input class="qty-input" type="number" value="${item.qty}" min="1"
              onchange="CART.updateQty('${item.key}', parseInt(this.value)||1); if(typeof renderCart==='function') renderCart();">
            <button class="qty-btn" onclick="CART.updateQty('${item.key}', ${item.qty + 1}); if(typeof renderCart==='function') renderCart();">+</button>
          </div>
        </td>
        <td><strong style="color:var(--primary)">${STORE.formatPrice(item.price * item.qty)}</strong></td>
        <td>
          <button class="remove-item" onclick="CART.remove('${item.key}'); if(typeof renderCart==='function') renderCart();" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  },

  // Render summary
  renderSummary(container, discount = 0) {
    if (!container) return;
    const sub = this.getSubtotal();
    const ship = this.getShipping();
    const total = this.getTotal(discount, ship);
    container.innerHTML = `
      <div class="summary-row"><span>Subtotal (${this.getCount()} items)</span><span>${STORE.formatPrice(sub)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${ship === 0 ? '<span class="text-success">Free</span>' : STORE.formatPrice(ship)}</span></div>
      ${discount > 0 ? `<div class="summary-row text-success"><span>Discount</span><span>−${STORE.formatPrice(discount)}</span></div>` : ''}
      <div class="summary-row total"><span>Total</span><span class="amount">${STORE.formatPrice(total)}</span></div>
    `;
    return { sub, ship, total, discount };
  }
};

window.CART = CART;
