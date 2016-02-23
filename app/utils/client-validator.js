import Ember from 'ember';
import EmberValidations from 'ember-validations';


export default Ember.Object.extend(EmberValidations, {

    client: null,

    validations:{
        "client.name": {
          presence: true,
          length: {minimum: 5}
        },

        "client.description": {
          presence: true,
          length: {minimum: 5}
        },

        "client.clientIdentifier": {
          presence: true,
          length: {minimum: 5}
        },

        "client.secret": {
          presence: true,
          length: {minimum: 5}
        },
    }

});

