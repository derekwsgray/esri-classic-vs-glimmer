import EmberRouter from '@ember/routing/router';
import config from 'esri-classic-vs-glimmer/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('classic-components');
  this.route('glimmer-components');
});
