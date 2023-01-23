import AbstractView from '../framework/view/abstract-view.js';
import {SortType, DISABLED_SORT_TYPES} from '../consts.js';

const createSortItemTemplate = (sortItem, isChecked) => {
  const isDisabled = DISABLED_SORT_TYPES.includes(sortItem);
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortItem}">
      <input id="sort-${sortItem}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortItem}"
      data-sort-type="${sortItem}" ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortItem}">${sortItem}</label>
    </div>`
  );
};

const createSortTemplate = () => {
  const sortItemsTemplate = Object.entries(SortType).map((item) => item[1])
    .map((sortItem, index) => createSortItemTemplate(sortItem, index === 0))
    .join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
};

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
