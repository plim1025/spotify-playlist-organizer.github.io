import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText, Checkbox } from '@material-ui/core';
import './SliderFilter.css';

const DropdownFilter = (props) => {

    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const initialArtists = [...new Set(songs.map(song => song.artist))];
    const [artists, setArtists] = useState([]);

    const handleChange = e => {
        setArtists(e.target.value);
        dispatch({type: props.filterDispatch, list: e.target.value});
    }

    return (
        <div>
            <FormControl>
                <InputLabel>Filter by {props.title}</InputLabel>
                <Select multiple value={artists} 
                    onChange={handleChange}
                    input={<Input />}
                    style={{height: 40, width: 250}}
                    renderValue={item => <div>{item.map(item => <Chip key={item} label={item} />)}</div>} 
                >
                    {initialArtists.map(artist => (
                        <MenuItem key={artist} value={artist}>
                            <Checkbox checked={artists.indexOf(artist) > -1} />
                            <ListItemText primary={artist} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default DropdownFilter;