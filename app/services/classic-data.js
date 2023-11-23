import Service, { service } from '@ember/service';
import { computed, set } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import ClassicRoute from 'esri-classic-vs-glimmer/models/classic-route';
import { generateRandomCoordinates } from 'esri-classic-vs-glimmer/utils';

export default class ClassicDataService extends Service {

  @service stats;

  routes;
  _visibleRouteIds;
  isSelectionRunning = false;
  isFilteringRunning = false;
  _visibilityTogglerTimer = null;
  _selectionTogglerTimer = null;
  _animationFrameForSelections;

  constructor() {
    super(...arguments);

    set(this, 'routes', []);
    set(this, '_visibleRouteIds', []);
  }

  /**
   * Want to simulate a computed property based on a filtered array & lookup
   * @returns {*}
   */
  @computed('routes', '_visibleRouteIds')
  get visibleRoutes() {
    const filtered = this.routes.filter(r => this._visibleRouteIds.includes(r.id));
    console.log('Visible Routes: ' + filtered.length);
    return filtered;
  }

  setup = (numberOfRoutes)=> {
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
    set(this, '_visibleRouteIds', routes.map(r => r.id));
  }

  continuouslyToggleSelected() {
    if (this._animationFrameForSelections) {
      return;
    }

    let boundCallback;

    function loop() {
      this.stats.begin();
      requestAnimationFrame(boundCallback);

      this.routes.forEach(r => set(r, 'isSelected', false));

      // Select a random subset of routes to toggle to true
      const numberOfRoutesToToggle = Math.floor(Math.random() * this.routes.length);
      for (let i = 0; i < numberOfRoutesToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.routes.length);
        set(this.routes[randomIndex], 'isSelected', true);
      }

      this.stats.end();
    }

    boundCallback = loop.bind(this);
    this._animationFrameForSelections = requestAnimationFrame(boundCallback);

  }

  continuouslyToggleVisibles() {
    // Select a random subset of routes to toggle
    const numberOfRoutesToToggle = Math.floor(Math.random() * this.routes.length);
    const subset = [];
    for (let i = 0; i < numberOfRoutesToToggle; i++) {
      const randomIndex = Math.floor(Math.random() * this.routes.length);
      subset.push(this.routes[randomIndex].id);
    }

    set(this, '_visibleRouteIds', subset);
    console.log(`Toggling ${numberOfRoutesToToggle} (${this._visibleRouteIds.length})`);

    // Schedule the next toggle
    this._visibilityTogglerTimer = later(this, this.continuouslyToggleVisibles, 250); // Adjust the time interval as needed
  }

  startOrStopSelection = () => {
    if (this.isSelectionRunning) {
      if (this._selectionTogglerTimer) {
        cancel(this._selectionTogglerTimer);
        this._selectionTogglerTimer = null;
      }

      set(this, 'isSelectionRunning', false);
    } else {
      set(this, 'isSelectionRunning', true);
      // Automate changes
      this.continuouslyToggleSelected();
    }
  }

  startOrStopFiltering = () => {
    if (this.isFilteringRunning) {
      if (this._visibilityTogglerTimer) {
        cancel(this._visibilityTogglerTimer);
        this._visibilityTogglerTimer = null;
      }
      set(this, 'isFilteringRunning', false);
    } else {
      set(this, 'isFilteringRunning', true);
      // Automate changes
      this.continuouslyToggleVisibles();
    }
  }

  shutdown = () => {
    if (this.isSelectionRunning) {
      if (this._selectionTogglerTimer) {
        cancel(this._selectionTogglerTimer);
        this._selectionTogglerTimer = null;
      }

      set(this, 'isSelectionRunning', false);
    }

    if (this.isFilteringRunning) {
      if (this._visibilityTogglerTimer) {
        cancel(this._visibilityTogglerTimer);
        this._visibilityTogglerTimer = null;
      }
      set(this, 'isFilteringRunning', false);
    }

    set(this, 'routes', []);
    set(this, '_visibleRouteIds', []);

  }
}
