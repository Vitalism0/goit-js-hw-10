import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;
  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    })
      .then(delay => {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          progressBar: false,
          backgroundColor: '#59A10D',
          messageColor: '#ffffff',
        });
      })
      .catch(err => {
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          progressBar: false,
          backgroundColor: '#EF4040',
          messageColor: '#ffffff',
        });
      });
  }, delay);
  form.reset();
}
