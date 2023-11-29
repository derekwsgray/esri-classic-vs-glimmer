import Component from '@ember/component';
import { service } from '@ember/service';

export default class ViewComponent extends Component {
  tagName = '';
  @service classicData;

  get visibleRoutes() {
    return this.classicData.visibleRoutes;
  }

  willDestroy() {
    this.classicData.shutdown();

    super.willDestroy(...arguments);
  }
}
