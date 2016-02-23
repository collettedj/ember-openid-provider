import Ember from 'ember';
import handleError from '../utils/handle-error';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
    notify: Ember.inject.service('notify'),
    session: Ember.inject.service('session'),

    showErrors:false,

    actions:{
        authenticate() {
            if(this.get('isValid')){
                let { identification, password } = this.getProperties('identification', 'password');
                this.get('session').authenticate('authenticator:custom', identification, password)
                    .catch((err) => {
                        handleError(err, this.get('notify'));
                    });
            } else {
                this.get('notify').warning("Please fix errors then try again");
                this.set('showErrors', true);
            }
        }
    },

    validations:{
        "identification": {
            presence: true,
            length: {minimum: 5}
        },

        "password": {
            presence: true,
            length: {minimum: 10}
        },
    }
});
