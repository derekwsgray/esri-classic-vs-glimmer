import { module, test } from 'qunit';
import { setupRenderingTest } from 'esri-classic-vs-glimmer/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | glimmer/route-graphic', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Glimmer::RouteGraphic />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Glimmer::RouteGraphic>
        template block text
      </Glimmer::RouteGraphic>
    `);

    assert.dom().hasText('template block text');
  });
});
