import { module, test } from 'qunit';
import { setupRenderingTest } from 'esri-classic-vs-glimmer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | glimmer/esri-map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Glimmer::EsriMap />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Glimmer::EsriMap>
        template block text
      </Glimmer::EsriMap>
    `);

    assert.dom().hasText('template block text');
  });
});
