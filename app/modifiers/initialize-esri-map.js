import { modifier } from 'ember-modifier';
import { set } from '@ember/object';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export default modifier((element, [mapComponent]) => {
  const map = new Map({
    basemap: 'topo-vector', // Specify the basemap you want to use
  });

  const mapView = new MapView({
    container: element, // Use the component's element as the container
    map: map,
    zoom: 1, // Initial zoom level
    center: [0, 0], // Initial center point
  });

  set(mapComponent, 'mapView', mapView); // Work for both kinds of components.
});
