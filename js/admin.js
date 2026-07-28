/* ============================================================
   admin.js — Admin Panel Logic, Charts, CRUD
   ============================================================ */

const ADMIN = {
  // ── AUTH ───────────────────────────────────────────────
  requireAdmin() {
    const user = AUTH.getUser();
    if (!user || user.role !== 'admin') {
      window.location.href = '../login.html';
      return false;
    }
    return true;
  },

  // ── PRODUCTS CRUD ──────────────────────────────────────
  getProducts() {
    const p = localStorage.getItem('smaa_admin_products');
    return p ? JSON.parse(p) : STORE.products;
  },

  saveProducts(products) {
    localStorage.setItem('smaa_admin_products', JSON.stringify(products));
  },

  addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now();
    product.slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    product.images = product.images || ['assets/images/placeholder.png'];
    product.reviews = 0;
    product.rating = 0;
    products.unshift(product);
    this.saveProducts(products);
    return product;
  },

  updateProduct(id, updates) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === parseInt(id));
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...updates };
      this.saveProducts(products);
      return products[idx];
    }
    return null;
  },

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== parseInt(id));
    this.saveProducts(products);
  },

  // ── ANALYTICS ──────────────────────────────────────────
  getStats() {
    const orders = CHECKOUT.getAllOrders();
    const users  = AUTH.getAllUsers();
    const products = this.getProducts();

    const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
    const todayOrders = orders.filter(o => {
      const d = new Date(o.createdAt);
      const t = new Date();
      return d.toDateString() === t.toDateString();
    }).length;

    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10);
    const outOfStock = products.filter(p => p.stock === 0);

    return { orders: orders.length, revenue, users: users.length, products: products.length, todayOrders, lowStock, outOfStock };
  },

  getRevenueData() {
    const orders = CHECKOUT.getAllOrders();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data = Array(12).fill(0);
    orders.forEach(o => {
      const m = new Date(o.createdAt).getMonth();
      if (o.status !== 'cancelled') data[m] += o.total;
    });
    // Add mock historical data for demo
    const mockData = [125000, 198000, 167000, 234000, 189000, 312000, 278000, 356000, 289000, 423000, 398000, 512000];
    return { labels: months, data: data.map((v, i) => v || mockData[i]) };
  },

  getCategoryData() {
    const products = this.getProducts();
    const counts = {};
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  },

  getTopProducts() {
    return this.getProducts().filter(p => p.isBestSeller).slice(0, 5).map(p => ({
      name: p.name, revenue: p.price * Math.floor(Math.random() * 50 + 10), sold: Math.floor(Math.random() * 50 + 10)
    }));
  },

  // ── CHARTS ─────────────────────────────────────────────
  initRevenueChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    const { labels, data } = this.getRevenueData();
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (Rs.)',
          data,
          borderColor: '#1A73E8',
          backgroundColor: 'rgba(26,115,232,.1)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1A73E8',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => 'Rs.' + (v/1000).toFixed(0) + 'k' } },
          x: { grid: { display: false } }
        }
      }
    });
  },

  initCategoryChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    const { labels, data } = this.getCategoryData();
    const colors = ['#1A73E8','#00C6FF','#00C853','#FFB300','#E53935','#9C27B0','#FF5722','#607D8B','#00BCD4','#8BC34A','#FF9800','#3F51B5'];
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
        datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: 'var(--surface)' }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } } },
        cutout: '65%'
      }
    });
  },

  initOrdersChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const mockData = [12, 19, 14, 27, 22, 35, 31, 42, 38, 51, 47, 60];
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Orders',
          data: mockData,
          backgroundColor: 'rgba(26,115,232,.7)',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' } }, x: { grid: { display: false } } }
      }
    });
  },

  // ── PRODUCT TABLE ──────────────────────────────────────
  renderProductTable(tbodyId, searchQuery = '') {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    let products = this.getProducts();
    if (searchQuery) products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    tbody.innerHTML = products.slice(0, 50).map(p => `
      <tr>
        <td><img src="${p.images[0]}" alt="${p.name}" class="product-thumb" onerror="this.src='../assets/images/placeholder.png'"></td>
        <td><div style="font-weight:600;color:var(--text)">${p.name}</div><div style="font-size:.78rem;color:var(--text-3)">${p.brand}</div></td>
        <td><span class="badge badge-gray">${p.category}</span></td>
        <td style="font-weight:700;color:var(--primary)">Rs. ${p.price.toLocaleString()}</td>
        <td>
          <span style="font-weight:600;color:${p.stock === 0 ? 'var(--danger)' : p.stock <= 10 ? 'var(--warning)' : 'var(--success)'}">
            ${p.stock === 0 ? 'Out of Stock' : p.stock <= 10 ? `Low (${p.stock})` : p.stock}
          </span>
        </td>
        <td>
          <span class="badge ${p.isNew ? 'badge-new' : ''} ${p.isBestSeller ? 'badge-gold' : ''} ${p.isFeatured ? 'badge-primary' : ''}">
            ${p.isNew ? 'New' : p.isBestSeller ? 'Best Seller' : p.isFeatured ? 'Featured' : 'Normal'}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button class="action-btn edit" onclick="ADMIN.openEditModal(${p.id})" title="Edit">✏️</button>
            <button class="action-btn delete" onclick="ADMIN.confirmDelete(${p.id},'${p.name.replace(/'/g,"\\'")}','product')" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-3)">No products found</td></tr>';
  },

  // ── ORDER TABLE ────────────────────────────────────────
  renderOrderTable(tbodyId, searchQuery = '') {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    let orders = CHECKOUT.getAllOrders();
    if (searchQuery) orders = orders.filter(o => o.id.includes(searchQuery.toUpperCase()) || o.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

    tbody.innerHTML = orders.slice(0, 50).map(o => `
      <tr>
        <td><strong style="color:var(--primary)">${o.id}</strong></td>
        <td>${o.customer?.name || 'Guest'}</td>
        <td>${o.items.length} item(s)</td>
        <td style="font-weight:700">Rs. ${o.total.toLocaleString()}</td>
        <td>${o.payment === 'cod' ? 'Cash on Delivery' : o.payment}</td>
        <td><span class="order-status status-${o.status}">${o.status.toUpperCase()}</span></td>
        <td>${new Date(o.createdAt).toLocaleDateString('en-PK')}</td>
        <td>
          <div class="action-btns">
            <select onchange="ADMIN.changeOrderStatus('${o.id}', this.value)" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:.75rem;background:var(--surface);color:var(--text)">
              ${['pending','confirmed','shipped','delivered','cancelled'].map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
            </select>
            <button class="action-btn view" onclick="CHECKOUT.generateInvoice(CHECKOUT.getOrder('${o.id}'))" title="Invoice">🧾</button>
          </div>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-3)">No orders yet</td></tr>';
  },

  changeOrderStatus(orderId, status) {
    CHECKOUT.updateStatus(orderId, status, `Status updated to ${status}`);
    UI.toast(`Order ${orderId} marked as ${status}`, 'success');
    this.renderOrderTable('ordersTableBody');
  },

  // ── CUSTOMERS TABLE ────────────────────────────────────
  renderCustomerTable(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const users = AUTH.getAllUsers();
    tbody.innerHTML = users.map(u => `
      <tr>
        <td><div class="admin-user-avatar" style="width:32px;height:32px;font-size:.75rem;display:inline-flex">${u.name.charAt(0)}</div></td>
        <td><div style="font-weight:600">${u.name}</div></td>
        <td>${u.email}</td>
        <td>${u.phone || '—'}</td>
        <td>${new Date(u.createdAt).toLocaleDateString('en-PK')}</td>
        <td><span class="badge badge-success">Active</span></td>
        <td><button class="action-btn delete" onclick="ADMIN.confirmDelete(${u.id},'${u.name.replace(/'/g,"\\'")}','customer')">🗑️</button></td>
      </tr>
    `).join('') || '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-3)">No customers yet</td></tr>';
  },

  // ── DELETE CONFIRM ─────────────────────────────────────
  confirmDelete(id, name, type) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      if (type === 'product') {
        this.deleteProduct(id);
        this.renderProductTable('productTableBody');
        UI.toast(`Product "${name}" deleted`, 'success');
      } else if (type === 'customer') {
        const users = AUTH.getAllUsers().filter(u => u.id !== id);
        localStorage.setItem('smaa_users', JSON.stringify(users));
        this.renderCustomerTable('customerTableBody');
        UI.toast(`Customer "${name}" removed`, 'success');
      }
    }
  },

  openEditModal(productId) {
    const product = this.getProducts().find(p => p.id === parseInt(productId));
    if (!product) return;
    // Populate modal fields
    const modal = document.getElementById('productModal');
    if (!modal) return;
    modal.querySelector('#pName').value = product.name || '';
    modal.querySelector('#pBrand').value = product.brand || '';
    modal.querySelector('#pCategory').value = product.category || '';
    modal.querySelector('#pPrice').value = product.price || '';
    modal.querySelector('#pOldPrice').value = product.oldPrice || '';
    modal.querySelector('#pStock').value = product.stock || '';
    modal.querySelector('#pDescription').value = product.description || '';
    modal.querySelector('#pIsNew').checked = product.isNew || false;
    modal.querySelector('#pIsFeatured').checked = product.isFeatured || false;
    modal.querySelector('#pIsBestSeller').checked = product.isBestSeller || false;
    modal.querySelector('#pForm').dataset.editId = productId;
    modal.querySelector('.modal-header h3').textContent = 'Edit Product';
    UI.openModal('productModal');
  },

  // ── COUPONS ────────────────────────────────────────────
  getCoupons() {
    const c = localStorage.getItem('smaa_coupons');
    return c ? JSON.parse(c) : STORE.coupons;
  },

  saveCoupons(coupons) {
    localStorage.setItem('smaa_coupons', JSON.stringify(coupons));
  },

  addCoupon(coupon) {
    const coupons = this.getCoupons();
    coupons.push(coupon);
    this.saveCoupons(coupons);
  },

  deleteCoupon(code) {
    const coupons = this.getCoupons().filter(c => c.code !== code);
    this.saveCoupons(coupons);
  },

  renderCouponTable(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const coupons = this.getCoupons();
    tbody.innerHTML = coupons.map(c => `
      <tr>
        <td><code style="background:var(--surface-2);padding:3px 8px;border-radius:4px;font-weight:700;color:var(--primary)">${c.code}</code></td>
        <td>${c.discount}${c.type === 'percent' ? '%' : ' Rs.'}</td>
        <td>${c.type === 'percent' ? 'Percentage' : 'Flat Amount'}</td>
        <td>Rs. ${c.minOrder.toLocaleString()}</td>
        <td>${c.description}</td>
        <td><button class="action-btn delete" onclick="ADMIN.deleteCoupon('${c.code}'); ADMIN.renderCouponTable('couponTableBody'); UI.toast('Coupon deleted','success')">🗑️</button></td>
      </tr>
    `).join('');
  }
};

window.ADMIN = ADMIN;
