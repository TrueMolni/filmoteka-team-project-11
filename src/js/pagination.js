import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const totalCount = 700;
// const arrowIcon = `${sprite}#icon-arrow`;
// const dotsIcon = `${sprite}#icon-dots`;

const options = {
  page:1,
  itemsPerPage:21,
    totalItems: totalCount,
    visiblePages: 5,
    // centerAlign: true,
    usageStatistics: false,
    template:  {
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
      //  moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">'+'<span class="tui-ico-{{type}}">1111</span>'+'</a>',
      //   disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">'+'<span class="tui-ico-{{type}}">{{type}}</span>'+'</span>',
      //   moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">'+'<span class="tui-ico-ellip">...</span>'+'</a>',
  }

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, options);

const page= pagination.getCurrentPage();


pagination.on('afterMove', loadMoreFilms)
  
function loadMoreFilms(event) {
const currentPage = event.page;
  console.log(currentPage);
  try {
    
  } catch (error) {
    
  }

};