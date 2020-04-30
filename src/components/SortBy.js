import React from 'react';
import { useDispatch } from 'react-redux';
import { SORT_SONGS } from '../redux/Constants';

const SortBy = (props) => {

    const dispatch = useDispatch();

    return (
        <div>
            <div 
                onClick={() => dispatch({type: SORT_SONGS, category: props.category})} 
                category={props.category}
            >
                {props.title}
            </div>
        </div>
    )
}

export default SortBy;
