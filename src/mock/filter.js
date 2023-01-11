import { filter } from '../utils.js';

const generateFilters = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length
  })
);

export { generateFilters };
