import { 
    USER_AUTHENTICATE_REQUEST,
    USER_LOGOUT,
    USER_UPDATE,
    defaultPayload
} from "../actions/user"

const initialState = {
    ...defaultPayload
};

function userReducer(state = initialState, action) {
    
    const data = action.payload;
    
    switch (action.type) {
        case USER_AUTHENTICATE_REQUEST:
        case USER_LOGOUT:
        case USER_UPDATE:
        {
            return {
                ...state,
                user_object: data.user_object
            } 
        }
        default: {
            return state;
        } 
    }
}


export default userReducer;