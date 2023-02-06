import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import {UserAction, UpdateType, Keys} from '../consts.js';
import {getCities} from '../utils.js';

export default class NewEventPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinations = [];
  #offers = [];

  constructor({pointsListContainer, onDataChange, onDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    this.#destinations = destinations;
    this.#offers = offers;
    const cities = getCities(this.#destinations);

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditFormView({
      destinations: this.#destinations,
      cities: cities,
      offersByType: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    },
    false);

    render(this.#pointEditComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
