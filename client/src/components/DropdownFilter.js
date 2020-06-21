import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import Checkmark from '../assets/img/checkmark.svg';
import './DropdownFilter.css';
import { SongsContext } from '../views/Songs';

const DropdownFilter = (props) => {

    const {songs, setSongs} = useContext(SongsContext);
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
        let fetchString = 'http://localhost:3000/song';
        if(selectedFilters.length) {
            fetchString += `?dropdownFilterCategory=${props.category}&items=${JSON.stringify(selectedFilters)}`;
            fetchString = encodeURI(fetchString);
        }
        fetch(fetchString)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }, [selectedFilters]);

    return (
        initialFilters.length ? <FormControl className="dropdownFilterParent">
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