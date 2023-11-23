import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class StatsDisplayComponent extends Component {

  @service('stats') statsService;

}
