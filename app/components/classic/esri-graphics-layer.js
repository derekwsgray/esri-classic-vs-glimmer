import Component from '@ember/component';
import { set } from '@ember/object';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

export default class EsriGraphicsLayerComponent extends Component {
  tagName = '';
  // Args
  mapView = null;

  // Props
  layer = null;

  didReceiveAttrs() {
    super.didReceiveAttrs();
    if (!this.mapView || this.layer) {
      return;
    }

    const layer = new GraphicsLayer();
    this.mapView.map.add(layer);
    set(this, 'layer', layer);
  }

  willDestroy() {
    if (this.layer && this.layer.map) {
      this.layer.map.remove(this.layer);
    }

    super.willDestroy(...arguments);
  }
}
