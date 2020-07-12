import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';

const Finished = (props) => {

    const query = new URLSearchParams(useLocation().search);

    return (
        <div className={css(ss.wrapper)}>
            <div className={css(ss.title)}>Playlist Generated</div>
            <div className={css(ss.buttons)}>
                <Button text={'View on Spotify'} onClickHandler={() => window.open(`https://open.spotify.com/playlist/${query.get('id')}`)} />
                <Button text={'Generate another'} onClickHandler={() => window.location = `/?access_token=${query.get('access_token')}&user_id=${query.get('user_id')}`} />
            </div>
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        background: '#f0f0f0',
        height: 'calc(100% - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 600,
        marginBottom: 30
    },
    buttons: {
        display: 'flex',
        ':last-child > div' : {
            margin: '0 10px'
        }
    },
});

export default Finished;