import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import ApiServise from '../js/api'

const apiServise = new ApiServise;
const container = document.getElementById('tui-pagination-container');
const containerFilms=document.querySelector(".container-films")
// const page = pagination.getCurrentPage();
// const arrowIcon = `${sprite}#icon-arrow`;




const options = {
  page: 1,
  itemsPerPage: 20,
  totalItems: 20000,
  visiblePages: 5,
  // centerAlign: true,
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
}


const pagination = new Pagination(container, options);

async function Home() {
  const response = await apiServise.getTrendingFilm();
  addFilms(response.results);
  console.log(response)
}
Home()



pagination.on('afterMove', loadMoreFilms)

async function loadMoreFilms(event) {
  cleanContainer();

  if (event.page) {
    apiServise.page = event.page;
 } 
  console.log(event.page);
  const response = await apiServise.getTrendingFilm();
  addFilms(response.results);
}


function addFilms(films) {
const markup = films.map(film => {
  return `<div>
<p>${film.title}</p>
 </div>`}).join('');
containerFilms.insertAdjacentHTML('beforeend', markup);

}

function cleanContainer(){
  containerFilms.innerHTML = '';
}

