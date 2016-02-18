import Ember from 'ember';

export default Ember.Controller.extend({
    showNewApp:false,
    actions:{
        toggleNewApp(){
            this.toggleProperty('showNewApp');
        }
    }
});
