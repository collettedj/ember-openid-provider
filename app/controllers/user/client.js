import Ember from 'ember';

export default Ember.Controller.extend({

    isEditing: false,

    isNotEditing: Ember.computed.not('isEditing'),

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    showDeleteModal: false,

    actions:{
        saveClient(){
            this.get('model').save()
                .catch(err => console.log(err.stack));
        },

        toggleDeleteModal(){
            this.toggleProperty('showDeleteModal');
        },

        deleteClient(){
            this.get('model').destroyRecord()
                .then(() => {
                    this.set('showDeleteModal', false);
                    return this.transitionToRoute('user');
                })
                .catch(err => console.log(err.stack));
        },

    }
});
