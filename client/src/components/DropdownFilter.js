import React, { useState, useEffect, useContext, useRef } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import Checkmark from '../assets/img/checkmark.svg';
import './DropdownFilter.css';
import { SongsContext, SongFiltersContext } from '../views/Songs';

const DropdownFilter = (props) => {

    const songs = useContext(SongsContext);
    const {songFilters, setSongFilters} = useContext(SongFiltersContext);
    const [initialFilters, setInitialFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        if(!initialFilters.length && songs.length) {
            if(props.category === 'artists') {
                setInitialFilters([...new Set([].concat.apply([], songs.map(song => song.artists)))]);
            } else {
                setInitialFilters([...new Set(songs.map(song => song[props.category]))]);
            }
        }
    }, [songs]);

    useEffect(() => {
        if(initialFilters.length) {
            setSongFilters({...songFilters, [props.category]: selectedFilters});
        }
    }, [selectedFilters]);

    return (
        initialFilters.length ? 
        <FormControl className="dropdownFilterParent">
            <InputLabel>{props.title}</InputLabel>
            <Select 
                className="dropdownFilterSelect"
                multiple value={selectedFilters} 
                onChange={e => setSelectedFilters([...e.target.value])}
                input={<Input />}
                renderValue={item => <div>{item.map(item => <Chip key={item} style={{height: 20}} label={item} />)}</div>} 
            >
                {initialFilters.map(filter => (
                    <MenuItem key={filter} className="dropdownFilterMenuItem" value={filter}>
                        <div className="dropdownFilterCheckmark" style={{background: selectedFilters.indexOf(filter) > -1 ? '#606060' : null, border: selectedFilters.indexOf(filter) > -1 ? '2px solid #606060' : null}}>
                            <Checkmark style={{fill: selectedFilters.indexOf(filter) > -1 ? '#fff' : null}}/>
                        </div>
                        <ListItemText primary={filter} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        : <></>
    )
}

export default DropdownFilter;