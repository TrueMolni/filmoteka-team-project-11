import {getById} from './api';
import {parseOneFilm} from './parseApiToLS';

export function getFilmData (targetCardId, base) {
    try {
        localStorageArray = JSON.parse(localStorage.getItem(base));
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
        cardItem = findAndAdd(localStorageArray, targetCardId);
    if (cardItem) {
        isAdded = true;
        return cardItem;
    }
    return findCardItem(targetCardId).then(cardItem => {
        return cardItem;
    });
}

function findCardItem (targetCardId) {
    return getById(targetCardId).then(data => {
        // console.log(data);
        cardItem = data;
        return parseOneFilm(cardItem);
    }
    );
}

function findAndAdd (currentArray, targetCardId) {
    let cardItem;
    currentArray.forEach(item => {
        if (item.id === Number(targetCardId)) {
            cardItem = item;
        }
        return cardItem;
    })
}