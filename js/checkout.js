/* ============================================================
   checkout.js — Order Placement, Invoice, Order Tracking
   ============================================================ */

const CHECKOUT = {
  // Place order
  placeOrder(formData) {
    const items = CART.getItems();
    if (items.length === 0) {
      UI.toast('Your cart is empty!', 'error');
      return null;
    }

    const discount = parseInt(localStorage.getItem('smaa_coupon_discount') || '0');
    const couponCode = localStorage.getItem('smaa_coupon_code') || '';
    const shipping = CART.getShipping();
    const subtotal = CART.getSubtotal();
    const total = CART.getTotal(discount, shipping);

    const order = {
      id: 'SMB' + Date.now(),
      items: items,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes || ''
      },
      payment: formData.payment || 'cod',
      subtotal, discount, shipping, total,
      couponCode,
      status: 'pending',
      statusHistory: [{ status: 'pending', time: new Date().toISOString(), note: 'Order placed successfully' }],
      createdAt: new Date().toISOString()
    };

    // Save to orders
    const orders = JSON.parse(localStorage.getItem('smaa_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('smaa_orders', JSON.stringify(orders));

    // Link to user account
    const user = AUTH.getUser();
    if (user) {
      const userOrders = JSON.parse(localStorage.getItem(`smaa_user_orders_${user.id}`) || '[]');
      userOrders.unshift(order.id);
      localStorage.setItem(`smaa_user_orders_${user.id}`, JSON.stringify(userOrders));
    }

    // Clear cart & coupon
    CART.clear();
    localStorage.removeItem('smaa_coupon_discount');
    localStorage.removeItem('smaa_coupon_code');

    return order;
  },

  // Get order by ID
  getOrder(id) {
    const orders = JSON.parse(localStorage.getItem('smaa_orders') || '[]');
    return orders.find(o => o.id === id);
  },

  // Get all orders
  getAllOrders() {
    return JSON.parse(localStorage.getItem('smaa_orders') || '[]');
  },

  // Get user orders
  getUserOrders(userId) {
    const ids = JSON.parse(localStorage.getItem(`smaa_user_orders_${userId}`) || '[]');
    const all = this.getAllOrders();
    return all.filter(o => ids.includes(o.id));
  },

  // Update order status
  updateStatus(orderId, status, note = '') {
    const orders = JSON.parse(localStorage.getItem('smaa_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;
    order.status = status;
    order.statusHistory.push({ status, time: new Date().toISOString(), note });
    localStorage.setItem('smaa_orders', JSON.stringify(orders));
    return true;
  },

  // Generate printable invoice
  generateInvoice(order) {
    const itemsHTML = order.items.map(i => `
      <tr>
        <td>${i.name}</td>
        <td style="text-align:center">${i.qty}</td>
        <td style="text-align:right">Rs. ${i.price.toLocaleString()}</td>
        <td style="text-align:right">Rs. ${(i.price * i.qty).toLocaleString()}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice ${order.id}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; max-width: 700px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #1A73E8; }
          .logo { font-size: 1.4rem; font-weight: 800; color: #1A73E8; }
          .logo span { color: #0D47A1; }
          .invoice-meta { text-align: right; }
          .invoice-meta h2 { font-size: 1.8rem; color: #1A73E8; margin-bottom: 8px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
          .info-box h4 { font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; color: #999; margin-bottom: 8px; }
          .info-box p { font-size: .9rem; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          thead th { background: #1A73E8; color: #fff; padding: 10px 12px; text-align: left; font-size: .85rem; }
          tbody td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: .875rem; }
          .totals { text-align: right; }
          .totals table { width: auto; margin-left: auto; }
          .totals td { padding: 6px 12px; font-size: .9rem; }
          .totals .grand-total td { font-size: 1.1rem; font-weight: 700; color: #1A73E8; border-top: 2px solid #1A73E8; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: .8rem; }
          .status-badge { display: inline-block; padding: 4px 12px; background: #e8f5e9; color: #2e7d32; border-radius: 20px; font-size: .8rem; font-weight: 700; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Shah Mobile <span>&</span> Accessories</div>
            <p style="color:#666;font-size:.85rem;margin-top:6px">Genuine Products · Best Prices · Excellent Service</p>
            <p style="color:#666;font-size:.8rem">📞 0319-7906166 | 📧 info@shahmobile.pk</p>
          </div>
          <div class="invoice-meta">
            <h2>INVOICE</h2>
            <p><strong>#${order.id}</strong></p>
            <p style="color:#666;font-size:.85rem">${new Date(order.createdAt).toLocaleDateString('en-PK', { year:'numeric', month:'long', day:'numeric' })}</p>
            <div class="status-badge" style="margin-top:8px">${order.status.toUpperCase()}</div>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <h4>Bill To</h4>
            <p><strong>${order.customer.name}</strong><br>
            ${order.customer.address}<br>
            ${order.customer.city}<br>
            📞 ${order.customer.phone}<br>
            ✉️ ${order.customer.email}</p>
          </div>
          <div class="info-box">
            <h4>Payment Method</h4>
            <p><strong>${order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'easypaisa' ? 'EasyPaisa' : 'Online Payment'}</strong></p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align:center">Qty</th>
              <th style="text-align:right">Unit Price</th>
              <th style="text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <div class="totals">
          <table>
            <tr><td>Subtotal:</td><td>Rs. ${order.subtotal.toLocaleString()}</td></tr>
            <tr><td>Shipping:</td><td>${order.shipping === 0 ? 'FREE' : 'Rs. ' + order.shipping.toLocaleString()}</td></tr>
            ${order.discount > 0 ? `<tr><td>Discount (${order.couponCode}):</td><td>-Rs. ${order.discount.toLocaleString()}</td></tr>` : ''}
            <tr class="grand-total"><td>Grand Total:</td><td>Rs. ${order.total.toLocaleString()}</td></tr>
          </table>
        </div>

        <div class="footer">
          <p>Thank you for shopping with Shah Mobile & Accessories!</p>
          <p>For queries: WhatsApp 0319-7906166 | 0311-9393436</p>
          <p style="margin-top:8px">This is a computer-generated invoice.</p>
        </div>

        <script>window.print();<\/script>
      </body>
      </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
  },

  // Track order by ID
  trackOrder(orderId) {
    const order = this.getOrder(orderId.toUpperCase());
    if (!order) return null;

    const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIdx = STATUSES.indexOf(order.status);

    return {
      order,
      steps: STATUSES.map((s, i) => ({
        status: s,
        label: s.charAt(0).toUpperCase() + s.slice(1),
        done: i < currentIdx,
        active: i === currentIdx,
        icon: ['📋', '✅', '🚚', '📦'][i],
        time: order.statusHistory.find(h => h.status === s)?.time || null
      }))
    };
  }
};

window.CHECKOUT = CHECKOUT;
