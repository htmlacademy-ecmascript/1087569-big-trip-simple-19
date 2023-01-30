import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter ({
  boardContainer: sortContainer,
  pointsModel
});
const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

filterPresenter.init();
boardPresenter.init();
