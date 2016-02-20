import Ember from 'ember';

export default Ember.Controller.extend({
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
                .catch(err => {
                    console.log(err);
                });
        }
    }
});
