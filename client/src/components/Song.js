import React, { useState, useEffect } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const Song = (props) => {

    const [audio, setAudio] = useState(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const tempAudio = new Audio(props.details.preview);
        tempAudio.addEventListener('ended', () => setPlaying(false));
        setAudio(tempAudio);
        return () => {
            if(audio) {
                audio.pause();
            }
        }
    }, []); 

    const toggleAudio = () => {
        if(playing) {
            audio.pause();
            setPlaying(false);
        } else {
            if(audio.emptied && props.details.preview) {
                audio.load();
            }
            audio.play();
            setPlaying(true);
        }
    }

    const msToMinsSecs = ms => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div style={{background: props.toggled ? '#d3d3d3' : null}} className={css(ss.wrapper)}>
            <div className={css(ss.audioIcon)} onClick={toggleAudio}>
                {playing ? 
                    <svg width='12' height='12' viewBox="0 0 40.4 45.6"><path d="M4.6,25.2V11.7c0-2.1-.1-4.2,0-6.3A2.9,2.9,0,0,1,7.2,2.5c1.4-.1,2.8,0,4.2,0s4.4-.1,6.7,0a4.5,4.5,0,0,1,1.6.3,3,3,0,0,1,1.9,2.9v39A3.2,3.2,0,0,1,18.1,48H7.9a3,3,0,0,1-3.3-3.4V25.2Z" transform="translate(-4.6 -2.4)"/><path d="M44.9,25.2V44.5A3.1,3.1,0,0,1,41.5,48H31.3a3,3,0,0,1-3-1.8,4,4,0,0,1-.3-1.5c-.1-3.3-.1-6.6-.1-9.9V5.8a3.4,3.4,0,0,1,1.2-2.7,3.6,3.6,0,0,1,2-.6c3.5,0,7-.1,10.5,0a3.1,3.1,0,0,1,3.3,3.2Z" transform="translate(-4.6 -2.4)"/></svg>
                    : 
                    <svg width='12' height='12' viewBox="0 0 50 50"><path d="M0,50V0L50,25Z"/></svg>
                }
            </div>
            <div onClick={props.handleToggle} style={{background: props.toggled ? '#606060' : null, border: props.toggled ? '2px solid #606060' : null}} className={css(ss.checkmark)}>
                <svg style={{fill: props.toggled ? '#fff' : 'transparent'}} height='16' width='16' viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
            </div>
            {
                props.categories.map(category => {
                    switch(category) {
                        case 'Album':
                            return <div key={category} style={{flex: 1}} className={css(ss.category)}>{props.details.album}</div>
                        case 'Artists':
                            return <div key={category} style={{flex: 1}} className={css(ss.category)}>{props.details.artists.join(', ')}</div>
                        case 'Danceability':
                            return <div key={category} style={{width: 130}} className={css(ss.category)}>{Math.round(props.details.danceability * 100) + '%'}</div>
                        case 'Duration':
                            return <div key={category} style={{width: 100}} className={css(ss.category)}>{msToMinsSecs(props.details.duration)}</div>
                        case 'Energy':
                            return <div key={category} style={{width: 83}} className={css(ss.category)}>{Math.round(props.details.energy * 100) + '%'}</div>
                        case 'Instrumentalness':
                            return <div key={category} style={{width: 136}} className={css(ss.category)}>{Math.round(props.details.instrumentalness * 100) + '%'}</div>
                        case 'Loudness':
                            return <div key={category} style={{width: 105}} className={css(ss.category)}>{props.details.loudness + ' dB'}</div>
                        case 'Name':
                            return <div key={category} style={{flex: 1}} className={css(ss.category)}>{props.details.name}</div>
                        case 'Popularity':
                            return <div key={category} style={{width: 113}} className={css(ss.category)}>{props.details.popularity + 'th percentile'}</div>
                        case 'Speechiness':
                            return <div key={category} style={{width: 128}} className={css(ss.category)}>{Math.round(props.details.speechiness * 100) + '%'}</div>
                        case 'Tempo':
                            return <div key={category} style={{width: 82}} className={css(ss.category)}>{props.details.tempo + ' bpm'}</div>
                        case 'Valence':
                            return <div key={category} style={{width: 105}} className={css(ss.category)}>{Math.round(props.details.valence * 100) + '%'}</div>
                        case 'Year':
                            return <div key={category} style={{width: 64}} className={css(ss.category)}>{props.details.year}</div>
                    }
                })
            }
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: 30,
        borderTop: '1px solid #dbdbdb',
        padding: '0 10px',
        fontSize: 16
    },
    audioIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 6,
        ':hover': {
            background: '#d9d9d9'
        }
    },
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
        width: 16,
        padding: 2,
        borderRadius: 6,
        marginRight: 10,
        cursor: 'pointer',
        border: '2px solid #606060',
    },
    category: {
        margin: '0 10px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }
});

export default Song;