import React, { useState, useEffect } from 'react';
import DropdownFilter from '../components/DropdownFilter';
import SliderFilter from '../components/SliderFilter';
import SortCategory from '../components/SortCategory';
import Song from '../components/Song';
import './Songs.css';
import Checkmark from '../assets/img/Checkmark.svg';

const Songs = (props) => {

    const [songs, setSongs] = useState([]);
    const [checkmark, toggleCheckmark] = useState(false);
    const [sortedBy, sortBy] = useState(null);
    const [sortDirection, toggleSortDirection] = useState(1);

    useEffect(() => {
        fetch('http://localhost:3000/song')
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if(sortedBy) {
            fetch(`http://localhost:3000/song?sortBy=${sortedBy}&sortDirection=${sortDirection}`)
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(err => console.log(err));
        }
    }, [sortedBy, sortDirection]);
    
    const sort = category => {
        if(sortedBy !== category) {
            toggleSortDirection(1);
            sortBy(category);
        } else {
            if(sortDirection == 1) toggleSortDirection(-1);
            else toggleSortDirection(1);
        }
    }

    const checkmarkClick = () => {
        toggleCheckmark(checkmark => !checkmark);
    }

    return (
        <>
            <div className="flex">
                <div className="filters">
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
                <div className="songs">
                    <div className="sortByParent">
                        <div className="sortByCheckmark" style={{background: checkmark ? '#606060' : null, border: checkmark ? '2px solid #606060' : null}} onClick={checkmarkClick}>
                            <Checkmark style={{fill: checkmark ? '#fff' : null}}/>
                        </div>
                        <SortCategory category={'name'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'artist'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'album'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                    </div>
                    {
                        songs.length ? songs.map(song => <Song key={song.id} details={song}/>)
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default Songs;