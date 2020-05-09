import React from 'react';
import FilterView from './views/FilterView';
import SongView from './views/SongView';
import './assets/css/App.css';

const App = () => {

    return (
        <div id="flex">
            <div id="filters">
                <FilterView/>
            </div>
            <div id="songs">
                <SongView/>
            </div>
        </div>
    )
}

export default App;
