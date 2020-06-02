import User from "./../models/user";
import { CURRENT_PATH_REDIRECT } from "./../actions/redirect";

export const USER_AUTHENTICATE_REQUEST = 'USER_AUTHENTICATE_REQUEST';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';

export const defaultPayload = {
    user_object: null
};

export const USER_ACTION = {
    INSERT_SOUVENIR: 1,
    REMOVE_SOUVENIR: 2
}

export function authenticate(name, password) {
    return async function(dispatch) {
        const response = await User.authenticate(name, password);
        console.log("response", response);
        if (response.error !== null) return;
        const jwt = response.respBody.token;
        localStorage.setItem("jwt", jwt);
        const user_object = response.respBody.user;
        dispatch({
            type: USER_AUTHENTICATE_REQUEST,
            payload: { ...defaultPayload, user_object },
        });
        dispatch({
            type: CURRENT_PATH_REDIRECT,
            payload: {
                method: 'push', 
                path: '/'
            }
        });
    };
}

export function register(formData) {
    return async function(dispatch) {
        const response = await User.create(formData);
        console.log("response", response);
        if (response.error !== null) return;
        dispatch({
            type: CURRENT_PATH_REDIRECT,
            payload: {
                method: 'push', 
                path: '/login'
            }
        });
    };
}

export function checkUsername(username) {
    // const response = await User.checkUsername(formData);
}

export function updateUser(user_id, souvenir_id, action) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) {
        const response = await User.updateUser(user_id, souvenir_id, action, jwt);
        const user_object = response.respBody.user;
        console.log("user_object", user_object);
        dispatch({
            type: USER_UPDATE,
            payload: { ...defaultPayload, user_object }
        });
    }
}

export function logout() {
    return function(dispatch) {
        localStorage.removeItem("jwt");
        dispatch({
            type: USER_LOGOUT,
            payload: {
                ...defaultPayload
            },
        });
        dispatch({
            type: CURRENT_PATH_REDIRECT,
            payload: {
                method: 'push', 
                path: '/login'
            }
        });
    };
}

export function getUserFromJWT() {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) {  
        
        const response = await User.me(jwt);
        if (response.error !== null) {
            localStorage.removeItem("jwt");
            return;
        } 
        const user_object = response.respBody;
        dispatch({
            type: USER_AUTHENTICATE_REQUEST,
            payload: { ...defaultPayload, user_object },
        });  
    };
}