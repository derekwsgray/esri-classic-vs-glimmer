import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';
import TrackedRoute from 'esri-classic-vs-glimmer/models/tracked-route';
import { generateRandomCoordinates } from 'esri-classic-vs-glimmer/utils';

export default class TrackedDataService extends Service {
  @service stats;

  @tracked routes = [];
  @tracked _visibleRouteIds = [];
  @tracked isSelectionRunning = false;
  @tracked isFilteringRunning = false;
  _visibilityTogglerTimer = null;
  _selectionTogglerTimer = null;
  _animationFrameForSelections;
  /**
   * Want to simulate a computed property based on a filtered array & lookup
   * @returns {*}
   */
  get visibleRoutes() {
    const filtered = this.routes.filter(r => this._visibleRouteIds.includes(r.id));
    console.log('Visible Routes: ' + filtered.length);
    return filtered;
  }

  setup = (numberOfRoutes)=> {
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
    this._visibleRouteIds = routes.map(r => r.id);
  }

  continuouslyToggleSelected() {
    if (this._animationFrameForSelections) {
      return;
    }

    let boundCallback;

    function loop() {
      this.stats.begin();
      requestAnimationFrame(boundCallback);

      this.routes.forEach(r => r.isSelected = false);

      // Select a random subset of routes to toggle to true
      const numberOfRoutesToToggle = Math.floor(Math.random() * this.routes.length);
      for (let i = 0; i < numberOfRoutesToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.routes.length);
        this.routes[randomIndex].isSelected = true;
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

    this._visibleRouteIds = subset;
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
      this.isSelectionRunning = false;
    } else {
      // Automate changes
      this.isSelectionRunning = true;
      this.continuouslyToggleSelected();
    }
  }

  startOrStopFiltering = () => {
    if (this.isFilteringRunning) {
      if (this._visibilityTogglerTimer) {
        cancel(this._visibilityTogglerTimer);
        this._visibilityTogglerTimer = null;
      }
    } else {
      // Automate changes
      this.continuouslyToggleVisibles();
    }

    this.isFilteringRunning = !this.isFilteringRunning;
  }

  shutdown = () => {
    if (this.isSelectionRunning) {
      if (this._selectionTogglerTimer) {
        cancel(this._selectionTogglerTimer);
        this._selectionTogglerTimer = null;
      }

      this.isSelectionRunning = false;
    }

    if (this.isFilteringRunning) {
      if (this._visibilityTogglerTimer) {
        cancel(this._visibilityTogglerTimer);
        this._visibilityTogglerTimer = null;
      }

      this.isFilteringRunning = false;
    }

    this.routes = [];
    this._visibleRouteIds = [];
  }
}
