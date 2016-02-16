import DS from 'ember-data';

export default DS.Model.extend({
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    username: DS.attr('string'),
    badPasswordAttempts: DS.attr('number'),
    isLockedOut: DS.attr('boolean'),

    clients: DS.hasMany('client', {inverse:'userId'}),
});
