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
            <div className="sortByCheckmark" style={{background: checkmark ? '#606060' : null, border: props.iconFill ? '2px solid #606060' : null}} onClick={checkmarkClick}>
                <Checkmark style={{fill: checkmark ? '#fff' : null}}/>
            </div>
            <div id="sortByName" className="sortBySelector" onClick={() => handleSort('name')}>
                <div className="sortByText" style={{color: sortedBy == 'name' ? '#000' : null, border: props.iconFill ? '2px solid #606060' : null}}>NAME</div>
                <SortUpIcon className="sortByIcon" style={{fill: sortedBy == 'name' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'name' ? 'rotate(180deg)' : null}} />
            </div>
            <div id="sortByArtist" className="sortBySelector" onClick={() => handleSort('artist')}>
                <div className="sortByText" style={{color: sortedBy == 'artist' ? '#000' : null, border: props.iconFill ? '2px solid #606060' : null}}>ARTIST</div>
                <SortUpIcon className="sortByIcon" style={{fill: sortedBy == 'artist' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'artist' ? 'rotate(180deg)' : null}}/>
            </div>
            <div id="sortByAlbum" className="sortBySelector" onClick={() => handleSort('album')}>
                <div className="sortByText" style={{color: sortedBy == 'album' ? '#000' : null, border: props.iconFill ? '2px solid #606060' : null}}>ALBUM</div>
                <SortUpIcon className="sortByIcon" style={{fill: sortedBy == 'album' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'album' ? 'rotate(180deg)' : null}}/>
            </div>
            <div id="sortByYear" className="sortBySelector" onClick={() => handleSort('year')}>
                <div className="sortByText" style={{color: sortedBy == 'year' ? '#000' : null, border: props.iconFill ? '2px solid #606060' : null}}>YEAR</div>
                <SortUpIcon className="sortByIcon" style={{fill: sortedBy == 'year' ? '#000' : null, transform: !sortedInOrder && sortedBy == 'year' ? 'rotate(180deg)' : null}}/>
            </div>
        </div>
    )
}

export default SortBy;
