import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import {Keys} from '../consts.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor({pointsListContainer}) {
    this.#pointsListContainer = pointsListContainer;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick
    });
    this.#pointEditComponent = new EditFormView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onFormButtonClick: this.#handleFormButtonClick
    },
    true);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#pointsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFormButtonClick = () => {
    this.#replaceFormToPoint();
  };
}
