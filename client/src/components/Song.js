import React from 'react';
import './Song.css';
import Checkmark from '../assets/img/checkmark.svg';

const Song = (props) => {

    return (
        <div className="songParent" style={{background: props.toggled ? '#d3d3d3' : null}}>
            <div onClick={() => props.handleToggle(!props.toggled, props.details.id)} className="songCheckmark" style={{background: props.toggled ? '#606060' : null, border: props.toggled ? '2px solid #606060' : null}}>
                <Checkmark style={{fill: props.toggled ? '#fff' : null}}/>
            </div>
            <div className="songName">{props.details.name}</div>
            <div className="songArtist">{props.details.artists.join(', ')}</div>
            <div className="songAlbum">{props.details.album}</div>
            <div className="songYear">{props.details.year}</div>
        </div>
    )
}

export default Song;