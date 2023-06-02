import { closeModal, openModal } from "./modalwind"; 
import { postData } from "../services/services";

function form(formSelector, modalTimerId) {
   // Берем данные из форм на сайте и отправляем на сервер 
   const forms = document.querySelectorAll(formSelector);

   const messag = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      failure: 'Что-то пошло не так...'
   };
   forms.forEach(item => {
      bindPostData(item);
   });

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault(); // отменяем стандартное поведение браузера (перезагрузка при submit)
         // добавляем в form отражение статуса запроса spinner
         const statusMessage = document.createElement('img');
         statusMessage.src = messag.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         
         form.insertAdjacentElement('afterend', statusMessage);
               
         const formData = new FormData(form); 
         const json = JSON.stringify(Object.fromEntries(formData.entries()));
      
         // вызов fetch ч-з функцию postData. отправка данных на сервер
         // указывается на json-server в db.json в массив request 
         // это постинг данных в формате json на json-сервер
         postData('http://localhost:3000/requests', json)
         .then(data => {
            console.log(data);
            showThanksModal(messag.success); // вызов функции показа сообщения об отправке
            statusMessage.remove();
         }).catch(() => {
            showThanksModal(messag.failure);
         }).finally(() => {
            form.reset(); // очищаем форму после отправки.
         });

      });
   };
   // стилизуем ч-з js модальное окно при отправке данных
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      
      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);
      // конструируем модальное окно
      // создаем оберку div
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class='modal__content'>
            <div class='modal__close' data-close>×</div>
            <div class="modal__title">${message}</div>
         </div> 
      `;
      // помещаем на страницу в класс modal
      document.querySelector('.modal').append(thanksModal);
      document.querySelector('.modal').classList.add('show');
      
      // восстанавливаем мо через 4с и закрываем
      setTimeout(() => {
         thanksModal.remove();    
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal('.modal');
      }, 4000);
   }
};

export default form;