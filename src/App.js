import React from 'react';
import FilterView from './views/FilterView';
import SongView from './views/SongView';
import './assets/css/App.css';

const App = () => {

    return (
        <div>
            <FilterView />
            <SongView />
        </div>
    )
}

export default App;
