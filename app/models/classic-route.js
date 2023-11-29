export default class ClassicRoute {
  id;
  isSelected = false;
  isHighlighted = false;
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
