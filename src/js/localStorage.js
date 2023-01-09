import { getRefs } from './refs';
import { getFilmData } from './findAndAuditLS';
import { loadDataFromLS, setDataToLS } from './localStorageData';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-top',
  distance: '5px',
  
  clickToClose: true,
  timeout: 2500,
});


const refs = getRefs();
let isAdded = false;


refs.divModal.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-film__btn-watched')) {
    const modalWatchedBtn = e.target;
    // console.log(modalWatchedBtn.dataset.id)
    modalWatchedBtn.addEventListener('click', onAddToLS('watched', modalWatchedBtn, modalWatchedBtn.dataset.id));
    
  } else if ((e.target.classList.contains('modal-film__btn-queque')) ) {
    const modalQueueBtn = e.target;
    // console.log(modalQueueBtn.dataset.id)
    modalQueueBtn.addEventListener('click', onAddToLS('queue', modalQueueBtn, modalQueueBtn.dataset.id));
    
  }
});

export function onAddToLS(key, targetBtn, id) {
  const filmId = Number(id); 
  const currentDataArray = loadDataFromLS(key);
  if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) {
    removeMovieFromLocalStorage(
      key,
      getFilmData(filmId, key)
    );
    isAdded = false;

    changeBtnStyle(targetBtn, key);
  } else {
    addMovieToLocalStorage(
      key,
      getFilmData(filmId, key)
    );
    isAdded = true;

    changeBtnStyle(targetBtn, key);
  }
}
async function removeMovieFromLocalStorage (localStorageKey, newFilm) {
  await newFilm.then(newFilm => {
    try {
      const currentDataArray = loadDataFromLS(localStorageKey);
      const newDataArray = [];
      if (currentDataArray.find(film => film.id === newFilm.id)) {
        currentDataArray.forEach(film => {
          if (film.id !== newFilm.id) newDataArray.push(film);
        });
        setDataToLS(localStorageKey, newDataArray);
      Notiflix.Notify.info(
      `${newFilm.title} succesfully removed from "${localStorageKey}"!`
      );
      }
    } catch (err) {
      console.error('Get LocslStorage error: ', err);
    }
  });
};

async function addMovieToLocalStorage (localStorageKey, newFilm) {
  await newFilm.then(newFilm => {
    try {
      const currentDataArray = loadDataFromLS(localStorageKey);
      const newDataArray = newFilm;
      if (currentDataArray.find(film => film.id === newFilm.id)) {
        return;
      } else {
        currentDataArray.push(newDataArray);
        setDataToLS(localStorageKey, currentDataArray);
        Notiflix.Notify.success(
          `${newFilm.title} succesfully added to "${localStorageKey}"!`
          );
      }
    } catch (err) {
      console.error('Get LocslStorage error: ', err);
    }
  });
};


export function checkAdd(localStorageKey, targetCardId, targetBtn) {
  if (loadDataFromLS(localStorageKey).some(film => film.id === Number(targetCardId))) {
    isAdded = true;
  } else isAdded = false;
  changeBtnStyle(targetBtn, localStorageKey);
}

export function changeBtnStyle (targetBtn, keyLS) {
  // console.log(isAdded)
  targetBtn.style.color = isAdded ? '#fff' : '';
  targetBtn.style.backgroundColor = isAdded ? '#ff6b08' : '';
  targetBtn.textContent = isAdded ? `remove from ${keyLS}` : `add to ${keyLS}`
  isAdded = false;
}