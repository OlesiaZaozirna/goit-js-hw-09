import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const pickedDateTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

flatpickr(pickedDateTime, options);
startButton.addEventListener('click', () => {});
