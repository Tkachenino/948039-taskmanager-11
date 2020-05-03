import {COLORS, DAYS, MONTH_NAMES} from "@/const.js";
import {formatTime} from "@/utils/common.js";
import {AbstractSmartComponent as Component} from "@/components/abstractSmartComponent.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const createColorsMarkup = (colors, currentColor) => {
  return colors
  .map((color, index) => {
    return (
      `<input
      type="radio"
      id="color-${color}-${index}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${currentColor === color ? `checked` : ``}
    />
    <label
      for="color-${color}-${index}"
      class="card__color card__color--${color}"
      >black</label
    >`
    );
  }).join(`\n`);
};

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
  .map((day, index) => {
    const isChecked = repeatingDays[day];
    return (
      `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${index}"
      name="repeat"
      value="${day}"
      ${isChecked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-${index}"
      >${day}</label
    >`
    );
  }).join(`\n`);
};

const createTaskEditTemplate = (task, option = {}) => {
  const {description, dueDate, color} = task;
  const {isDateShowing, isRepeatingClass, activeRepeatingDays} = option;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isBlockSaveButton = (isDateShowing && isRepeatingClass) ||
    (isRepeatingClass && !isRepeating(activeRepeatingDays));

  const date = (isDateShowing && dueDate) ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = (isDateShowing && dueDate) ? formatTime(dueDate) : ``;

  const classRepeat = isRepeatingClass ? `card--repeat` : ``;
  const classDeadline = isExpired ? `card--deadline` : ``;
  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, activeRepeatingDays);

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
                date: <span class="card__date-status">
                ${isDateShowing ? `yes` : `no`}</span>
              </button>

        ${isDateShowing ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>`
      : ``
    }

                <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">
                ${isRepeatingClass ? `yes` : `no`}</span>
              </button>
              ${isRepeatingClass ?
      `<fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                   ${repeatingDaysMarkup}
                </div>
              </fieldset>`
      : ``
    }
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
          <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};

export class TaskEdit extends Component {
  constructor(task) {
    super();
    this._task = task;
    this._faltpickr = null;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingClass = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createTaskEditTemplate(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingClass: this._isRepeatingClass,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const task = this._task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingClass = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
    .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
    .addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });

    element.querySelector(`.card__repeat-toggle`)
    .addEventListener(`click`, () => {
      this._isRepeatingClass = !this._isRepeatingClass;

      this.rerender();
    });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }

  _applyFlatpickr() {
    if (this._faltpickr) {
      this._faltpickr.destroy();
      this._faltpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._faltpickr = flatpickr(dateElement, {
        altInput: true,
        enableTime: true,
        allowInput: true,
        altFormat: `d F H:i`,
        defaultDate: this._task.dueDate || `today`,
      });
    }
  }
}
