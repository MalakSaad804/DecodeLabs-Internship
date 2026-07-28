/* ============================================================
   auth.js — Login / Register / Session Management
   ============================================================ */

const AUTH = {
  // Get current user
  getUser() {
    const u = localStorage.getItem('smaa_user');
    return u ? JSON.parse(u) : null;
  },

  // Check logged in
  isLoggedIn() { return !!this.getUser(); },

  // Register
  register(name, email, phone, password) {
    const users = this.getAllUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    const user = {
      id: Date.now(), name, email, phone, password,
      createdAt: new Date().toISOString(), orders: [], addresses: []
    };
    users.push(user);
    localStorage.setItem('smaa_users', JSON.stringify(users));
    const { password: _, ...safeUser } = user;
    localStorage.setItem('smaa_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },

  // Login
  login(email, password) {
    if (email === 'admin@shahmobile.pk' && password === 'admin123') {
      const adminUser = { id: 0, name: 'Admin', email, role: 'admin' };
      localStorage.setItem('smaa_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser, redirect: 'admin/index.html' };
    }
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password.' };
    const { password: _, ...safeUser } = user;
    localStorage.setItem('smaa_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },

  // Logout
  logout() {
    localStorage.removeItem('smaa_user');
    window.location.href = 'index.html';
  },

  // Update profile
  updateProfile(updates) {
    const user = this.getUser();
    if (!user) return;
    const updated = { ...user, ...updates };
    localStorage.setItem('smaa_user', JSON.stringify(updated));
    // Update in users array
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('smaa_users', JSON.stringify(users));
    }
    return updated;
  },

  // Add address
  addAddress(address) {
    const user = this.getUser();
    if (!user) return;
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      if (!users[idx].addresses) users[idx].addresses = [];
      address.id = Date.now();
      users[idx].addresses.push(address);
      localStorage.setItem('smaa_users', JSON.stringify(users));
      user.addresses = users[idx].addresses;
      localStorage.setItem('smaa_user', JSON.stringify(user));
    }
  },

  getAllUsers() {
    const u = localStorage.getItem('smaa_users');
    return u ? JSON.parse(u) : [];
  },

  // Require login - redirect if not
  requireLogin(redirect = window.location.href) {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(redirect);
      return false;
    }
    return true;
  },

  // Update navbar based on auth state
  updateNavAuth() {
    const user = this.getUser();
    const accountBtn = document.getElementById('accountBtn');
    if (!accountBtn) return;
    if (user) {
      accountBtn.title = user.name;
      accountBtn.href = 'account.html';
    } else {
      accountBtn.href = 'login.html';
    }
  }
};

window.AUTH = AUTH;
