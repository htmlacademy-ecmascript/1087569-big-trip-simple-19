import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import PointsApiService from './api/points-api-service.js';

const AUTHORIZATION = 'Basic gB5haM57wcl56za2j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const siteHeaderContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter ({
  boardContainer: sortContainer,
  pointsModel,
  filterModel,
  destinationsModel,
  offersModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

Promise.all([
  offersModel.init(),
  destinationsModel.init(),
  pointsModel.init()
]).catch(() => {
  newEventButtonComponent.element.disabled = true;
}).finally(() => {
  render(newEventButtonComponent, siteHeaderContainer);
});
filterPresenter.init();
boardPresenter.init();

