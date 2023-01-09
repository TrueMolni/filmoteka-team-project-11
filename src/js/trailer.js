import { userFilms } from './api';
import { getRefs } from './refs';

const { backdrop, modalVideo, divTrailer, closeModalBtn, closeButton } =
  getRefs();

function updateModalContainer(clear = '') {
  return (divTrailer.innerHTML = clear);
}
function toggleModal() {
  modalVideo.classList.toggle('is-hidden');
}

function handelClickToPoster(e) {
  const value = Object(e.target);
  const valueId = value.id;

  if (!valueId) return;

  toggleModal();

  fetchVideo(valueId)
    .then(data => {
      const trailerKey = data.results[0].key;
      const instance = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      updateModalContainer(instance);
    })
    .catch(error => {
      console.error(error);
    });
}

function fetchVideo(valueId) {
  userFilms.setId(valueId);
  return userFilms.onSearchTrailerById(valueId);
}

function closeModalVideoWindow(e) {
  if (
    e.code === 'Escape' ||
    e.currentTarget === e.target ||
    e.currentTarget.classList.contains('close-button')
  ) {
    modalVideo.classList.add('is-hidden');
    updateModalContainer();
  }
  return;
}

backdrop.addEventListener('click', handelClickToPoster);
closeModalBtn.addEventListener('click', closeModalVideoWindow);
document.addEventListener('keydown', closeModalVideoWindow);
backdrop.addEventListener('click', closeModalVideoWindow);
closeButton.addEventListener('click', closeModalVideoWindow);
