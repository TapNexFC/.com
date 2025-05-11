document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = "Thank you! We'll get back to you shortly.";
  msg.classList.add('show');
  setTimeout(() => {
    msg.classList.remove('show');
    msg.textContent = "";
  }, 3000);
  this.reset();
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
