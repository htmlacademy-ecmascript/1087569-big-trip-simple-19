import dayjs from 'dayjs';
import { FilterType } from './consts.js';

const DATE_POINT_FORMAT = 'MMM DD';
const TIME_POINT_FORMAT = 'HH:mm';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FILTER_FORMAT = 'DMYYYY';


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
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (points) => points.filter((point) =>
    (formatDateFilter(point.dateFrom) >= today ||
     formatDateFilter(point.dateFrom) < today && formatDateFilter(point.dateTo) > today)
  )
};

export {getRandomArrayElement, formatDatePoint, formatTimePoint, formatDateForm, filter};
