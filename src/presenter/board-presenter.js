import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView(true), this.boardComponent.getElement());
    render(new EditFormView(false), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardComponent.getElement());
    }
  }
}
