/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/boardTemplate.js":
/*!*****************************************!*\
  !*** ./src/components/boardTemplate.js ***!
  \*****************************************/
/*! exports provided: createBoardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBoardTemplate", function() { return createBoardTemplate; });
const createBoardTemplate = () => {
  return (
    ` <section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
    </div>

    <div class="board__tasks">
    </div>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/filterTemplate.js":
/*!******************************************!*\
  !*** ./src/components/filterTemplate.js ***!
  \******************************************/
/*! exports provided: createFilterTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterTemplate", function() { return createFilterTemplate; });
const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `
    <input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__all-count">${count}</span></label
      >
    `
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `
    <section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};


/***/ }),

/***/ "./src/components/loadBtnTemplate.js":
/*!*******************************************!*\
  !*** ./src/components/loadBtnTemplate.js ***!
  \*******************************************/
/*! exports provided: createLoadBtnTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLoadBtnTemplate", function() { return createLoadBtnTemplate; });
const createLoadBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};


/***/ }),

/***/ "./src/components/siteMenuTemplate.js":
/*!********************************************!*\
  !*** ./src/components/siteMenuTemplate.js ***!
  \********************************************/
/*! exports provided: createSiteMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSiteMenuTemplate", function() { return createSiteMenuTemplate; });
const createSiteMenuTemplate = () => {
  return (
    ` <section class="control__btn-wrap">
    <input
      type="radio"
      name="control"
      id="control__new-task"
      class="control__input visually-hidden"
    />
    <label for="control__new-task" class="control__label control__label--new-task"
      >+ ADD NEW TASK</label
    >
    <input
      type="radio"
      name="control"
      id="control__task"
      class="control__input visually-hidden"
      checked
    />
    <label for="control__task" class="control__label">TASKS</label>
    <input
      type="radio"
      name="control"
      id="control__statistic"
      class="control__input visually-hidden"
    />
    <label for="control__statistic" class="control__label"
      >STATISTICS</label
    >
  </section>`
  );
};


/***/ }),

/***/ "./src/components/taskEditTemplate.js":
/*!********************************************!*\
  !*** ./src/components/taskEditTemplate.js ***!
  \********************************************/
/*! exports provided: createTaskEditTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTaskEditTemplate", function() { return createTaskEditTemplate; });
const createColorsMarkup = () => {
  return (
    `<input
    type="radio"
    id="color-black-4"
    class="card__color-input card__color-input--black visually-hidden"
    name="color"
    value="black"
  />
  <label
    for="color-black-4"
    class="card__color card__color--black"
    >black</label
  >
  <input
    type="radio"
    id="color-yellow-4"
    class="card__color-input card__color-input--yellow visually-hidden"
    name="color"
    value="yellow"
    checked
  />
  <label
    for="color-yellow-4"
    class="card__color card__color--yellow"
    >yellow</label
  >
  <input
    type="radio"
    id="color-blue-4"
    class="card__color-input card__color-input--blue visually-hidden"
    name="color"
    value="blue"
  />
  <label
    for="color-blue-4"
    class="card__color card__color--blue"
    >blue</label
  >
  <input
    type="radio"
    id="color-green-4"
    class="card__color-input card__color-input--green visually-hidden"
    name="color"
    value="green"
  />
  <label
    for="color-green-4"
    class="card__color card__color--green"
    >green</label
  >
  <input
    type="radio"
    id="color-pink-4"
    class="card__color-input card__color-input--pink visually-hidden"
    name="color"
    value="pink"
  />
  <label
    for="color-pink-4"
    class="card__color card__color--pink"
    >pink</label
  >
    `
  );
};

const createRepeatingDaysMarkup = () => {
  return (
    ` <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-mo-4"
    name="repeat"
    value="mo"
  />
  <label class="card__repeat-day" for="repeat-mo-4"
    >mo</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-tu-4"
    name="repeat"
    value="tu"
    checked
  />
  <label class="card__repeat-day" for="repeat-tu-4"
    >tu</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-we-4"
    name="repeat"
    value="we"
  />
  <label class="card__repeat-day" for="repeat-we-4"
    >we</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-th-4"
    name="repeat"
    value="th"
  />
  <label class="card__repeat-day" for="repeat-th-4"
    >th</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-fr-4"
    name="repeat"
    value="fr"
    checked
  />
  <label class="card__repeat-day" for="repeat-fr-4"
    >fr</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    name="repeat"
    value="sa"
    id="repeat-sa-4"
  />
  <label class="card__repeat-day" for="repeat-sa-4"
    >sa</label
  >
  <input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-su-4"
    name="repeat"
    value="su"
    checked
  />
  <label class="card__repeat-day" for="repeat-su-4"
    >su</label
  >
    `
  );
};

const createTaskEditTemplate = (task) => {
  const {} = task;

  const color = `blue`;
  const description = `Example default task with default color.`;
  const date = `23 September`;
  const time = `16:23`;

  const classRepeat = `card--repeat`;
  const classDeadline = `card--deadline`;
  const colorsMarkup = createColorsMarkup();
  const repeatingDaysMarkup = createRepeatingDaysMarkup();

  return (
    `<article class="card card--edit card--${color} ${classRepeat} ${classDeadline}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">yes</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${date} ${time}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                 ${repeatingDaysMarkup}
                </div>
              </fieldset>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsMarkup}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};


/***/ }),

