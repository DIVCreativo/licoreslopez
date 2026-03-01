document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Scroll Animations via Intersection Observer ---
  const scrollElements = document.querySelectorAll('.js-scroll');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    // Read the intended animation class from data attribute
    const animationClass = element.getAttribute('data-animation');
    element.classList.remove('animate-hidden');
    if (animationClass) {
      element.classList.add(animationClass);
    }
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      // Trigger animation when element is 20% visible (dividend roughly 1.25)
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    })
  }

  // Initial Check on Load
  setTimeout(() => {
    handleScrollAnimation();
  }, 100); // Slight delay ensures layout calculation

  // Check on Scroll
  let throttleTimer = false;
  window.addEventListener("scroll", () => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
      handleScrollAnimation();
      throttleTimer = false;
    }, 50); // Throttle scroll event for performance
  });

  // --- Hamburger Menu ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && e.target !== hamburgerBtn) {
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});
