import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import "../node_modules/primeflex/primeflex.css";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import App from './App';
import {createStore} from 'redux';
import allReducers from './Reducers';
import { Provider } from 'react-redux';
import {loadState ,saveState, unloadState} from './localStorage'

const persistedState = loadState();

const Mystore = createStore(allReducers,persistedState);

Mystore.subscribe(() => {
    saveState(Mystore.getState());
});


ReactDOM.render(
    <Provider store={Mystore}>
        <App />
    </Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
