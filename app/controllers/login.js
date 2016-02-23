import Ember from 'ember';
import handleError from '../utils/handle-error';

export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),
    session: Ember.inject.service('session'),
    actions:{
        authenticate() {
            let { identification, password } = this.getProperties('identification', 'password');
            this.get('session').authenticate('authenticator:custom', identification, password)
                .catch((err) => {
                    handleError(err, this.get('notify'));
                });
        }
    }
});
