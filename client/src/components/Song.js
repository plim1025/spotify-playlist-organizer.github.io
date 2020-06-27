import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const Song = (props) => {

    return (
        <div className="songParent" style={{background: props.toggled ? '#d3d3d3' : null}}>
            <div onClick={props.handleToggle} className="songCheckmark" style={{background: props.toggled ? '#606060' : null, border: props.toggled ? '2px solid #606060' : null}}>
                <svg style={{fill: props.toggled ? '#fff' : null}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            <div className="songName">{props.details.name}</div>
            <div className="songArtist">{props.details.artists.join(', ')}</div>
            <div className="songAlbum">{props.details.album}</div>
            <div className="songYear">{props.details.year}</div>
        </div>
    )
}

const ss = StyleSheet.create({
    checkmarkIcon: {
        height: 24,
        width: 24
    }
});

export default Song;