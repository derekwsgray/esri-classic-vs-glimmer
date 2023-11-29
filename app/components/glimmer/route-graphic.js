import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import { registerDestructor } from '@ember/destroyable';

export default class RouteGraphicComponent extends Component {

  constructor() {
    super(...arguments);

    registerDestructor(this, this.destroyGraphic);
  }

  @cached
  get graphic() {
    if (!this.args.layer) {
      return null;
    }

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

    //console.log(`Adding graphic ${this.args.routeData.id}`);
    this.args.layer.add(graphic);

    return graphic;
  };

  updateGraphic = () => {
    if (!this.graphic) {
      return;
    }
    //console.log('updating graphic ' + this.args.routeData.id);

    this.graphic.symbol = new SimpleLineSymbol({
      color: this.args.routeData.color,
      width: 4,
    });
  };

  destroyGraphic = () => {
    //console.log('Destroying graphic ' + this.args.routeData.id);
    if (this.graphic && this.args.layer) {
      this.args.layer.remove(this.graphic);
    }
  };
}
