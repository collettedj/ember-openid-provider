import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';
import { /*currentSession,*/ authenticateSession /*, invalidateSession*/ } from 'ember-openid-provider/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | user');

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

test('visiting /user', function(assert) {
    seedData();
    setAuthenticatedUser(this);
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

test('visiting /user in edit mode', function(assert) {
    seedData();
    setAuthenticatedUser(this);
    visit('/user');
    click('.x-toggle-btn');

    andThen(function() {
        assert.equal(currentURL(), '/user');
        const first = find('.user-first-name input').val();
        const last = find('.user-last-name input').val();
        assert.equal(first, "first 1");
        assert.equal(last, "last 1");

        fillIn('.user-first-name input', '');
        fillIn('.user-last-name input', '');
        click('.user-save-btn');
    });

    andThen(function(){
        const firstnameErr = find('.user-first-name .err-msg').text();
        const lastnameErr = find('.user-last-name .err-msg').text();

        assert.ok(firstnameErr.indexOf("can't be blank") > -1);
        assert.ok(lastnameErr.indexOf("can't be blank") > -1);
    });
});

test('visiting /user modify', function(assert) {
    seedData();
    setAuthenticatedUser(this);
    visit('/user');
    click('.x-toggle-btn');
    fillIn('.user-first-name input', 'new first name');
    andThen(function() {
        assert.equal(currentURL(), '/user');
        const first = find('.user-first-name input').val();
        const saveDisabled = find(".user-save-btn").prop("disabled");
        assert.equal(first, 'new first name');
        assert.equal(saveDisabled, false);
    });
});

test('visiting /user modify and save', function(assert) {
    seedData();
    setAuthenticatedUser(this);
    visit('/user');
    click('.x-toggle-btn');
    fillIn('.user-first-name input', 'new first name');
    click('.user-save-btn');
    andThen(function() {
        assert.equal(currentURL(), '/user');
        const saveDisabled = find(".user-save-btn").prop("disabled");
        const first = find('.user-first-name input').val();
        assert.equal(saveDisabled, true);
        assert.equal(first, 'new first name');
    });
});
