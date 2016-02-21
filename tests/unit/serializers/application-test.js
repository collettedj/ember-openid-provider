import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:application', 'Unit | Serializer | application', {
  // Specify the other units that are required for this test.
  needs: []
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let serializer = this.subject();

  // let serializedRecord = record.serialize();

  assert.ok(!!serializer);
});
