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
        .then(libraryData => {
            let tracks = libraryData.items.map(item => item.track);
            let promiseArr = [];
            for(let i = 0; i < tracks.length; i++) {
                promiseArr.push(
                    fetch(`https://api.spotify.com/v1/audio-features/${tracks[i].id}`, {
                        headers: {'Authorization': 'Bearer ' + accessToken}
                    })
                    .then(response => response.json())
                    .then(trackData => {
                        tracks = tracks.map(item => item.id === tracks[i].id ? {...item, ...trackData} : item)
                    })
                    .catch(err => console.log(err))
                );
            }
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
            for(let i = 0; i < playlists.length; i++) {
                fetch(playlists[i].tracks.href, {
                    headers: {'Authorization': 'Bearer ' + accessToken}
                })
                .then(response => response.json())
                .then(playlistData => {
                    let tracks =  playlistData.items.map(item => item.track);
                    let promiseArr = [];
                    for(let j = 0; j < tracks.length; j++) {
                        promiseArr.push(
                            fetch(`https://api.spotify.com/v1/audio-features/${tracks[j].id}`, {
                                headers: {'Authorization': 'Bearer ' + accessToken}
                            })
                            .then(response => response.json())
                            .then(trackData => {
                                tracks = tracks.map(item => item.id === tracks[j].id ? {...item, ...trackData} : item);
                            })
                            .catch(err => console.log(err))
                        )
                    }
                    Promise.all(promiseArr).then(() => setPlaylistSongs([...playlistSongs, {[playlists[i].id]: tracks}]));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
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
        const parsedSongs = songs.map(song => {
            return {
                id: song.id,
                name: song.name,
                artists: song.artists.map(artist => artist.name),
                album: song.album.name,
                year: song.album.release_date.substring(0,4),
                duration: song.duration_ms,
                popularity: song.popularity,
                preview: song.preview_url,
                bpm: parseInt(song.tempo),
                loudness: parseInt(song.loudness),
                selected: false,
                filteredOutBy: {
                    artist: false,
                    album: false,
                    year: false,
                    duration: false,
                    popularity: false,
                    bpm: false,
                    loudness: false
                }
            }
        });
        dispatch({type: SET_SONGS, songs: parsedSongs});
        window.location.assign('http://localhost:8080/playlist');
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