import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('user', function() {
    this.route('client', {path: '/:client_id'});
  });
  this.route('registration');
});

export default Router;
