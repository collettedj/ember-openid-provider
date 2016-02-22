import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';
import { /*currentSession,*/ authenticateSession /*, invalidateSession*/ } from 'ember-openid-provider/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user');

test('visiting /user', function(assert) {
    server.createList('user', 3);
    server.createList('client', 3, {userId:1});
    authenticateSession(this.application, {
        _id:1,
        firstname:"first",
        lastname:"last",
        username:"user",
    });
    visit('/user');

    andThen(function() {
        assert.equal(currentURL(), '/user');

        const first = find('.user-first-name div').text();
        const last = find('.user-last-name div').text();
        const length = find('ul.client-list > li').length;
        assert.equal(first, "first 1");
        assert.equal(last, "last 1");
        assert.equal(length, 3);


    });
});
