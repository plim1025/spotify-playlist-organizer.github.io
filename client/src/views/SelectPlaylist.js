import React, { useState, useEffect } from 'react';
import Checkmark from '../assets/img/checkmark.svg';
import { useLocation } from 'react-router-dom';

const Home = () => {

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
        .then(libraryData => {
            let tracks = libraryData.items.map(item => item.track);
            let promiseArr = [];
            tracks.map(track => {
                promiseArr.push(
                    fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
                        headers: {'Authorization': 'Bearer ' + accessToken}
                    })
                    .then(response => response.json())
                    .then(trackData => {
                        tracks = tracks.map(item => item.id === track.id ? {...item, ...trackData} : item)
                    })
                    .catch(err => console.log(err))
                );
            })
            Promise.all(promiseArr).then(() => setSavedSongs(tracks));
        })
        .catch(err => console.log(err));

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(response => response.json())
        .then(playlistsData => {
            const playlists = playlistsData.items;
            setPlaylists(playlists);
            playlists.map(playlist => {
                fetch(playlist.tracks.href, {
                    headers: {'Authorization': 'Bearer ' + accessToken}
                })
                .then(response => response.json())
                .then(playlistData => {
                    let tracks =  playlistData.items.map(item => item.track);
                    let promiseArr = [];
                    tracks.map(track => {
                        promiseArr.push(
                            fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
                                headers: {'Authorization': 'Bearer ' + accessToken}
                            })
                            .then(response => response.json())
                            .then(trackData => {
                                tracks = tracks.map(item => item.id === track.id ? {...item, ...trackData} : item);
                            })
                            .catch(err => console.log(err))
                        )
                    });
                    Promise.all(promiseArr).then(() => setPlaylistSongs([...playlistSongs, {[playlist.id]: tracks}]));
                })
                .catch(err => console.log(err));
            })
        })
        .catch(err => console.log(err));
    }, []);

    const handleChange = selectedID => {
        if(selectedPlaylists.includes(selectedID))
            setSelectedPlaylists(selectedPlaylists.filter(ID => ID !== selectedID));
        else
            setSelectedPlaylists([...selectedPlaylists, selectedID]);
    }

    const handleSubmit = async() => {
        let songs = [];
        if(savedSongsSelected)
            songs = savedSongs;
        playlistSongs.map(playlistSong => {
            if(selectedPlaylists.includes(Object.keys(playlistSong)[0]))
                songs = [...songs, ...Object.values(playlistSong)[0]];
        });
        await fetch('http://localhost:3000/song', {
            method: 'DELETE'
        });
        fetch('http://localhost:3000/songs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songs)
        })
        .then(() => window.location.href ='songs')
        .catch(err => console.log(err));
    }

    return (
        <>
            <div className="playlistParent">
            <div onClick={() => toggleSavedSongsSelected(prevState => !prevState)}>Saved Songs ({savedSongs.length})</div>
                {
                    playlists ? 
                        playlists.map(playlist => <div key={playlist.id} onClick={() => handleChange(playlist.id)}>{playlist.name} ({playlist.tracks.total})</div>)
                        : null
                }
            </div>
            <div onClick={handleSubmit}>Continue</div>
        </>
    )
}

export default Home;