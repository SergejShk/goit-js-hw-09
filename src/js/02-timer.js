import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputTimerRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('[data-start]'),
  daysValueRef: document.querySelector('[data-days]'),
  hoursValueRef: document.querySelector('[data-hours]'),
  minutesValueRef: document.querySelector('[data-minutes]'),
  secondsValueRef: document.querySelector('[data-seconds]'),
};

let currentDateMS = null;
let selectedDatesMS = null;
let deltaTimeMS = null;
let timer = null;

refs.btnStartRef.setAttribute('disabled', '');

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
};

const verificationTimer = () => {
  if (deltaTimeMS < 0) {
    Report.failure('Please choose a date in the future');
    clearInterval(timer);
    return;
  }
  refs.btnStartRef.removeAttribute('disabled');
};

const updateTimerMarkup = ({ days, hours, minutes, seconds }) => {
  refs.daysValueRef.textContent = days;
  refs.hoursValueRef.textContent = hours;
  refs.minutesValueRef.textContent = minutes;
  refs.secondsValueRef.textContent = seconds;
};

const startTimer = () => {
  timer = setInterval(() => {
    if (deltaTimeMS <= 2000) {
      clearInterval(timer);
    }
    refs.btnStartRef.setAttribute('disabled', '');
    refs.inputTimerRef.setAttribute('disabled', '');
    currentDateMS = Date.now();
    deltaTimeMS = selectedDatesMS - currentDateMS;
    const dataTimer = convertMs(deltaTimeMS);
    updateTimerMarkup(dataTimer);
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDateMS = Date.now();
    selectedDatesMS = selectedDates[0].getTime();
    deltaTimeMS = selectedDatesMS - currentDateMS;
    verificationTimer();
  },
};

flatpickr('#datetime-picker', options);

refs.btnStartRef.addEventListener('click', startTimer);
