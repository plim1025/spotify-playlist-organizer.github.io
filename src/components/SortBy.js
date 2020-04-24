import React from 'react';
import { useDispatch } from 'react-redux';
import { SORTBY_TITLE } from '../redux/Constants';

const SortBy = (props) => {

    const sortByTitle = useDispatch();

    return (
        <div onClick={() => sortByTitle({type: SORTBY_TITLE})}>
            hello
        </div>
    )
}

export default SortBy;
