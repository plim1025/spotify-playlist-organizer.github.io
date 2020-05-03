import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SORT_SONGS, SORT_SONGS_REVERSE } from '../redux/Constants';
import './SortBy.css';
import SortIcon from '../assets/img/sort.svg';

const SortBy = (props) => {

    const dispatch = useDispatch();
    const [sortedBy, sortBy] = useState(null);

    const handleClick = category => {
        if(sortedBy != category) {
            dispatch({type: SORT_SONGS, category: category});
            sortBy(category);
        }
    }

    return (
        <div>
            <SortIcon id="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})} />
            <div onClick={handleClick} category={"name"}>Name</div>
            <div onClick={handleClick} category={"artist"}>Artist</div>
            <div onClick={handleClick} category={"album"}>Album</div>
            <div onClick={handleClick} category={"year"}>Year</div>
        </div>
    )
}

export default SortBy;
