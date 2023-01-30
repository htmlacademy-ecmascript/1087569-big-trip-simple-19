import {render, RenderPosition, remove} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {sortPointDateDown, sortPointPriceDown} from '../utils.js';
import {SortType, UpdateType, UserAction} from '../consts.js';

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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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
      currentSortType: this.#currentSortType,
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

    this.#renderSort(this.#currentSortType);
    this.points.forEach((point) => this.#renderPoint(point));
  }


  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#boardComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
