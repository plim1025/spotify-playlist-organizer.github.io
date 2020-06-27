import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const SortBy = (props) => {

    return (
        <div className="sortBySelector" style={{flex: 5}} onClick={() => props.handleSort(props.category)}>
            <div className="sortByText">{props.category}</div>
            <svg style={{fill: props.sortedBy === props.category ? '#000' : null, transform: props.sortDirection === -1 && props.sortedBy === props.category ? 'rotate(180deg)' : 'rotate(0deg)'}} className={css(ss.sortIcon)} viewBox="0 0 492.002 492.002"><path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" /></svg>
        </div>
    )
}

const ss = StyleSheet.create({
    sortIcon: {
        height: 24,
        width: 24
    }
});

export default SortBy;
