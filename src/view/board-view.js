import {createElement} from '../render.js';

const createBoardTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class BoardView {
  #element = null;

  get template() {
    return createBoardTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
