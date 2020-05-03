import React from 'react';
import { songList } from './redux/Reducers';
import PlaylistView from './views/PlaylistView';
import SliderFilter from './components/SliderFilter';
import DropdownFilter from './components/DropdownFilter';
import SortBy from './components/SortBy';
import './assets/css/App.css';

const App = () => {

    const maxDuration = Math.max(...[...songList.map(song => song.duration)]);
    const maxPopularity = Math.max(...[...songList.map(song => song.popularity)]);
    const maxBPM = Math.max(...[...songList.map(song => song.bpm)]);
    const maxLoudness = Math.max(...[...songList.map(song => song.loudness)]);

    return (
        <div>
            <PlaylistView />
            <SliderFilter
                category={"duration"}
                title={"Duration"}
                min={0}
                max={maxDuration}
            />
            <SliderFilter
                category={"popularity"}
                title={"Popularity"} 
                min={0}
                max={maxPopularity}
            />
            <SliderFilter
                category={"bpm"}
                title={"BPM"} 
                min={0} 
                max={maxBPM}
            />
            <SliderFilter
                category={"loudness"}
                title={"Loudness"}
                min={0}
                max={maxLoudness}
            />
            <SortBy />
            <DropdownFilter
                category={"artist"}
                title={"Artists"}
            />
        </div>
    )
}

export default App;
