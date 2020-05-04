import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SORT_SONGS, SORT_SONGS_REVERSE } from '../redux/Constants';
import './SortBy.css';
import SortIcon from '../assets/img/sort.svg';
import Checkmark from '../assets/img/checkmark.svg';

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
        <div id="sortByParent">
            <div id="checkmark" style={{background: props.iconFill ? '#606060' : null}} onClick={() => dispatch({type: TOGGLE_SELECT, id: props.details.id})}>
                <Checkmark style={{fill: props.iconFill ? '#fff' : null}}/>
            </div>
            <div id="name" onClick={handleClick} category={"name"}>NAME</div>
            <div id="artist" onClick={handleClick} category={"artist"}>ARTIST</div>
            <div id="album" onClick={handleClick} category={"album"}>ALBUM</div>
            <div id="year" onClick={handleClick} category={"year"}>YEAR</div>
            {/* <SortIcon id="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})} /> */}
        </div>
    )
}

export default SortBy;
