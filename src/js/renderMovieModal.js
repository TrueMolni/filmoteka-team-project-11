const modalWindow = document.querySelector('.modal');
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
    genresList = genres.map(genre => genre.name);
  } else {
    genresList = 'No information';
  }

  let imgPath = '';
  if (poster_path) {
    imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  } else {
    imgPath = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg'; // потрібно якусь дефолтну картинку в images або якійсь напис придумати
  }

  let descr = '';
  if (overview) {
    descr = overview;
  } else {
    descr = 'No description';
  }

  const markup = `<div class="information">
  <img src="${imgPath}" alt="Movie poster"/>
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
          <p class="mark">${genresList}</p>
        </li>
      </ul>
      <p class="about__text">About</p>
      <p class="about__descr">${overview}</p>
      <div class="button-wrapper">
      <button class="btton modal-film__btn-watched" data-id="${id}" type="button">Add to watched</button>
      <button class="btton modal-film__btn-queque" data-id="${id}" type="button">Add to queue</button>
    </div>
  </div>
</div>`;
  modalWindow.firstElementChild.insertAdjacentHTML('afterend', markup);
}
