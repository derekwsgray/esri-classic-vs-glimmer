import { module, test } from 'qunit';
import { setupRenderingTest } from 'esri-classic-vs-glimmer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | glimmer/esri-graphics-layer',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Glimmer::EsriGraphicsLayer />`);

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <Glimmer::EsriGraphicsLayer>
        template block text
      </Glimmer::EsriGraphicsLayer>
    `);

      assert.dom().hasText('template block text');
    });
  },
);
