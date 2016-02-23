import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
    notify: Ember.inject.service('notify'),

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    showErrors: false,

    actions:{
        saveUser(){
            if(this.get('isValid')){
                this.get('model').save()
                    .then(() => {
                        return this.get('notify').success("save successful");
                    })
                    .catch(err => {
                        this.get('notify').warning("save failed");
                        alert(err);
                    });
            } else {
                this.get('notify').warning("Please fix errors then try again");
                this.set('showErrors', true);
            }
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
