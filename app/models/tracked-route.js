import { tracked } from '@glimmer/tracking';

export default class TrackedRoute {
  id;
  @tracked isSelected = false;
  @tracked isHighlighted = false;
  paths = [];

  get color() {
    if (this.isSelected) {
      return [255, 20, 20];
    } else if (this.isHighlighted) {
      return [255, 255, 0];
    } else {
      return [50, 50, 255];
    }
  }
}
