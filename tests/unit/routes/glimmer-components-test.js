import { module, test } from 'qunit';
import { setupTest } from 'esri-classic-vs-glimmer/tests/helpers';

module('Unit | Route | glimmer-components', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:glimmer-components');
    assert.ok(route);
  });
});
