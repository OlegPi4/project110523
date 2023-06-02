function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

   // Слайдер 
   const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),  
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
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
}

export default slider;