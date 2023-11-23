import Service from '@ember/service';
import Stats from 'stats.js';

// https://github.com/mrdoob/stats.js
export default class StatsService extends Service {
  stats = null;

  constructor() {
    super(...arguments);

    this.stats = new Stats();
  }

  appendStatsDisplay = (element) => {
    console.log('Appending to ', element);

    // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.showPanel(0);

    const canvases = this.stats.dom.querySelectorAll('canvas');
    canvases[0].style.display = 'block';

    element.appendChild(this.stats.dom);
  };

  begin = () => {
    this.stats.begin();
  };

  end = () => {
    this.stats.end();
  };
}
