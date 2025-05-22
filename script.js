// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm('service_i66s27e', 'template_motk2dd', this)
    .then(function() {
      document.getElementById('formMsg').textContent = 'Message sent successfully!';
      document.getElementById('formMsg').classList.add('show');
    }, function(error) {
      document.getElementById('formMsg').textContent = 'Failed to send message. Please try again.';
      document.getElementById('formMsg').classList.add('show');
    });
});

// Header scroll behavior
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.contains('active');
  nav.classList.toggle('active');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', !isOpen);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !navToggle.contains(e.target)) {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
  }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Active section highlighting
function setActiveSection() {
  const scrollPosition = window.scrollY + header.offsetHeight + 100;

  sections.forEach(section => {
    if (!section.id) return;
    
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    // Map old section IDs to new ones for navigation
    const sectionId = section.id === 'solutions-preview' ? 'solutions' : section.id;
    const sectionLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (sectionLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      sectionLink.classList.add('active');
    }
  });

  // Special case for hero section (home)
  if (scrollPosition < sections[0].offsetTop + sections[0].offsetHeight) {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-link[href="#hero"]')?.classList.add('active');
  }
}

// Header hide/show on scroll
window.addEventListener('scroll', function() {
  // Update active section
  setActiveSection();

  // Hide/show header on mobile
  if (window.innerWidth <= 800) {
    if (window.scrollY > lastScrollY && window.scrollY > 60) {
      header.classList.add('hide-on-scroll');
    } else {
      header.classList.remove('hide-on-scroll');
    }
    lastScrollY = window.scrollY;
  }
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 800) {
    header.classList.remove('hide-on-scroll');
    nav.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
  }
});

// Initial active section check
setActiveSection();

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// FAQ Accordion functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  // Handle click events
  header.addEventListener('click', () => toggleAccordion(item));

  // Handle keyboard events
  header.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleAccordion(item);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextAccordionHeader(item);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousAccordionHeader(item);
        break;
      case 'Home':
        e.preventDefault();
        focusFirstAccordionHeader();
        break;
      case 'End':
        e.preventDefault();
        focusLastAccordionHeader();
        break;
    }
  });
});

function toggleAccordion(item) {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');
  const isExpanded = header.getAttribute('aria-expanded') === 'true';

  // Close other open items
  accordionItems.forEach(otherItem => {
    if (otherItem !== item) {
      const otherHeader = otherItem.querySelector('.accordion-header');
      const otherContent = otherItem.querySelector('.accordion-content');
      otherHeader.setAttribute('aria-expanded', 'false');
      otherContent.removeAttribute('role');
    }
  });

  // Toggle current item
  header.setAttribute('aria-expanded', !isExpanded);
  
  if (!isExpanded) {
    content.setAttribute('role', 'region');
  } else {
    content.removeAttribute('role');
  }
}

function focusNextAccordionHeader(currentItem) {
  const currentIndex = Array.from(accordionItems).indexOf(currentItem);
  const nextItem = accordionItems[currentIndex + 1];
  if (nextItem) {
    nextItem.querySelector('.accordion-header').focus();
  }
}

function focusPreviousAccordionHeader(currentItem) {
  const currentIndex = Array.from(accordionItems).indexOf(currentItem);
  const previousItem = accordionItems[currentIndex - 1];
  if (previousItem) {
    previousItem.querySelector('.accordion-header').focus();
  }
}

function focusFirstAccordionHeader() {
  accordionItems[0]?.querySelector('.accordion-header').focus();
}

function focusLastAccordionHeader() {
  accordionItems[accordionItems.length - 1]?.querySelector('.accordion-header').focus();
}
