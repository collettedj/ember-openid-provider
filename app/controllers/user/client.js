import Ember from 'ember';
import ClientValidator from '../../utils/client-validator';

export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),

    isEditing: false,

    isNotEditing: Ember.computed.not('isEditing'),

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    showDeleteModal: false,

    showErrors: false,

    clientValidator: Ember.computed('model', {
        get(){
            return ClientValidator.create({
                container: this.get('container'),
                client: this.get('model')
            });
        }
    }),

    actions:{
        saveClient(){
            if(this.get('clientValidator.isValid')){
                this.get('model').save()
                    .then(() => {
                        return this.get('notify').success("successfully saved the client application");
                    })
                    .catch(err => {
                        this.get('notify').warning("save failed");
                        console.log(err.stack);
                    });
            } else {
                this.get('notify').warning("Please fix errors then try again");
                this.set('showErrors', true);
            }

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
