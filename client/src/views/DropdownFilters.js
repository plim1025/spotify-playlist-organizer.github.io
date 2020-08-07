import React from 'react';
import DropdownFilter from '../components/DropdownFilter';
import { css, StyleSheet } from 'aphrodite/no-important';

const DropdownFilters = props => {
    return (
        <div className={css(ss.wrapper)}>
            <DropdownFilter category={'artists'} title={'Artists'} />
            <DropdownFilter category={'album'} title={'Album'} />
            <DropdownFilter category={'year'} title={'Year'} />
        </div>
    );
};

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
});

export default DropdownFilters;
