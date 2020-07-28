import React, { useState, useEffect, useContext } from 'react';
import { Slider } from '@material-ui/core';
import { SongFiltersContext } from '../views/GeneratePlaylist';
import { css, StyleSheet } from 'aphrodite/no-important';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    valueLabel: {
        fontSize: 12
    }
})

const SliderFilter = (props) => {
    const classes = useStyles();
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

    const decimalToPercentage = decimal => {
        return Math.round(decimal * 100) + '%';
    }

    return (
        initialRange.length === 2 && range.length === 2 ?
        <div className={css(ss.wrapper)}>
            <div>{props.title}</div>
            <Slider
                classes={{valueLabel: classes.valueLabel}}
                style={{color: '#000'}}
                onChange={(e, newRange) => setRange(newRange)}
                onChangeCommitted={handleFilter}
                min={initialRange[0]}
                max={initialRange[1]}
                step={props.category === 'duration' || props.category === 'loudness' || props.category === 'popularity' || props.category === 'tempo' ? 1 : 0.01}
                value={range}
                valueLabelDisplay={'auto'}
                valueLabelFormat={
                    props.category === 'duration' ? ms => msToMinsSecs(ms) :
                    props.category === 'danceability' ? decimal => decimalToPercentage(decimal) :
                    props.category === 'energy' ? decimal => decimalToPercentage(decimal) :
                    props.category === 'instrumental' ? decimal => decimalToPercentage(decimal) :
                    props.category === 'speechiness' ? decimal => decimalToPercentage(decimal) :
                    props.category === 'valence' ? decimal => decimalToPercentage(decimal) :
                    label => label
                }
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
