const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');

burgerMenu.addEventListener('click', () => {
  navMenu.querySelector('ul').classList.toggle('show');
});
