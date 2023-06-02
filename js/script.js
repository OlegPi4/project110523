'use strict';

import calculator from './modules/calculator';
import cards from './modules/cards';
import modalwind from './modules/modalwind';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import form from './modules/form';
import { openModal } from './modules/modalwind';

window.addEventListener('DOMContentLoaded', () => {
   // Устанавливаем вывод модального окна после заданого времени открытия сайта пользователем 10с.
   const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2023-06-20');
   cards();
   modalwind('[data-modal]', '.modal', modalTimerId);
   calculator();
   slider({
      container: '.offer__slider',
      nextArrow: '.offer__slider-next',
      slide: '.offer__slide',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field:'.offer__slider-inner'
   });
   form('form', modalTimerId);
   
});
