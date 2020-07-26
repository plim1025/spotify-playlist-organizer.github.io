import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import { css, StyleSheet } from 'aphrodite/no-important';
import { SongsContext, SongFiltersContext } from '../views/GeneratePlaylist';

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
        <FormControl className={css(ss.wrapper)}>
            <InputLabel style={{color: '#000'}}>{props.title}</InputLabel>
            <Select 
                multiple value={selectedFilters} 
                onChange={e => setSelectedFilters([...e.target.value])}
                input={<Input />}
                renderValue={item => <div>{item.map(item => <Chip key={item} className={css(ss.chip)} label={item} />)}</div>} 
            >
                {initialFilters.map(filter => (
                    <MenuItem key={filter} value={filter}>
                        <div style={{background: selectedFilters.indexOf(filter) > -1 ? '#606060' : null}} className={css(ss.checkmark)}>
                            <svg style={{fill: selectedFilters.indexOf(filter) > -1 ? '#fff' : 'transparent'}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
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
    wrapper: {
        width: 200
    },
    chip: {
        height: '20px !important',
        marginLeft: 5
    },
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 6,
        marginRight: 10,
        border: '2px solid #606060'
    },
    checkmarkIcon: {
        height: 16,
        width: 16,
    }
});

export default DropdownFilter;