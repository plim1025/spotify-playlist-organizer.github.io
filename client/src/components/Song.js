import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const Song = (props) => {

    return (
        <div style={{background: props.toggled ? '#d3d3d3' : null}} className={css(ss.wrapper)}>
            <div onClick={props.handleToggle} style={{background: props.toggled ? '#606060' : null, border: props.toggled ? '2px solid #606060' : null}} className={css(ss.checkmark)}>
                <svg style={{fill: props.toggled ? '#fff' : null}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            <div style={{flex: props.flex[0]}} className={css(ss.category)}>{props.details.name}</div>
            <div style={{flex: props.flex[1]}} className={css(ss.category)}>{props.details.artists.join(', ')}</div>
            <div style={{flex: props.flex[2]}} className={css(ss.category)}>{props.details.album}</div>
            <div style={{flex: props.flex[3]}} className={css(ss.category)}>{props.details.year}</div>
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
    }, 
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        padding: 3,
        borderRadius: 8,
        marginRight: 10,
        cursor: 'pointer',
        border: '2px solid #606060',
        ':hover': {
            background: '#606060'
        },
        ':hover svg': {
            fill: '#fff !important'
        }
    },
    checkmarkIcon: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    category: {
        margin: '0 10px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',

    }
});

export default Song;