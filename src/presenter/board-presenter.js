import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new EditFormView({point: this.boardPoints[0]}, true), this.boardComponent.getElement());
    render(new EditFormView({point: this.boardPoints[0]}, false), this.boardComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.boardComponent.getElement());
    }
  }
}
