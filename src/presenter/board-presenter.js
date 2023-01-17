import {render, RenderPosition} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import {Keys} from '../consts.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new BoardView();
  #sortComponent = new SortView();
  #listEmptyComponent = new ListEmptyView();
  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderListEmpty() {
    render(this.#listEmptyComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint (point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditFormView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormButtonClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    },
    true);

    function replacePointToForm() {
      this.#boardComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    }

    function replaceFormToPoint() {
      this.#boardComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    }

    render(pointComponent, this.#boardComponent.element);
  }
}
