import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Backdrop, CircularProgress } from '@material-ui/core';
import Sort from '../views/Sort';
import DropdownFilters from '../views/DropdownFilters';
import SliderFilters from '../views/SliderFilters';
import Song from '../components/Song';
import Button from '../components/Button';
import { css, StyleSheet } from 'aphrodite/no-important';

export const SongsContext = React.createContext();
export const SongFiltersContext = React.createContext();

const Songs = () => {

    const query = new URLSearchParams(useLocation().search);
    const [songs, setSongs] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState(['Name', 'Artists', 'Album', 'Year']);
    const [songFilters, setSongFilters] = useState({
        sort: {
            category: '',
            direction: 1
        },
        artists: [],
        album: [],
        year: [],
        duration: [],
        popularity: [],
        tempo: [],
        loudness: []
    });
    const [checkmark, toggleCheckmark] = useState(false);
    const [toggledSongIDs, setToggledSongIDs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        getSongsFromURL('http://localhost:3000/song');
    }, []);

    useEffect(() => {
        let fetchString = `http://localhost:3000/song?`;
        Object.keys(songFilters).forEach(category => {
            if(category === 'sort') {
                fetchString += `sortCategory=${songFilters.sort.category}&sortDirection=${songFilters.sort.direction}`;
            } else {
                fetchString += `&${category}=${JSON.stringify(songFilters[category])}`;
            }
        });
        getSongsFromURL(encodeURI(fetchString));
    }, [songFilters]);

    useEffect(() => {
        if(checkmark) {
            setToggledSongIDs(songs.map(song => song.id));
        } else {
            setToggledSongIDs([]);
        }
    }, [checkmark]);

    const toggleSong = (selected, song) => {
        if(selected) {
            setToggledSongIDs([...toggledSongIDs, song.id]);
        } else {
            setToggledSongIDs(toggledSongIDs.filter(songid => songid !== song.id ? songid : null));
        }
    }

    const getSongsFromURL = URL => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }

    const generatePlaylist = () => {
        if(playlistName && toggledSongIDs.length) {
            setGenerating(true);
            const accessToken = query.get('access_token');
            const userID = query.get('user_id');
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: playlistName})
            })
            .then(response => response.json())
            .then(playlistData => {
                let songURIs = [];
                toggledSongIDs.forEach(id => {
                    songs.filter(song => song.id === id ? songURIs.push(song.uri): null);
                });
                for(let i = 0; i < songURIs.length; i += 100) {
                    fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({uris: songURIs.slice(i, i+100)})
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.snapshot_id) {
                            setGenerating(false);
                            window.location.href = `finished?id=${playlistData.id}&access_token=${accessToken}&user_id=${userID}`;
                        }
                    })
                    .catch(err => {
                        setGenerating(false);
                        alert('Error generating playlist: ' + err);
                        console.log(err);
                    });
                }
            })
            .catch(err => console.log(err));
        } else {
            if(!playlistName && !toggledSongIDs.length) {
                alert('Playlist name cannot be blank and must have at least one song selected');
            } else if (!playlistName) {
                alert('Playlist name cannot be blank');
            } else if (!toggledSongIDs.length) {
                alert('Must have at least one song selected');
            }
        }
    }

    return (
        <SongsContext.Provider value={songs}>
        <SongFiltersContext.Provider value={{songFilters: songFilters, setSongFilters: setSongFilters}}>
            <div className={css(ss.wrapper)}>
                <div className={css(ss.flexWrapper)}>
                    <div className={css(ss.filterWrapper)}>
                        <DropdownFilters/>
                        <SliderFilters/>
                    </div>
                    <div className={css(ss.divider)} />
                    <div className={css(ss.songWrapper)}>
                        <Sort checkmark={checkmark} checkedCategories={checkedCategories} handleSetCheckedCategories={setCheckedCategories} handleSelectAll={toggleCheckmark} />
                        {
                            songs.length ? songs.map(song => 
                                <Song 
                                    key={song.id} 
                                    details={song} 
                                    handleToggle={() => toggleSong(!toggledSongIDs.includes(song.id), song)}
                                    toggled={toggledSongIDs.includes(song.id)}
                                    categories={checkedCategories}
                                />
                            ) : null
                        }
                    </div>
                </div>
                <div className={css(ss.generateWrapper)}>
                    <TextField variant="outlined" className={css(ss.generateInput)} placeholder={'Playlist Name: '} onChange={e => setPlaylistName(e.target.value)}/>
                    <Button text={'GENERATE'} onClickHandler={generatePlaylist} />
                </div>
            </div>
            <Backdrop transitionDuration={300} open={generating} className={css(ss.backdrop)}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </SongFiltersContext.Provider>
        </SongsContext.Provider>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        background: '#f0f0f0'
    },
    flexWrapper: {
        display: 'flex'
    },
    filterWrapper: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 10px',
        padding: 20
    },
    divider: {
        height: '100%',
        width: 1,
        background: '#dbdbdb'
    },
    songWrapper: {
        width: '100%',
        overflow: 'hidden'
    },
    generateWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
    generateInput: {
        maxWidth: 400,
        width: 'calc(100% - 40px)',
        borderColor: '#000'
    },
    backdrop: {
        zIndex: 2,
        color: '#fff'
    }
});

export default Songs;