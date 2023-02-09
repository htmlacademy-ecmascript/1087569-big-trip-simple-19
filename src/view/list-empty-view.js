import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../consts.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

const isErrorMessage = 'Something went wrong<br>Please try again later';

const createEmptyListTemplate = (filterType, isError) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">${isError ? isErrorMessage : noPointTextValue}</p>`
  );
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  #isError = null;

  constructor({filterType, isError}) {
    super();
    this.#filterType = filterType;
    this.#isError = isError;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType, this.#isError);
  }
}
