import Component from '@ember/component';
import { service } from '@ember/service';
import { computed } from '@ember/object';

export default class ViewComponent extends Component {
  tagName = '';
  @service classicData;

  @computed('classicData.visibleRoutes')
  get visibleRoutes() {
    return this.classicData.visibleRoutes;
  }

  willDestroy() {
    this.classicData.shutdown();

    super.willDestroy(...arguments);
  }
}
