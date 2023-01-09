import { loadDataFromLS } from './localStorageData';
import { getRefs } from './refs';
import Spinner from './loader';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-top',
  distance: '5px',
  
  clickToClose: true,
  timeout: 2500,
});

const loader = new Spinner();

const refs = getRefs();
if (refs.myLibrary.classList.contains('my-library')) {
  showPageMyLibrary('watched');
  refs.watchedBtn.addEventListener('click', onWatchedButtonClick);
  refs.queueBtn.addEventListener('click', onQueueButtonClick);
}

function onWatchedButtonClick(e) {
  e.preventDefault;
  loader.show();
  const spinner = () => {
    setTimeout(() => {
      loader.hide();
    }, 250);
  };
  spinner();
  showPageMyLibrary('watched');
}

function onQueueButtonClick(e) {
  e.preventDefault;
  loader.show();
  const spinner = () => {
    setTimeout(() => {
      loader.hide();
    }, 250);
  };
  spinner();
  showPageMyLibrary('queue');
}

function showPageMyLibrary(keyName) {
  const watchedArr = loadDataFromLS(keyName);
  refs.galleryItems.insertAdjacentHTML('beforeend', createMarkup(watchedArr));
  if (watchedArr.length === 0) {
    Notiflix.Notify.info(
      `Oops...You haven't added a movie yet. Please make your choice.`
    );
    return
  }
  Notiflix.Notify.success(
    `You have ${watchedArr.length} films in your library "${keyName}"!`
  );
  
}

function createMarkup(watchedArr) {
  refs.galleryItems.innerHTML = '';
  const srcImgBase = 'https://image.tmdb.org/t/p/w500';
  if (watchedArr.length >= 1) {
    const markup = watchedArr
      .map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genres,
          vote_average,
          year,
        }) => {
          return `<li class="gallery__item film-card" data-modal-open data-id="${id}">
            <img src="${srcImgBase}${poster_path}" alt="${id}-${original_title}" class="img" data-modal-open/>
            <div class="item__text">
                <h2 class="item__capt">${title}</h2>
                <div class="item__wrap">
                <p class="item__genre">${genres} | ${year}</p>
                <p class="item__rating">${vote_average}</p>
                </div>
            </div>
            </li>`;
        }
      )
      .join('');
    return markup;
  }
  const markup = `<div class="clear-list">
    <h3 class="clear-list__title">Oops...</h3>
    <p class="clear-list__text">You haven't added a movie yet. Please make your choice.</p>
    </div>`;
  return markup;
}
