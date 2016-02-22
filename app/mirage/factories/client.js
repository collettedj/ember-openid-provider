import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    _id(i) { return i + 1; },
    // id(i) { return i; },
    name(i) { return `name ${i+1}`; },
    description(i) { return `description ${i+1}`; },
    secret(i) { return `secret ${i+1}`; },
    clientIdentifier(i) { return `id ${i+1}`; },
    userId(i) { return i; },
});
