export const getRefs = () => {
    return {
        modalWatchedBtn: document.querySelector('.modal-film__btn-watched'),
        modalQueueBtn:   document.querySelector('.modal-film__btn-queque'),
        watchedBtn:      document.querySelector('#js-WatchedButton'),
        queueBtn:        document.querySelector('#js-QueueButton'),
        galleryItems:    document.querySelector('.film__list'),
        myLibrary:       document.querySelector('#my-library'),
        divModal:        document.querySelector('.modal'),
        toTopBtn:        document.querySelector('.btn-to-top'),
        iconSun:         document.querySelector('.header__themes-icon'),
    };  
};