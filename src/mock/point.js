import {getRandomArrayElement} from '../utils.js';
import {nanoid} from 'nanoid';

const TYPES_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESCRPTIONS_DESTINATION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.'
];
const CITIES = ['London', 'Paris', 'Madrid', 'Rome'];
const PRICES = [100, 500, 700, 1100, 1500, 2000];
const DATES_FROM = [
  '2019-07-10T22:55:56.845Z',
  '2019-07-12T22:55:56.845Z',
  '2019-07-14T22:55:56.845Z',
  '2019-07-16T22:55:56.845Z',
  '2019-07-18T22:55:56.845Z'
];
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
  },
  {
    type: 'bus',
    offers: [2, 3]
  }
];

const destinations = [
  {
    id: 1,
    description: DESCRPTIONS_DESTINATION[0],
    name: CITIES[0],
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
  },
  {
    id: 2,
    description: DESCRPTIONS_DESTINATION[1],
    name: CITIES[1],
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
      }
    ]
  },
  {
    id: 3,
    description: DESCRPTIONS_DESTINATION[2],
    name: CITIES[2],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 4,
    description: DESCRPTIONS_DESTINATION[3],
    name: CITIES[3],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArrayElement(ARRAY_NUMBERS)}`,
        description: 'Chamonix parliament building'
      }
    ]
  }
];

const point = {
  dateTo: '2019-07-20T11:22:13.375Z',
  destination: destinations[0],
  type: TYPES_POINT[0]
};

const findOffers = (typeOfPoint) => {
  //offers.filter((offer) => offersByType.find((item) => item.type === typeOfPoint).offers.includes(offer.id));
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint);
  return foundOffersType ? offers.filter((offer) => foundOffersType.offers.includes(offer.id)) : null;
};
const findDestination = (city) => destinations.find((destination) => destination.name === city);

function getPoint() {
  return {
    id: nanoid(),
    basePrice: getRandomArrayElement(PRICES),
    dateFrom: getRandomArrayElement(DATES_FROM),
    offers: findOffers(point.type),
    ...point
  };
}

export { getPoint, TYPES_POINT, findOffers, findDestination };

