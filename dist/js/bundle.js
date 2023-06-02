/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/


window.addEventListener('DOMContentLoaded', () => {
   
   const calculator = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/calculator'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
      cards = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/cards'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
      modalWind = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/modalwind'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
      slider = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modiles/slider'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
      tabs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/tabs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
      timer = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/timer'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

   tabs();
   timer();
   cards();
   modalWind();
   calculator();
   slider();
   
});


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7VUFBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7O0FDdEJhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsbUpBQXNCO0FBQ3BELGNBQWMsbUJBQU8sQ0FBQyw4SUFBaUI7QUFDdkMsa0JBQWtCLG1CQUFPLENBQUMsa0pBQXFCO0FBQy9DLGVBQWUsbUJBQU8sQ0FBQywrSUFBa0I7QUFDekMsYUFBYSxtQkFBTyxDQUFDLDZJQUFnQjtBQUNyQyxjQUFjLG1CQUFPLENBQUMsOElBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0MTEwNTIzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QxMTA1MjMvLi9zcmMvanMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgXHJcbiAgIGNvbnN0IGNhbGN1bGF0b3IgPSByZXF1aXJlKCcuL21vZHVsZXMvY2FsY3VsYXRvcicpLFxyXG4gICAgICBjYXJkcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9jYXJkcycpLFxyXG4gICAgICBtb2RhbFdpbmQgPSByZXF1aXJlKCcuL21vZHVsZXMvbW9kYWx3aW5kJyksXHJcbiAgICAgIHNsaWRlciA9IHJlcXVpcmUoJy4vbW9kaWxlcy9zbGlkZXInKSxcclxuICAgICAgdGFicyA9IHJlcXVpcmUoJy4vbW9kdWxlcy90YWJzJyksXHJcbiAgICAgIHRpbWVyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RpbWVyJyk7XHJcblxyXG4gICB0YWJzKCk7XHJcbiAgIHRpbWVyKCk7XHJcbiAgIGNhcmRzKCk7XHJcbiAgIG1vZGFsV2luZCgpO1xyXG4gICBjYWxjdWxhdG9yKCk7XHJcbiAgIHNsaWRlcigpO1xyXG4gICBcclxufSk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=