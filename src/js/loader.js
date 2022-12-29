export default spinner = {
    // Визначаємо елемент, куди будемо вставляти розмітку для спінера
        documentBody: document.querySelector('body'),
        
    // Тіло спінера
        markup: `<div class="backdrop">
          <div class="loader-container">
            <span class="loader"></span>
          </div>
         </div>`,
    
    // Викликаємо цей метод для того щоб спінер було видно, в той час
    // коли фетчаться фільми
        show() {
          this.documentBody.insertAdjacentHTML('afterend', this.markup);
        },
    // Викликаємо цей метод, коли фільми зафетчились і треба сховати спінер
        hide() {
            const spinnerBody= document.querySelector('.backdrop')
            spinnerBody.remove();
        }
      }
    