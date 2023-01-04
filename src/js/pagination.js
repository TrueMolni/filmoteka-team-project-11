import Pagination from 'tui-pagination';
import ApiServise from '../js/api'
import { createMarkup } from './markupListMovies';
import { getTrending } from './api';

const containerPagination = document.getElementById('tui-pagination-container');
const filmList = document.querySelector(".film__list");

let total = 120;


const apiServise = new ApiServise;

export const options = {
  page:1,
  itemsPerPage: 20,
  totalItems: 0,
  visiblePages: 5,
  centerAlign: true,
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<a href="#" class="tui-page-btn tui-is-selected">{{page}}</a>',
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
};


const pagination = new Pagination(containerPagination, options);

pagination.on('afterMove', loadMoreFilms);

async function loadMoreFilms(event) {

  cleanContainer();

  apiServise.page=event.page;

  const response = await apiServise.getTrendingFilm();

  total = response.total_results;

  console.log(total)

 pagination.setTotalItems(total);

  filmList.insertAdjacentHTML('beforeend', createMarkup(response))

};

export function cleanContainer(){
  filmList.innerHTML = '';
};


async function loadFirstPage() {

  const response = await apiServise.getTrendingFilm();

  pagination.reset(response.total_results)

  const headerCheck = document.querySelector('.side-nav__link');

  if (headerCheck.classList.contains('home')) {
    filmList.insertAdjacentHTML('beforeend', createMarkup(response))
  }
};

loadFirstPage()


