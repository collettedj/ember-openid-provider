import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ajaxPromise from '../utils/ajax-promise';


export default Base.extend({

  restore: function() {
    return ajaxPromise({
      type: "GET",
      url: "/api/v1/authenticate/user",
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  },

  authenticate: function(username, password) {
    return ajaxPromise({
        type: "POST",
        url: "/api/v1/authenticate/login",
        data: JSON.stringify({username:username, password:password}),
        dataType: "json",
        contentType: "application/json",
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
    return ajaxPromise({
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
