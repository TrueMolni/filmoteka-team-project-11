export default class Spinner {
    parentEl;

    markup = `<div class="backdrop">
    <div class="loader-container">
      <span class="loader"></span>
    </div>
  </div>`;
    backDrop;

    constructor(element) {
        this.parentEl = element;
    }

    show() {
        if (this.backDrop) {
            return;
        }

        this.parentEl.style.position = 'relative';
        this.parentEl.insertAdjacentHTML('beforeend', this.markup);
        this.backDrop = this.parentEl.querySelector('.backdrop');
    }
  
    hide() {
        if (this.backDrop) {
            this.backDrop.remove();
            this.parentEl.style='';
        }

        this.backDrop = null;
    }
  }