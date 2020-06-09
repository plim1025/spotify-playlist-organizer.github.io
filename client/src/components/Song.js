import React from 'react';
import './Song.css';
import { useDispatch } from 'react-redux';
import { TOGGLE_SELECT } from '../redux/Constants';
import Checkmark from '../assets/img/checkmark.svg';

const Song = (props) => {

    const dispatch = useDispatch();

    return (
        <div className="songParent" style={{background: props.background ? '#d3d3d3' : null}}>
            <div className="songCheckmark" style={{background: props.iconFill ? '#606060' : null, border: props.iconFill ? '2px solid #606060' : null}} onClick={() => dispatch({type: TOGGLE_SELECT, id: props.details.id})}>
                <Checkmark style={{fill: props.iconFill ? '#fff' : null}}/>
            </div>
            <div className="songName">{props.details.name}</div>
            <div className="songArtist">{props.details.artists.join(', ')}</div>
            <div className="songAlbum">{props.details.album}</div>
            <div className="songYear">{props.details.year}</div>
        </div>
    )
}

export default Song;