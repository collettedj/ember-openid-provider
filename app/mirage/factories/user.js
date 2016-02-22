import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    _id(i) { return i + 1; },
    // id(i) { return i; },
    firstname(i) { return `first ${i+1}`; },
    lastname(i) { return `last ${i+1}`; },
    username(i) { return `user${i+1}`; },
    password(i) { return `password${i+1}`; },
});
