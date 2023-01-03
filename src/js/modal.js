import { renderMovieModal } from './renderMovieModal.js';
import { createMarkup } from './markupListMovies.js';
import { getById } from './getById';
import { createMarkup } from './markupListMovies';

const filmGallery = document.querySelector('.film-card');
// filmGallery.forEach(filmCard => {
//   filmCard.addEventListener('click', onModalWindowOpen);
// });

// const body = document.querySelector('body');
// const modalWindow = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

filmGallery.addEventListener('click', onModalWindowOpen);

closeButton.addEventListener('click', onModalWindowClose);
// backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  //   const value = Object(event.target);
  console.log('click');
  //   e.preventDefault();
  //   if (!e.target.closest('li')) {
  //     return;
  //   } else if (e.target.closest('li')) {
  //     const movieId = e.target.closest('li').dataset.id;
  //     const information = document.querySelector('.information');
  //     if (information) {
  //       information.remove();
  //     }
  getById(200)
    .then(movie => {
      renderMovieModal(movie);
    })
    .catch(error => console.log(error));
  document.body.style.overflow = 'hidden';
  backdrop.classlist.remove('is-hidden');
  document.addEventListener('keydown', onEscClose);
}
// }

function onModalWindowClose() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalWindowClose();
  }
}

function onEscClose(event) {
  if (event.code === 'Escape') {
    onModalWindowClose();
    document.removeEventListener('keydown', onEscClose);
  }
}

onModalWindowOpen();
