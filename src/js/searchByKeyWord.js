// import Notiflix from 'notiflix';
// import { srcImgBase } from './markupListMovies';
import ApiServise, { IMG_URL } from './api';
import { createMarkup } from './markupListMovies';
const userFilms = new ApiServise();
import Pagination from './tui-pagination';
import { options } from './pagination';
import { cleanContainer } from './pagination';
import Spinner from './loader';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  
  clickToClose: true,
  timeout: 2500,
});

const loader = new Spinner();


const refs = {
  inputEl: document.querySelector('.search-field'),
  searchBtn: document.querySelector('.search-btn'),
  formEl: document.querySelector('.search-form'),
  moviesList: document.querySelector('.film__list'),
  pagination: document.querySelector('#tui-pagination-container'),
  searchResField: document.querySelector('.js-search-results'),
  warningField: document.querySelector('.js-warning'),
};
const pagination = new Pagination(refs.pagination, options);

const onSearchBtnClick = event => {
  event.preventDefault();
  userFilms.userSearch = event.target.elements.query.value.trim();
  if (!userFilms.userSearch) {
    refs.searchResField.textContent = '';
    refs.warningField.textContent = `Please write something in the search field`;
    return;
  }
  loadFirstPageOnSearch();
  
};

refs.formEl.addEventListener('submit', onSearchBtnClick);

// Додаю пагінацію на решту сторінок, крім першої:
pagination.on('afterMove', loadMoreFilmsOnSearch);

async function loadMoreFilmsOnSearch(event) {
  cleanContainer();

  userFilms.page = event.page;

  const response = await userFilms.onSearchFilm();
  pagination.setTotalItems(response.total_results);
  refs.moviesList.insertAdjacentHTML('beforeend', createMarkup(response));
}
async function loadFirstPageOnSearch() {
  const response = await userFilms.onSearchFilm();
  // console.log('onSearchFilm DATA', data);
  setTimeout(() => {
    loader.show();
    cleanContainer();
    clearWarning();
    if (response.results.length === 0) {
      setTimeout(() => {
        loader.hide();
      }, 500);
      refs.warningField.textContent = `Sorry, there no results found. Try searching for something else!`;
      refs.searchResField.textContent = '';
      refs.moviesList.innerHTML = noResults();
      refs.pagination.style.display = 'none';
      // loader.hide()
      return;
    }
    Notiflix.Notify.success(
      `We found ${response.total_results} results on request "${userFilms.userSearch}"!`
    );
    // refs.searchResField.textContent = `We found ${response.total_results} results on request "${userFilms.userSearch}"!`;
    // refs.searchResField.style.color = '#818181';
    setTimeout(() => {
      // console.log(' loader STOP');
      loader.hide();
    }, 1000);

    refs.moviesList.insertAdjacentHTML('beforeend', createMarkup(response));
    clearInput();
  }, 1000);

  pagination.reset(response.total_results);
}

function noResults() {
  clearInput();
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results"   class="img_r"/></li>`;
}
function clearInput() {
  refs.inputEl.value = '';
}
function clearWarning() {
  refs.warningField.innerHTML = '';
}
