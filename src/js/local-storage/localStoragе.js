import {getRefsLS} from './getRefsLS';
import {getFilmData} from './findAndAuditLS';
import {loadDataFromLS, setDataToLS} from './localStorageData';

const refs = getRefsLS();

localStorage.setItem("watched", "[]");
localStorage.setItem("queue", "[]");

refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

// відстежуємо, на яку кнопку клацнув користвуач, і повертаємо відповідний ключ 
function getCurrentBase() {
    if (refs.modalWatchedBtn.classList.contains('modal-film__btn-watched')) return 'watched';
    if (refs.modalQueueBtn.classList.contains('modal-film__btn-queque')) return 'queue';
}

// Функція по кліку на кнопу, яка додає або видяляє фільм в Local Storage
function onAddToLS(e) {
    const targetBtn = e.target;
    const localStorageKey = targetBtn === refs.modalWatchedBtn ? 'watched' : 'queue';


    // ТИМЧАСОВА КОНСТРУКЦІЯ ПОКИ НЕ ВІДОМО ЗВДКИ БРАТИ ID (БЕРУ РАНДОМНИЙ ID З ФУНКЦІЇ ДАШІ)
    const liItem = document.querySelectorAll('.gallery__item');
    const getRandomId = Array.prototype.map.call (liItem, function (liId) {
        let result = parseInt(liId.dataset.id); 
        return result
    });
    const randId = Math.floor(Math.random() * getRandomId.length);


    const filmId = getRandomId[randId]; // id фільму, який хоче додати або видалити користувач з Local Storage
    const currentDataArray = loadDataFromLS(localStorageKey); // масив з даними з Local Storage
    if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) { // якщо фільм з даним id є у Local Storage, видаляємо
        removeMovieFromLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
        isAdded = false;

        // changeBtnStyle(targetBtn, localStorageKey); // ПОТРІБНО СТВОРИТИ Функція для зміни стилю кнопки при кліку
    } else {
        addMovieToLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase())); // якщо фільму немає в Local Storage, додаємо');
        isAdded = true;

        // changeBtnStyle(targetBtn, localStorageKey); // ПОТРІБНО СТВОРИТИ Функція для зміни стилю кнопки при кліку
    }
}

// Функція видалення фільму вибраного фільму з з Local Storage
const removeMovieFromLocalStorage = async (localStorageKey, newFilm) => {
    await newFilm.then(newFilm => {
        try {
            const currentDataArray = loadDataFromLS(localStorageKey);
            // Завантажуємо наявний масив з фільмів у Local Storage
            const newDataArray = [];
            // Створюємо новий масив
            if (currentDataArray.find(film => film.id === newFilm.id)) {
            // Знаходимо фільм в нашому масиві фільмів який співпадає по id з фільмом який потрібно видалити
            currentDataArray.forEach(film => {
            if (film.id !== newFilm.id) newDataArray.push(film);
            // Пушимо в новий масив всі фільми крім того який ми маємо видалити
            });
            setDataToLS(localStorageKey, newDataArray);
            // Записуємо новий масив у local Storage
            };
        }
        catch (err) {
            console.error('Get LocslStorage error: ', err);
        }
    })
    
}

// Функція додавання фільму вибраного фільму з з Local Storage
const addMovieToLocalStorage = async (localStorageKey, newFilm) => {
    await newFilm.then(newFilm => {
        try {
            const currentDataArray = loadDataFromLS(localStorageKey);
            // Завантажуємо наявний масив з фільмів у Local Storage
            const newDataArray = newFilm;
            if (currentDataArray.find(film => film.id === newFilm.id)) {
                // Перевіряємо по id чи є уже такий в Local Storage, якщо є - виходимо
                return;
            } else {
                currentDataArray.push(newDataArray);
                // Якщо немає, пушимо новий фільм у масив з усіма фільмами в колекції
                setDataToLS(localStorageKey, currentDataArray);
            };
        }
        catch (err) {
            console.error('Get LocslStorage error: ', err);
        }
    })
    
}