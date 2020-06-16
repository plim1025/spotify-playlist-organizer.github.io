import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import Checkmark from '../assets/img/checkmark.svg';
import './DropdownFilter.css';

const DropdownFilter = (props) => {

    return (
        <FormControl className="dropdownFilterParent">
            <InputLabel>{props.title}</InputLabel>
            <Select 
                className="dropdownFilterSelect"
                multiple value={props.selectedFilters} 
                onChange={e => props.handleFilter(e, props.category)}
                input={<Input />}
                renderValue={item => <div>{item.map(item => <Chip key={item} style={{height: 20}} label={item} />)}</div>} 
            >
                {props.initialFilters ? props.initialFilters.map(filter => (
                    <MenuItem key={filter} className="dropdownFilterMenuItem" value={filter}>
                        <div className="dropdownFilterCheckmark" style={{background: props.selectedFilters.indexOf(filter) > -1 ? '#606060' : null, border: props.selectedFilters.indexOf(filter) > -1 ? '2px solid #606060' : null}}>
                            <Checkmark style={{fill: props.selectedFilters.indexOf(filter) > -1 ? '#fff' : null}}/>
                        </div>
                        <ListItemText primary={filter} />
                    </MenuItem>
                )) : null}
            </Select>
        </FormControl>
    )
}

export default DropdownFilter;