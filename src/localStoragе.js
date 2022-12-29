refs = {
    modalWatchedBtn: document.querySelector('.modal-film__btn-watched'),
    modalQueueBtn:   document.querySelector('.modal-film__btn-queque'),
    headerContainer: document.querySelector('.header__container'),
}

// Кнопки, по кліку на які відбувається подія ADD TO WATCHED та ADD TO QUEUE
refs.modalWatchedBtn.addEventListener('click', onAddToLS);
refs.modalQueueBtn.addEventListener('click', onAddToLS);

// Функція додає фільм до Local Storage
function onAddToLS(e) {
    const targetBtn = e.target;
    const localStorageKey = targetBtn === refs.modalWatchedBtn ? 'watched' : 'queue'; // кнопка на яку клацнув користувач (watched або queue)
    const filmId = targetBtn.parentNode.previousElementSibling.children.dataset.id; // id фільму, який хоче додати користувач
    const currentDataArray = loadDataFromLS(localStorageKey); // масив з даними з Local Storage

    if (currentDataArray.find(film => film.id === Number(filmId)) !== undefined) {
        // якщо фільм з даним id є у Local Storage, видаляємо
        removeMovieFromLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
        isAdded = false;
        changeBtnStyle(targetBtn, localStorageKey); // ПОТРІБНО СТВОРИТИ Функція для зміни стилю кнопки при кліку
    } else {
        // console.log('немає в Local Storage, додаємо');
        addMovieToLocalStorage(localStorageKey, getFilmData(filmId, getCurrentBase()));
        isAdded = true;
        changeBtnStyle(targetBtn, localStorageKey); // ПОТРІБНО СТВОРИТИ Функція для зміни стилю кнопки при кліку
    }
}

const removeMovieFromLocalStorage = (localStorageKey, newFilm) => {
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

const addMovieToLocalStorage = (localStorageKey, newFilm) => {
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

// Приймає назву ключа `localStorageKey` (кнопку, на яку клацнув користувач (watched або queue) і значення - масив фільмів `object`.
const setDataToLS = (localStorageKey, object) => {
    try {
        if (Array.isArray(object)) {
        // перевіряє чи є об'єкт масивом
        const string = JSON.stringify(object);
        localStorage.setItem(localStorageKey, string);
        // Записує оновлений масив в Local Storage
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Set LocalStorage error: ', err);
    }
};

// Функція, яка повертає об'єкт з карточкою фільму, якщо фільм не повторюється
function getFilmData(targetCardId, base = 'tempQuery') {
const localStorageArray = JSON.parse(localStorage.getItem(base)); // отримуємо масив з усіма фільмами (з Local Storage по ключу)
    // знаходить об'єкт за id, перевіряє його на наявність фільму в Local Storage
        cardItem = findAndAdd(localStorageArray, targetCardId);
    if (cardItem) {
        // console.log('виконується, якщо cardItem не null, фільм є в Local Storage, cardItem');
        isAdded = true;
        return cardItem;
    }
    findCardItem(targetCardId).then(cardItem => {
        // console.log('виконується, якщо cardItem null, фільму немає в Local Storage, cardItem');
        // renderFilmCard(cardItem);
        return cardItem;
    });
}

// Шукає потрібний фільм на сервері і повертає карточку фільму
function findCardItem(targetCardId) {
    // ПОТРІБНО СТВОРИТИ fetchGetMovieById(targetCardId), функція яка дає запит на сервер і повертає нам інформації по фільму з заданим id
    return fetchGetMovieById(targetCardId).then(data => {
        cardItem = findAndAdd(data, targetCardId);
        cardItem.genre_ids = data.genres.map(genre => genre.id);
        return parseOneFilm(cardItem); // ПОТРІБНО СТВОРИТИ, функція яка повертає разпарсену і створену карточку фільму
    });
}

function findAndAdd(currentArray, targetCardId) {
    let cardItem;
    //знаходить потрібну карточку фільму в масиві фільмів
    currentArray.forEach(item => {
        if (item.id === Number(targetCardId)) {
            cardItem = item;
        }
        return cardItem;
    })
}

// відстежуємо, де зараз знаходиться користувач
function getCurrentBase() {
    const refs = getRefs();
    if (refs.headerContainer.classList.contains('home')) return;
    // якщо користувач в даний момент на сторінці home, вийти
    if (refs.headerContainer.classList.contains('my-library')) {
        if (refs.watchedBtn.classList.contains('current')) return 'watched';
        if (refs.queueBtn.classList.contains('current')) return 'queue';
    }
    // якщо користувач в даний момент на сторінці my library, перевірити на якій він вкладці. Якщо на watched, повернути 'watched', якщо на queue, повернути queue
    return;
}

  // Приймає назву ключа `localStorageKey` (кнопку, на яку клацнув користувач (watched або queue) по якому буде створена колекція
const loadDataFromLS = localStorageKey => {
    try {
        let string = localStorage.getItem(localStorageKey);
        if (string === null) {
        string = '[]';
        // створюється пустий масив, якщо немає ключа
        }
        const data = JSON.parse(string);
        if (Array.isArray(data)) {
        return data;
        // Повертаємо масив з колекцією фільмів
        } else {
        throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
};