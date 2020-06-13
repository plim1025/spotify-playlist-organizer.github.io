import React, { useState, useEffect } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';
import SortCategory from '../components/SortCategory';
import Song from '../components/Song';
import './Songs.css';
import Checkmark from '../assets/img/checkmark.svg';

const Songs = (props) => {

    const [checkmark, toggleCheckmark] = useState(false);
    const [sortedBy, sortBy] = useState(null);
    const [sortDirection, toggleSortDirection] = useState(1);
    const [songs, setSongs] = useState([]);
    const [toggledSongIDs, setToggledSongIDs] = useState([]);
    const [componentLoaded, toggleComponentLoaded] = useState(false);
    const [filterRanges, setFilterRanges] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/song')
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }, []);
    
    useEffect(() => {
        if(!filterRanges && songs.length) {
            setFilterRanges(
                {
                    duration: {
                        min: 0,
                        max: Math.max(...[...songs.map(song => song.duration)])
                    },
                    popularity: {
                        min: 1,
                        max: Math.max(...[...songs.map(song => song.popularity)])
                    },
                    tempo: {
                        min: 0,
                        max: Math.max(...[...songs.map(song => song.tempo)])
                    },
                    loudness: {
                        min: Math.min(...[...songs.map(song => song.loudness)]),
                        max: Math.max(...[...songs.map(song => song.loudness)])
                    }
                }
            );
        }
    }, [songs]);

    useEffect(() => {
        if(filterRanges) {
            console.log(filterRanges)
            toggleComponentLoaded(true);
        }
    }, [filterRanges]);

    useEffect(() => {
        if(sortedBy) {
            fetch(`http://localhost:3000/song?category=${sortedBy}&sortDirection=${sortDirection}`)
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(err => console.log(err));
        }
    }, [sortedBy, sortDirection]);

    useEffect(() => {
        if(checkmark)
            setToggledSongIDs(songs.map(song => song.id));
        else
            setToggledSongIDs([]);
    }, [checkmark]);

    const filter = (e, selections, category) => {
        fetch(`http://localhost:3000/song?category=${category}&min=${selections[0]}&max=${selections[1]}`)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }

    const sort = category => {
        if(sortedBy !== category) {
            toggleSortDirection(1);
            sortBy(category);
        } else {
            if(sortDirection == 1) toggleSortDirection(-1);
            else toggleSortDirection(1);
        }
    }

    const toggleSong = (selected, id) => {
        if(selected)
            setToggledSongIDs([...toggledSongIDs, id]);
        else
            setToggledSongIDs(toggledSongIDs.filter(songid => songid !== id ? songid : null));
    }

    return (
        componentLoaded ? 
        <>
            <div className="flex">
                <div className="filters">
                    <DropdownFilter
                        category={"artists"}
                        title={"Artists"}
                        handleFilter={filter}
                    />
                    <DropdownFilter
                        category={"album"}
                        title={"Album"}
                        handleFilter={filter}
                    />
                    <DropdownFilter
                        category={"year"}
                        title={"Year"}
                        handleFilter={filter}
                    />
                    <div style={{height: 20}}/>
                    <SliderFilter
                        category={"duration"}
                        title={"Duration (s)"}
                        min={filterRanges?.duration.min}
                        max={filterRanges?.duration.max}
                        handleFilter={filter}
                    />
                    <SliderFilter
                        category={"popularity"}
                        title={"Popularity"}
                        min={filterRanges?.popularity.min}
                        max={filterRanges?.popularity.max}
                        handleFilter={filter}
                    />
                    <SliderFilter
                        category={"Tempo"}
                        title={"Tempo"}
                        min={filterRanges?.tempo.min} 
                        max={filterRanges?.tempo.max}
                        handleFilter={filter}
                    />
                    <SliderFilter
                        category={"loudness"}
                        title={"Loudness (dB)"}
                        min={filterRanges?.loudness.min}
                        max={filterRanges?.loudness.max}
                        handleFilter={filter}
                    />
                </div>
                <div className="songs">
                    <div className="sortByParent">
                        <div className="sortByCheckmark" style={{background: checkmark ? '#606060' : null, border: checkmark ? '2px solid #606060' : null}} onClick={() => toggleCheckmark(checkmark => !checkmark)}>
                            <Checkmark style={{fill: checkmark ? '#fff' : null}}/>
                        </div>
                        <SortCategory category={'name'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'artist'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'album'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                    </div>
                    {
                        songs.length ? songs.map(song => 
                            <Song 
                                key={song.id} 
                                details={song} 
                                handleToggle={toggleSong}
                                toggled={toggledSongIDs.includes(song.id)}
                            />
                        ) : null
                    }
                </div>
            </div>
        </> : <></>
    )
}

export default Songs;