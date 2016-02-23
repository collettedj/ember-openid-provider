import _ from 'lodash/lodash';

export default function handleError(err, notify) {
    let message = {};
    if(err){
        if(err.errors && err.errors.code && err.errors.errmsg){
            message = err.errors.errmsg;
        } else if(err.responseJSON){
            message = err.responseJSON;
        } else if (err.responseText){
            message = err.responseText;
        } else if (err.error && !_.isFunction(err.error)) {
            message = err.error;
        } else {
            message = err;
        }

        if(err.stack){
            console.log(err.stack);
        } else if (err.message) {
            console.log(err.message);
        } else {
            console.log(err);
        }
        if(notify && _.isFunction(notify.error)){
            notify.error(message);
        }
    }
}
