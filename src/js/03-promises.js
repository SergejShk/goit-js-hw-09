import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formRef: document.querySelector('.form'),
  delayRef: document.querySelector('[name="delay"]'),
  stepRef: document.querySelector('[name="step"]'),
  amountRef: document.querySelector('[name="amount"]'),
  btnSubmitRef: document.querySelector('button'),
};

let delay = null;
let step = null;
let position = 0;
let amount = [];

refs.formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const elementsOfForm = event.currentTarget.elements;

  delay = Number(elementsOfForm.delay.value);
  step = Number(elementsOfForm.step.value);
  let amountInput = Number(elementsOfForm.amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    amount.push(i);
  }

  amount.map(number => {
    position = number;
    delay = position === 1 ? delay : (delay += step);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .then(() => {})
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => {
        amount = [];
      });
  });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
