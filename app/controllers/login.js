import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    actions:{
        authenticate() {
          let { identification, password } = this.getProperties('identification', 'password');
          this.get('session').authenticate('authenticator:custom', identification, password).catch((reason) => {
            let message = {};
            if(reason.responseJSON){
                message = reason.responseJSON;
            } else if (reason.error && !_.isFunction(reason.error)) {
                message = reason.error;
            } else {
                message = reason;
            }
            console.log(message);
            this.set('errorMessage', JSON.stringify(message));
          });
        }
    }
});
