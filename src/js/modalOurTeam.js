const refs = {
    openModalBtn: document.querySelector("[data-open-modal_our-team]"),
    closeModalBtn: document.querySelector("[data-close-modal_our-team]"),
    modal: document.querySelector("[data-modal_our-team]"),
  };

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modal.classList.toggle("is-hidden");
}

refs.modal.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalKeyESC);

function closeModal(event) {
  if (event.target.classList.contains('backdropp')){
    refs.modal.classList.toggle("is-hidden")
  }
}

function closeModalKeyESC(event) {
  if (event.key === "Escape") {
    refs.modal.classList.toggle("is-hidden")
  }
}