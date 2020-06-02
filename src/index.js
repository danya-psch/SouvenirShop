
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from 'react-router-dom';
import App from  './components/App';
import store from "./configs/configure_redux_store"
import history from './configs/configure_router_history';

const root = (
    <Provider store={store}>
        <BrowserRouter>
            <Router history={history}>
                <App />
            </Router>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));