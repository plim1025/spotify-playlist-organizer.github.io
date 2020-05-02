import React from 'react';
import { useDispatch } from 'react-redux';
import { TOGGLE_SELECT } from '../redux/Constants';

const Song = (props) => {

    const dispatch = useDispatch();

    return (
        <div>
            <div onClick={() => dispatch({type: TOGGLE_SELECT, id: props.details.id})}>Selected</div>
            <div style={{color: props.color}}>
                {props.details.name}
                {props.details.artist}
                {props.details.album}
                {props.details.year}
            </div>
        </div>
    )
}

export default Song;