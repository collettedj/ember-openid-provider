import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    id(i) { return i; },
    name(i) { return `name ${i}`; },
    description(i) { return `description ${i}`; },
    secret(i) { return `secret ${i}`; },
    clientIdentifier(i) { return `id ${i}`; },
    userId(i) { return `user ${i}`; },
});
