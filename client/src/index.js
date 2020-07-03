import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './views/Login';
import Songs from './views/Songs';

// For async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

render(
    <>
        <Header />  
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/songs' component={Songs} />
                    <Route path='/' render={() => <div>404</div>} />
                </Switch>
            </BrowserRouter>
    </>,
    document.getElementById("app")
);