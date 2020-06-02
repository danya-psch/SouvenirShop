import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./../reducers/index";
import { redirect } from './../middlewares/redirect';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(redirect, thunk)
);

const store = createStore(rootReducer, enhancer);

export default store;