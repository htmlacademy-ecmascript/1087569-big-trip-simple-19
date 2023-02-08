import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../consts.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

const createEmptyListTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
