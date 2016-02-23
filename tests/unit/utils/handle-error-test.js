import handleError from '../../../utils/handle-error';
import { module, test } from 'qunit';

module('Unit | Utility | handle error');

// Replace this with your real tests.
test('it works', function(assert) {
    let errorMessage = null;
    const notify = {
        error(message){
            errorMessage = message;
        }
    };
    handleError({responseText:"this is a test"}, notify);
    assert.equal(errorMessage, "this is a test");
});
