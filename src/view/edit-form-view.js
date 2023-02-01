import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateForm} from '../utils.js';
import {TYPES_POINT, findOffers, findDestination, CITIES} from '../mock/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_FORM = {
  basePrice: 1500,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination:
    {
      id: 1,
      description: 'Chamonix parliament building',
      name: 'Paris',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        }
      ]
    },
  id: 0,
  offers: [
    {
      id: 4,
      title: 'Add baggage',
      price: 10
    }
  ],
  type: 'taxi'
};

const createEventListTemplate = (type, types) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map((name) =>
    `<div class="event__type-item">
        <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${type === name ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${name}</label>
      </div>`).join('')}
    </fieldset>
  </div>`
);

const createOffersTemplate = (offers, checkedOffers) => {
  if (offers.length > 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">${offers.map(({ id, title, price }) =>
        // eslint-disable-next-line indent
         `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" value=${id} ${checkedOffers.includes(id) ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${id}">
                <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
          </div>`).join('')}
        </div>
      </section>`);
  } else {
    return '';
  }
};

const createPhotosTemplate = (photos) => {
  if (photos.length > 0) {
    return (
      ` <div class="event__photos-container">
          <div class="event__photos-tape">
          ${photos.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
          </div>
        </div>`);
  } else {
    return '';
  }
};

const createDestinationTemplate = (destination) => {
  const photos = destination.pictures;
  const description = destination.description;
  const photosTemplate = createPhotosTemplate(photos);
  if (photos.length > 0 && description !== null) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        ${photosTemplate}

      </section>`);
  } else {
    return '';
  }
};

const createEditFormTemplate = (point, showButton) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type, checkedOffers} = point;
  const offersTemplate = createOffersTemplate(offers, checkedOffers);
  const eventListTemplate = createEventListTemplate(type, TYPES_POINT);
  const destinationTemplate = createDestinationTemplate(destination);

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              ${eventListTemplate}

            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateForm(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateForm(dateTo)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}" required>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button" ${showButton ? '' : 'style="display: none;"'}">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">

            ${offersTemplate}
            ${destinationTemplate}

          </section>
        </form>
    </li>`
  );
};

export default class EditFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleButtonClick = null;
  #showButton = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #handleDeleteClick = null;

  constructor({point = BLANK_FORM, onFormSubmit, onFormButtonClick, onDeleteClick}, showButton) {
    super();
    this.#showButton = showButton;
    this._setState(EditFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onFormButtonClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formButtonClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__field-group--destination')
      .addEventListener('change', this.#eventDestinationChangeHandler);
    this.#setDatePicker();
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#changePriceHandler);

    if (this._state.offers.length > 0) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#changeOffersHandler);
    }
  }

  get template() {
    return createEditFormTemplate(this._state, this.#showButton);
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point)
    );
  }

  #changeOffersHandler = (evt) => {
    const checkedOffers = this._state.checkedOffers;
    if (checkedOffers.includes(+evt.target.value)) {
      const indexOfValue = checkedOffers.indexOf(+evt.target.value);
      checkedOffers.splice(indexOfValue,1);
    } else {
      checkedOffers.push(+evt.target.value);
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #formButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #setDatePicker() {
    this.#datePickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'j/n/y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        minuteIncrement: 1
      }
    );
    this.#datePickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'j/n/y H:i',
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        minuteIncrement: 1
      }
    );
  }

  static parsePointToState(point) {
    return {...point,
      checkedOffers: [...point.offers.map((offer) => offer.id)]
    };
  }

  static parseStateToPoint(state) {
    return {...state};
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: findOffers(evt.target.value)
    });
  };

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    if (!CITIES.includes(evt.target.value)) {
      evt.target.setCustomValidity('Введите значение из предложенных');
    } else {
      evt.target.setCustomValidity('');
      this.updateElement({
        destination: findDestination(evt.target.value)
      });
    }
    evt.target.reportValidity();
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateFrom: userDateTo
    });
  };

  #changePriceHandler = (evt) => {
    this.updateElement({
      basePrice: evt.target.value
    });
  };
}
