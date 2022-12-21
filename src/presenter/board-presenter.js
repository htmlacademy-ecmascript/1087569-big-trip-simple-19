import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new BoardView();
  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);
    render(new EditFormView({point: this.#boardPoints[0]}, true), this.#boardComponent.element);
    render(new EditFormView({point: this.#boardPoints[0]}, false), this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new PointView({point: this.#boardPoints[i]}), this.#boardComponent.element);
    }
  }
}
