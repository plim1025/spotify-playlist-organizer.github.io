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
    const [filterRanges, setFilterRanges] = useState({});
    const [sliderFilters, setSliderFilters] = useState({});
    const [initialDropdownFilters, setInitialDropdownFilters] = useState({});
    const [dropdownFilters, setDropdownFilters] = useState({});

    useEffect(() => {
        getSongsFromURL('http://localhost:3000/song')
    }, []);
    
    useEffect(() => {
        if(!Object.keys(filterRanges).length && songs.length) {
            setFilterRanges({
                    duration: [0, Math.max(...[...songs.map(song => song.duration)])],
                    popularity: [1, Math.max(...[...songs.map(song => song.popularity)])],
                    tempo: [0, Math.max(...[...songs.map(song => song.tempo)])],
                    loudness: [Math.min(...[...songs.map(song => song.loudness)]), Math.max(...[...songs.map(song => song.loudness)])]
            });
        }
        if(!Object.keys(initialDropdownFilters).length && songs.length) {
            setInitialDropdownFilters({
                artists: [...new Set([].concat.apply([], songs.map(song => song.artists)))],
                album: [...new Set(songs.map(song => song.album))],
                year: [...new Set(songs.map(song => song.year))]
            });
        }
    }, [songs]);

    useEffect(() => {
        if(Object.keys(filterRanges).length && Object.keys(initialDropdownFilters).length)
            toggleComponentLoaded(true);
    }, [filterRanges, initialDropdownFilters]);

    useEffect(() => {
        if(sortedBy)
            getSongsFromURL(`http://localhost:3000/song?sortCategory=${sortedBy}&sortDirection=${sortDirection}`);
    }, [sortedBy, sortDirection]);

    useEffect(() => {
        if(checkmark)
            setToggledSongIDs(songs.map(song => song.id));
        else
            setToggledSongIDs([]);
    }, [checkmark]);

    useEffect(() => {
        if(Object.keys(sliderFilters).length) {
            let fetchString = 'http://localhost:3000/song?';
            let categories = [];
            Object.keys(sliderFilters).forEach(filter => sliderFilters[filter].length ? categories.push(filter) : null);
            fetchString += `sliderFilterCategories=${JSON.stringify(categories)}&`;
            let mins = [];
            categories.forEach(category => mins.push(sliderFilters[category][0]));
            fetchString += `mins=${JSON.stringify(mins)}&`;
            let maxes = [];
            categories.forEach(category => maxes.push(sliderFilters[category][1]));
            fetchString += `maxes=${JSON.stringify(maxes)}`;
            getSongsFromURL(fetchString);
        }
    }, [sliderFilters]);

    useEffect(() => {
        let categories = [];
        Object.keys(dropdownFilters).forEach(filter => dropdownFilters[filter].length ? categories.push(filter) : null);
        if(categories.length) {
            let fetchString = 'http://localhost:3000/song?';
            fetchString += `dropdownFilterCategories=${JSON.stringify(categories)}`;
            categories.forEach(category => {
                fetchString += '&';
                fetchString += category + '=';
                fetchString += JSON.stringify(dropdownFilters[category]);
            });
            getSongsFromURL(encodeURI(fetchString));
        } else {
            getSongsFromURL('http://localhost:3000/song');
        }
    }, [dropdownFilters]);

    const sliderFilter = (e, selections, category) => {
        setSliderFilters({...sliderFilters, [category]: selections});
    }

    const dropdownFilter = (e, category) => {
        setDropdownFilters({...dropdownFilters, [category]: [...e.target.value]});
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

    const getSongsFromURL = URL => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }

    return (
        componentLoaded ? 
        <>
            <div className='flex'>
                <div className='filters'>
                    <DropdownFilter
                        category={'artists'}
                        title={'Artists'}
                        handleFilter={dropdownFilter}
                        initialFilters={initialDropdownFilters.artists || []}
                        selectedFilters={dropdownFilters.artists || []}
                    />
                    <DropdownFilter
                        category={'album'}
                        title={'Album'}
                        handleFilter={dropdownFilter}
                        initialFilters={initialDropdownFilters.album || []}
                        selectedFilters={dropdownFilters.album || []}
                    />
                    <DropdownFilter
                        category={'year'}
                        title={'Year'}
                        handleFilter={dropdownFilter}
                        initialFilters={initialDropdownFilters.year || []}
                        selectedFilters={dropdownFilters.year || []}
                    />
                    <div style={{height: 20}}/>
                    <SliderFilter
                        category={'duration'}
                        title={'Duration (s)'}
                        min={filterRanges.duration[0]}
                        max={filterRanges.duration[1]}
                        handleFilter={sliderFilter}
                    />
                    <SliderFilter
                        category={'popularity'}
                        title={'Popularity'}
                        min={filterRanges.popularity[0]}
                        max={filterRanges.popularity[1]}
                        handleFilter={sliderFilter}
                    />
                    <SliderFilter
                        category={'tempo'}
                        title={'Tempo'}
                        min={filterRanges.tempo[0]} 
                        max={filterRanges.tempo[1]}
                        handleFilter={sliderFilter}
                    />
                    <SliderFilter
                        category={'loudness'}
                        title={'Loudness (dB)'}
                        min={filterRanges.loudness[0]}
                        max={filterRanges.loudness[1]}
                        handleFilter={sliderFilter}
                    />
                </div>
                <div className='songs'>
                    <div className='sortByParent'>
                        <div className='sortByCheckmark' style={{background: checkmark ? '#606060' : null, border: checkmark ? '2px solid #606060' : null}} onClick={() => toggleCheckmark(checkmark => !checkmark)}>
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