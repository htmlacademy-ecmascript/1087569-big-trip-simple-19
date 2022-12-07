import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import EditFormView from '../view/edit-form-view.js';
import CreateFormView from '../view/create-form-view.js';
import PointView from '../view/point-view.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView (), this.boardComponent.getElement());
    render(new CreateFormView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardComponent.getElement());
    }
  }
}
