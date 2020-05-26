import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Songs from './views/Songs';
import SelectPlaylist from './views/SelectPlaylist';
import "core-js/stable";
import "regenerator-runtime/runtime";

var initialState;
const store = Store(initialState);

render(
    <Provider store={store}>
        <Header />  
        <BrowserRouter>
            <Switch>
                <Route path='/' exact render={() => <button onClick={() => window.location='http://localhost:3000/login'}>Login</button>} />
                <Route path='/select' exact component={SelectPlaylist} />
                <Route path='/playlist' component={Songs} />
                <Route path='/' render={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById("app")
);

