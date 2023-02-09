import Observable from '../framework/observable.js';
import { UpdateType } from '../consts.js';

export default class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this._notify(UpdateType.ERROR);
      throw new Error(err);
    }
  }
}
