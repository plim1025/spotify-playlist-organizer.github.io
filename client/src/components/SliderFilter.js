import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import './SliderFilter.css';

const SliderFilter = (props) => {

    const [range, setRange] = useState([props.min, props.max]);

    return (
        <div className="sliderFilterParent">
            <div className="sliderFilterTitle">{props.title}</div>
            <Slider
                onChange={(e, newRange) => setRange(newRange)}
                onChangeCommitted={(e, range) => props.handleFilter(e, range, props.category)}
                min={props.min}
                max={props.max}
                value={range}
                valueLabelDisplay={'auto'}
            />
        </div>
    )
}

export default SliderFilter;
