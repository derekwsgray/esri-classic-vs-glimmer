import { module, test } from 'qunit';
import { setupTest } from 'esri-classic-vs-glimmer/tests/helpers';

module('Unit | Service | classic-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:classic-data');
    assert.ok(service);
  });
});
