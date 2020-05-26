import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Checkmark from '../assets/img/checkmark.svg';
import { useLocation } from 'react-router-dom';
import { SET_SONGS } from '../redux/Constants';

const Home = () => {

    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const [savedSongs, setSavedSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [savedSongsSelected, toggleSavedSongsSelected] = useState(false);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    useEffect(() => {
        const accessToken = query.get('access_token');
        const refreshToken = query.get('refresh_token');

        fetch('https://api.spotify.com/v1/me/tracks', {
            headers: {'Authorization': 'Bearer ' + accessToken }
        })
        .then(response => response.json())
        .then(data => setSavedSongs(data.items.map(item => item.track)))
        .catch(err => console.log(err));

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken }
        })
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            setPlaylists(items);
            for(let i = 0; i < items.length; i++) {
                fetch(items[i].tracks.href, {
                    headers: {'Authorization': 'Bearer ' + accessToken }
                })
                .then(response => response.json())
                .then(data => {
                    setPlaylistSongs([...playlistSongs, {[items[i].id]: [...data.items.map(item => item.track)]}]);
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
        // .then(data => console.log(data.items))
    }, []);

    const handleChange = selectedID => {
        if(selectedPlaylists.includes(selectedID))
            setSelectedPlaylists(selectedPlaylists.filter(ID => ID !== selectedID));
        else
            setSelectedPlaylists([...selectedPlaylists, selectedID]);
    }

    const handleSubmit = () => {
        let songs = [];
        if(savedSongsSelected)
            songs = savedSongs;
        for(let i = 0; i < playlistSongs.length; i++) {
            if(selectedPlaylists.includes(Object.keys(playlistSongs[i])[0]))
                songs = [...songs, ...Object.values(playlistSongs[i])[0]];
        }
        console.log(songs)
        // dispatch({type: SET_SONGS, songs: songs});
    }

    return (
        <>
            <div className="playlistParent">
                <div onClick={() => toggleSavedSongsSelected(prevState => !prevState)}>Saved Songs</div>
                {
                    playlists ? 
                        playlists.map(playlist => <div key={playlist.id} onClick={() => handleChange(playlist.id)}>{playlist.description}</div>)
                        : null
                }
            </div>
            <div onClick={handleSubmit}>Continue</div>
        </>
    )
}

export default Home;