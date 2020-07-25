import React, { useState, useEffect, useContext } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import SortCategory from '../components/SortCategory';
import CategoryMenu from '../components/CategoryMenu';
import { SongFiltersContext } from '../views/Songs';

const Sort = (props) => {

    const {songFilters, setSongFilters} = useContext(SongFiltersContext);
    const [sortedBy, sortBy] = useState(null);
    const [sortDirection, toggleSortDirection] = useState(1);
    const [menuVisible, toggleMenu] = useState(false);

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
        <div className={css(ss.wrapper)}>
            <div onClick={() => toggleMenu(true)} className={css(ss.toggleIcon)}>
                <svg height='16' width='16' viewBox="0 0 383.947 383.947"> <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893"/> <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04 C386.027,77.92,386.027,64.373,377.707,56.053z"/> </svg>
            </div>
            <div style={{background: props.checkmark ? '#808080' : null, border: props.checkmark ? '2px solid #808080' : null}} className={css(ss.checkmark)} onClick={() => props.handleSelectAll(!props.checkmark)}>
                <svg style={{fill: props.checkmark ? '#fff' : 'transparent'}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            <SortCategory category={'name'} title={'Name'} flex={props.flex[0]} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'artist'} title={'Artist'} flex={props.flex[1]} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'album'} title={'Album'} flex={props.flex[2]} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <SortCategory category={'year'} title={'Year'} flex={props.flex[3]} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
            <CategoryMenu visible={menuVisible} handleClose={() => toggleMenu(false)} checkedCategories={props.checkedCategories} handleSetCheckedCategories={props.handleSetCheckedCategories}/>
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        padding: '0 10px'
    },
    toggleIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        width: 24,
        cursor: 'pointer',
        marginRight: 10,
        borderRadius: 6,
        ':hover': {
            background: '#808080'
        }
    },
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        padding: 2,
        borderRadius: 6,
        marginRight: 10,
        cursor: 'pointer',
        border: '2px solid #808080',
    },
    checkmarkIcon: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
});

export default Sort;