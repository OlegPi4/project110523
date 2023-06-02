function tabs(tabsSelector, tebsContentSelector, tabsParentSelector, activeClass)   {
// Tabs
   const tabs = document.querySelectorAll(tabsSelector),
   tabsContent = document.querySelectorAll(tebsContentSelector),
   tabsParent = document.querySelector(tabsParentSelector);

   // сначала скроем все табы
   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');  // с использованием классов
         item.classList.remove('show', 'fade');  // с использованием классов
      });
      // уберем клас active
      tabs.forEach(item => {
         //работаем в списке класа, .(точка) перед названием класса не нужна 
         item.classList.remove(activeClass);
      })
   }
   // добавление таба в  контент, i - номер таба в списке
   function showTabContent(i = 0) {
      //tabsContent[i].style.display = 'block'; // с использование стилей
      tabsContent[i].classList.add('show', 'fade'); // с использованием классов + add animation
      tabsContent[i].classList.remove('hide'); // с использованием классов
      tabs[i].classList.add(activeClass);
   } 
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         })
      }
   });
}

export default tabs; 