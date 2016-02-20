import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    actions:{
        saveUser(){
            this.get('model').save()
                .catch(err => {
                    alert(err);
                });
        }
    },

    validations:{
        "model.firstname": {
          presence: true,
          length: {minimum: 5}
        },

        "model.lastname": {
          presence: true,
          length: {minimum: 5}
        },

    }
});
