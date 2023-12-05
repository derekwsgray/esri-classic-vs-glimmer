import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ViewComponent extends Component {
  @service directDriveData;

  get visibleRoutes() {
    return this.directDriveData.visibleRoutes;
  }

  willDestroy() {
    this.directDriveData.shutdown();

    super.willDestroy(...arguments);
  }
}
