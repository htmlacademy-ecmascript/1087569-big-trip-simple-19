import dayjs from 'dayjs';
import { FilterType } from './consts.js';

const DATE_POINT_FORMAT = 'MMM DD';
const TIME_POINT_FORMAT = 'HH:mm';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FILTER_FORMAT = 'YYYYMD';


const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const formatDatePoint = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_POINT_FORMAT) : '';

const formatTimePoint = (datePoint) => datePoint ? dayjs(datePoint).format(TIME_POINT_FORMAT) : '';

const formatDateForm = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_FORM_FORMAT) : '';

const formatDateFilter = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_FILTER_FORMAT) : '';

const today = formatDateFilter(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => formatDateFilter(point.dateFrom) >= today)
};

const generateFilters = () => Object.entries(filter).map(
  ([filterName]) => ({
    name: filterName
  })
);

const updateItem = (items, update) => items.map((item) => items.id === update.id ? update : item);

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

export {getRandomArrayElement, formatDatePoint, formatTimePoint, formatDateForm, generateFilters, updateItem, sortPointDateDown, sortPointPriceDown};
