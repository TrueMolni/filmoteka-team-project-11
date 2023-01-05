// import { setLightThemModalOurTeam, setDarkThemModalOurTeam } from './modalOurTeam';
// import { getRefs } from './refs';
// const refs = getRefs();

import { getRefs } from './refs';

const refs = getRefs();


refs.openModalOurTeam.addEventListener("click", openModalOurTeam);

function openModalOurTeam() {
  refs.modalOurTeam.classList.remove('is-hidden'); 
  document.body.style.overflow = 'hidden'
  addEventListeners();
}

function closeModal(event) {
  if (event.target.classList.contains('backdropp') || event.key === "Escape"
    || event.currentTarget.classList.contains('button-close-modal')) {
    refs.modalOurTeam.classList.add('is-hidden');
    document.body.style.overflow = 'visible'
    removeEventListeners();
  }
}

function removeEventListeners() {
  document.removeEventListener('keydown', closeModal);
  refs.modalOurTeam.removeEventListener('click', closeModal);
  refs.closeModalOurTeam.removeEventListener('click', closeModal);
}

function addEventListeners() {
  document.addEventListener('keydown', closeModal);
  refs.modalOurTeam.addEventListener('click', closeModal);
  refs.closeModalOurTeam.addEventListener('click', closeModal);
}

 export function setDarkThemModalOurTeam({socialIcons, listEmployeItem, titleModalOurTeam, iconClose,modalTeam, socialIconsDisabled }) {
  socialIcons.forEach(element => element.classList.add('social-icons__themDark'));
  socialIconsDisabled.forEach(element => element.classList.add('social-icons__disabled--themDark'));
  listEmployeItem.forEach(element => element.classList.add('list-employees-item__themDark'));
  iconClose.classList.add('icon-close__themDark');
  modalTeam.classList.add('modal_our-team__themDark');
  titleModalOurTeam.classList.add('title_modal_our-team__themDark');

};



export function setLightThemModalOurTeam({ socialIcons, listEmployeItem, titleModalOurTeam, iconClose, modalTeam, socialIconsDisabled }) {
  socialIcons.forEach(element => element.classList.remove('social-icons__themDark'));
  socialIconsDisabled.forEach(element => element.classList.remove('social-icons__disabled--themDark'));
  listEmployeItem.forEach(element => element.classList.remove('list-employees-item__themDark'));
  iconClose.classList.remove('icon-close__themDark');
  modalTeam.classList.remove('modal_our-team__themDark');
  titleModalOurTeam.classList.remove('title_modal_our-team__themDark');
};


