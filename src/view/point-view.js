import AbstractView from '../framework/view/abstract-view.js';
import { formatDatePoint, formatTimePoint, findCheckedOffers, findDestination } from '../utils.js';

const createOffersTemplate = (offers) => {
  if (offers.length > 0) {
    return (
      `<ul class="event__selected-offers">
      ${offers.map(({ title, price }) =>
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`).join('')}
      </ul>`);
  } else {
    return '<ul class="event__selected-offers"></ul>';
  }
};

const createPointTemplate = (point, destinations, offersByType) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;
  const destinationOfPoint = findDestination(destination, destinations);
  const checkedOffers = findCheckedOffers(type, offers, offersByType);
  const offersTemplate = createOffersTemplate(checkedOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatDatePoint(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationOfPoint.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTimePoint(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTimePoint(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>

        ${offersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #destinations = [];
  #offersByType = [];
  #handleEditClick = null;

  constructor({point, destinations, offersByType, onEditClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offersByType);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
