import dayjs from 'dayjs';
import { FilterType } from './consts.js';

const DATE_POINT_FORMAT = 'MMM DD';
const TIME_POINT_FORMAT = 'HH:mm';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FILTER_FORMAT = 'YYYYMD';

const formatDatePoint = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_POINT_FORMAT) : '';

const formatTimePoint = (datePoint) => datePoint ? dayjs(datePoint).format(TIME_POINT_FORMAT) : '';

const formatDateForm = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_FORM_FORMAT) : '';

const formatDateFilter = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_FILTER_FORMAT) : '';

const today = formatDateFilter(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => formatDateFilter(point.dateFrom) >= today)
};

const getWeightForNull = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointDateDown = (pointA, pointB) => {
  const weight = getWeightForNull(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointPriceDown = (pointA, pointB) => {
  const weight = getWeightForNull(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
};

const findDestination = (id, destinations) => destinations.find((destination) => destination.id === id);
const getDestinationId = (city, destinations) => destinations.find((destination) => destination.name === city).id;

const findCheckedOffers = (typeOfPoint, offersOfType, offersByType) => {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint).offers;
  return foundOffersType.filter((offer) => offersOfType.includes(offer.id));
};

const findOffers = (typeOfPoint, offersByType) => {
  const foundOffersType = offersByType.find((item) => item.type === typeOfPoint);
  return foundOffersType ? foundOffersType.offers : [];
};

const getCities = (destinations) => {
  const cities = [];
  destinations.map((destination) => cities.push(destination.name));
  return cities;
};

export {formatDatePoint, formatTimePoint, formatDateForm, sortPointDateDown, sortPointPriceDown, filter, findDestination, findCheckedOffers, findOffers, getCities, getDestinationId};
