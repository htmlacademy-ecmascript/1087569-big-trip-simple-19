import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilters } from './utils.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter ({
  boardContainer: sortContainer,
  pointsModel
});
const filters = generateFilters();

render(new FilterView({filters}), filtersContainer);
render(new SortView(), sortContainer);
boardPresenter.init();
