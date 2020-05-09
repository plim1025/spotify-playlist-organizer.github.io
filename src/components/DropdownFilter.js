import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText, Checkbox } from '@material-ui/core';
import './SliderFilter.css';
import { FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from '../redux/Constants';

const DropdownFilter = (props) => {

    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const initialFilters = [...new Set(songs.map(song => song[props.category]))];
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
        <div>
            <FormControl>
                <InputLabel>Filter by {props.title}</InputLabel>
                <Select multiple value={filters} 
                    onChange={handleChange}
                    input={<Input />}
                    style={{height: 40, width: 250}}
                    renderValue={item => <div>{item.map(item => <Chip key={item} label={item} />)}</div>} 
                >
                    {initialFilters.map(filter => (
                        <MenuItem key={filter} value={filter}>
                            <Checkbox checked={filters.indexOf(filter) > -1} />
                            <ListItemText primary={filter} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default DropdownFilter;