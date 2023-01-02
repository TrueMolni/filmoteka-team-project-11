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


const onSerchBtnClick = e => {
//   console.log('click');
  e.preventDefault();

  userFilms.userSearch = e.target.elements.query.value.trim();

//   console.log(userFilms.userSearch);

  userFilms
    .onSearchFilm()
    .then(data => {
    //   console.log('onSearchFilm DATA', data.results);
      clearInput();
      clearRender();
      if (data.results.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no videos matching your search query. Please try again.'
        );
        refs.moviesList.innerHTML = noResults();
        refs.pagination.innerHTML = " ";

        return;
        }
        
        refs.moviesList.innerHTML = createMarkup(data);
        
    })
    .catch(
    //   error => console.dir(error)
      Notiflix.Notify.failure("Error occured!")
    );
};
refs.formEl.addEventListener('submit', onSerchBtnClick);

function noResults() {
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results"   class="img_r"/></li>`;
}
function clearInput() {
  userFilms.userSearch = '';
}
function clearRender() {
  refs.moviesList.innerHTML = '';
}



