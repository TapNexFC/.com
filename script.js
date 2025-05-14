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
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
window.addEventListener('scroll', function() {
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
  }
});
