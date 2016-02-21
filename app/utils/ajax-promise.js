import Ember from 'ember';

export default function ajaxPromise(options) {
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
}