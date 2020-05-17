import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
import App from './App';

var initialState;
const store = Store(initialState);

render(
    <Provider store={store}>
        <App/>  
    </Provider>, 
    document.getElementById("app")
);

