import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const pickedDateTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');

let timerId = null;

startButton.disabled = true;

flatpickr(pickedDateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      Notiflix.Notify.success("Let's go?");
    }
  },
});

startButton.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  spans.forEach(item => item.classList.toggle('end'));
  startButton.disabled = true;
  pickedDateTime.disabled = true;
  timerId = setInterval(() => {
    const chosenDate = new Date(pickedDateTime.value);
    const timeToFinish = chosenDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      spans.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
      pickedDateTime.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
