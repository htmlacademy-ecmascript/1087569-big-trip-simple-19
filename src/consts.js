const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const filters = [
  {
    name: FilterType.EVERYTHING
  },
  {
    name: FilterType.FUTURE
  }
];

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
};

export { Keys, FilterType, Mode, SortType, DISABLED_SORT_TYPES, UserAction, UpdateType, filters };
