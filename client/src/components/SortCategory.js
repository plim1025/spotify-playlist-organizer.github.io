import React from 'react';
import SortUpIcon from '../assets/img/sort-up.svg';
import './SortCategory.css';

const SortBy = (props) => {

    return (
        <div className="sortBySelector" style={{flex: 5}} onClick={() => props.handleSort(props.category)}>
            <div className="sortByText">{props.category}</div>
            <SortUpIcon className="sortByIcon" style={{fill: props.sortedBy === props.category ? '#000' : null, transform: props.sortDirection === -1 && props.sortedBy === props.category ? 'rotate(180deg)' : 'rotate(0deg)'}} />
        </div>
    )
}

export default SortBy;
