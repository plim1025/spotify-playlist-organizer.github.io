import React from 'react';
import SortUpIcon from '../assets/img/sort-up.svg';
import './SortCategory.css';

const SortBy = (props) => {

    return (
        <div className="sortBySelector" style={{flex: 5}} onClick={() => props.handleSort(props.category)}>
            <div className="sortByText">{props.category}</div>
            <SortUpIcon className="sortByIcon" style={{fill: props.sortedBy === props.category ? '#000' : null, transform: props.sortDirection === -1 ? 'rotate(180deg)' : null}} />
        </div>
    )
}

export default SortBy;
