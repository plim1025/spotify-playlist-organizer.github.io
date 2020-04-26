import React from 'react';
import { songList } from './redux/Reducers';
import { FILTERBY_BPM } from './redux/Constants';
import PlaylistView from './views/PlaylistView';
import SliderFilter from './components/SliderFilter';
import SortBy from './components/SortBy';

const App = () => {

    const maxBPM = Math.max(...[...songList.map(song => song.bpm)]);

    return (
        <div>
            <PlaylistView />
            <SliderFilter 
                title={"BPM"} 
                filterDispatch={FILTERBY_BPM} 
                max={maxBPM}
            />
            <SortBy />
        </div>
    )
}

export default App;
