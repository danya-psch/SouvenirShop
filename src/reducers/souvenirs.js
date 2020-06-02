import { 
    SOUVENIRS_GET_PART,
    defaultPayload
} from "../actions/souvenirs"

const initialState = {
    ...defaultPayload
};

function souvenirsReducer(state = initialState, action) {
    
    const data = action.payload;
    
    switch (action.type) {
        case SOUVENIRS_GET_PART:
        {
            return {
                ...state,
                souvenirs_list : data.souvenirs_list,
                max_page : data.max_page
            } 
            // return Object.assign({}, state, {
            //     souvenirs_list: state.souvenirs_list.concat(data.souvenirs_list),
            //     souvenirs: state.souvenirs_list.concat(data.souvenirs_list)
            // });
              
        }
        default: {
            return state;
        } 
    }
}

export default souvenirsReducer;