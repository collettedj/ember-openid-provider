import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';
import { /*currentSession,*/ authenticateSession /*, invalidateSession*/ } from 'ember-openid-provider/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user');

test('visiting /user', function(assert) {
    server.createList('user', 3);
    authenticateSession(this.application, {
        _id:1,
        firstname:"first",
        lastname:"last",
        username:"user",
    });
    visit('/user');

    andThen(function() {
        assert.equal(currentURL(), '/user');
    });
});
