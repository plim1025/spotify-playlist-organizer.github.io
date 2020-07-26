import React, { useState, useEffect, useContext } from 'react';
import { Slider } from '@material-ui/core';
import { SongFiltersContext } from '../views/GeneratePlaylist';
import { css, StyleSheet } from 'aphrodite/no-important';

const SliderFilter = (props) => {
    const {songFilters, setSongFilters} = useContext(SongFiltersContext);
    const [initialRange, setInitialRange] = useState([]);
    const [range, setRange] = useState([]);

    useEffect(() => {
        if(!initialRange.length) {
            setInitialRange(songFilters[props.category]);
        }
    }, [songFilters]);

    useEffect(() => {
        if(!range.length) {
            setRange(initialRange);
        }
    }, [initialRange]);

    const handleFilter = () => {
        setSongFilters({...songFilters, [props.category]: range});
    }

    const msToMinsSecs = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        initialRange.length === 2 && range.length === 2 ?
        <div className={css(ss.wrapper)}>
            <div>{props.title}</div>
            <Slider
                style={{color: '#000'}}
                onChange={(e, newRange) => setRange(newRange)}
                onChangeCommitted={handleFilter}
                min={initialRange[0]}
                max={initialRange[1]}
                value={range}
                valueLabelDisplay={'auto'}
                valueLabelFormat={props.category === 'duration' ? ms => msToMinsSecs(ms) : label => label}
            />
        </div>
        : <></>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SliderFilter;
