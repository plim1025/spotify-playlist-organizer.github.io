import React, { useState, useEffect, useContext } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import SortCategory from '../components/SortCategory';
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
        <div>
            <div style={{background: props.checkmark ? '#606060' : null, border: props.checkmark ? '2px solid #606060' : null}} onClick={() => this.props.handleSelectAll()}>
                <svg style={{fill: props.checkmark ? '#fff' : null}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            <SortCategory category={'name'} title={'Name'} flex={5} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'artist'} title={'Artist'} flex={5} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'album'} title={'Album'} flex={5} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
        </div>
    )
}

const ss = StyleSheet.create({
    checkmarkIcon: {
        height: 24,
        width: 24
    }
});

export default Sort;