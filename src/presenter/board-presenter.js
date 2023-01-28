import {render, RenderPosition} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem, sortPointDateDown, sortPointPriceDown} from '../utils.js';
import {SortType} from '../consts.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new BoardView();
  #listEmptyComponent = new ListEmptyView();
  #boardPoints = [];
  #pointPresenters = new Map();
  #sortComponent = null;
  #sourcedPointsList = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points].sort(sortPointDateDown);
    this.#sourcedPointsList = [...this.#pointsModel.points].sort(sortPointDateDown);
    this.#renderBoard();
  }

  #renderListEmpty() {
    render(this.#listEmptyComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort(SortType.DAY);
    this.#renderPointsList();
  }

  #renderPointsList() {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#boardComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    if (sortType === SortType.PRICE) {
      this.#boardPoints.sort(sortPointPriceDown);
    } else {
      this.#boardPoints = [...this.#sourcedPointsList];
    }
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
