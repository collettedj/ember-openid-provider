import Ember from 'ember';
import handleError from '../../utils/handle-error';

export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),

    showNewApp:false,

    newClient: null,

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
            newClient.save()
                .then(() => {
                    this.set("showNewApp", false);
                    return this.transitionToRoute('user.client', newClient.get('id'));
                })
                .then(() => {
                    return this.get('notify').info("new app saved successfully");
                })
                .catch(err => {
                    handleError(err, this.get('notify'), "saving new app failde");
                    // this.get('notify').warning("saving new app failed");
                    // console.log(err);
                });
        }
    }
});
