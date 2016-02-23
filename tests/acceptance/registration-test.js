import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | registration');

test('visiting /registration', function(assert) {
    visit('/registration');

    andThen(function() {
        assert.equal(currentURL(), '/registration');
        const registrationDisabled = find(".registration-btn").prop("disabled");
        assert.equal(registrationDisabled, true);
    });
});

test('visiting /registration and register success', function(assert) {
    visit('/registration');
    fillIn('.reg-firstname input', "firstname");
    fillIn('.reg-lastname input', "lastname");
    fillIn('.reg-username input', "username");
    fillIn('.reg-password input', "1qaz2wsxQAZWSX");
    fillIn('.reg-password-conf input', "1qaz2wsxQAZWSX");

    andThen(function() {
        assert.equal(currentURL(), '/registration');
        const registrationDisabled = find(".registration-btn").prop("disabled");
        assert.equal(registrationDisabled, false);
        click(".registration-btn");
    });

    andThen(function(){
        assert.equal(currentURL(), '/');
    });
});
