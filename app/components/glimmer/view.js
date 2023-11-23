import Component from '@glimmer/component';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

export default class ViewComponent extends Component {
  @service trackedData;

  setupData = modifier((element, positional) => {
    this.trackedData.setup(positional[0]);
  });

  get visibleRoutes() {
    return this.trackedData.visibleRoutes;
  }

  willDestroy() {
    this.trackedData.shutdown();

    super.willDestroy(...arguments);
  }
}
