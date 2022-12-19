import {createElement} from '../render.js';
import {formatDatePoint, formatTimePoint} from '../utils.js';

const createOffersTemplate = (offers) => (
  `<ul class="event__selected-offers">
        ${offers.map(({title, price}) =>
    `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
      </li>`).join('')}
    </ul>`
);

const createPointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;
  const datePoint = formatDatePoint(dateFrom);
  const timeFromPoint = formatTimePoint(dateFrom);
  const timeToPoint = formatTimePoint(dateTo);
  const city = destination.name;
  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${datePoint}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFromPoint}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeToPoint}</time>
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

export default class PointView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
