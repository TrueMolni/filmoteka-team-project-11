import { getTrending } from "./api.js";
//import { getTrending } from './getTrending.js';
import { getById } from "./api.js";

const srcImgBase = 'https://image.tmdb.org/t/p/w500';
let currentPage = 1;
const moviesList = document.querySelector('.film__list');

// Видаляю,бо додаю даний виклик в пагінацію-метод loadFirstPag():

// getTrending(currentPage).then(res => {
//   const headerCheck = document.querySelector('.side-nav__link');
//   if (headerCheck.classList.contains('home')) {
//     moviesList.insertAdjacentHTML('beforeend', createMarkup(res));
//   }
// });
import { getById } from "./api.js";
async function getGenres() {
  try {
    const resGenres = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return await resGenres.data;
  } catch (error) {
    console.log(error);
  }
}

async function renderGernes() {
  if (localStorage.getItem('genres') === null) {
    await getGenres().then(({ genres }) => {
      localStorage.setItem('genres', JSON.stringify(genres));
     return renderGernes});
  }

}

function getGenreById(genreId, genresArray) {
  const genres = genresArray.find(option => option.id === genreId);
  return genres.name;
}

function createMarkup(res) {
  if (res.results.length >= 1) {
    const markup = res.results
      .map(
        ({ id, title, poster_path, genre_ids, release_date, vote_average }) => {

          const genresList = JSON.parse(localStorage.getItem('genres'));
           let genres = genre_ids.map(item => {
          return getGenreById(item, genresList);
          })

          let genresMarkup = '';
          if (genres.length === 0) {
            genresMarkup = 'No genres';
           } else if (genres.length < 3) {
          genresMarkup = genres.join(',&nbsp;');
          } else {
           genresMarkup = `${genres[0]}, ${genres[1]}, Others`;
          }

          // check for poster
          let poster = '';
          poster_path === null
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);


          // check  a date

          let relDate = '';
          release_date === '' || release_date === undefined
            ? (relDate = 'No date')
            : (relDate = release_date.slice(0, 4));

          //fix rating

          let voteAverage = vote_average.toFixed(1);

          return `<li class="gallery__item film-card" data-modal-open data-id="${id}">
            <img src="${srcImgBase}${poster}" alt="${title}" class="img" id="${id}" />
            <div class="item__text">
              <h2 class="item__capt">${title}</h2>
              <div class="item__wrap">
                <p class="item__genre">${genresMarkup}</p>
                <p class="item__rating">${voteAverage}</p>
                <p class="item__genre">${relDate}</p>
              </div>
            </div>
          </li>`;
        }
      )
      .join('');
    return markup;
  }
}
export { createMarkup };
