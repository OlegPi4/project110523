'use strict';

window.addEventListener('DOMContentLoaded', () => {
   // Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
   
   // сначала скроем все табы
   function hideTabContent() {
      tabsContent.forEach(item => {
         //item.style.display = 'none'; // с использование стилей
         item.classList.add('hide');  // с использованием классов
         item.classList.remove('show', 'fade');  // с использованием классов
      });
      // уберем клас active
      tabs.forEach(item => {
         //работаем в списке класа, .(точка) перед названием класса не нужна 
         item.classList.remove('tabheader__item_active');
      })
   }
   // добавление таба в  контент, i - номер таба в списке
   function showTabContent(i = 0) {
      //tabsContent[i].style.display = 'block'; // с использование стилей
      tabsContent[i].classList.add('show', 'fade'); // с использованием классов + add animation
      tabsContent[i].classList.remove('hide'); // с использованием классов
      tabs[i].classList.add('tabheader__item_active');
   } 
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         })
      }
   });

   // Timer
   const deadLine = '2023-05-25'; // дата дедлайна

   // функция определения времени м-у текущим и дедлайном
   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());

      if (t <= 0) { // если дата прошла
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(((t / (1000 * 60 * 60)) % 24)-3),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      }
      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }
   //функция добавления первого нуля для одноцифровых значений
   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   // функция установки значений в таймере
   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);
      
      updateClock();  // разовый запуск установки реальных значений при загрузке страницы
      // обновление таймера
      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
      //  проверка или таймер не закончился
         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   } 

   setClock('.timer', deadLine);
   // Модальное окно
   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');
   // modalCloseBtn = document.querySelector('[data-close]');   
   // выводим в функцию открытия  модального окна
   function openModal() {
      //modal.classList.add('hide');
      //modal.classList.remove('show');
      modal.classList.toggle('show'); // вариант с использованием toggle
      // восстанавливаем скрол сайта при закрытии мадольного  окна
      document.body.style.overflow = 'hide';
      // Если пользователь сам открыл мо - отключаем setTimeout
      clearTimeout(modalTimerId);
   }
      // выводим в функцию закрытие модального окна
   function closeModal() {
      //modal.classList.add('hide');
      //modal.classList.remove('show');
      modal.classList.toggle('show'); // вариант с использованием toggle
      // восстанавливаем скрол сайта при закрытии мадольного  окна
      document.body.style.overflow = '';
   }
      modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });
   //  modalCloseBtn.addEventListener('click', closeModal);
   // закрытия мо при клике вне модального окна или на крестик в мо и клавише Esc
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
      }
   });
   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   })
   // Устанавливаем вывод модального окна после заданого времени открытия сайта пользователем 10с.
   const modalTimerId = setTimeout(openModal, 10000);
   // вывод мо, если пользователь прошел до конца страницы
   // ---вывод мо -> в функцию
   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.
      documentElement.scrollHeight) {
         openModal();
         // делаем открытие мо в конце страницы - разовым
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

   // Используем классы для карточек меню
   class MenuCard {
      constructor(srcImg, altImg, title, descr, price, parentSelector, ...classes) {
         this.srcImg = srcImg;
         this.altImg = altImg;
         this.title = title;
         this.descr = descr; 
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 37; 
         this.changeToUAH(); 
      }
      // метод конвертации цены в гривны
      changeToUAH() {
         this.price = this.transfer * this.price;
      } 
      // метод формирующий верстку
      render() {
         const element = document.createElement('div');
         // проверка classes, если в параметрах нет - прорисываем 'menu__item'
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }
         
         // можно убрать наружную обертку menu__item
         element.innerHTML = `
               <img src=${this.srcImg} alt=${this.altImg}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            `;
         this.parent.append(element);
      }
   }
   // вызов карточки без создания переменной
   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
      'menu__item',
      'big'
   ).render();
   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная  рыба,  морепродукты, фрукты -   ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
      'menu__item'
   ).render();
   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      12,
      '.menu .container',
      'menu__item'
   ).render();

   // Берем данные из форм на сайте и отправляем на сервер 
   const forms = document.querySelectorAll('form');

   const messag = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      failure: 'Что-то пошло не так...'
   };
   
   forms.forEach(item => {
      postData(item);
   });

   function postData(form) {
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
         // Реализация с Fetch
         
         const formData = new FormData(form); 
         const object = {};
         formData.forEach(function (value, key) {
            object[key] = value;
         });
         
         fetch('server.php', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
         })
         .then(data => data.text())
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
      openModal();
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
         closeModal();
      }, 4000);
   }
   
});
