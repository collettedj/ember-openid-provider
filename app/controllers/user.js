import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
    notify: Ember.inject.service('notify'),

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    actions:{
        saveUser(){
            this.get('model').save()
                .then(() => {
                    return this.get('notify').success("save successful");
                })
                .catch(err => {
                    this.get('notify').warning("save failed");
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
