
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
    session: Ember.inject.service('session'),

    user: Ember.computed.alias('session.data.authenticated'),

    model(){
        const userId = this.get('user._id');
        return this.store.findRecord('user', userId);
    }
});
