const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DISABLED_SORT_TYPES = ['event', 'time', 'offers'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const TYPES_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const DateFormats = {
  DATE_POINT : 'MMM DD',
  TIME_POINT : 'HH:mm',
  DATE_FORM : 'DD/MM/YY HH:mm',
  DATE_FILTER : 'YYYYMD'
};

export { Keys, FilterType, Mode, SortType, DISABLED_SORT_TYPES, UserAction, UpdateType, TYPES_POINT, TimeLimit, DateFormats };
