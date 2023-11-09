function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', colorChangeStart);
stopButton.addEventListener('click', colorChangeStop);

let intervalId = null;
let backgroundPicture = null;

function colorChangeStart() {
  backgroundPicture = document.body.style.backgroundImage;
  if (!intervalId) {
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      document.body.style.backgroundImage = 'none';
    }, 1000);
    startButton.disabled = true;
  }
}

function colorChangeStop() {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  document.body.style.backgroundImage = backgroundPicture;
}