/***/ "./src/components/taskTemplate.js":
/*!****************************************!*\
  !*** ./src/components/taskTemplate.js ***!
  \****************************************/
/*! exports provided: createTaskTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTaskTemplate", function() { return createTaskTemplate; });
const createTaskTemplate = (task) => {
  const {} = task;

  const color = `yellow`;
  const description = `Example default task with default color.`;
  const date = `23 September`;
  const time = `16:23`;
  const isArchive = true;
  const isFavorite = false;

  const classRepeat = `card--repeat`;
  const classDeadline = `card--deadline`;
  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${classRepeat} ${classDeadline}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time"${time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_siteMenuTemplate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/siteMenuTemplate.js */ "./src/components/siteMenuTemplate.js");
/* harmony import */ var _components_filterTemplate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/filterTemplate.js */ "./src/components/filterTemplate.js");
/* harmony import */ var _components_boardTemplate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/boardTemplate.js */ "./src/components/boardTemplate.js");
/* harmony import */ var _components_taskEditTemplate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/taskEditTemplate.js */ "./src/components/taskEditTemplate.js");
/* harmony import */ var _components_taskTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/taskTemplate.js */ "./src/components/taskTemplate.js");
/* harmony import */ var _components_loadBtnTemplate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/loadBtnTemplate.js */ "./src/components/loadBtnTemplate.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/mock/task.js */ "./src/mock/task.js");









const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, Object(_components_siteMenuTemplate_js__WEBPACK_IMPORTED_MODULE_0__["createSiteMenuTemplate"])());

const filters = Object(_mock_filter_js__WEBPACK_IMPORTED_MODULE_6__["generateFilter"])();
const tasks = Object(_mock_task_js__WEBPACK_IMPORTED_MODULE_7__["generateTasks"])(TASK_COUNT);

render(siteMainElement, Object(_components_filterTemplate_js__WEBPACK_IMPORTED_MODULE_1__["createFilterTemplate"])(filters));
render(siteMainElement, Object(_components_boardTemplate_js__WEBPACK_IMPORTED_MODULE_2__["createBoardTemplate"])());

const taskBoard = siteMainElement.querySelector(`.board`);
const taskBoardList = taskBoard.querySelector(`.board__tasks`);

render(taskBoardList, Object(_components_taskEditTemplate_js__WEBPACK_IMPORTED_MODULE_3__["createTaskEditTemplate"])(tasks[0]));

for (let i = 1; i < tasks.length; i++) {
  render(taskBoardList, Object(_components_taskTemplate_js__WEBPACK_IMPORTED_MODULE_4__["createTaskTemplate"])(tasks[i]));
}

render(taskBoard, Object(_components_loadBtnTemplate_js__WEBPACK_IMPORTED_MODULE_5__["createLoadBtnTemplate"])());


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilter", function() { return generateFilter; });
const filterName = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

const generateFilter = () => {
  return filterName.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 48),
    };
  });
};



/***/ }),

/***/ "./src/mock/task.js":
/*!**************************!*\
  !*** ./src/mock/task.js ***!
  \**************************/
/*! exports provided: generateTasks, generateTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTasks", function() { return generateTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTask", function() { return generateTask; });
const generateTask = () => {
  return {};
};

const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map