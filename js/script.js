'use strict';


window.addEventListener('DOMContentLoaded', () => {
   // Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
   
   // сначала скроем все табы
   function hideTabContent() {
      tabsContent.forEach(item => {
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
   const deadLine = '2023-06-05'; // дата дедлайна

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
   // выводим в функцию открытия  модального окна
   function openModal() {
      modal.classList.toggle('show'); // вариант с использованием toggle
      // восстанавливаем скрол сайта при закрытии мадольного  окна
      document.body.style.overflow = 'hide';
      // Если пользователь сам открыл мо - отключаем setTimeout
      clearTimeout(modalTimerId);
   }
      // выводим в функцию закрытие модального окна
   function closeModal() {
      modal.classList.toggle('show'); // вариант с использованием toggle
      // восстанавливаем скрол сайта при закрытии мадольного  окна
      document.body.style.overflow = '';
   }
      modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });
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

   // вариант 1 - предпочтительный с исп. классов и axios  
   axios.get('http://localhost:3000/menu')
      .then(data => {
         data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });
   

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
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),  
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;
      
   let slideIndex = 1;
   let offset = 0; 

   function showCounterSlide(curr = 1) { // выводим текущий слайд в счетчик
      if (slides.length < 10) {
         current.textContent = `0${curr}`;
      } else {
         current.textContent = curr;
      }
   }

   function showDots(dots) {  // формируем точки навигации слайдера
      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = 1;
   }
   function clearValue(val) { // преобразовываем символьное значение в рх в число
      return +val.replace(/\D/g, '');
   } 
   
   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';
   slidesWrapper.style.overflow = 'hidden';
   
   slides.forEach(slide => {
      slide.style.width = width;
   });
   // установка начальных значений счетчика
   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
   }

   slider.style.position = 'relative';
   //обертка для навигации (точек) 
   const indicators = document.createElement('ol'),
         dots = []; // массив с точками
      
   indicators.classList.add('carousel-indicators');
   slider.append(indicators);
   //формируем точки
   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0) {
         dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
   }

   next.addEventListener('click', () => {
      // offset - задает смещение ленты слайдов для показа текущего
      //if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
         if (offset == clearValue(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += clearValue(width);
      }
      // выполняем смещение
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }
      showCounterSlide(slideIndex);
      showDots(dots);
   });
   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = clearValue(width) * (slides.length - 1);
      } else {
         offset -= clearValue(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }
      showCounterSlide(slideIndex);
      showDots(dots);
   });
   // функционал клика на точку 
   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slideIndex = slideTo; // изменяем счетчик на текущий слайд
         // расчитываем смещение
         offset = +width.replace(/\D/g, '') * (slideTo - 1);
         // делаем сдвиг карусели слайдов
         slidesField.style.transform = `translateX(-${offset}px)`;
         // ставим ведущий 0 и выводим счетчик
         showCounterSlide(slideIndex);
         showDots(dots);
      });
   });
   // Калькулятор калорий
   const result = document.querySelector('.calculating__result span');
   let sex, height, weight, age, ratio;
   // устанавливаем начальное значение пол и активность
   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }
   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }
   // установка класа активности в соотвецтвии с localStorage
   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         } 
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      })
   }
   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }
      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal(); 
   // получение статической информации пол и физ, активность
   function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = e.target.getAttribute('data-ratio');
               // добавим значения в localStorage
               localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            // отмечаем по клику клас активности и считаем
            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
         });
      });
   }
   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

   // принимаем значеия input
   function getDynamicInformation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
         // подсвечиваем красным, если вводятся не цифры
         if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
         calcTotal();
      });
   }
   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');

});

