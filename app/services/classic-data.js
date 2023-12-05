import Service, { service } from '@ember/service';
import { computed, set } from '@ember/object';
import ClassicRoute from 'esri-classic-vs-glimmer/models/classic-route';
import { generateRandomCoordinates } from 'esri-classic-vs-glimmer/utils';

export default class ClassicDataService extends Service {
  @service stats;

  routes;
  visibleRouteIds;
  isSelectionRunning = false;
  isFilteringRunning = false;
  animationFrame;

  constructor() {
    super(...arguments);

    set(this, 'routes', []);
    set(this, 'visibleRouteIds', []);
  }

  /**
   * Want to simulate a computed property based on a filtered array & lookup
   * @returns {*}
   */
  @computed('routes', 'visibleRouteIds')
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
      const r = new ClassicRoute();
      r.id = `route-${i}`;
      r.isSelected = false;
      r.isHighlighted = false;
      r.paths = generateRandomCoordinates();
      routes.push(r);
    }

    set(this, 'routes', routes);
    set(
      this,
      'visibleRouteIds',
      routes.map((r) => r.id),
    );
  };

  toggleSelections = () => {
    set(this, 'isSelectionRunning', !this.isSelectionRunning);
    if (this.isSelectionRunning) {
      this.continuouslyChangeSelected();
    }
  };

  toggleVisibles = () => {
    set(this, 'isFilteringRunning', !this.isFilteringRunning);
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

      // this.routes.forEach((r) => set(r, 'isSelected', false));

      // Select a random subset of routes to toggle to true
      const numberOfRoutesToToggle = Math.floor(
        Math.random() * this.routes.length,
      );
      for (let i = 0; i < numberOfRoutesToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.routes.length);
        const route = this.routes[randomIndex];
        set(route, 'isSelected', !route.isSelected);
      }

      if (this.isFilteringRunning) {
        this.changeVisibles();
      } else if (this.routes.length !== this.visibleRouteIds) {
        set(
          this,
          'visibleRouteIds',
          this.routes.map((r) => r.id),
        );
      }

      this.stats.end();
    }

    boundCallback = loop.bind(this);
    this.animationFrame = requestAnimationFrame(boundCallback);
  }

  changeVisibles() {
    // Select a random subset of routes to toggle
    const numberOfRoutesToToggle = Math.floor(
      Math.random() * this.routes.length,
    );
    const subset = [];
    for (let i = 0; i < numberOfRoutesToToggle; i++) {
      const randomIndex = Math.floor(Math.random() * this.routes.length);
      subset.push(this.routes[randomIndex].id);
    }

    set(this, 'visibleRouteIds', subset);
    // console.log(`Toggling ${numberOfRoutesToToggle} (${this.visibleRouteIds.length})`);
  }

  shutdown = () => {
    this.animationFrame = null;
    set(this, 'isSelectionRunning', false);
    set(this, 'isFilteringRunning', false);
    set(this, 'routes', []);
    set(this, 'visibleRouteIds', []);
  };
}
