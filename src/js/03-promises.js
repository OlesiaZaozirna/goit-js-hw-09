import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };

      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();

  const firstDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const promiseAmount = Number(amountInput.value);

  if (
    isNaN(firstDelay) ||
    isNaN(delayStep) ||
    isNaN(promiseAmount) ||
    firstDelay < 0 ||
    delayStep < 0 ||
    promiseAmount < 0
  ) {
    Notiflix.Notify.failure('Please enter valid positive numbers.');
    return;
  }

  for (let i = 0; i < promiseAmount; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, i * 100);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, i * 100);
      });
  }

  form.reset();
});
