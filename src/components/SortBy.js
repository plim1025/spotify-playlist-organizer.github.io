import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SORT_SONGS, SORT_SONGS_REVERSE, TOGGLE_SELECT_ALL } from '../redux/Constants';
import './SortBy.css';
import SortUpIcon from '../assets/img/sort-up.svg';
import Checkmark from '../assets/img/checkmark.svg';

const SortBy = (props) => {

    const dispatch = useDispatch();
    const [sortedBy, sortBy] = useState(null);
    const [checkmark, toggleCheckmark] = useState(false);

    const handleSort = category => {
        if(sortedBy != category) {
            dispatch({type: SORT_SONGS, category: category});
            sortBy(category);
        }
    }

    const checkmarkClick = () => {
        dispatch({type: TOGGLE_SELECT_ALL, mode: !checkmark});
        toggleCheckmark(checkmark => !checkmark);
    }

    return (
        <div id="sortByParent">
            <div id="checkmark" style={{background: checkmark ? '#606060' : null}}>
                <Checkmark style={{fill: checkmark ? '#fff' : null}} onClick={checkmarkClick}/>
            </div>
            <div id="sortName" className="sortSelector">
                <div className="sortText" onClick={handleSort}>NAME</div>
                <SortUpIcon className="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})}/>
            </div>
            <div id="sortArtist" className="sortSelector">
                <div className="sortText" onClick={handleSort}>ARTIST</div>
                <SortUpIcon className="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})}/>
            </div>
            <div id="sortAlbum" className="sortSelector">
                <div className="sortText" onClick={handleSort}>ALBUM</div>
                <SortUpIcon className="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})}/>
            </div>
            <div id="sortYear" className="sortSelector">
                <div className="sortText" onClick={handleSort}>YEAR</div>
                <SortUpIcon className="sortIcon" onClick={() => dispatch({type: SORT_SONGS_REVERSE, category: sortedBy})}/>
            </div>
        </div>
    )
}

export default SortBy;
