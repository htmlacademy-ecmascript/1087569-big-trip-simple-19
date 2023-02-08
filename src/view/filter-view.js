import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../consts.js';

const createFilterItemTemplate = (filter, currentFilterType, isDisabled) => {
  const {name} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter" value="${name}"
      ${name === currentFilterType ? 'checked' : ''}
      ${isDisabled && name === FilterType.FUTURE ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType, isDisabled) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisabled))
    .join('');
  return (
    `<form class="trip-filters" action="#" method="get">

        ${filterItemsTemplate}

        <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`);
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  #isDisabled = false;

  constructor ({filters, currentFilterType, onFilterTypeChange, isDisabled}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#isDisabled = isDisabled;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#isDisabled);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
