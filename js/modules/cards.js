import { getResource } from "../services/services";

function cards() {
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
   // axios.get('http://localhost:3000/menu')
   //    .then(data => {
   //       data.data.forEach(({ img, altimg, title, descr, price }) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       });
   //    });
   getResource('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });
}

export default cards;
