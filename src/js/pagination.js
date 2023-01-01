import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import ApiServise from '../js/api'
import { createMarkup } from './markupListMovies';
import { getTrending } from './getTrending.js';

const container = document.getElementById('tui-pagination-container');
const filmList = document.querySelector(".film__list");

let total = 100;
  

const apiServise = new ApiServise;

const options = {
  page:1,
  itemsPerPage: 20,
  totalItems: total,
  visiblePages: 5,
  centerAlign: true,
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
};


const pagination = new Pagination(container, options);

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

function cleanContainer(){
  filmList.innerHTML = '';
};

pagination.movePageTo(1);
