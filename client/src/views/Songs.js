import React from 'react';
import { useSelector } from 'react-redux';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';
import SortBy from '../components/SortBy';
import Song from '../components/Song';
import './Songs.css';

const SongView = (props) => {

    const songs = useSelector(state => state.songs);

    const songNotFiltered = filterObj => {
        for(var o in filterObj)
            if(filterObj[o])
                return false;
        return true;
    }

    return (
        <>

            <div id="flex">
                <div id="filters">
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
                        max={Math.max(...[...songs.map(song => song.duration)])}
                    />
                    <SliderFilter
                        category={"popularity"}
                        title={"Popularity"}
                        min={0}
                        max={Math.max(...[...songs.map(song => song.popularity)])}
                    />
                    <SliderFilter
                        category={"bpm"}
                        title={"Beats per Minute (BPM)"}
                        min={0} 
                        max={Math.max(...[...songs.map(song => song.bpm)])}
                    />
                    <SliderFilter
                        category={"loudness"}
                        title={"Loudness (dB)"}
                        min={0}
                        max={Math.max(...[...songs.map(song => song.loudness)])}
                    />
                </div>
                <div id="songs">
                    <SortBy />
                    {
                        songs.length ? songs.map(song => songNotFiltered(song.filteredOutBy) ? 
                            (!song.selected ? 
                                <Song key={song.name} details={song}/> 
                                : <Song key={song.name} background={true} iconFill={true} details={song}/>
                            ) 
                            : null
                        )
                        : null
                    }
                </div>
            </div>
        </>
    )
}

export default SongView;
