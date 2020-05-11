import React from 'react'
import { songList } from '../redux/Reducers';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';
import './FilterView.css';

const FilterView = () => {

    const maxDuration = Math.max(...[...songList.map(song => song.duration)]);
    const maxPopularity = Math.max(...[...songList.map(song => song.popularity)]);
    const maxBPM = Math.max(...[...songList.map(song => song.bpm)]);
    const maxLoudness = Math.max(...[...songList.map(song => song.loudness)]);

    return (
        <>            
            <DropdownFilter
                category={"artist"}
                title={"Artists"}
            />
            <DropdownFilter
                category={"album"}
                title={"Album"}
            />
            <DropdownFilter
                category={"year"}
                title={"Year"}
            />
            <div style={{height: 20}}/>
            <SliderFilter
                category={"duration"}
                title={"Duration (s)"}
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
                title={"Beats per Minute (BPM)"}
                min={0} 
                max={maxBPM}
            />
            <SliderFilter
                category={"loudness"}
                title={"Loudness (dB)"}
                min={0}
                max={maxLoudness}
            />
        </>
    )
}

export default FilterView;