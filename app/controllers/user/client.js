import Ember from 'ember';

export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),

    isEditing: false,

    isNotEditing: Ember.computed.not('isEditing'),

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    showDeleteModal: false,

    actions:{
        saveClient(){
            this.get('model').save()
                .then(() => {
                    return this.get('notify').success("successfully saved the client application");
                })
                .catch(err => {
                    this.get('notify').warning("save failed");
                    console.log(err.stack);
                });
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
                .then(() => {
                    return this.get('notify').success("successfully deleted the client application");
                })
                .catch(err => {
                    this.get('notify').warning("delete failed");
                    console.log(err.stack);
                });
        },

    }
});
