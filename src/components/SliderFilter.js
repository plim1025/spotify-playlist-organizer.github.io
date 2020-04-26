import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Slider } from '@material-ui/core';
import './SliderFilter.css';

const SlideFilter = (props) => {

    const dispatch = useDispatch();
    const [range, setRange] = useState([0, props.max]);

    const handleChange = (e, newRange) => {
        setRange(newRange);
        dispatch({type: props.filterDispatch, range: newRange});
    }

    return (
        <div className="sliderWrapper">
            <div className="sliderTitle">{props.title}</div>
            <Slider
                onChange={handleChange}
                min={0}
                max={props.max}
                value={range}
                valueLabelDisplay="auto"
            />
        </div>
    )
}

export default SlideFilter;