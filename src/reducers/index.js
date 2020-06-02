import { combineReducers } from 'redux';

import userReducer from './user';
import souvenirsReducer from './souvenirs';

const rootReducer = combineReducers({
  user: userReducer,
  souvenirs: souvenirsReducer
});

export default rootReducer;