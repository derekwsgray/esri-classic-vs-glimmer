import Component from '@glimmer/component';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export default class EsriGraphicsLayerComponent extends Component {

  @tracked layer = null;

  constructor() {
    super(...arguments);

    registerDestructor(this, this.destroyLayer);
  }

  setup = () => {
    console.log('GLIMMER LAYER SETUP', this.args.mapView);
    if (!this.args.mapView) {
      return null;
    }

    //console.log('Setting up Graphics Layer');
    const layer = new GraphicsLayer();
    this.args.mapView.map.add(layer);
    this.layer = layer;
  }

  destroyLayer = () => {
    if (this.layer && this.layer.map) {
      //console.log('Destroying layer');
      this.layer.map.remove(this.layer);
    }
  }
}
