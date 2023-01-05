export default class Spinner {
    markup = `<div class="loader-backdrop">
    <div class="loader-container">
      <span class="loader"></span>
    </div>
  </div>`;
    backDrop;

    show() {
        if (this.backDrop) {
            return;
        }

        document.body.insertAdjacentHTML('beforeend', this.markup);
        this.backDrop = document.querySelector('.loader-backdrop');
    }
  
    hide() {
        if (this.backDrop) {
            this.backDrop.remove();
        }

        this.backDrop = null;
    }
  }