import Component from '@ember/component';
import { action } from '@ember/object';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

export default class RouteGraphicComponent extends Component {
  tagName = '';
  // Args
  layer = null;
  routeData = null;

  // Props
  graphic = null;

  didReceiveAttrs() {
    super.didReceiveAttrs();
    if (!this.layer || !this.routeData || this.graphic) {
      return;
    }

    console.log('updating graphic');

    const polyline = new Polyline({
      paths: this.routeData.paths,
    });

    const lineSymbol = new SimpleLineSymbol({
      color: this.routeData.color,
      width: 4,
    });

    this.graphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol,
    });

    //console.log(`Adding graphic. Total is ${this.layer.graphics.length}`);
    this.layer.add(this.graphic);
  }

  @action
  updateGraphic() {
    if (!this.graphic) {
      return;
    }

    //console.log('updating graphic ' + this.args.routeData.id);
    this.graphic.symbol = new SimpleLineSymbol({
      color: this.routeData.color,
      width: 4,
    });
  }

  willDestroy() {
    //console.log('Destroying graphic ' + this.routeData.id);
    if (this.graphic && this.layer) {
      this.layer.remove(this.graphic);
    }

    super.willDestroy(...arguments);
  }
}
