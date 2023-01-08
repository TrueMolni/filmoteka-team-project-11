import { userFilms } from './api';
import { getRefs } from './refs';

const { backdrop, modalVideo, divTrailer, closeModalBtn } = getRefs();

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
      return (videoArray = data.results[0]);
    })
    .then(toShowVideo)
    .catch(error => {
      console.error();
    });
}

function fetchVideo(valueId) {
  userFilms.setId(valueId);
  return userFilms.onSearchTrailerById(valueId);
}

function markupVideo(videoArray) {
  const key = videoArray.key;
  return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

function toShowVideo(videoArray) {
  const markup = markupVideo(videoArray);
  updateModalContainer(markup);
}

function closeModalVideoWindow() {
  toggleModal();
  updateModalContainer();
}

backdrop.addEventListener('click', handelClickToPoster);
closeModalBtn.addEventListener('click', closeModalVideoWindow);
