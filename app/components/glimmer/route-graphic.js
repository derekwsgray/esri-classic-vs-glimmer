import Component from '@glimmer/component';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import { registerDestructor } from '@ember/destroyable';
import { modifier } from 'ember-modifier';

let graphicSetupCount = 0;

export default class RouteGraphicComponent extends Component {

  graphic = null;

  constructor() {
    super(...arguments);

    registerDestructor(this, this.destroyGraphic);
  }

  setup = modifier(() => {

    if (!this.args.layer || !this.args.routeData || this.graphic) {
      return;
    }

    //console.log('GLIMMER GRAPHIC SETUP', ++graphicSetupCount, this.args.layer);
    // console.log('Setting up graphic: ', this.args.routeData);
    const polyline = new Polyline({
      paths: this.args.routeData.paths,
    });

    const lineSymbol = new SimpleLineSymbol({
      color: this.args.routeData.color,
      width: 4,
    });

    this.graphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol,
    });

    //console.log(`Adding graphic ${this.args.routeData.id}`);
    this.args.layer.add(this.graphic);
  });

  updateGraphic = modifier(() => {
    if (!this.graphic) {
      this.setup();
      if (!this.graphic) {
      return;
    }
      //return;
    }

    //console.log('updating graphic ' + this.args.routeData.id);
    this.graphic.symbol = new SimpleLineSymbol({
      color: this.args.routeData.color,
      width: 4,
    });
  });

  destroyGraphic = () => {
    //console.log('Destroying graphic ' + this.args.routeData.id);
    if (this.graphic && this.args.layer) {
      this.args.layer.remove(this.graphic);
    }
  }
}
