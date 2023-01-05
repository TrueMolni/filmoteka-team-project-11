export const getRefs = () => {
  return {
    modalWatchedBtn: document.querySelector('.modal-film__btn-watched'),
    modalQueueBtn: document.querySelector('.modal-film__btn-queque'),
    watchedBtn: document.querySelector('#js-WatchedButton'),
    queueBtn: document.querySelector('#js-QueueButton'),
    galleryItems: document.querySelector('.film__list'),
    myLibrary: document.querySelector('#my-library'),
    divModal: document.querySelector('.modal'),
    filmGallery: document.querySelector('.film__list'),
    backdrop: document.querySelector('.backdrop'),
    closeButton: document.querySelector('.close-button'),
    iconSun: document.querySelector('[data-action="light"]'),
    iconMoon: document.querySelector('[data-action="dark"]'),
    footerContainer: document.querySelector('.footer'),
    footerText: document.querySelector('.footer__descr'),
    footerBtn: document.querySelector('.footer__btn'),
  };
};
