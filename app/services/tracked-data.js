import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import TrackedRoute from 'esri-classic-vs-glimmer/models/tracked-route';
import { generateRandomCoordinates } from 'esri-classic-vs-glimmer/utils';

export default class TrackedDataService extends Service {
  @service stats;

  @tracked routes = [];
  @tracked visibleRouteIds = [];
  @tracked isSelectionRunning = false;
  @tracked isFilteringRunning = false;
  animationFrame;

  /**
   * Want to simulate a computed property based on a filtered array & lookup
   * @returns {*}
   */
  get visibleRoutes() {
    const filtered = this.routes.filter((r) =>
      this.visibleRouteIds.includes(r.id),
    );
    // console.log('Visible Routes: ' + filtered.length);
    return filtered;
  }

  setup = (numberOfRoutes) => {
    // Recreate the data
    const routes = [];

    for (let i = 0; i < numberOfRoutes; i++) {
      const r = new TrackedRoute();
      r.id = `route-${i}`;
      r.isSelected = false;
      r.isHighlighted = false;
      r.paths = generateRandomCoordinates();
      routes.push(r);
    }

    this.routes = routes;
    this.visibleRouteIds = routes.map((r) => r.id);
  };

  toggleSelections = () => {
    this.isSelectionRunning = !this.isSelectionRunning;
    if (this.isSelectionRunning) {
      this.continuouslyChangeSelected();
    }
  };

  toggleVisibles = () => {
    this.isFilteringRunning = !this.isFilteringRunning;
  };

  continuouslyChangeSelected() {
    if (this.animationFrame) {
      return;
    }

    let boundCallback;

    function loop() {
      if (!this.isSelectionRunning) {
        this.animationFrame = null;
        return;
      }

      this.stats.begin();
      requestAnimationFrame(boundCallback);

      // this.routes.forEach((r) => (r.isSelected = false));

      // Select a random subset of routes to toggle to true
      const numberOfRoutesToToggle = Math.floor(
        Math.random() * this.routes.length,
      );
      for (let i = 0; i < numberOfRoutesToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.routes.length);
        const route = this.routes[randomIndex];
        route.isSelected = !route.isSelected;
      }

      if (this.isFilteringRunning) {
        this.changeVisibles();
      } else if (this.routes.length !== this.visibleRouteIds) {
        this.visibleRouteIds = this.routes.map((r) => r.id);
      }

      this.stats.end();
    }

    boundCallback = loop.bind(this);
    this.animationFrame = requestAnimationFrame(boundCallback);
  }

  changeVisibles() {
    // Select a random subset of routes to toggle
    const numberOfRoutesToKeep = Math.floor(Math.random() * this.routes.length);
    const subset = [];
    for (let i = 0; i < numberOfRoutesToKeep; i++) {
      const randomIndex = Math.floor(Math.random() * this.routes.length);
      subset.push(this.routes[randomIndex].id);
    }

    this.visibleRouteIds = subset;
    // console.log(`Toggling ${numberOfRoutesToToggle} (${this.visibleRouteIds.length})`);
  }

  shutdown = () => {
    this.animationFrame = null;
    this.isSelectionRunning = false;
    this.isFilteringRunning = false;
    this.routes = [];
    this.visibleRouteIds = [];
  };
}
