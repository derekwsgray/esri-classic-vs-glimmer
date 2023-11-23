import { module, test } from 'qunit';
import { setupTest } from 'esri-classic-vs-glimmer/tests/helpers';

module('Unit | Route | classic-components', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:classic-components');
    assert.ok(route);
  });
});
