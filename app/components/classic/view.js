import Component from '@ember/component';
import { service } from '@ember/service';
import { computed } from '@ember/object';
import { modifier } from 'ember-modifier';

export default class ViewComponent extends Component {

  @service classicData;

  setupData = modifier((element, positional, named) => {
    this.classicData.setup(positional[0]);
  });

  @computed('classicData.visibleRoutes')
  get visibleRoutes() {
    return this.classicData.visibleRoutes;
  }

  willDestroy() {
    this.classicData.shutdown();

    super.willDestroy(...arguments);
  }

}
