import React from 'react';
import { songList } from './redux/Reducers';
import { FILTERBY_ARTIST_ADD, FILTERBY_ARTIST_REMOVE, FILTERBY_ALBUM, FILTERBY_YEAR, FILTERBY_DURATION, FILTERBY_POPULARITY, FILTERBY_BPM, FILTERBY_LOUDNESS } from './redux/Constants';
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
            <SortBy
                title={'Artist'}
                category={'artist'}    
            />
            <SortBy
                title={'Name'}
                category={'name'}    
            />
            <DropdownFilter
                category={"artist"}
                title={"Artists"}
                filterAddDispatch={FILTERBY_ARTIST_ADD}
                filterRemoveDispatch={FILTERBY_ARTIST_REMOVE}
            />
        </div>
    )
}

export default App;
