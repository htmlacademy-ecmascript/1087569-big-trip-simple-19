import {render, RenderPosition} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {sortPointDateDown, sortPointPriceDown} from '../utils.js';
import {SortType} from '../consts.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardComponent = new BoardView();
  #listEmptyComponent = new ListEmptyView();
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    if (this.#currentSortType === SortType.PRICE) {
      return [...this.#pointsModel.points].sort(sortPointPriceDown);
    }

    return this.#pointsModel.points.sort(sortPointDateDown);
  }

  init() {
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

    if (!this.points.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort(SortType.DAY);
    this.#renderPointsList(this.points);
  }

  #renderPointsList(points) {
    points.forEach((point) => this.#renderPoint(point));
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

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
