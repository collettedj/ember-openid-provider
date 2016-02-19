import Ember from 'ember';

export default Ember.Controller.extend({
    showNewApp:false,

    newClient: Ember.computed({
        get(){
            return this.store.createRecord('client');
        }
    }),

    actions:{
        toggleNewApp(){
            this.toggleProperty('showNewApp');
        },

        saveNewClient(){
            const newClient = this.get('newClient');
            newClient.save()
                .catch(err => {
                    console.log(err);
                });
        }
    }
});
