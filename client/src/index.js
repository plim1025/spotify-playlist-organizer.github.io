import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Songs from './views/Songs';
import SelectPlaylist from './views/SelectPlaylist';

// For async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

render(
    <Provider store={Store}>
        <Header />  
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact render={() => <button onClick={() => window.location='http://localhost:3000/login'}>Login</button>} />
                    <Route path='/playlists' exact component={SelectPlaylist} />
                    <Route path='/songs' component={Songs} />
                    <Route path='/' render={() => <div>404</div>} />
                </Switch>
            </BrowserRouter>
    </Provider>, 
    document.getElementById("app")
);

