import Service, { service } from '@ember/service';
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export default class TrackedDataService extends Service {
  @service arcgis;

  mapView = null;
  graphicsLayer = null;
  graphicLookup = new Map();

  initializeMap(element) {
    const map = new Map({
      basemap: 'topo-vector', // Specify the basemap you want to use
    });

    this.mapView = new MapView({
      container: element, // Use the component's element as the container
      map: map,
      zoom: 1, // Initial zoom level
      center: [0, 0], // Initial center point
    });

    this.setupGraphicsLayer();
  }

  setupGraphicsLayer() {
    const layer = new GraphicsLayer();
    this.mapView.map.add(layer);
    this.graphicsLayer = layer;
  }

  addRoute(routeData) {
    (async () => {
      await Promise.resolve();

      const polyline = new Polyline({
        paths: routeData.paths,
      });

      const lineSymbol = new SimpleLineSymbol({
        color: routeData.color,
        width: 4,
      });

      const graphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol,
      });

      this.graphicsLayer.add(graphic);

      this.graphicLookup.set(routeData.id, graphic);
    })();
  }

  removeRoute(routeData) {
    const graphicToRemove = this.graphicLookup.get(routeData.id);
    this.graphicsLayer.remove(graphicToRemove);
  }

  updateRoute(routeData) {
    (async () => {
      await Promise.resolve();
      const graphic = this.graphicLookup.get(routeData.id);
      if (!graphic) {
        return;
      }

      graphic.symbol = new SimpleLineSymbol({
        color: routeData.color,
        width: 4,
      });
    })();
  }

}
