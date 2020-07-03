import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite/no-important';
import Button from '../components/Button';

const Login = () => {

    const query = new URLSearchParams(useLocation().search);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    useEffect(() => {
        const accessToken = query.get('access_token');
        const refreshToken = query.get('refresh_token');
        if(accessToken) {
            const fetchedPlaylists = [];
            Promise.all([
                fetch('https://api.spotify.com/v1/me/tracks', {
                    headers: {'Authorization': `Bearer ${accessToken}` }
                })
                .then(response => response.json())
                .catch(err => console.log(err)),
                fetch('https://api.spotify.com/v1/me/playlists', {
                    headers: {'Authorization': `Bearer ${accessToken}`}
                })
                .then(response => response.json())
                .catch(err => console.log(err))
            ])
            .then(([savedSongsData, playlistData]) => {
                const promiseArr = [];
                let savedSongTracks = savedSongsData.items.map(item => item.track);
                if(savedSongsData.length) {
                    
                    savedSongTracks.map(track => {
                        promiseArr.push(
                            fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
                                headers: {'Authorization': `Bearer ${accessToken}`}
                            })
                            .then(response => response.json())
                            .then(trackData => {
                                savedSongTracks = savedSongTracks.map(item => item.id === track.id ? {...item, ...trackData} : item)
                            })
                            .catch(err => console.log(err))
                        );
                    })
                }
                if(playlistData.items.length) {
                    playlistData.items.map(playlist => {
                        promiseArr.push(
                            fetch(playlist.tracks.href, {
                                headers: {'Authorization': `Bearer ${accessToken}`}
                            })
                            .then(response => response.json())
                            .then(async(playlistData) => {
                                const trackPromiseArr = [];
                                let playlistTracks =  playlistData.items.map(item => item.track);
                                playlistTracks.map(track => {
                                    trackPromiseArr.push(
                                        fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
                                            headers: {'Authorization': `Bearer ${accessToken}`}
                                        })
                                        .then(response => response.json())
                                        .then(trackData => playlistTracks = playlistTracks.map(item => item.id === track.id ? {...item, ...trackData} : item))
                                        .catch(err => console.log(err))
                                    )
                                });
                                await Promise.all(trackPromiseArr).then(() => fetchedPlaylists.push({ id: playlist.id, name: playlist.name, tracks: playlistTracks }));
                            })
                            .catch(err => console.log(err))
                        );
                    })
                }

                Promise.all(promiseArr).then(() => {
                    if(savedSongTracks.length) {
                        fetchedPlaylists.push({ id: savedSongsData.href, name: 'Saved Songs', tracks: savedSongTracks });
                    }
                    setPlaylists(fetchedPlaylists);
                });
            });
        }
    }, []);

    const handleSubmit = () => {
        let songs = selectedPlaylists.map(playlist => playlist.tracks);
        songs = songs.flat();

        const accessToken = query.get('access_token');
        const refreshToken = query.get('refresh_token');
        const userID = query.get('user_id');
        fetch('http://localhost:3000/song', {
            method: 'DELETE'
        })
        .then(() => 
            fetch('http://localhost:3000/songs', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(songs)
                }
            )   
        )
        .then(() => {
            window.location.href =`songs?access_token=${accessToken}&refresh_token=${refreshToken}&user_id=${userID}`;
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={css(ss.wrapper)} >
            <div className={css(ss.textParent)}>
                <div className={css(ss.textTitle)}>Generate Organized Playlists</div>
                <div className={css(ss.textBody)}>Filter your music based on attributes such as beats per minute, mood, popularity, and more.</div>
            </div>
            {
                query.get('access_token') ?
                    <>
                        <FormControl className={css(ss.dropdownParent)}>
                            <InputLabel className={css(ss.dropdownLabel)}>Select Playlists</InputLabel>
                            <Select 
                                multiple value={selectedPlaylists} 
                                onChange={e => setSelectedPlaylists([...e.target.value])}
                                input={<Input />}
                                renderValue={item => <div>{item.map(item => <Chip key={item.id} className={css(ss.dropdownChip)} label={item.name} />)}</div>} 
                                className={css(ss.dropdownSelect)}
                            >
                                {playlists.map(playlist => (
                                    <MenuItem key={playlist.id} value={playlist}>
                                        <div style={{background: selectedPlaylists.indexOf(playlist) > -1 ? '#606060' : null}} className={css(ss.checkmark)}>
                                            <svg style={{fill: selectedPlaylists.indexOf(playlist) > -1 ? '#fff' : 'transparent'}} className={css(ss.checkmarkIcon)} viewBox="0 0 512 512"> <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z" /></svg>
                                        </div>
                                        <ListItemText primary={`${playlist.name} (${playlist.tracks.length})`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button text={'CONTINUE'} onClickHandler={handleSubmit} />
                    </>
                :
                    <Button 
                        text={'LOGIN'}
                        onClickHandler={() => window.location='http://localhost:3000/login'}
                        className={css(ss.button)}
                    />
            }
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        height: 'calc(100% - 70px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#f0f0f0'
    },
    textParent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 840,
        width: 'calc(100% - 50px)',
        textAlign: 'center',
    },
    textTitle: {
        fontSize: 60,
        fontWeight: 600
    },
    textBody: {
        fontSize: 30,
        marginTop: 30,
    },
    dropdownParent: {
        marginTop: 10
    },
    dropdownLabel: {
        marginLeft: 10
    },
    dropdownSelect: {
        width: 400,
    },
    dropdownChip: {
        height: 20,
        marginLeft: 5
    },
    checkmark: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderRadius: 8,
        marginRight: 10,
        border: '2px solid #606060'
    },
    checkmarkIcon: {
        height: 16,
        width: 16,
    }
});

export default Login;