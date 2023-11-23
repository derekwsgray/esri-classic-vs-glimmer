import { module, test } from 'qunit';
import { setupTest } from 'esri-classic-vs-glimmer/tests/helpers';

module('Unit | Controller | glimmer-components', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:glimmer-components');
    assert.ok(controller);
  });
});
