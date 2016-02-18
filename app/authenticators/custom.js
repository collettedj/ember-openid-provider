import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajaxPromise: function(options) {
    var request = new Ember.RSVP.Promise(function (resolve, reject) {
      options.success = function (response) {
        resolve(response);
      };

      options.error = function (reason) {
        reject(reason);
      };

      return Ember.$.ajax(options);
    });

    return request;
  },

  restore: function() {
    return this.ajaxPromise({
      type: "GET",
      url: "/api/v1/authenticate/user",
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  },

  authenticate: function(username, password) {
    return this.ajaxPromise({
        type: "POST",
        url: "/api/v1/authenticate/login",
        data: {username:username, password:password},
        // beforeSend: function(req){
        //   req.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        // }
      }).then(function(res){
        return res;
      }, function(err){
        return Ember.RSVP.reject(err);
      });
  },

  invalidate: function() {
    return this.ajaxPromise({
      type: "GET",
      url: "/api/v1/authenticate/signout",
      data: {},
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  }
});
