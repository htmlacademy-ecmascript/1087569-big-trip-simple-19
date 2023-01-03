import {render} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import ListEmptyView from '../view/list-empty-view.js';

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
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      render(new ListEmptyView, this.#boardComponent.element);
      return;
    }

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint (point) {
    const pointComponent = new PointView({point});
    const editPointComponent = new EditFormView({point}, true);

    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#boardComponent.element);
  }
}
