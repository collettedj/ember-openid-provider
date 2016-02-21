import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    _id(i) { return i; },
    firstname(i) { return `first ${i}`; },
    lastname(i) { return `last ${i}`; },
    username(i) { return `user${i}`; },
    password(i) { return `password${i}`; },
});
