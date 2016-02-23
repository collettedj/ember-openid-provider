import { test } from 'qunit';
import moduleForAcceptance from 'ember-openid-provider/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | registration');

test('visiting /registration', function(assert) {
    visit('/registration');


    andThen(function() {
        assert.equal(currentURL(), '/registration');

        const firstnameErr = find('.reg-firstname .err-msg').text();
        const lastnameErr = find('.reg-lastname .err-msg').text();
        const usernameErr = find('.reg-username .err-msg').text();
        const passwordErr = find('.reg-password .err-msg').text();

        assert.equal(firstnameErr, "");
        assert.equal(lastnameErr, "");
        assert.equal(usernameErr, "");
        assert.equal(passwordErr, "");

        click(".registration-btn");
    });

    andThen(function(){
        const firstnameErr = find('.reg-firstname .err-msg').text();
        const lastnameErr = find('.reg-lastname .err-msg').text();
        const usernameErr = find('.reg-username .err-msg').text();
        const passwordErr = find('.reg-password .err-msg').text();


        assert.ok(firstnameErr.indexOf("can't be blank") > -1);
        assert.ok(lastnameErr.indexOf("can't be blank") > -1);
        assert.ok(usernameErr.indexOf("can't be blank") > -1);
        assert.ok(passwordErr.indexOf("can't be blank") > -1);
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
        // const registrationDisabled = find(".registration-btn").prop("disabled");
        // assert.equal(registrationDisabled, false);
        click(".registration-btn");
    });

    andThen(function(){
        assert.equal(currentURL(), '/');
    });
});
