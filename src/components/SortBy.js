import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SORT_SONGS, SORT_SONGS_REVERSE, TOGGLE_SELECT_ALL } from '../redux/Constants';
import './SortBy.css';
import SortUpIcon from '../assets/img/sort-up.svg';
import Checkmark from '../assets/img/checkmark.svg';

const SortBy = (props) => {

    const dispatch = useDispatch();
    const [checkmark, toggleCheckmark] = useState(false);
    const [sortedBy, sortBy] = useState(null);
    const [sortedInOrder, toggleSortMode] = useState(true);

    const handleSort = category => {
        if(sortedBy != category) {
            toggleSortMode(true);
            dispatch({type: SORT_SONGS, category: category});
            sortBy(category);
        } else {
            if(sortedInOrder) {
                dispatch({type: SORT_SONGS_REVERSE, category: category});
                sortBy(category);
                toggleSortMode(!sortedInOrder);
            } else {
                dispatch({type: SORT_SONGS, category: category});
                toggleSortMode(!sortedInOrder);
            }
        }
    }

    const checkmarkClick = () => {
        dispatch({type: TOGGLE_SELECT_ALL, mode: !checkmark});
        toggleCheckmark(checkmark => !checkmark);
    }

    return (
        <div id="sortByParent">
            <div id="checkmark" style={{background: checkmark ? '#606060' : null}} onClick={checkmarkClick}>
                <Checkmark style={{fill: checkmark ? '#fff' : null}}/>
            </div>
            <div id="sortName" className="sortSelector" onClick={() => handleSort('name')}>
                <div className="sortText" style={{color: sortedBy == 'name' ? '#000' : null}}>NAME</div>
                <SortUpIcon className="sortIcon" style={{fill: sortedBy == 'name' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'name' ? 'rotate(180deg)' : null}} />
            </div>
            <div id="sortArtist" className="sortSelector" onClick={() => handleSort('artist')}>
                <div className="sortText" style={{color: sortedBy == 'artist' ? '#000' : null}}>ARTIST</div>
                <SortUpIcon className="sortIcon" style={{fill: sortedBy == 'artist' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'artist' ? 'rotate(180deg)' : null}}/>
            </div>
            <div id="sortAlbum" className="sortSelector" onClick={() => handleSort('album')}>
                <div className="sortText" style={{color: sortedBy == 'album' ? '#000' : null}}>ALBUM</div>
                <SortUpIcon className="sortIcon" style={{fill: sortedBy == 'album' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'album' ? 'rotate(180deg)' : null}}/>
            </div>
            <div id="sortYear" className="sortSelector" onClick={() => handleSort('year')}>
                <div className="sortText" style={{color: sortedBy == 'year' ? '#000' : null}}>YEAR</div>
                <SortUpIcon className="sortIcon" style={{fill: sortedBy == 'year' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'year' ? 'rotate(180deg)' : null}}/>
            </div>
        </div>
    )
}

export default SortBy;
