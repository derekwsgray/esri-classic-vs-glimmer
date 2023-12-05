import Component from '@glimmer/component';
import { service } from '@ember/service';
import { modifier } from "ember-modifier";

export default class EsriMapComponent extends Component {

  @service arcgis;

  initializeMap = modifier((element) => {
    this.arcgis.initializeMap(element);
  });
}
