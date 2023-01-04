import { getRefs } from '../refs';
import { getFilmData } from './findAndAuditLS';
import { loadDataFromLS, setDataToLS } from './localStorageData';
import { changeBtnStyle } from '../changeModalBtn';

const refs = getRefs();

refs.divModal.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-film__btn-watched')) {
    const modalWatchedBtn = e.target;
    console.log(modalWatchedBtn.dataset.id)
    modalWatchedBtn.addEventListener('click', onAddToLS('watched', modalWatchedBtn, modalWatchedBtn.dataset.id));
  } else if ((e.target.classList.contains('modal-film__btn-queque')) ) {
    const modalQueueBtn = e.target;
    console.log(modalQueueBtn.dataset.id)
    modalQueueBtn.addEventListener('click', onAddToLS('queue', modalQueueBtn, modalQueueBtn.dataset.id));
  }
});

localStorage.setItem('watched', '[]');
localStorage.setItem('queue', '[]');

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

const removeMovieFromLocalStorage = async (localStorageKey, newFilm) => {
  await newFilm.then(newFilm => {
    try {
      const currentDataArray = loadDataFromLS(localStorageKey);
      const newDataArray = [];
      if (currentDataArray.find(film => film.id === newFilm.id)) {
        currentDataArray.forEach(film => {
          if (film.id !== newFilm.id) newDataArray.push(film);
        });
        setDataToLS(localStorageKey, newDataArray);
      }
    } catch (err) {
      console.error('Get LocslStorage error: ', err);
    }
  });
};

const addMovieToLocalStorage = async (localStorageKey, newFilm) => {
  await newFilm.then(newFilm => {
    try {
      const currentDataArray = loadDataFromLS(localStorageKey);
      const newDataArray = newFilm;
      if (currentDataArray.find(film => film.id === newFilm.id)) {
        return;
      } else {
        currentDataArray.push(newDataArray);
        setDataToLS(localStorageKey, currentDataArray);
      }
    } catch (err) {
      console.error('Get LocslStorage error: ', err);
    }
  });
};
