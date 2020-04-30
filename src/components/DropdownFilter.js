import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText, Checkbox } from '@material-ui/core';
import './SliderFilter.css';
import { FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from '../redux/Constants';

const DropdownFilter = (props) => {

    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const initialArtists = [...new Set(songs.map(song => song.artist))];
    const [artists, setArtists] = useState([]);

    const handleChange = e => {
        setArtists(e.target.value);
        if(e.target.value.length == 1 && artists.length == 0)
            dispatch({type: FILTERALL_OUT, category: props.category});
        else if(e.target.value.length == 0 && artists.length == 1)
            dispatch({type: FILTERALL_IN, category: props.category});

        if(artists.length < e.target.value.length) {
            let added = e.target.value.filter(artist => !artists.includes(artist));
            dispatch({type: FILTER_ADD, category: props.category, addedFilter: added});
        } else {
            let removed = artists.filter(artist => !e.target.value.includes(artist));
            dispatch({type: FILTER_REMOVE, category: props.category, removedFilter: removed})
        }
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