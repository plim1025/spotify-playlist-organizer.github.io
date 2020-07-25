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
            <div style={{background: props.checkmark ? '#606060' : null, border: props.checkmark ? '2px solid #606060' : null}} className={css(ss.checkmark)} onClick={() => props.handleSelectAll(!props.checkmark)}>
                <svg style={{fill: props.checkmark ? '#fff' : 'transparent'}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            {
                props.checkedCategories.map(category => {
                    switch(category) {
                        case 'Album':
                            return <SortCategory category={'album'} title={'Album'} flex={1} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Artists':
                            return <SortCategory category={'artist'} title={'Artist'} flex={1} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Danceability':
                            return <SortCategory category={'danceability'} title={'Danceability'} width={130} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Duration':
                            return <SortCategory category={'duration'} title={'Duration'} width={100} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Energy':
                            return <SortCategory category={'energy'} title={'Energy'} width={83} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Instrumentalness':
                            return <SortCategory category={'instrumentalness'} title={'Instrumental'} width={136} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Loudness':
                            return <SortCategory category={'loudness'} title={'Loudness'} width={105} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Name':
                            return <SortCategory category={'name'} title={'Name'} flex={1} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Popularity':
                            return <SortCategory category={'popularity'} title={'Popularity'} width={113} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Speechiness':
                            return <SortCategory category={'speechiness'} title={'Speech'} width={128} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Tempo':
                            return <SortCategory category={'tempo'} title={'Tempo'} width={82} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Valence':
                            return <SortCategory category={'valence'} title={'Valence'} width={94} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        case 'Year':
                            return <SortCategory category={'year'} title={'Year'} width={64} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                    }
                })
            }
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
            background: '#d0d0d0'
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
        border: '2px solid #606060',
    },
    checkmarkIcon: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
});

export default Sort;