const refs = {
    openModalBtn: document.querySelector("[data-open-modal_our-team]"),
    closeModalBtn: document.querySelector("[data-close-modal_our-team]"),
    modal: document.querySelector("[data-modal_our-team]"),  
};

refs.openModalBtn.addEventListener("click", openModalOurTeam);

function openModalOurTeam() {
  refs.modal.classList.remove('is-hidden'); 
  addEventListeners();
}

function closeModal(event) {
  if (event.target.classList.contains('backdropp') || event.key === "Escape"
    || event.currentTarget.classList.contains('button-close-modal')) {
    refs.modal.classList.add('is-hidden');
    removeEventListeners();
  }
}

function removeEventListeners() {
  document.removeEventListener('keydown', closeModal);
  refs.modal.removeEventListener('click', closeModal);
  refs.closeModalBtn.removeEventListener('click', closeModalButton);
}

function addEventListeners() {
  document.addEventListener('keydown', closeModal);
  refs.modal.addEventListener('click', closeModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
}