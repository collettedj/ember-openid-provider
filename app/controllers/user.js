import Ember from 'ember';

export default Ember.Controller.extend({

    isClean: Ember.computed.not('model.hasDirtyAttributes'),

    actions:{
        saveUser(){
            this.get('model').save()
                .catch(err => {
                    alert(err);
                });
        }
    }
});
