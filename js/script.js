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

   // выводим fetch в отдельную функцию для получения данных с json сервера   
   const getResourse = async (url) => {
      const res = await fetch(url);

      if (!res.ok) { 
         throw new Error(`Coudn't fetch ${url}, status ${res.status}`);
      }
      return await res.json();
   };
   // формирование карточек меню из данных сервера json
   // вариант 1 - предпочтительный с исп. классов
   // getResourse('http://localhost:3000/menu')
   //    .then(data => {
   //       data.forEach(({ img, altimg, title, descr, price }) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       });
   //    });
   // вариант 1 - предпочтительный с исп. классов и axios  
   axios.get('http://localhost:3000/menu')
      .then(data => {
         data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });
   // вариант 2 - для формирования верстки с ходу (без использования классов)

   // const courseOfCurrency = 36.93; // привязка к курсу для цены в карточках
   // getResourse('http://localhost:3000/menu')
   //    .then(data => creatCard(data));
   // function creatCard(data) {
   //    data.forEach(({ img, altimg, title, descr, price }) => {
   //       const element = document.createElement('div');
   //       element.classList.add('menu__item');
   //       element.innerHTML = `
   //          <img src=${img} alt=${altimg}>
   //             <h3 class="menu__item-subtitle">${title}</h3>
   //             <div class="menu__item-descr">${descr}</div>
   //             <div class="menu__item-divider"></div>
   //             <div class="menu__item-price">
   //                <div class="menu__item-cost">Цена:</div>
   //                <div class="menu__item-total"><span>${price*courseOfCurrency}</span> грн/день</div>
   //             </div>
   //       `;
   //       document.querySelector('.menu .container').append(element);
   //    });
   // }

   // Берем данные из форм на сайте и отправляем на сервер 
   const forms = document.querySelectorAll('form');

   const messag = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся.',
      failure: 'Что-то пошло не так...'
   };
   
   forms.forEach(item => {
      bindPostData(item);
   });
// выводим fetch в отдельную функцию для отправки данных   
   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });
      // возвращаем промис res в json формате 
      return await res.json();
   };

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
   
   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));

   // Слайдер 
   const slides = document.querySelectorAll('.offer__slide'),
      next = document.querySelector('.offer__slider-next'),
      prev = document.querySelector('.offer__slider-prev'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current');
   
   let slideIndex = 1;
   // Установка начального слайда
   showSlides(slideIndex);
   // Устанавливаем число слайдов длясчеткика и добавляем ведущий 0 если < 10
   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
   } else {
      total.textContent = slides.length;
   }

   // функция показа слайда
   function showSlides(n) {
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;
      // скрываем слайды
      slides.forEach(item => item.style.display = 'none');
      // показываем нужный слайд
      slides[slideIndex - 1].style.display = 'block';
      // обрабатывам текущий слайд для чсетчика
      if (slideIndex < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
   }
   // изменение слайда 
   function plusSlides(n) {
      showSlides(slideIndex += n);
   }
   // обработчики нажатий на стрелки
   prev.addEventListener('click', () => {
      plusSlides(-1);
   });
   next.addEventListener('click', () => {
      plusSlides(1);
   });
});

