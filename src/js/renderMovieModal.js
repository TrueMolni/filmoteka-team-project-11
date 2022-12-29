const modalWindow = document.querySelector('.modal');
export function renderMovieModal({
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  title,
  vote_average,
  vote_count,
}) {
  const markup = `<div class="information">
  <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Movie poster"/>
    <div class="movie-details">
      <h3 class="movie-heading">${title}</h3>
      <ul class="movie-list-info">
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Vote / Votes</p>
          <p class="movie-mark">
            <span class="rating">${vote_average.toFixed(1)}</span>
            <span class="delimeter">/</span
            ><span class="quantity">${vote_count}</span>
          </p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Popularity</p>
          <p class="movie-mark">${popularity.toFixed(1)}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Original Title</p>
          <p class="movie-mark movie-mark--original-title">${original_title}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Genre</p>
          <p class="movie-mark">${genres
            .map(genre => genre.name)
            .join(', ')}</p>
        </li>
      </ul>
      <p class="about">About</p>
      <p class="about-descr">${overview}</p>
      <div class="button-wrapper">
      <button class="button modal-film__btn-watched" type="button">Add to watched</button>
      <button class="button modal-film__btn-queque" type="button">Add to queue</button>
    </div>
  </div>
</div>`;
  modalWindow.firstElementChild.insertAdjacentHTML('afterend', markup);
}
