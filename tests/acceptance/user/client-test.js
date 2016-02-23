import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';
import { /*currentSession,*/ authenticateSession /*, invalidateSession*/ } from 'ember-openid-provider/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user/client');

const setAuthenticatedUser = (self) => {
    authenticateSession(self.application, {
        _id:1,
        firstname:"first",
        lastname:"last",
        username:"user",
    });
};

const seedData = () => {
    server.createList('user', 3);
    server.createList('client', 3, {userId:1});
};

test('visiting /user/client and check validation', function(assert) {
    seedData();
    setAuthenticatedUser(this);

    visit('/user/1');
    andThen(function() {
        assert.equal(currentURL(), '/user/1');
        const clientNameErr = find('.client-name .err-msg').text();
        const clientDescriptionErr = find('.client-description .err-msg').text();
        const clientIdentifierErr = find('.client-identifier .err-msg').text();
        const clientSecretErr = find('.client-secret .err-msg').text();

        assert.equal(clientNameErr, "");
        assert.equal(clientDescriptionErr, "");
        assert.equal(clientIdentifierErr, "");
        assert.equal(clientSecretErr, "");

        click('.x-toggle-btn');
    });

    andThen(function(){
        fillIn('.client-name input');
        fillIn('.client-description input');
        fillIn('.client-identifier input');
        fillIn('.client-secret input');
        click(".save-client-btn");
    });

    andThen(function(){
        const clientNameErr = find('.client-name .err-msg').text();
        const clientDescriptionErr = find('.client-description .err-msg').text();
        const clientIdentifierErr = find('.client-identifier .err-msg').text();
        const clientSecretErr = find('.client-secret .err-msg').text();

        assert.ok(clientNameErr.indexOf("can't be blank") > -1);
        assert.ok(clientDescriptionErr.indexOf("can't be blank") > -1);
        assert.ok(clientIdentifierErr.indexOf("can't be blank") > -1);
        assert.ok(clientSecretErr.indexOf("can't be blank") > -1);
    });
});
