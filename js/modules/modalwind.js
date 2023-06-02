// выводим в функцию открытия  модального окна
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);

   modal.classList.toggle('show'); // вариант с использованием toggle
   // восстанавливаем скрол сайта при закрытии мадольного  окна
   document.body.style.overflow = 'hide';
   // Если пользователь сам открыл мо - отключаем setTimeout
   console.log(modalTimerId);
   if (modalTimerId) {
      clearTimeout(modalTimerId);   
   }
}
// выводим в функцию закрытие модального окна
function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);

   modal.classList.toggle('show'); // вариант с использованием toggle
   // восстанавливаем скрол сайта при закрытии мадольного  окна
   document.body.style.overflow = '';
}
   
function modalwind(triggerSelector, modalSelector, modalTimerId) {
   // Модальное окно
   const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);
   
   modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });      
   // закрытия мо при клике вне модального окна или на крестик в мо и клавише Esc
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });
   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   })
   // вывод мо, если пользователь прошел до конца страницы
   // ---вывод мо -> в функцию
   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.
      documentElement.scrollHeight) {
         openModal(modalSelector, modalTimerId);
         // делаем открытие мо в конце страницы - разовым
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

}

export default modalwind;
export { openModal };
export { closeModal };