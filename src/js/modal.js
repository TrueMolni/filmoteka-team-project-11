import { renderMovieModal } from './renderMovieModal.js';
import { getById } from './api';
import { getRefs } from './refs';
import { scrollCloseModal, scrollOpenModal } from './scroll';
const { galleryItems, backdrop, closeButton } = getRefs();

galleryItems.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  scrollOpenModal()
  if (!e.target.closest('li')) {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;
    const { information } = getRefs();
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
  scrollCloseModal()
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
