import React, { useState, useEffect, useContext, useRef } from 'react';
import { Slider } from '@material-ui/core';
import './SliderFilter.css';
import { SongsContext } from '../views/Songs';

const SliderFilter = (props) => {

    const {songs, setSongs} = useContext(SongsContext);
    const [initialRange, setInitialRange] = useState([])
    const [range, setRange] = useState([]);

    useEffect(() => {
        if(!range.length && songs.length) {
            let min;
            let max;
            if(props.category === 'popularity') {
                min = 1;
                max = Math.max(...[...songs.map(song => song.popularity)])
            } else if (props.category === 'loudness') {
                min = Math.min(...[...songs.map(song => song.loudness)]);
                max = Math.max(...[...songs.map(song => song.loudness)]);
            } else {
                min = 0;
                max = Math.max(...[...songs.map(song => song[props.category])]);
            }
            setInitialRange([min,  max]);
            setRange(initialRange);
        }
    }, [songs]);

    const handleFilter = () => {
        const fetchString = `http://localhost:3000/song?sliderFilterCategory=${props.category}&min=${range[0]}&max=${range[1]}`;
        fetch(fetchString)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }

    return (
        initialRange.length === 2 && range.length === 2 ?
        <div className="sliderFilterParent">
            <div className="sliderFilterTitle">{props.title}</div>
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

export default SliderFilter;
