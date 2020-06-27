import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import { css, StyleSheet } from 'aphrodite/no-important';
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
                            <svg style={{fill: selectedFilters.indexOf(filter) > -1 ? '#fff' : null}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
                        </div>
                        <ListItemText primary={filter} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        : <></>
    )
}

const ss = StyleSheet.create({
    checkmarkIcon: {
        height: 24,
        width: 24
    }
});

export default DropdownFilter;