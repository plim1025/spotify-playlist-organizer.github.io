import React from 'react';
import { useDispatch } from 'react-redux';
import { SORTBY_NAME, SORTBY_ARTIST, SORTBY_ALBUM, SORTBY_YEAR, SORTBY_DURATION, SORTBY_POPULARITY } from '../redux/Constants';
import SortByIcon from '../assets/img/SortByIcon.svg';

const SortBy = (props) => {

    const sort = useDispatch();

    return (
        <div>
            <SortByIcon />
            <div onClick={() => sort({type: SORTBY_NAME})}>
                Name
            </div>
            <div onClick={() => sort({type: SORTBY_ARTIST})}>
                Artist
            </div>
            <div onClick={() => sort({type: SORTBY_ALBUM})}>
                Album
            </div>
            <div onClick={() => sort({type: SORTBY_YEAR})}>
                Year
            </div>
            <div onClick={() => sort({type: SORTBY_DURATION})}>
                Duration
            </div>
            <div onClick={() => sort({type: SORTBY_POPULARITY})}>
                Popularity
            </div>
        </div>
    )
}

export default SortBy;
