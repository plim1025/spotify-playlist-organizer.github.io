import React from 'react';
import './Song.css';
import { useDispatch } from 'react-redux';
import { TOGGLE_SELECT } from '../redux/Constants';
import Checkmark from '../assets/img/checkmark.svg';

const Song = (props) => {

    const dispatch = useDispatch();

    return (
        <div id="songParent" style={{background: props.background ? '#d3d3d3' : null}}>
            <div id="checkmark" onClick={() => dispatch({type: TOGGLE_SELECT, id: props.details.id})}>
                <Checkmark style={{fill: props.iconFill ? '#000' : null}}/>
            </div>
            <div id="name">{props.details.name}</div>
            <div id="artist">{props.details.artist}</div>
            <div id="album">{props.details.album}</div>
            <div id="year">{props.details.year}</div>
        </div>
    )
}

export default Song;