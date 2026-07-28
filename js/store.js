/* ============================================================
   store.js — Product Catalog & Global Data Store
   ============================================================ */

const STORE = {
  // ── CATEGORIES ──────────────────────────────────────────
  categories: [
    { id: 'smartphones',   name: 'Smartphones',        icon: '📱', count: 18 },
    { id: 'iphones',       name: 'iPhones',             icon: '🍎', count: 6  },
    { id: 'android',       name: 'Android Phones',      icon: '🤖', count: 12 },
    { id: 'tablets',       name: 'Tablets',             icon: '📟', count: 5  },
    { id: 'smartwatches',  name: 'Smartwatches',        icon: '⌚', count: 6  },
    { id: 'earbuds',       name: 'Earbuds & Headphones',icon: '🎧', count: 8  },
    { id: 'chargers',      name: 'Chargers & Cables',   icon: '🔌', count: 10 },
    { id: 'cases',         name: 'Phone Cases',         icon: '🛡️', count: 15 },
    { id: 'powerbanks',    name: 'Power Banks',         icon: '🔋', count: 6  },
    { id: 'memory',        name: 'Memory Cards',        icon: '💾', count: 5  },
    { id: 'speakers',      name: 'Mobile Speakers',     icon: '🔊', count: 5  },
    { id: 'gaming',        name: 'Gaming Accessories',  icon: '🎮', count: 7  },
  ],

  // ── BRANDS ──────────────────────────────────────────────
  brands: ['Apple','Samsung','Xiaomi','Oppo','Vivo','Infinix','Tecno','Realme','Huawei','OnePlus'],

  // ── PRODUCTS ────────────────────────────────────────────
  products: [
    // ── iPhones ──
    {
      id: 1, slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max',
      brand: 'Apple', category: 'iphones',
      price: 350000, oldPrice: 370000,
      rating: 4.9, reviews: 312,
      stock: 8, isNew: true, isFeatured: true, isBestSeller: true,
      badge: 'HOT',
      images: ['assets/images/products/iphone15.png'],
      description: 'The most powerful iPhone ever with a titanium design, A17 Pro chip, and a 48MP main camera system. Features Action button and USB-C connectivity.',
      specs: {
        'Display': '6.7" Super Retina XDR OLED',
        'Processor': 'Apple A17 Pro',
        'RAM': '8 GB',
        'Storage': '256 GB / 512 GB / 1 TB',
        'Rear Camera': '48MP + 12MP + 12MP',
        'Front Camera': '12 MP TrueDepth',
        'Battery': '4422 mAh',
        'OS': 'iOS 17',
        'Colors': 'Black Titanium, Natural Titanium, Blue Titanium, White Titanium',
        'Connectivity': 'USB-C, 5G, Wi-Fi 6E'
      }
    },
    {
      id: 2, slug: 'iphone-15', name: 'iPhone 15',
      brand: 'Apple', category: 'iphones',
      price: 249999, oldPrice: 279999,
      rating: 4.8, reviews: 198,
      stock: 15, isNew: true, isFeatured: true,
      badge: 'NEW',
      images: ['assets/images/products/iphone15std.png'],
      description: 'iPhone 15 with Dynamic Island, 48MP camera, and USB-C. A powerful upgrade for everyone.',
      specs: {
        'Display': '6.1" Super Retina XDR OLED',
        'Processor': 'Apple A16 Bionic',
        'RAM': '6 GB',
        'Storage': '128 GB / 256 GB / 512 GB',
        'Rear Camera': '48MP + 12MP',
        'Battery': '3877 mAh',
        'OS': 'iOS 17',
        'Connectivity': 'USB-C, 5G'
      }
    },
    {
      id: 3, slug: 'iphone-14-pro', name: 'iPhone 14 Pro',
      brand: 'Apple', category: 'iphones',
      price: 189999, oldPrice: 229999,
      rating: 4.7, reviews: 445,
      stock: 20, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/iphone14pro.png'],
      description: 'iPhone 14 Pro with Dynamic Island, Always-On display, and 48MP main camera.',
      specs: {
        'Display': '6.1" Super Retina XDR ProMotion OLED',
        'Processor': 'Apple A16 Bionic',
        'Storage': '128 GB / 256 GB / 512 GB / 1 TB',
        'Rear Camera': '48MP + 12MP + 12MP',
        'Battery': '3200 mAh',
        'OS': 'iOS 17'
      }
    },
    // ── Samsung ──
    {
      id: 4, slug: 'samsung-s24-ultra', name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung', category: 'android',
      price: 359999, oldPrice: 399999,
      rating: 4.9, reviews: 267,
      stock: 5, isNew: true, isFeatured: true, isBestSeller: true,
      badge: 'HOT',
      images: ['assets/images/products/s24ultra.png'],
      description: 'The ultimate Galaxy with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
      specs: {
        'Display': '6.8" QHD+ Dynamic AMOLED 2X, 120Hz',
        'Processor': 'Snapdragon 8 Gen 3',
        'RAM': '12 GB',
        'Storage': '256 GB / 512 GB / 1 TB',
        'Rear Camera': '200MP + 12MP + 10MP + 50MP',
        'Battery': '5000 mAh',
        'OS': 'Android 14 / One UI 6.1',
        'Special': 'Built-in S Pen'
      }
    },
    {
      id: 5, slug: 'samsung-a55', name: 'Samsung Galaxy A55',
      brand: 'Samsung', category: 'android',
      price: 89999, oldPrice: 99999,
      rating: 4.5, reviews: 134,
      stock: 25, isNew: true, isFeatured: true,
      badge: 'NEW',
      images: ['assets/images/products/a55.png'],
      description: 'Galaxy A55 with 50MP OIS camera, Exynos 1480, and 5000mAh battery.',
      specs: {
        'Display': '6.6" Super AMOLED, 120Hz',
        'Processor': 'Exynos 1480',
        'RAM': '8 GB',
        'Storage': '128 GB / 256 GB',
        'Rear Camera': '50MP + 12MP + 5MP',
        'Battery': '5000 mAh',
        'OS': 'Android 14'
      }
    },
    {
      id: 6, slug: 'samsung-s23-fe', name: 'Samsung Galaxy S23 FE',
      brand: 'Samsung', category: 'android',
      price: 109999, oldPrice: 129999,
      rating: 4.4, reviews: 89,
      stock: 18, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/s23fe.png'],
      description: 'Galaxy S23 Fan Edition — flagship experience at a fan-friendly price.',
      specs: {
        'Display': '6.4" Dynamic AMOLED 2X, 120Hz',
        'Processor': 'Snapdragon 8 Gen 1',
        'RAM': '8 GB', 'Storage': '128 GB / 256 GB',
        'Rear Camera': '50MP + 12MP + 8MP', 'Battery': '4500 mAh'
      }
    },
    // ── Xiaomi ──
    {
      id: 7, slug: 'xiaomi-14', name: 'Xiaomi 14',
      brand: 'Xiaomi', category: 'android',
      price: 149999, oldPrice: 169999,
      rating: 4.6, reviews: 78,
      stock: 12, isNew: true, isFeatured: true,
      badge: 'NEW',
      images: ['assets/images/products/xiaomi14.png'],
      description: 'Xiaomi 14 with Snapdragon 8 Gen 3, Leica optics, and ultra-premium build quality.',
      specs: {
        'Display': '6.36" AMOLED, 144Hz', 'Processor': 'Snapdragon 8 Gen 3',
        'RAM': '12 GB', 'Storage': '256 GB / 512 GB',
        'Rear Camera': '50MP + 50MP + 50MP (Leica)', 'Battery': '4610 mAh'
      }
    },
    {
      id: 8, slug: 'xiaomi-redmi-note-13-pro', name: 'Xiaomi Redmi Note 13 Pro',
      brand: 'Xiaomi', category: 'android',
      price: 64999, oldPrice: 74999,
      rating: 4.5, reviews: 221,
      stock: 30, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/redminote13.png'],
      description: '200MP camera powerhouse with 67W turbo charging and 120Hz AMOLED display.',
      specs: {
        'Display': '6.67" AMOLED, 120Hz', 'Processor': 'Mediatek Dimensity 7200 Ultra',
        'RAM': '8 GB / 12 GB', 'Rear Camera': '200MP + 8MP + 2MP', 'Battery': '5100 mAh'
      }
    },
    // ── Other Brands ──
    {
      id: 9, slug: 'oppo-reno11-pro', name: 'Oppo Reno 11 Pro',
      brand: 'Oppo', category: 'android',
      price: 99999, oldPrice: 114999,
      rating: 4.3, reviews: 56,
      stock: 14, isNew: true,
      images: ['assets/images/products/opporeno11.png'],
      description: 'Oppo Reno 11 Pro with curved AMOLED display, 50MP triple camera, and 80W SUPERVOOC charging.',
      specs: {
        'Display': '6.74" AMOLED Curved, 120Hz', 'Processor': 'Mediatek Dimensity 8200',
        'RAM': '12 GB', 'Storage': '256 GB', 'Battery': '4600 mAh'
      }
    },
    {
      id: 10, slug: 'realme-gt6', name: 'Realme GT 6',
      brand: 'Realme', category: 'android',
      price: 79999, oldPrice: 89999,
      rating: 4.4, reviews: 43,
      stock: 20, isNew: true,
      badge: 'NEW',
      images: ['assets/images/products/realme_gt6.png'],
      description: 'Realme GT 6 with Snapdragon 8s Gen 3 and 120W charging.',
      specs: {
        'Display': '6.78" AMOLED, 144Hz', 'Processor': 'Snapdragon 8s Gen 3',
        'RAM': '12 GB', 'Storage': '256 GB', 'Battery': '5500 mAh'
      }
    },
    {
      id: 11, slug: 'infinix-note-40-pro', name: 'Infinix Note 40 Pro',
      brand: 'Infinix', category: 'android',
      price: 44999, oldPrice: 52999,
      rating: 4.2, reviews: 67,
      stock: 35, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/infinixnote40.png'],
      description: 'Infinix Note 40 Pro with 100W charging, 50MP camera and curved AMOLED.',
      specs: {
        'Display': '6.78" AMOLED Curved, 120Hz', 'Processor': 'Helio G99 Ultimate',
        'RAM': '12 GB', 'Storage': '256 GB', 'Battery': '4600 mAh + MagCharge'
      }
    },
    {
      id: 12, slug: 'tecno-camon-30', name: 'Tecno Camon 30 Premier',
      brand: 'Tecno', category: 'android',
      price: 59999, oldPrice: 69999,
      rating: 4.2, reviews: 34,
      stock: 22, isNew: true,
      images: ['assets/images/products/tecno_camon30.png'],
      description: 'Tecno Camon 30 Premier with 50MP Dual Gimbal camera and 5000mAh battery.',
      specs: {
        'Display': '6.77" AMOLED, 144Hz', 'Processor': 'Mediatek Dimensity 8200',
        'RAM': '12 GB', 'Storage': '512 GB', 'Battery': '5000 mAh'
      }
    },
    // ── Tablets ──
    {
      id: 13, slug: 'samsung-galaxy-tab-s9', name: 'Samsung Galaxy Tab S9',
      brand: 'Samsung', category: 'tablets',
      price: 149999, oldPrice: 169999,
      rating: 4.7, reviews: 89,
      stock: 10, isFeatured: true,
      badge: 'SALE',
      images: ['assets/images/products/tab_s9.png'],
      description: 'Galaxy Tab S9 with Dynamic AMOLED display, S Pen included, and IP68 rating.',
      specs: {
        'Display': '11" Dynamic AMOLED, 120Hz', 'Processor': 'Snapdragon 8 Gen 2',
        'RAM': '8 GB', 'Storage': '128 GB / 256 GB', 'Battery': '8400 mAh', 'OS': 'Android 13 / One UI 5.1'
      }
    },
    {
      id: 14, slug: 'xiaomi-pad-6', name: 'Xiaomi Pad 6',
      brand: 'Xiaomi', category: 'tablets',
      price: 74999, oldPrice: 84999,
      rating: 4.5, reviews: 65,
      stock: 15, isBestSeller: true,
      images: ['assets/images/products/xiaomipad6.png'],
      description: 'Xiaomi Pad 6 with 144Hz LCD display, Snapdragon 870, and 8840mAh battery.',
      specs: {
        'Display': '11" IPS LCD, 144Hz', 'Processor': 'Snapdragon 870',
        'RAM': '8 GB', 'Storage': '128 GB / 256 GB', 'Battery': '8840 mAh'
      }
    },
    // ── Smartwatches ──
    {
      id: 15, slug: 'samsung-galaxy-watch6', name: 'Samsung Galaxy Watch 6 Classic',
      brand: 'Samsung', category: 'smartwatches',
      price: 69999, oldPrice: 84999,
      rating: 4.6, reviews: 112,
      stock: 18, isFeatured: true,
      badge: 'SALE',
      images: ['assets/images/products/watch6.png'],
      description: 'Galaxy Watch 6 Classic with rotating bezel, advanced health tracking and Wear OS.',
      specs: {
        'Display': '1.5" Super AMOLED', 'Processor': 'Exynos W930',
        'RAM': '2 GB', 'Storage': '16 GB', 'Battery': '425 mAh',
        'OS': 'Wear OS 4', 'Water Resistance': '5ATM + IP68'
      }
    },
    {
      id: 16, slug: 'xiaomi-watch-s3', name: 'Xiaomi Watch S3',
      brand: 'Xiaomi', category: 'smartwatches',
      price: 29999, oldPrice: 34999,
      rating: 4.4, reviews: 56,
      stock: 25, isNew: true,
      badge: 'NEW',
      images: ['assets/images/products/xiaomiwatch.png'],
      description: 'Xiaomi Watch S3 with AMOLED display, GPS, and 15-day battery life.',
      specs: {
        'Display': '1.43" AMOLED', 'Battery Life': '15 days',
        'GPS': 'Yes', 'Water Resistance': '5ATM'
      }
    },
    // ── Earbuds ──
    {
      id: 17, slug: 'samsung-galaxy-buds3-pro', name: 'Samsung Galaxy Buds3 Pro',
      brand: 'Samsung', category: 'earbuds',
      price: 49999, oldPrice: 59999,
      rating: 4.7, reviews: 145,
      stock: 30, isFeatured: true, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/buds3pro.png'],
      description: 'Galaxy Buds3 Pro with Active Noise Cancellation, Adaptive EQ, and 360 Audio.',
      specs: {
        'Driver': '10.5mm Woofer + 5.5mm Tweeter', 'ANC': 'Yes',
        'Battery': '6hrs (30hrs with case)', 'Bluetooth': '5.4',
        'Water Resistance': 'IPX7'
      }
    },
    {
      id: 18, slug: 'xiaomi-buds-5-pro', name: 'Xiaomi Buds 5 Pro',
      brand: 'Xiaomi', category: 'earbuds',
      price: 24999, oldPrice: 29999,
      rating: 4.5, reviews: 78,
      stock: 40, isNew: true,
      badge: 'NEW',
      images: ['assets/images/products/xiaomibuds5.png'],
      description: 'Xiaomi Buds 5 Pro with 52dB ANC, LDAC Hi-Res audio, and 38hr battery.',
      specs: {
        'ANC': '52dB', 'Battery': '8hrs (38hrs total)',
        'Bluetooth': '5.4', 'Hi-Res Audio': 'LDAC'
      }
    },
    {
      id: 19, slug: 'jbl-tune-770nc', name: 'JBL Tune 770NC Headphones',
      brand: 'JBL', category: 'earbuds',
      price: 18999, oldPrice: 23999,
      rating: 4.4, reviews: 93,
      stock: 22, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/jbl770nc.png'],
      description: 'JBL Tune 770NC over-ear headphones with Adaptive Noise Cancelling and 70hr battery.',
      specs: {
        'Type': 'Over-ear', 'ANC': 'Adaptive',
        'Battery': '70hrs', 'Bluetooth': '5.3', 'Foldable': 'Yes'
      }
    },
    // ── Chargers & Cables ──
    {
      id: 20, slug: 'samsung-65w-charger', name: 'Samsung 65W Super Fast Charger',
      brand: 'Samsung', category: 'chargers',
      price: 3999, oldPrice: 5499,
      rating: 4.6, reviews: 234,
      stock: 60, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/samsung65w.png'],
      description: 'Official Samsung 65W PD charger with USB-C to USB-C cable. Compatible with all USB-C devices.',
      specs: {
        'Wattage': '65W', 'Type': 'USB-C PD', 'Cable': 'USB-C to USB-C (1.8m)', 'Compatible': 'Samsung, Universal USB-C'
      }
    },
    {
      id: 21, slug: 'anker-30w-nano', name: 'Anker 30W Nano Charger',
      brand: 'Anker', category: 'chargers',
      price: 2499, oldPrice: 3299,
      rating: 4.7, reviews: 167,
      stock: 80, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/anker30w.png'],
      description: 'Ultra-compact Anker 30W Nano charger with GaN technology. Smaller than ever.',
      specs: {
        'Wattage': '30W', 'Technology': 'GaN III',
        'Size': 'Ultra Compact', 'Compatible': 'Universal'
      }
    },
    {
      id: 22, slug: 'usb-c-cable-braided', name: 'Braided USB-C Cable 1.8m',
      brand: 'Generic', category: 'chargers',
      price: 599, oldPrice: 999,
      rating: 4.3, reviews: 412,
      stock: 200, isBestSeller: true,
      images: ['assets/images/products/usbc_cable.png'],
      description: 'Heavy-duty nylon braided USB-C cable. Supports 100W PD charging and 480Mbps data transfer.',
      specs: {
        'Length': '1.8m', 'Max Power': '100W', 'Data': '480 Mbps', 'Material': 'Nylon Braided'
      }
    },
    // ── Phone Cases ──
    {
      id: 23, slug: 'iphone15-leather-case', name: 'iPhone 15 Pro Premium Leather Case',
      brand: 'Generic', category: 'cases',
      price: 2999, oldPrice: 4499,
      rating: 4.5, reviews: 78,
      stock: 50, isFeatured: true,
      badge: 'SALE',
      images: ['assets/images/products/leather_case.png'],
      description: 'Genuine leather case for iPhone 15 Pro with card slots and MagSafe compatibility.',
      specs: {
        'Material': 'Genuine Leather', 'Compatible': 'iPhone 15 Pro',
        'MagSafe': 'Yes', 'Card Slots': '2'
      }
    },
    {
      id: 24, slug: 'samsung-s24-silicone-case', name: 'Samsung S24 Ultra Clear Case',
      brand: 'Samsung', category: 'cases',
      price: 1499, oldPrice: 1999,
      rating: 4.4, reviews: 156,
      stock: 80, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/clear_case.png'],
      description: 'Official Samsung clear protective case for Galaxy S24 Ultra with stylus holder.',
      specs: {
        'Material': 'Transparent PC + TPU', 'Compatible': 'Samsung Galaxy S24 Ultra',
        'S Pen Slot': 'Yes', 'Protection': 'Military Grade'
      }
    },
    // ── Power Banks ──
    {
      id: 25, slug: 'baseus-power-bank-20000', name: 'Baseus 20000mAh 65W Power Bank',
      brand: 'Baseus', category: 'powerbanks',
      price: 7999, oldPrice: 9999,
      rating: 4.7, reviews: 203,
      stock: 45, isFeatured: true, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/baseus_pb.png'],
      description: 'Baseus 20000mAh power bank with 65W PD output, can charge laptop and phone simultaneously.',
      specs: {
        'Capacity': '20000 mAh', 'Max Output': '65W PD', 'Ports': '2x USB-A + 1x USB-C',
        'Display': 'LED Indicator', 'Weight': '420g'
      }
    },
    {
      id: 26, slug: 'xiaomi-power-bank-3-10000', name: 'Xiaomi Power Bank 3 10000mAh',
      brand: 'Xiaomi', category: 'powerbanks',
      price: 3499, oldPrice: 4499,
      rating: 4.5, reviews: 334,
      stock: 60, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/xiaomi_pb.png'],
      description: 'Xiaomi 10000mAh slim power bank with 22.5W fast charge and dual output.',
      specs: {
        'Capacity': '10000 mAh', 'Max Output': '22.5W',
        'Ports': '2x USB-A + 1x USB-C', 'Weight': '250g'
      }
    },
    // ── Memory Cards ──
    {
      id: 27, slug: 'sandisk-128gb-microsd', name: 'SanDisk 128GB Extreme MicroSD',
      brand: 'SanDisk', category: 'memory',
      price: 3499, oldPrice: 4499,
      rating: 4.8, reviews: 456,
      stock: 100, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/sandisk128.png'],
      description: 'SanDisk 128GB Extreme microSD card with 160MB/s read and 90MB/s write speed.',
      specs: {
        'Capacity': '128 GB', 'Read Speed': '160 MB/s', 'Write Speed': '90 MB/s',
        'Class': 'V30, U3, Class 10', 'Water Resistant': 'Yes'
      }
    },
    // ── Speakers ──
    {
      id: 28, slug: 'jbl-flip-6', name: 'JBL Flip 6 Bluetooth Speaker',
      brand: 'JBL', category: 'speakers',
      price: 14999, oldPrice: 18999,
      rating: 4.7, reviews: 289,
      stock: 28, isFeatured: true, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/jbl_flip6.png'],
      description: 'JBL Flip 6 with powerful sound, PartyBoost for multi-speaker pairing, and IP67 waterproof.',
      specs: {
        'Output': '30W RMS', 'Battery': '12hrs',
        'Water Resistance': 'IP67', 'Bluetooth': '5.1',
        'PartyBoost': 'Yes'
      }
    },
    // ── Gaming ──
    {
      id: 29, slug: 'razer-kishi-v2', name: 'Razer Kishi V2 Mobile Controller',
      brand: 'Razer', category: 'gaming',
      price: 12999, oldPrice: 16999,
      rating: 4.5, reviews: 67,
      stock: 20, isNew: true,
      badge: 'NEW',
      images: ['assets/images/products/razer_kishi.png'],
      description: 'Razer Kishi V2 mobile gaming controller with clickable triggers and pass-through charging.',
      specs: {
        'Compatible': 'Android & iPhone', 'Triggers': 'Clickable Analog',
        'Pass-through Charging': 'Yes', 'Latency': 'Ultra-low'
      }
    },
    {
      id: 30, slug: 'screen-protector-iphone15', name: 'iPhone 15 Pro Tempered Glass Screen Protector',
      brand: 'Generic', category: 'cases',
      price: 799, oldPrice: 1299,
      rating: 4.4, reviews: 567,
      stock: 200, isBestSeller: true,
      badge: 'SALE',
      images: ['assets/images/products/screen_protector.png'],
      description: '9H hardness tempered glass screen protector for iPhone 15 Pro with easy installation kit.',
      specs: {
        'Hardness': '9H', 'Thickness': '0.33mm',
        'Compatible': 'iPhone 15 Pro', 'Pack': '2-Pack + Installation Kit'
      }
    }
  ],

  // ── BLOG POSTS ──────────────────────────────────────────
  blogPosts: [
    {
      id: 1, slug: 'best-smartphones-2024',
      title: 'Top 10 Best Smartphones of 2024 — Ranked',
      category: 'Reviews', author: 'Shah Tech Team',
      date: '2024-06-10', readTime: '8 min read',
      excerpt: 'We tested every flagship smartphone of 2024. Here are our top picks for every budget and use case.',
      image: 'assets/images/blog/smartphones2024.png'
    },
    {
      id: 2, slug: 'iphone-vs-android-2024',
      title: 'iPhone 15 Pro vs Samsung S24 Ultra — Which Should You Buy?',
      category: 'Comparison', author: 'Taimoor Shah',
      date: '2024-05-25', readTime: '10 min read',
      excerpt: 'The ultimate battle of 2024 flagships. We compare cameras, performance, battery, and value.',
      image: 'assets/images/blog/iphone_vs_samsung.png'
    },
    {
      id: 3, slug: 'best-power-banks-pakistan',
      title: 'Best Power Banks Available in Pakistan 2024',
      category: 'Buying Guide', author: 'Shah Tech Team',
      date: '2024-05-10', readTime: '6 min read',
      excerpt: 'Power outages in Pakistan make power banks essential. Here are the best options at every price point.',
      image: 'assets/images/blog/powerbanks.png'
    },
    {
      id: 4, slug: 'mobile-photography-tips',
      title: '10 Mobile Photography Tips to Take Pro-Level Photos',
      category: 'Tips & Tricks', author: 'Hamza Zaman',
      date: '2024-04-20', readTime: '7 min read',
      excerpt: 'You don\'t need a DSLR to take stunning photos. These tips will transform your mobile photography.',
      image: 'assets/images/blog/photography.png'
    },
    {
      id: 5, slug: 'gaming-phones-2024',
      title: 'Best Gaming Phones of 2024 for Pakistani Gamers',
      category: 'Gaming', author: 'Taimoor Shah',
      date: '2024-04-05', readTime: '9 min read',
      excerpt: 'PUBG Mobile and Call of Duty players — these gaming phones will give you the competitive edge.',
      image: 'assets/images/blog/gaming_phones.png'
    },
    {
      id: 6, slug: 'protect-your-phone-tips',
      title: 'How to Protect Your Smartphone — Cases, Screen Guards & More',
      category: 'Tips & Tricks', author: 'Shah Tech Team',
      date: '2024-03-18', readTime: '5 min read',
      excerpt: 'Your phone is a major investment. Here\'s how to properly protect it from drops, scratches, and water.',
      image: 'assets/images/blog/phone_protection.png'
    },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────
  testimonials: [
    { name: 'Ahmed Raza', city: 'Lahore', rating: 5, text: 'Bought iPhone 15 Pro from Shah Mobile. Got it at the best price in the market and delivery was super fast. Highly recommend!', initials: 'AR' },
    { name: 'Fatima Malik', city: 'Karachi', rating: 5, text: 'Amazing customer service! Hamza helped me choose the perfect phone within my budget. The packaging was excellent too.', initials: 'FM' },
    { name: 'Usman Ali', city: 'Islamabad', rating: 5, text: 'Genuine products, great warranty. I\'ve been buying from Shah Mobile for 2 years and never had any issue.', initials: 'UA' },
    { name: 'Sara Khan', city: 'Rawalpindi', rating: 4, text: 'Very professional shop. They gave me honest advice and didn\'t try to upsell me. Got Samsung A55 and loving it.', initials: 'SK' },
    { name: 'Bilal Ahmed', city: 'Faisalabad', rating: 5, text: 'Best prices in the whole city. The Samsung S24 Ultra I ordered arrived sealed and genuine. 10/10 experience.', initials: 'BA' },
    { name: 'Hina Qureshi', city: 'Multan', rating: 5, text: 'Ordered JBL speaker online and it came with full warranty card. Sound quality is amazing. Will shop again.', initials: 'HQ' },
  ],

  // ── COUPONS ─────────────────────────────────────────────
  coupons: [
    { code: 'SHAH10', discount: 10, type: 'percent', minOrder: 5000, description: '10% off on all orders' },
    { code: 'WELCOME500', discount: 500, type: 'flat', minOrder: 3000, description: 'Rs.500 off on first order' },
    { code: 'IPHONE15', discount: 5000, type: 'flat', minOrder: 200000, description: 'Rs.5000 off on iPhone 15' },
    { code: 'SAMSUNG20', discount: 15, type: 'percent', minOrder: 50000, description: '15% off Samsung products' },
  ],

  // ── HELPERS ─────────────────────────────────────────────
  getProduct(id) { return this.products.find(p => p.id === parseInt(id)); },
  getProductBySlug(slug) { return this.products.find(p => p.slug === slug); },
  getByCategory(cat) { return this.products.filter(p => p.category === cat || (cat === 'smartphones' && (p.category === 'iphones' || p.category === 'android'))); },
  getFeatured() { return this.products.filter(p => p.isFeatured); },
  getBestSellers() { return this.products.filter(p => p.isBestSeller); },
  getNewArrivals() { return this.products.filter(p => p.isNew); },
  getRelated(product) { return this.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4); },
  formatPrice(price) { return 'Rs. ' + price.toLocaleString('en-PK'); },
  getDiscount(price, old) { return old ? Math.round((1 - price/old)*100) : 0; },
  applyCoupon(code, subtotal) {
    const c = this.coupons.find(c => c.code === code.toUpperCase());
    if (!c) return { valid: false, message: 'Invalid coupon code.' };
    if (subtotal < c.minOrder) return { valid: false, message: `Minimum order Rs.${c.minOrder.toLocaleString()} required.` };
    const disc = c.type === 'percent' ? Math.round(subtotal * c.discount / 100) : c.discount;
    return { valid: true, discount: disc, message: c.description };
  },
  search(query) {
    const q = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
};

const PLACEHOLDER_IMAGE = 'assets/images/placeholder.png';

STORE.products.forEach(product => {
  product.images = (product.images && product.images.length ? product.images : [PLACEHOLDER_IMAGE])
    .map(img => (img && img.startsWith('assets/images/products/') ? PLACEHOLDER_IMAGE : img || PLACEHOLDER_IMAGE));
});

STORE.blogPosts.forEach(post => {
  post.image = post.image && post.image.startsWith('assets/images/blog/') ? PLACEHOLDER_IMAGE : (post.image || PLACEHOLDER_IMAGE);
});

// Seed localStorage if empty
if (!localStorage.getItem('smaa_products_seeded')) {
  localStorage.setItem('smaa_products_seeded', '1');
  // Keep admin editable products separately
  localStorage.setItem('smaa_admin_products', JSON.stringify(STORE.products));
}

window.STORE = STORE;
