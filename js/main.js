// ── Car data ──
  const cars = {
    bmw: {
      brand: 'BMW',
      name: 'M4 Competition',
      price: '98,500 TND',
      images: [
        'assets/images/bmwm4.jpg',
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
        'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=600&q=80',
      ],
      specs: [
        ['Kilométrage', '85,000 km'],
        ['Année', '2021'],
        ['Énergie', 'Essence'],
        ['Puissance fiscale', '30 CV'],
        ['Boîte', 'Automatique'],
        ['Couleur', 'Brooklyn Grey'],
      ],
      desc: 'Exemplaire en parfait état, entretenu exclusivement en concession BMW. Cette M4 Competition dispose du pack Carbon Exterior, des sièges sport en cuir Merino et du système audio Harman Kardon. Aucun accident déclaré, carnet d\'entretien complet disponible. Une occasion rare pour les connaisseurs.',
    },
    mercedes: {
      brand: 'Mercedes-Benz',
      name: 'C 300 AMG Line',
      price: '75,000 TND',
      images: [
        'assets/images/c300.jpg',
        'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80',
        'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80',
      ],
      specs: [
        ['Kilométrage', '62,000 km'],
        ['Année', '2022'],
        ['Énergie', 'Essence'],
        ['Puissance fiscale', '22 CV'],
        ['Boîte', 'Automatique 9G'],
        ['Couleur', 'Obsidian Black'],
      ],
      desc: 'Magnifique C300 AMG Line W206 de dernière génération avec affichage digital MBUX High-End, toit ouvrant panoramique et pack Burmester Surround Sound. Véhicule importé de Belgique, sans aucun défaut esthétique ou mécanique. Idéale pour allier confort quotidien et dynamisme.',
    },
    golf: {
      brand: 'Volkswagen',
      name: 'Golf GTI 8',
      price: '42,900 TND',
      images: [
        'assets/images/golf8.jpg',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
      ],
      specs: [
        ['Kilométrage', '38,500 km'],
        ['Année', '2023'],
        ['Énergie', 'Essence'],
        ['Puissance fiscale', '14 CV'],
        ['Boîte', 'DSG 7'],
        ['Couleur', 'Deep Black Pearl'],
      ],
      desc: 'La Golf GTI 8 incarne l\'équilibre parfait entre sportivité et polyvalence. Ce modèle dispose de la transmission DSG 7 rapports, du pack Performance 245 ch, et de l\'écran tactile 10 pouces avec navigation. Kilométrage faible, historique d\'entretien VW complet. Premier propriétaire, non-fumeur.',
    },
  };

  // ── Mobile Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });
  function closeMobile() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }

  // ── Modal ──
  const modal = document.getElementById('modal');
  let currentImages = [];

  function openModal(carKey) {
    const car = cars[carKey];
    if (!car) return;
    currentImages = car.images;

    // Set main image
    document.getElementById('galleryMain').src = car.images[0];
    document.getElementById('galleryMain').alt = car.brand + ' ' + car.name;

    // Thumbnails
    const thumbs = document.getElementById('galleryThumbs');
    thumbs.innerHTML = '';
    car.images.forEach((src, i) => {
      const btn = document.createElement('button');
      btn.className = 'thumb-btn' + (i === 0 ? ' active' : '');
      btn.innerHTML = `<img src="${src}" alt="thumbnail ${i+1}" loading="lazy" />`;
      btn.addEventListener('click', () => {
        document.getElementById('galleryMain').src = src;
        thumbs.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      thumbs.appendChild(btn);
    });

    // Details
    document.getElementById('modalBrand').textContent = car.brand;
    document.getElementById('modalName').textContent = car.name;
    document.getElementById('modalPrice').innerHTML = car.price.replace(' TND', ' <span>TND</span>');

    const specsEl = document.getElementById('modalSpecs');
    specsEl.innerHTML = car.specs.map(([label, val]) =>
      `<div class="spec-label">${label}</div><div class="spec-val">${val}</div>`
    ).join('');

    document.getElementById('modalDesc').textContent = car.desc;

    modal.classList.add('active');
    modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Search Modal ──
  const searchModal = document.getElementById('searchModal');
  
  window.openSearchModal = function() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeSearchModal = function() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearchModal();
    }
  });

  // Price Slider logic
  const priceSlider = document.getElementById('smPriceSlider');
  const priceMaxText = document.getElementById('smPriceMax');
  if (priceSlider && priceMaxText) {
    priceSlider.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      priceMaxText.textContent = val.toLocaleString('fr-FR').replace(/\s/g, ' ');
    });
  }

  // Brand Grid Toggle
  window.toggleBrands = function() {
    const grid = document.getElementById('brandGrid');
    const btn = document.getElementById('btnShowMoreBrands');
    if (grid.classList.contains('expanded')) {
      grid.classList.remove('expanded');
      btn.textContent = 'VOIR PLUS';
    } else {
      grid.classList.add('expanded');
      btn.textContent = 'VOIR MOINS';
    }
  };