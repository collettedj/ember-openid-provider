import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ajaxPromise from '../utils/ajax-promise';
import handleError from '../utils/handle-error';

export default Ember.Controller.extend(EmberValidations, {
    notify: Ember.inject.service('notify'),

    session: Ember.inject.service('session'),

    isNotValid: Ember.computed.not('isValid'),

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
                    contentType:"application/json",
                    data: JSON.stringify({
                        username:username,
                        password:password,
                        firstname:firstname,
                        lastname:lastname
                    }),
                    dataType:'json'
                }).then(() => {
                    return this.get('session').authenticate('authenticator:custom', username, password);
                })
                .catch(err => {
                    handleError(err, this.get('notify'));
                });
            }
        }
    }

});
