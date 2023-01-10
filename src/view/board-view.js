import AbstractView from '../framework/view/abstract-view.js';

const createBoardTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class BoardView extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
