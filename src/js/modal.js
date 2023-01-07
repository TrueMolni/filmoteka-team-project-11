import { renderMovieModal } from './renderMovieModal.js';
import { getById } from './api';
import { getRefs } from './refs';
const { galleryItems, backdrop, closeButton } = getRefs();

const refs = getRefs();

galleryItems.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  refs.toTopBtn.classList.remove('btn-to-top--visible');
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
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
  const scrolled = window.pageYOffset;
  const coords = window.innerHeight / 3;
  if (scrolled > coords) {
    refs.toTopBtn.classList.add('btn-to-top--visible');
  };
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
