import Ember from 'ember';
import handleError from '../../utils/handle-error';
import ClientValidator from '../../utils/client-validator';


export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),

    showNewApp:false,

    newClient: null,

    clientValidator: Ember.computed('newClient', {
        get(){
            return ClientValidator.create({
                container: this.get('container'),
                client: this.get('newClient')
            });
        }
    }),

    showClientErrors: false,

    actions:{
        toggleNewApp(){
            this.toggleProperty('showNewApp');
            if(this.get('showNewApp')){
                const oldClient = this.get('newClient');

                const newClient = this.store.createRecord('client');
                this.set("newClient", newClient);

                if(oldClient && oldClient.get('isNew')){
                    oldClient.destroyRecord();
                }
            }
        },

        saveNewClient(){
            const newClient = this.get('newClient');
            if(this.get('clientValidator.isValid')){
                newClient.save()
                    .then(() => {
                        this.set("showNewApp", false);
                        return this.transitionToRoute('user.client', newClient.get('id'));
                    })
                    .then(() => {
                        return this.get('notify').info("new app saved successfully");
                    })
                    .catch(err => {
                        handleError(err, this.get('notify'), "saving new app failed");
                    });
            } else {
                this.get('notify').warning("Please fix errors then try again");
                this.set('showClientErrors', true);
            }

        }
    }
});
