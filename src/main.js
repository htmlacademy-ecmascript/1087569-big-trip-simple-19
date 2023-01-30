import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {filters} from './consts.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter ({
  boardContainer: sortContainer,
  pointsModel
});


render(new FilterView({
  filters,
  currentFilterType: filters[0].name,
  onFilterTypeChange: () => {}
}), filtersContainer);
boardPresenter.init();
