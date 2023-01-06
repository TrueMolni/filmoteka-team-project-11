import {getById} from './api';
import {parseOneFilm} from './parseApiToLS';

let cardItem = null;

export function getFilmData (targetCardId, base) {
    try {
        const localStorageArray = JSON.parse(localStorage.getItem(base));
        cardItem = findAndAdd(localStorageArray, targetCardId);
        if (cardItem) {
            isAdded = true;
            return cardItem;
        }
        return findCardItem(targetCardId).then(cardItem => {
            return cardItem;
        });
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
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
    if (currentArray === null) {
        currentArray = [];
    }
    let cardItem;
    currentArray.forEach(item => {
        if (item.id === Number(targetCardId)) {
            cardItem = item;
        }
        return cardItem;
    })
}