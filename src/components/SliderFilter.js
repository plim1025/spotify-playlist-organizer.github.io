import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Slider } from '@material-ui/core';
import './SliderFilter.css';
import { FILTER_RANGE } from '../redux/Constants';

const SlideFilter = (props) => {

    const dispatch = useDispatch();
    const [range, setRange] = useState([0, props.max]);

    const handleChange = (e, newRange) => {
        setRange(newRange);
        dispatch({type: FILTER_RANGE, category: props.category, range: newRange});
    }

    return (
        <div id="sliderFilterParent">
            <div id="sliderFilterTitle">{props.title}</div>
            <Slider
                onChange={handleChange}
                min={props.min}
                max={props.max}
                value={range}
                valueLabelDisplay="auto"
            />
        </div>
    )
}

export default SlideFilter;
