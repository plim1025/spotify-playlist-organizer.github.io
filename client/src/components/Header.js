import React from 'react';
import './Header.css';
import SpotifyIcon from '../assets/img/spotify.svg';

const Header = () => {
    return (
        <header>
            <SpotifyIcon className="spotifyIcon"/>
            <div>Spotify Playlist Generator</div>
        </header>
    )
}

export default Header;