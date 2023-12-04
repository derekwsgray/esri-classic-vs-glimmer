import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ViewComponent extends Component {
  @service trackedData;

  get visibleRoutes() {
    return this.trackedData.visibleRoutes;
  }

  willDestroy() {
    this.trackedData.shutdown();

    super.willDestroy(...arguments);
  }
}
