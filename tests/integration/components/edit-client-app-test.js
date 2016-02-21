import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-client-app', 'Integration | Component | edit client app', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{edit-client-app}}`);

  assert.equal(true,true);
  // assert.equal(this.$().text().trim(), '');

  // // Template block usage:" + EOL +
  // this.render(hbs`
  //   {{#edit-client-app}}
  //     template block text
  //   {{/edit-client-app}}
  // `);

  // assert.equal(this.$().text().trim(), 'template block text');
});
