import React from 'react';
import DropdownFilter from '../components/DropdownFilter';
import { css, StyleSheet } from 'aphrodite/no-important';

const DropdownFilters = (props) => {

    return (
        <div className={css(ss.wrapper)}>
            {
                props.categories.map(category => {
                    switch(category) {
                        case 'Artists':
                            return <DropdownFilter category={'artists'} title={'Artists'} />
                        case 'Album':
                            return <DropdownFilter category={'album'} title={'Album'} />
                        case 'Year':
                            return <DropdownFilter category={'year'} title={'Year'} />
                    }
                })
            }
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    }
})

export default DropdownFilters;
