/* ============================================================
   AS ASSISTANTS — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR: scroll effect + active link =====
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinksContainer.classList.contains('open')
      ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = navLinksContainer.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinksContainer.classList.contains('open')
      ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '1';
      });
    });
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(
    '.assistant-card, .award-card, .testimonial-card, .timeline-item, .channel-card, .contact-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (getIndexInParent(entry.target)));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  function getIndexInParent(el) {
    const siblings = el.parentElement ? [...el.parentElement.children] : [];
    const idx = siblings.indexOf(el);
    return idx >= 0 ? idx : 0;
  }

  // ===== CONTACT FORM → WhatsApp =====
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Hello AS Assistants! 👋\n\nName: ${name}\nEmail: ${email}${phone ? '\nPhone: ' + phone : ''}\n\nMessage:\n${message}`;
    const waUrl = `https://wa.me/917386801785?text=${encodeURIComponent(text)}`;

    const successDiv = document.getElementById('formSuccess');
    successDiv.classList.add('visible');

    // Open synchronously to bypass browser popup blockers
    window.open(waUrl, '_blank');
    
    e.target.reset();
    setTimeout(() => {
      successDiv.classList.remove('visible');
    }, 4000);
  };

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== Stagger hero stat animation =====
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.textContent.replace(/\D/g, ''), 10);
    const suffix = stat.textContent.replace(/[0-9]/g, '');
    let current  = 0;
    const step   = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      stat.textContent = current + suffix;
      if (current >= target) clearInterval(interval);
    }, 40);
  });

  // ===== HERO FLOATING PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize size, positioning, speed, delay, and opacity
    const size = Math.random() * 8 + 4; // 4px to 12px size
    const left = Math.random() * 100; // 0% to 100% horizontal alignment
    const duration = Math.random() * 15 + 10; // 10s to 25s speed
    const delay = Math.random() * -25; // Negative delay to start mid-animation
    const opacity = Math.random() * 0.4 + 0.2; // Opacity variation
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = opacity;
    
    // Slight glow shadow effect
    particle.style.boxShadow = `0 0 ${size * 1.5}px rgba(201, 168, 76, 0.6)`;

    container.appendChild(particle);
  }

});
