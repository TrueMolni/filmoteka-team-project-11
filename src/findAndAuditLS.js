import {getById} from './js/getById';
import {parseOneFilm} from './parseApiToLS';


// Функція, яка повертає об'єкт з карточкою фільму, якщо фільм не повторюється
export const getFilmData = function (targetCardId, base) {
    localStorageArray = JSON.parse(localStorage.getItem(base));
    console.log(localStorageArray)
    // отримуємо масив з усіма фільмами (з Local Storage по ключу)
    // знаходить об'єкт за id, перевіряє його на наявність фільму в Local Storage
        cardItem = findAndAdd(localStorageArray, targetCardId);
    if (cardItem) {
        // console.log('виконується, якщо cardItem не null, фільм є в Local Storage, cardItem');
        isAdded = true;
        return cardItem;
    }
    return findCardItem(targetCardId).then(cardItem => {
        // console.log('виконується, якщо cardItem null, фільму немає в Local Storage, cardItem');      
        return cardItem;
    });
}

// Шукає потрібний фільм на сервері і повертає карточку фільму
function findCardItem (targetCardId) {
    // ПОТРІБНО СТВОРИТИ fetchGetMovieById(targetCardId), функція яка дає запит на сервер і повертає нам інформації по фільму з заданим id
    return getById(targetCardId).then(data => {
        console.log(data);
        cardItem = data;
        return parseOneFilm(cardItem);
    }
    );
}

//Функція пошуку і перевірки перевірки фільму в Local Storge
function findAndAdd (currentArray, targetCardId) {
    let cardItem;
    //знаходить потрібну карточку фільму в масиві фільмів
    currentArray.forEach(item => {
        if (item.id === Number(targetCardId)) {
            cardItem = item;
        }
        return cardItem;
    })
}