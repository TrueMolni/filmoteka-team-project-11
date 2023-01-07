import { IMG_URL } from './api';
import { getRefs } from './refs';
import { checkAdd } from './localStorage';

const { divModal } = getRefs();
export function renderMovieModal({
  genres,
  original_title = 'Unknown',
  overview,
  popularity,
  poster_path,
  title = 'Unknown',
  vote_average = 0,
  vote_count = 0,
  id,
}) {
  let genresList = '';
  if (genres.length) {
    genresList = genres.map(genre => genre.name.split(' '));
  } else {
    genresList = 'No information';
  }

  let poster = '';
  poster_path === null
    ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
    : (poster = `${poster_path}`);

  let descr = '';
  if (overview) {
    descr = overview;
  } else {
    descr = 'No description';
  }

  const markup = `<div class="information">
  <img src="${IMG_URL}${poster}" alt="Movie poster" id="${id}"/>
    <div class="movie-details">
      <h3 class="movie-details__heading">${title}</h3>
      <ul class="movie-details__list-info">
        <li class="list-info__item">
          <p class="testimonial">Vote / Votes</p>
          <p class="mark">
            <span class="mark__rating">${vote_average.toFixed(1)}</span>
            <span class="mark__delimeter">/</span
            ><span class="mark__quantity">${vote_count}</span>
          </p>
        </li>
        <li class="list-info__item">
          <p class="testimonial">Popularity</p>
          <p class="mark">${popularity.toFixed(1)}</p>
        </li>
        <li class="list-info__item">
          <p class="testimonial">Original Title</p>
          <p class="mark mark__original-title">${original_title}</p>
        </li>
        <li class="list-info__item">
          <p class="testimonial">Genre</p>
          <p class="mark">${genresList.join(', ')}</p>
        </li>
      </ul>
      <p class="about__text">About</p>
      <p class="about__descr">${overview}</p>
      <div class="button-wrapper">
      <button class="btton modal-btn modal-film__btn-watched" data-id="${id}" type="button">Add to watched</button>
      <button class="btton modal-btn modal-film__btn-queque" data-id="${id}" type="button">Add to queue</button>
    </div>
  </div>
</div>`;
  divModal.firstElementChild.insertAdjacentHTML('afterend', markup);
  const modalWatchedBtn = document.querySelector('.modal-film__btn-watched');
  checkAdd('watched', modalWatchedBtn.dataset.id, modalWatchedBtn);
  const modalQueueBtn = document.querySelector('.modal-film__btn-queque');
  checkAdd('queue', modalQueueBtn.dataset.id, modalQueueBtn);
}
