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
            <div className={css(ss.socialMedia)}>
                <svg onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?&u=youtube.com')} className={css(ss.facebookIcon)} viewBox="0 0 455.73 455.73"> <path d="M0,0v455.73h242.704V279.691h-59.33v-71.864h59.33v-60.353c0-43.893,35.582-79.475,79.475-79.475 h62.025v64.622h-44.382c-13.947,0-25.254,11.307-25.254,25.254v49.953h68.521l-9.47,71.864h-59.051V455.73H455.73V0H0z"/> </svg>
                <svg onClick={() => window.open('http://twitter.com/share?text=Generate%20Spotify%20Playlists&url=youtube.com')} className={css(ss.twitterIcon)} viewBox="0 0 512 512"> <path d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016 c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992 c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056 c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152 c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792 c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44 C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568 C480.224,136.96,497.728,118.496,512,97.248z"/> </svg>
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
        fontWeight: 600
    },
    buttons: {
        display: 'flex',
        margin: '30px 0',
        ':nth-child(1n) > div': {
            margin: '0 10px'
        },
    },
    socialMedia: {
    },
    facebookIcon: {
        fill: '#3A559F',
        borderRadius: '100%',
        height: 50,
        width: 50,
        marginRight: 50,
        cursor: 'pointer'
    },
    twitterIcon: {
        fill: '#03A9F4',
        height: 50,
        width: 50,
        cursor: 'pointer'
    }
});

export default Finished;