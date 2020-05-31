import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import { FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from '../redux/Constants';
import Checkmark from '../assets/img/checkmark.svg';
import './DropdownFilter.css';

const DropdownFilter = (props) => {

    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const initialFilters = props.category !== "artists" ? 
        [...new Set(songs.map(song => song[props.category]))]
        : [...new Set([].concat.apply([], songs.map(song => song.artists)))]
    const [filters, setFilters] = useState([]);

    const handleChange = e => {
        setFilters(e.target.value);
        const prevLength = filters.length;
        const curLength = e.target.value.length;

        if(prevLength == 0 && curLength == 1)
            dispatch({type: FILTERALL_OUT, category: props.category});
    
        if(prevLength > curLength) {
            const removed = filters.filter(filter => !e.target.value.includes(filter));
            dispatch({type: FILTER_REMOVE, category: props.category, removedFilter: removed})
        } else {
            const added = e.target.value.filter(filter => !filters.includes(filter));
            dispatch({type: FILTER_ADD, category: props.category, addedFilter: added});
        }

        if(prevLength == 1 && curLength == 0)
            dispatch({type: FILTERALL_IN, category: props.category});
    }

    return (
        <FormControl id="dropdownFilterParent">
            <InputLabel>{props.title}</InputLabel>
            <Select 
                className="dropdownFilterSelect"
                multiple value={filters} 
                onChange={handleChange}
                input={<Input />}
                renderValue={item => <div>{item.map(item => <Chip key={item} style={{height: 20}} label={item} />)}</div>} 
            >
                {initialFilters.map(filter => (
                    <MenuItem key={filter }className="dropdownFilterMenuItem" value={filter}>
                        <div className="dropdownFilterCheckmark" style={{background: filters.indexOf(filter) > -1 ? '#606060' : null, border: filters.indexOf(filter) > -1 ? '2px solid #606060' : null}}>
                            <Checkmark style={{fill: filters.indexOf(filter) > -1 ? '#fff' : null}}/>
                        </div>
                        <ListItemText primary={filter} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default DropdownFilter;