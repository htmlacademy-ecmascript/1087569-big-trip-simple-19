import { getPoint } from '../mock/point.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getPoint);

  getPoints() {
    return this.points;
  }
}
