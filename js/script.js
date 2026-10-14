/**
 * GLAM & GRACE BEAUTY STUDIO
 * Core Interactive Features & Interaction Design
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initComparisonSlider();
  initPortfolioFiltersAndLightbox();
  initHairCarousel();
  initServiceTabs();
  initPackageBookingLinks();
  initBookingForm();
  initFooterYear();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL SPY
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ScrollSpy for active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-link, .mobile-nav .btn');

  if (!toggleBtn || !mobileNav) return;

  const openDrawer = () => {
    mobileNav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    mobileNav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  const toggleDrawer = () => {
    if (mobileNav.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDrawer();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. ACCESSIBLE SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
        
        // Brief timeout ensures mobile drawer overflow unfreezes before scrolling
        setTimeout(() => {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }, 60);
      }
    });
  });
}

/* ==========================================================================
   4. BEFORE & AFTER INTERACTIVE DRAGGABLE SLIDER
   ========================================================================== */
function initComparisonSlider() {
  const container = document.querySelector('.comparison-container');
  const beforeLayer = document.querySelector('.comparison-before');
  const beforeImg = document.querySelector('.comparison-before img');
  const handle = document.querySelector('.comparison-handle');

  if (!container || !beforeLayer || !beforeImg || !handle) return;

  let isDragging = false;

  // Sync width of inner before image to match container width
  const syncImageSize = () => {
    const width = container.offsetWidth;
    beforeImg.style.width = `${width}px`;
  };

  window.addEventListener('resize', syncImageSize);
  syncImageSize();

  const updatePosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let posX = clientX - rect.left;

    // Boundaries between 5% and 95%
    const minX = rect.width * 0.05;
    const maxX = rect.width * 0.95;

    if (posX < minX) posX = minX;
    if (posX > maxX) posX = maxX;

    const percentage = (posX / rect.width) * 100;

    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    handle.setAttribute('aria-valuenow', Math.round(percentage));
  };

  // Mouse Events
  const startDrag = (e) => {
    isDragging = true;
    container.classList.add('is-dragging');
    updatePosition(e.clientX);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const stopDrag = () => {
    isDragging = false;
    container.classList.remove('is-dragging');
  };

  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    container.classList.add('is-dragging');
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', stopDrag);

  // Keyboard Accessibility
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-label', 'Image Comparison Slider');
  handle.setAttribute('aria-valuemin', '5');
  handle.setAttribute('aria-valuemax', '95');
  handle.setAttribute('aria-valuenow', '50');

  handle.addEventListener('keydown', (e) => {
    const currentVal = parseFloat(handle.style.left || '50%');
    let newVal = currentVal;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newVal = Math.max(5, currentVal - 5);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newVal = Math.min(95, currentVal + 5);
      e.preventDefault();
    }

    beforeLayer.style.width = `${newVal}%`;
    handle.style.left = `${newVal}%`;
    handle.setAttribute('aria-valuenow', Math.round(newVal));
  });
}

/* ==========================================================================
   5. PORTFOLIO FILTERS & LIGHTBOX MODAL
   ========================================================================== */
function initPortfolioFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-nav .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const loadMoreBtn = document.getElementById('portfolioLoadMore');

  let currentCategory = 'bridal';

  const applyCategoryFilter = (filterValue) => {
    currentCategory = filterValue;
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filterValue) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    portfolioCards.forEach(card => {
      const itemCat = card.getAttribute('data-category');
      if (itemCat === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  // Filter items
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'bridal';
      applyCategoryFilter(filterValue);
    });
  });

  // Initialize with bridal active
  applyCategoryFilter('bridal');

  // --- LIGHTBOX MODAL ---
  const modal = document.querySelector('.lightbox-modal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCat = document.getElementById('lightboxCat');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const prevBtn = document.querySelector('.lightbox-prev-btn');
  const nextBtn = document.querySelector('.lightbox-next-btn');

  if (!modal || !modalImg) return;

  let currentVisibleCards = [];
  let currentIndex = 0;

  const updateLightboxContent = (index) => {
    if (!currentVisibleCards[index]) return;
    const card = currentVisibleCards[index];
    const img = card.querySelector('img');
    const title = card.dataset.title || 
                  card.querySelector('.glam-card-name')?.textContent || 
                  card.querySelector('.glam-overlay-title')?.textContent || 
                  card.querySelector('.portfolio-card-title')?.textContent || 
                  'Bridal & Beauty Artistry';
    const tag = card.dataset.badge || 
                card.dataset.tag || 
                card.querySelector('.glam-chip')?.textContent || 
                card.querySelector('.glam-overlay-tag')?.textContent || 
                card.querySelector('.portfolio-tag')?.textContent || 
                'Glam & Grace';

    const imgSrc = card.dataset.img || (img ? img.src : '');
    modalImg.src = imgSrc;
    modalImg.alt = img?.alt || title;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCat) modalCat.textContent = tag;
    currentIndex = index;
  };

  const openLightbox = (card, cardGroup) => {
    if (cardGroup && cardGroup.length > 0) {
      currentVisibleCards = Array.from(cardGroup);
    } else {
      currentVisibleCards = Array.from(portfolioCards).filter(c => !c.classList.contains('hidden'));
    }
    currentIndex = currentVisibleCards.indexOf(card);
    if (currentIndex === -1) currentIndex = 0;

    updateLightboxContent(currentIndex);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % currentVisibleCards.length;
    updateLightboxContent(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + currentVisibleCards.length) % currentVisibleCards.length;
    updateLightboxContent(currentIndex);
  };

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  // --- A LITTLE MORE GLAM SPOTLIGHT STAGE SWITCHER ---
  const spotlightStage = document.getElementById('glamSpotlightStage');
  const spotlightImg = document.getElementById('glamSpotlightImg');
  const spotlightBadge = document.getElementById('glamSpotlightBadge');
  const spotlightTag = document.getElementById('glamSpotlightTag');
  const spotlightTitle = document.getElementById('glamSpotlightTitle');
  const spotlightDesc = document.getElementById('glamSpotlightDesc');
  const selectCards = document.querySelectorAll('.glam-select-card');

  let activeGlamIndex = 0;

  const setSpotlight = (card, index) => {
    if (!card) return;
    activeGlamIndex = index;
    selectCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const img = card.dataset.img;
    const badge = card.dataset.badge;
    const tag = card.dataset.tag;
    const title = card.dataset.title;
    const desc = card.dataset.desc;

    if (spotlightImg && img) {
      spotlightImg.classList.add('glam-fade-out');
      setTimeout(() => {
        spotlightImg.src = img;
        spotlightImg.alt = title;
        if (spotlightBadge) spotlightBadge.textContent = badge;
        if (spotlightTag) spotlightTag.textContent = tag;
        if (spotlightTitle) spotlightTitle.textContent = title;
        if (spotlightDesc) spotlightDesc.textContent = desc;
        spotlightImg.classList.remove('glam-fade-out');
      }, 150);
    }
  };

  selectCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      setSpotlight(card, idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSpotlight(card, idx);
      }
    });
  });

  if (spotlightStage) {
    spotlightStage.addEventListener('click', () => {
      if (selectCards.length > 0) {
        openLightbox(selectCards[activeGlamIndex], selectCards);
      }
    });
    spotlightStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (selectCards.length > 0) {
          openLightbox(selectCards[activeGlamIndex], selectCards);
        }
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   6. HAIR STUDIO CAROUSEL & PORTFOLIO SHORTCUT
   ========================================================================== */
function initHairCarousel() {
  const prevBtn = document.getElementById('hairPrevBtn');
  const nextBtn = document.getElementById('hairNextBtn');
  const grid = document.querySelector('.hair-grid');

  if (grid && prevBtn && nextBtn) {
    let scrollAmount = 0;
    const cardWidth = 320;

    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  // View All Hairstyles link activates the 'hair' filter in Portfolio
  const viewAllHairLink = document.getElementById('viewAllHairstylesLink');
  if (viewAllHairLink) {
    viewAllHairLink.addEventListener('click', (e) => {
      e.preventDefault();
      const hairFilterBtn = document.querySelector('.portfolio-filter-nav .filter-btn[data-filter="hair"]');
      if (hairFilterBtn) {
        hairFilterBtn.click();
      }
      const portfolioSec = document.getElementById('portfolio');
      if (portfolioSec) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        window.scrollTo({
          top: portfolioSec.getBoundingClientRect().top + window.pageYOffset - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  }
}

/* ==========================================================================
   7. SERVICES DETAIL TABS
   ========================================================================== */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.services-tabs-nav .tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetTab = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. PACKAGE PRE-SELECTION IN BOOKING FORM
   ========================================================================== */
function initPackageBookingLinks() {
  const packageBtns = document.querySelectorAll('.book-package-btn');
  const serviceSelect = document.getElementById('bookingService');
  const eventTypeSelect = document.getElementById('bookingEventType');
  const bookingSection = document.getElementById('booking');

  if (!serviceSelect || !bookingSection) return;

  packageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package') || 'Bridal Packages';

      // Pre-select Bridal in Event Type
      if (eventTypeSelect) {
        eventTypeSelect.value = 'Bridal';
      }

      // Pre-select corresponding option or default to Pre-Bridal / Complete Package
      let matchFound = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(packageName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        serviceSelect.value = 'Complete Beauty Package';
      }

      // Smooth scroll to booking
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
      window.scrollTo({
        top: bookingSection.getBoundingClientRect().top + window.pageYOffset - headerHeight,
        behavior: 'smooth'
      });

      // Highlight the select field
      serviceSelect.focus();
      serviceSelect.style.borderColor = 'var(--dusty-rose)';
      setTimeout(() => {
        serviceSelect.style.borderColor = '';
      }, 2000);
    });
  });
}

/* ==========================================================================
   9. APPOINTMENT FORM VALIDATION & WHATSAPP GENERATOR
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('appointmentForm');
  const whatsappBtn = document.getElementById('whatsappBookBtn');
  const successAlert = document.getElementById('bookingSuccessAlert');

  if (!form) return;

  // Studio official WhatsApp contact number placeholder (user-customizable)
  const STUDIO_WHATSAPP_NUMBER = '919876543210'; // Editable country code + number

  const validateField = (input, errorSpan, validationFn) => {
    const isValid = validationFn(input.value.trim());
    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorSpan) errorSpan.classList.add('visible');
    } else {
      input.classList.remove('is-invalid');
      if (errorSpan) errorSpan.classList.remove('visible');
    }
    return isValid;
  };

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('bookingName');
    const phoneInput = document.getElementById('bookingPhone');
    const dateInput = document.getElementById('bookingDate');
    const eventTypeInput = document.getElementById('bookingEventType');
    const serviceInput = document.getElementById('bookingService');
    const venueInput = document.getElementById('bookingVenue');

    const nameErr = document.getElementById('nameError');
    const phoneErr = document.getElementById('phoneError');
    const dateErr = document.getElementById('dateError');
    const eventErr = document.getElementById('eventError');
    const serviceErr = document.getElementById('serviceError');

    const isNameValid = validateField(nameInput, nameErr, val => val.length >= 2);
    const isPhoneValid = validateField(phoneInput, phoneErr, val => /^[0-9+\s\-()]{7,16}$/.test(val));
    const isDateValid = validateField(dateInput, dateErr, val => val !== '');
    const isEventValid = validateField(eventTypeInput, eventErr, val => val !== '');
    const isServiceValid = validateField(serviceInput, serviceErr, val => val !== '');

    if (isNameValid && isPhoneValid && isDateValid && isEventValid && isServiceValid) {
      // Simulate successful appointment request submission
      if (successAlert) {
        successAlert.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
          Your appointment request for <strong>${serviceInput.value}</strong> on <strong>${dateInput.value}</strong> has been received.<br>
          <em>Note: This is an appointment booking inquiry. Our studio coordinator will review your requested date and contact you within 24 hours to confirm date availability.</em>
        `;
        successAlert.classList.add('visible');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();

      setTimeout(() => {
        if (successAlert) successAlert.classList.remove('visible');
      }, 10000);
    }
  });

  // WhatsApp Button Message Construction
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName')?.value.trim() || 'Guest';
      const phone = document.getElementById('bookingPhone')?.value.trim() || '';
      const date = document.getElementById('bookingDate')?.value || 'Upcoming Date';
      const eventType = document.getElementById('bookingEventType')?.value || 'Bridal/Occasion';
      const service = document.getElementById('bookingService')?.value || 'Bridal Beauty Service';
      const venue = document.getElementById('bookingVenue')?.value.trim() || 'Studio / On-Location';
      const message = document.getElementById('bookingMessage')?.value.trim() || '';

      let text = `Hello Glam & Grace Beauty Studio! 🌸\n\n`;
      text += `I would like to inquire about booking an appointment:\n`;
      text += `• Name: ${name}\n`;
      if (phone) text += `• Contact: ${phone}\n`;
      text += `• Event Date: ${date}\n`;
      text += `• Event Type: ${eventType}\n`;
      text += `• Requested Service: ${service}\n`;
      if (venue) text += `• Venue: ${venue}\n`;
      if (message) text += `• Special Notes: ${message}\n`;
      text += `\nPlease let me know your availability and package details. Thank you!`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/* ==========================================================================
   10. DYNAMIC FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
