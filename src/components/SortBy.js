import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SORTBY_NAME, SORTBY_ARTIST, SORTBY_ALBUM, SORTBY_YEAR, SORTBY_DURATION, SORTBY_POPULARITY, SORTBY_BPM, SORTBY_LOUDNESS } from '../redux/Constants';
import SortByIcon from '../assets/img/SortByIcon.svg';

const SortBy = () => {

    const sort = useDispatch();
    const [dropdown, showDropdown] = useState(false);

    return (
        <div>
            <SortByIcon onClick={() => showDropdown(!dropdown)} />
                {dropdown ? 
                <div>
                    <div onClick={() => {sort({type: SORTBY_NAME}); showDropdown(!dropdown)}}>
                        Name
                    </div>
                    <div onClick={() => {sort({type: SORTBY_ARTIST}); showDropdown(!dropdown)}}>
                        Artist
                    </div>
                    <div onClick={() => {sort({type: SORTBY_ALBUM}); showDropdown(!dropdown)}}>
                        Album
                    </div>
                    <div onClick={() => {sort({type: SORTBY_YEAR}); showDropdown(!dropdown)}}>
                        Year
                    </div>
                    <div onClick={() => {sort({type: SORTBY_DURATION}); showDropdown(!dropdown)}}>
                        Duration
                    </div>
                    <div onClick={() => {sort({type: SORTBY_POPULARITY}); showDropdown(!dropdown)}}>
                        Popularity
                    </div>
                    <div onClick={() => {sort({type: SORTBY_BPM}); showDropdown(!dropdown)}}>
                        BPM
                    </div>
                    <div onClick={() => {sort({type: SORTBY_LOUDNESS}); showDropdown(!dropdown)}}>
                        Loudness
                    </div>
                </div>
                : null}
        </div>
    )
}

export default SortBy;
