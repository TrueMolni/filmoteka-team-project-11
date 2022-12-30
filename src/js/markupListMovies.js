import { getTrending } from './getTrending.js';

const srcImgBase = 'https://image.tmdb.org/t/p/w500';
let currentPage = 1;
const moviesList = document.querySelector('.film__list')

getTrending(currentPage).then(res => {
  moviesList.insertAdjacentHTML('beforeend', createMarkup(res));
});

function createMarkup(res) {
  if (res.results.length >= 1) {
    const markup = res.results
      .map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genre_ids,
          release_date,
          vote_average,
        }) => {
          return `<li class="gallery__item data-modal-open">
            <img src="${srcImgBase}${poster_path}" alt="${id}-${original_title}" class="img" data-modal-open/>
            <div class="item__text">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genre_ids} | ${release_date}</p>
                <p class="item__rating">${vote_average}</p>
              </div>
            </div>
          </li>`;
        }
        )
      .join('');
    return markup;
  }

}
export{createMarkup}