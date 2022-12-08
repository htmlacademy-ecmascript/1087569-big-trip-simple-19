import {render} from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter ({boardContainer: sortContainer});

render(new FilterView(), filtersContainer);
render(new SortView(), sortContainer);
boardPresenter.init();
