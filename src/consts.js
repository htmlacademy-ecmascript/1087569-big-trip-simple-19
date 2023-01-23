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

export { Keys, FilterType, Mode, SortType, DISABLED_SORT_TYPES };
