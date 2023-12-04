import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

let graphicCount = 0;

export default class RouteGraphicComponent extends Component {

  graphic = null;

  createGraphic = () => {
    (async () => {
      await Promise.resolve();

      // console.log('Setting up graphic: ', this.args.routeData);
      const polyline = new Polyline({
        paths: this.args.routeData.paths,
      });

      const lineSymbol = new SimpleLineSymbol({
        color: this.args.routeData.color,
        width: 4,
      });

      const graphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol,
      });

      // WARNING: this doesn't remove if any tracked data in this getter changes
      //          a resource would be better for property-based destruction.
      //
      //          Or a separate component for the "graphic"
      // console.log(`Adding graphic ${this.args.routeData.id}`);
      this.args.layer.add(graphic);

      this.graphic = graphic;
    })();
  };

  updateColor = () => {
    // Always invalidate when color changes
    this.args.routeData.color;

    (async () => {
      await Promise.resolve();
      if (!this.graphic) {
        return;
      }
      //console.log('updating graphic ' + this.args.routeData.id);

      this.graphic.symbol = new SimpleLineSymbol({
        color: this.args.routeData.color,
        width: 4,
      });
    })();
  };

  willDestroy() {
    // console.log('Destroying graphic ' + this.args.routeData.id);
    if (this.graphic && this.args.layer) {
      this.args.layer.remove(this.graphic);
    }
    super.willDestroy(...arguments);
  }
}
