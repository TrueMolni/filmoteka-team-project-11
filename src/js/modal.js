import { renderMovieModal } from './renderMovieModal.js';
import { getById } from './api';
import { getRefs } from './refs';
const { filmGallery, backdrop, closeButton } = getRefs();

filmGallery.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  const value = Object(e.target);
  e.preventDefault();
  if (!e.target.closest('li')) {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;
    const information = document.querySelector('.information');
    if (information) {
      information.remove();
    }
    getById(movieId)
      .then(movie => {
        renderMovieModal(movie);
      })
      .catch(error => console.log(error));
    document.body.style.overflow = 'hidden';
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscClose);
  }
}

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
