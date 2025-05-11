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
