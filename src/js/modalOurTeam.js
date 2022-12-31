(() => {
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
})();