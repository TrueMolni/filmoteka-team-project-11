import Notiflix from 'notiflix';
import { srcImgBase } from './markupListMovies';
import ApiServise, { IMG_URL } from './api';
import { createMarkup } from './markupListMovies';
const userFilms = new ApiServise();
import Pagination from 'tui-pagination';
// const pagination = new Pagination();
// import { cleanContainer } from './pagination';
const refs = {
  inputEl: document.querySelector('.search-field'),
  searchBtn: document.querySelector('.search-btn'),
  formEl: document.querySelector('.search-form'),
  moviesList: document.querySelector('.film__list'),
  pagination: document.querySelector('#tui-pagination-container'),
};

const onSearchBtnClick = event => {
  //   console.log('click');
  event.preventDefault();

  userFilms.userSearch = event.target.elements.query.value.trim();

  // console.log(userFilms);

  userFilms
    .onSearchFilm()
    .then(data => {
      //   console.log('onSearchFilm DATA', data.results);
      setTimeout(() => {
        clearRender();
        if (data.results.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no videos matching your search query. Please try again.'
          );
          refs.moviesList.innerHTML = noResults();
          refs.pagination.innerHTML = ' ';

          return;
        }
        clearInput();
        refs.moviesList.innerHTML = createMarkup(data);
        refs.searchResField.textContent = `Yay! We found ${data.total_results} results on request "${userFilms.userSearch}"!`;
        refs.searchResField.style.color = '#818181';
      });
    }, 1000)

    .catch(
      error => console.dir(error)
      //   Notiflix.Notify.failure("Error occured!")
    );
};
refs.formEl.addEventListener('submit', onSearchBtnClick);

function noResults() {
  clearInput();
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results"   class="img_r"/></li>`;
}
function clearInput() {
  refs.inputEl.value = '';
}
function clearRender() {
  refs.moviesList.innerHTML = '';
}
