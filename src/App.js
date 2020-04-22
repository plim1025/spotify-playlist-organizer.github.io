import React from 'react';
import Song from './components/Song';

const details = {
    "artist": "Eminem",
    "album": "Recovery",
    "year": 2010,
    "genre": "hip hop/rap",
    "time": 350,
    "popularity": 35
}

function App() {

    return (
        <Song details={details}/>
    )
}

export default App;
