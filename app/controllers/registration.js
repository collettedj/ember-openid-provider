import Ember from 'ember';
import EmberValidations from 'ember-validations';
import _ from 'lodash/lodash';
import ajaxPromise from '../utils/ajax-promise';

export default Ember.Controller.extend(EmberValidations, {
    session: Ember.inject.service('session'),

    validations:{
        "model.firstname": {
          presence: true,
          length: {minimum: 5}
        },

        "model.lastname": {
          presence: true,
          length: {minimum: 5}
        },

        "model.username": {
          presence: true,
          length: {minimum: 5}
        },

        "model.password": {
          presence: true,
          length: {minimum:10},
          confirmation:true,
          format: { with: /(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])/g, allowBlank: false, message: 'invalid password'  }
        },
    },

    actions:{
        registerUser(){
            const isValid = this.get('isValid');
            const username = this.get('model.username');
            const password = this.get('model.password');
            const firstname = this.get('model.firstname');
            const lastname= this.get('model.lastname');
            if(isValid){
                ajaxPromise({
                    type: "POST",
                    url: "/api/v1/authenticate/signup",
                    data: {
                        username:username,
                        password:password,
                        firstname:firstname,
                        lastname:lastname
                    }
                }).then(() => {
                    return this.get('session').authenticate('authenticator:custom', username, password);
                })
                .catch(err => {
                    let message = {};
                    if(err.responseJSON){
                        message = err.responseJSON;
                    } else if (err.error && !_.isFunction(err.error)) {
                        message = err.error;
                    } else {
                        message = err;
                    }
                    console.log(message);
                    this.set('errorMessage', JSON.stringify(message));
                });
            }
        }
    }

});
