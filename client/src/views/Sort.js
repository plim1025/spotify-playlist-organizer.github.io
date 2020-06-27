import React, { useState, useEffect, useContext } from 'react';
import SortCategory from '../components/SortCategory';
import Checkmark from '../assets/img/checkmark.svg';
import { SongFiltersContext } from '../views/Songs';

const Sort = (props) => {

    const {songFilters, setSongFilters} = useContext(SongFiltersContext);
    const [sortedBy, sortBy] = useState(null);
    const [sortDirection, toggleSortDirection] = useState(1);

    useEffect(() => {
        if(sortedBy) {
            setSongFilters({...songFilters, sort: { category: sortedBy, direction: sortDirection}});
        }
    }, [sortedBy, sortDirection]);

    const sort = category => {
        if(sortedBy !== category) {
            toggleSortDirection(1);
            sortBy(category);
        } else {
            if(sortDirection == 1) {
                toggleSortDirection(-1);
            } else {
                toggleSortDirection(1);
            }
        }
    }

    return (
        <div className='sortByParent'>
            <div className='sortByCheckmark' style={{background: props.checkmark ? '#606060' : null, border: props.checkmark ? '2px solid #606060' : null}} onClick={() => this.props.handleSelectAll()}>
                <Checkmark style={{fill: props.checkmark ? '#fff' : null}}/>
            </div>
            <SortCategory category={'name'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'artist'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'album'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
        </div>
    )
}

export default Sort;
