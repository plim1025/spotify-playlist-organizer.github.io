import React from 'react'
import { songList } from '../redux/Reducers';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';

const FilterView = () => {

    const maxDuration = Math.max(...[...songList.map(song => song.duration)]);
    const maxPopularity = Math.max(...[...songList.map(song => song.popularity)]);
    const maxBPM = Math.max(...[...songList.map(song => song.bpm)]);
    const maxLoudness = Math.max(...[...songList.map(song => song.loudness)]);

    return (
        <>
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
        </>
    )
}

export default FilterView;