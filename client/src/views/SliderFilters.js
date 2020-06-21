import React from 'react';
import SliderFilter from '../components/SliderFilter';

const SliderFilters = (props) => {

    return (
        <div>
            <SliderFilter
                category={'duration'}
                title={'Duration (s)'}
            />
            <SliderFilter
                category={'popularity'}
                title={'Popularity'}
            />
            <SliderFilter
                category={'tempo'}
                title={'Tempo'}
            />
            <SliderFilter
                category={'loudness'}
                title={'Loudness (dB)'}
            />
        </div>
    )
}

export default SliderFilters
