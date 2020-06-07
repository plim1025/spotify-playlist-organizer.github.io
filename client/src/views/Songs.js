import React, { useState, useEffect } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';
import SortBy from '../components/SortBy';
import Song from '../components/Song';
import './Songs.css';

const Songs = (props) => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/song')
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }, []);

    const songNotFiltered = filterObj => {
        for(let o in filterObj)
            if(filterObj[o])
                return false;
        return true;
    }

    return (
        <>
            <div id="flex">
                <div id="filters">
                    <DropdownFilter
                        category={"artists"}
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
                        category={"Tempo"}
                        title={"Tempo"}
                        min={0} 
                        max={Math.max(...[...songs.map(song => song.tempo)])}
                    />
                    <SliderFilter
                        category={"loudness"}
                        title={"Loudness (dB)"}
                        min={Math.min(...[...songs.map(song => song.loudness)])}
                        max={Math.max(...[...songs.map(song => song.loudness)])}
                    />
                </div>
                <div id="songs">
                    <SortBy />
                    {
                        songs.length ? songs.map(song => songNotFiltered(song.filteredOutBy) ? 
                            (!song.selected ? 
                                <Song key={song.id} details={song}/> 
                                : <Song key={song.id} background={true} iconFill={true} details={song}/>
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

export default Songs;