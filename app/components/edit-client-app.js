import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {

    isEditing: false,

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
