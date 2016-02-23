import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

const seedData = () => {
    server.createList('user', 3);
    server.createList('client', 3, {userId:1});
};

test('visiting /login success', function(assert) {
    seedData();

    visit('/login');

    andThen(function() {
        assert.equal(currentURL(), '/login');

        fillIn('.login-username input', 'first 1');
        fillIn('.login-password input', 'password100AAaa');
        click('.login-btn');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
    });
});

test('visiting /login validation', function(assert) {
    seedData();

    visit('/login');

    andThen(function() {
        assert.equal(currentURL(), '/login');
        const usernameErr = find('.login-username .err-msg').text();
        const passwordErr = find('.login-password .err-msg').text();

        assert.equal(usernameErr, "");
        assert.equal(passwordErr, "");

        click('.login-btn');
    });

    andThen(function() {
        assert.equal(currentURL(), '/login');

        const usernameErr = find('.login-username .err-msg').text();
        const passwordErr = find('.login-password .err-msg').text();

        assert.ok(usernameErr.indexOf("can't be blank") > -1);
        assert.ok(passwordErr.indexOf("can't be blank") > -1);
    });
});
