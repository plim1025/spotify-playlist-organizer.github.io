import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './views/Login';
import GeneratePlaylist from './views/GeneratePlaylist';
import Finished from './views/Finished';

// For async/await
import 'core-js/stable';
import 'regenerator-runtime/runtime';

render(
    <>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/generatePlaylist' component={GeneratePlaylist} />
                <Route path='/finished' component={Finished} />
                <Route path='/' render={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById('app')
);
