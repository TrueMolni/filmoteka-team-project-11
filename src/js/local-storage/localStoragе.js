import {getRefsLS} from './getRefsLS';
import {getFilmData} from './findAndAuditLS';
import {loadDataFromLS, setDataToLS} from './localStorageData';
import {changeBtnStyle} from './changeModalBtn';

const refs = getRefsLS();

localStorage.setItem("watched", "[]");
localStorage.setItem("queue", "[]");

refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

function getCurrentBase() {
    if (refs.modalWatchedBtn.classList.contains('modal-film__btn-watched')) return 'watched';
    if (refs.modalQueueBtn.classList.contains('modal-film__btn-queque')) return 'queue';
}

function onAddToLS(e) {
    const targetBtn = e.target;
    const localStorageKey = targetBtn === refs.modalWatchedBtn ? 'watched' : 'queue';

    // ТИМЧАСОВА КОНСТРУКЦІЯ ПОКИ НЕ ВІДОМО ЗВДКИ БРАТИ ID (БЕРУ РАНДОМНИЙ З ПРИДУМАНОГО МНОЮ МАСИВУ З 4-х карточок)
    const getRandomId = [661374, 76600, 877269, 668482]
    const randId = Math.floor(Math.random() * getRandomId.length);

    const filmId = getRandomId[randId]; // id фільму, який хоче додати або видалити користувач з Local Storage
    const currentDataArray = loadDataFromLS(localStorageKey);
    if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) {
        removeMovieFromLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
        isAdded = false;

        changeBtnStyle(targetBtn, localStorageKey);
    } else {
        addMovieToLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
        isAdded = true;

        changeBtnStyle(targetBtn, localStorageKey); 
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
            };
        }
        catch (err) {
            console.error('Get LocslStorage error: ', err);
        }
    })
    
}

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
            };
        }
        catch (err) {
            console.error('Get LocslStorage error: ', err);
        }
    })
    
}

/*
<div class="modal-film__buttons">
    <button type="button" class="modal-film__btn-watched current">add to Watched</button>
    <button type="button" class="modal-film__btn-queque current">add to queue</button>
</div>
*/