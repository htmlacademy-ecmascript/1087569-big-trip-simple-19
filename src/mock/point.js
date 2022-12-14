import {getRandomArrayElement} from '../utils.js';

const TYPES_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRPTIONS_DESTINATION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.'
];
const CITIES = ['London', 'Paris', 'Madrid', 'Rome'];
const ARRAY_NUMBERS = Array.from({length:10}, (_, i) => ++i);

const offers = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120
  },
  {
    id: 2,
    title: 'Add something',
    price: 200
  },
  {
    id: 3,
    title: 'Buy something',
    price: 500
  },
  {
    id: 4,
    title: 'Add baggage',
    price: 10
  }
];

const offersByType = [
  {
    type: 'taxi',
    offers: [1, 4]
  }
];

const destinations = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRPTIONS_DESTINATION),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      }
    ]
  }
];

const point = {
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: destinations[0],
  id: 0,
  offers: offers.filter((offer) => offersByType.find((item) => item.type === TYPES_POINT[0]).offers.includes(offer.id)),
  type: TYPES_POINT[0]
};

function getPoint() {
  return point;
}

export { getPoint, TYPES_POINT };

