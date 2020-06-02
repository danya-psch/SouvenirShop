import { CURRENT_PATH_REDIRECT } from "./../actions/redirect";
import history from './../configs/configure_router_history';

export function redirect({ dispatch }) {
    return function(next) {
        return function(action) {
            if (action.type === CURRENT_PATH_REDIRECT) {
                history[action.payload.method](action.payload.path);
            }
            
            return next(action);
        };
    };
}