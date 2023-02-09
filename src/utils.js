import dayjs from 'dayjs';
import { FilterType, DateFormats } from './consts.js';

const formatDatePoint = (datePoint) => datePoint ? dayjs(datePoint).format(DateFormats.DATE_POINT) : '';

const formatTimePoint = (datePoint) => datePoint ? dayjs(datePoint).format(DateFormats.TIME_POINT) : '';

const formatDateForm = (datePoint) => datePoint ? dayjs(datePoint).format(DateFormats.DATE_FORM) : '';

const formatDateFilter = (datePoint) => datePoint ? dayjs(datePoint).format(DateFormats.DATE_FILTER) : '';

const today = +formatDateFilter(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => +formatDateFilter(point.dateFrom) >= today)
};

const getWeightForNull = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
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

const getCities = (destinations) => destinations.map((destination) => destination.name);

export { formatDatePoint, formatTimePoint, formatDateForm, sortPointDateDown, sortPointPriceDown, filter, findDestination, findCheckedOffers, findOffers, getCities, getDestinationId };
