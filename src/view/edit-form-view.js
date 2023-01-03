import AbstractView from '../framework/view/abstract-view.js';
import {formatDateForm} from '../utils.js';
import {TYPES_POINT} from '../mock/point.js';

const BLANK_FORM = {
  basePrice: 1500,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: [
    {
      id: 1,
      description: 'Chamonix parliament building',
      name: 'Moscow',
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
    }
  ],
  id: 0,
  offers: [
    {
      id: 0,
      title: 'Add something',
      price: 200
    },
    {
      id: 1,
      title: 'Buy something',
      price: 500
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

const createOffersTemplate = (offers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">${offers.map(({ id, title, price }) =>
    // eslint-disable-next-line indent
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" checked>
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
      </div>`).join('')}
    </div>
  </section>`
);

const createPhotosTemplate = (photos) => (
  ` <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>`
);

const createEditFormTemplate = (point = BLANK_FORM, showButton) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;
  const offersTemplate = createOffersTemplate(offers);
  const photos = destination.pictures;
  const photosTemplate = createPhotosTemplate(photos);
  const eventListTemplate = createEventListTemplate(type, TYPES_POINT);

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
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            ${showButton ? '<button class="event__rollup-btn" type="button">' : ''}
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">

            ${offersTemplate}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>

              ${photosTemplate}

            </section>
          </section>
        </form>
    </li>`
  );
};

export default class EditFormView extends AbstractView {
  #point = null;
  #showButton = null;

  constructor({point}, showButton) {
    super();
    this.#showButton = showButton;
    this.#point = point;
  }

  get template() {
    return createEditFormTemplate(this.#point, this.#showButton);
  }
}
