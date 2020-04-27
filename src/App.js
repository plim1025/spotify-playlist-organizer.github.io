import React from 'react';
import { songList } from './redux/Reducers';
import { FILTERBY_DURATION, FILTERBY_POPULARITY, FILTERBY_BPM, FILTERBY_LOUDNESS } from './redux/Constants';
import PlaylistView from './views/PlaylistView';
import SliderFilter from './components/SliderFilter';
import DropdownFilter from './components/DropdownFilter';
import SortBy from './components/SortBy';

const App = () => {

    const maxDuration = Math.max(...[...songList.map(song => song.duration)]);
    const maxPopularity = Math.max(...[...songList.map(song => song.popularity)]);
    const maxBPM = Math.max(...[...songList.map(song => song.bpm)]);
    const maxLoudness = Math.max(...[...songList.map(song => song.loudness)]);

    return (
        <div>
            <PlaylistView />
            <SliderFilter 
                title={"Duration"} 
                filterDispatch={FILTERBY_DURATION} 
                min={0}
                max={maxDuration}
            />
            <SliderFilter 
                title={"Popularity"} 
                filterDispatch={FILTERBY_POPULARITY}
                min={1}
                max={maxPopularity}
            />
            <SliderFilter 
                title={"BPM"} 
                filterDispatch={FILTERBY_BPM}
                min={0} 
                max={maxBPM}
            />
            <SliderFilter 
                title={"Loudness"}
                filterDispatch={FILTERBY_LOUDNESS}
                min={0}
                max={maxLoudness}
            />
            <DropdownFilter />
            <SortBy />
        </div>
    )
}

export default App;
