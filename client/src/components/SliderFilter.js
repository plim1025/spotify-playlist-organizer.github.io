import React, { useState, useEffect, useContext } from 'react';
import { Slider } from '@material-ui/core';
import { SongFiltersContext } from '../views/Songs';
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

    return (
        initialRange.length === 2 && range.length === 2 ?
        <div className={css(ss.wrapper)}>
            <div>{props.title}</div>
            <Slider
                onChange={(e, newRange) => setRange(newRange)}
                onChangeCommitted={handleFilter}
                min={initialRange[0]}
                max={initialRange[1]}
                value={range}
                valueLabelDisplay={'auto'}
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
