import {Component} from "@/utils.js";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__all-count">${count}</span></label
      >`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

export class Filter extends Component {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
