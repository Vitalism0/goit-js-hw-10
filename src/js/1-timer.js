import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const value = document.querySelectorAll('.value');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    if (!date) return;

    if (date.getTime() <= Date.now()) {
      iziToast.show({
        message: '"Please choose a date in the future"',
        position: 'topRight',
        progressBar: false,
        backgroundColor: '#EF4040',
        messageColor: '#ffffff',
      });
      userSelectedDate = null;
      startBtn.disabled = true;
    } else {
      userSelectedDate = date;
      startBtn.disabled = false;
    }
  },
};
flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
  }
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  tick();
  timerId = setInterval(tick, 1000);
});

function tick() {
  const msLeft = userSelectedDate.getTime() - Date.now();

  if (msLeft <= 0) {
    clearInterval(timerId);
    timerId = null;
    updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    datetimePicker.disabled = false;
    return;
  }
  updateClockface(convertMs(msLeft));
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}
