import { module, test } from 'qunit';
import { setupTest } from 'esri-classic-vs-glimmer/tests/helpers';

module('Unit | Service | state', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:state');
    assert.ok(service);
  });
});
