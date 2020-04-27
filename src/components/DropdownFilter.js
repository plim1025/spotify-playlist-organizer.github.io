import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import './SliderFilter.css';

const DropdownFilter = (props) => {

    const [artists, setArtists] = useState([]);

    return (
        <div>
            <FormControl>
                <InputLabel>Artist</InputLabel>
                <Select multiple value={artists} onChange={() => setArtists(e.target.value)} input={<Button />} >
                    
                </Select>
            </FormControl>
        </div>
    )
}

export default DropdownFilter;