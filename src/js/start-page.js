document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const disappiaerLinks = document.querySelectorAll('a.link');
  const body = document.body;

  let backgroundPicture = document.body.style.backgroundImage;

  disappiaerLinks.forEach(link => {
    link.style.display = 'none';
  });

  body.style.backgroundImage = 'none';
  body.style.backgroundColor = 'black';

  setTimeout(() => {
    preloader.style.display = 'none';

    disappiaerLinks.forEach(link => {
      link.style.display = 'block';
    });

    document.body.style.backgroundImage = backgroundPicture;
  }, 5000);
});
