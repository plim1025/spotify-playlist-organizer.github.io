import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Backdrop, CircularProgress } from '@material-ui/core';
import DropdownFilters from '../views/DropdownFilters';
import SliderFilters from '../views/SliderFilters';
import Button from '../components/Button';
import Songs from './Songs';
import { css, StyleSheet } from 'aphrodite/no-important';

export const SongsContext = React.createContext();
export const SongFiltersContext = React.createContext();

const GeneratePlaylist = () => {
    const query = new URLSearchParams(useLocation().search);
    const [songs, setSongs] = useState([]);
    const [songFilters, setSongFilters] = useState({
        sort: {
            category: '',
            direction: 1
        },
        artists: [],
        album: [],
        year: [],
        danceability: [],
        duration: [],
        energy: [],
        instrumentalness: [],
        loudness: [],
        popularity: [],
        speechiness: [],
        tempo: [],
        valence: []
    });

    const [toggledSongIDs, setToggledSongIDs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkedCategories, setCheckedCategories] = useState(['Name', 'Artists', 'Album', 'Year']);
    const [navburger, setNavburger] = useState(window.outerWidth <= 800);
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        getSongsFromURL(`${process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URI : 'http://localhost:3000'}/song`);
        window.onresize = () => {
            if(window.outerWidth > 800) {
                setSidebar(false);
                setNavburger(false);
            } else {
                setNavburger(true);
            }
        }
    }, []);

    useEffect(() => {
        let fetchString = `${process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URI : 'http://localhost:3000'}/song?`;
        Object.keys(songFilters).forEach(category => {
            if(category === 'sort') {
                fetchString += `sortCategory=${songFilters.sort.category}&sortDirection=${songFilters.sort.direction}`;
            } else {
                fetchString += `&${category}=${JSON.stringify(songFilters[category])}`;
            }
        });
        getSongsFromURL(encodeURI(fetchString));
    }, [songFilters]);

    const getSongsFromURL = URL => {
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            setSongs(data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    const generatePlaylist = () => {
        if(playlistName && toggledSongIDs.length) {
            setLoading(true);
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
                            setLoading(false);
                            window.location.href = `finished?id=${playlistData.id}&access_token=${accessToken}&user_id=${userID}`;
                        }
                    })
                    .catch(err => {
                        setLoading(false);
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
            <div className={css(sidebar ? ss.sidebarWrapper : ss.wrapper)}>
                <div className={css(ss.flexWrapper)}>
                    <div className={css(ss.filterWrapper)}>
                        <DropdownFilters />
                        <SliderFilters />
                    </div>
                    {!sidebar ? <Songs checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} songs={songs} toggledSongs={toggledSongIDs} setSongs={setToggledSongIDs} /> : null}
                </div>
                {!sidebar ? 
                    <div className={css(ss.generateWrapper)}>
                        <TextField variant="outlined" className={css(ss.generateInput)} placeholder={'Playlist Name: '} onChange={e => setPlaylistName(e.target.value)}/>
                        <Button text={'GENERATE'} onClickHandler={generatePlaylist} />
                    </div> : null
                }
            </div>
            {!sidebar ?
                <div className={css(ss.properties)}>
                    <div className={css(ss.propertiesTitle)}>Track Properties</div>
                    <ol>
                        <li><b>Album</b> - The album that the track is featured in</li>
                        <li><b>Artists</b> - The artists featured in the track</li>
                        <li><b>Danceability</b> - The higher the percentage, the easier it is to dance to this song</li>
                        <li><b>Length</b> - The length of the track in minutes and seconds</li>
                        <li><b>Energy</b> - The higher the percentage, the more energetic the song</li>
                        <li><b>Instrumental</b> - The higher the percentage, the more instrumental the song</li>
                        <li><b>Loudness (dB)</b> - The higher the value, the louder the song</li>
                        <li><b>Name</b> - The title of the track</li>
                        <li><b>Popularity</b> - The higher the percentage, the more popular the song</li>
                        <li><b>Positivity</b> - The higher the percentage, the more positive the song</li>
                        <li><b>Speech</b> - The higher the percentage, the more speech in the song</li>
                        <li><b>Tempo (bpm)</b> - The number of beats per minute in the song</li>
                        <li><b>Year</b> - The release date of the track</li>
                    </ol>
                </div> : null
            }
            <Backdrop transitionDuration={300} open={loading} className={css(ss.backdrop)}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {navburger ? 
                <div className={css(ss.navburger)} onClick={() => setSidebar(sidebar => !sidebar)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#000' viewBox="0 0 384 384"> <rect x="0" y="277.333" width="384" height="42.667" /> <rect x="0" y="170.667" width="384" height="42.667" /> <rect x="0" y="64" width="384" height="42.667" /> </svg>
                </div>
                : null
            }
        </SongFiltersContext.Provider>
        </SongsContext.Provider>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        background: '#f0f0f0',
    },
    sidebarWrapper: {
        display: 'flex',
        flexDirection: 'column',
        background: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 'calc(100% - 70px)'
    },  
    flexWrapper: {
        display: 'flex',
        height: '100%'
    },
    filterWrapper: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 10px',
        padding: 20
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
        background: '#fff'
    },
    properties: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 20px',
        marginBottom: 20
    },
    propertiesTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 26,
        fontWeight: 700,
        marginTop: 20
    },
    backdrop: {
        zIndex: 2,
        color: '#fff'
    },
    navburger: {
		width: 24,
		height: 24,
        position: 'absolute',
        top: 23,
		left: 23,
		cursor: 'pointer'
    },
    sidebarClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32,
        height: 32,
        width: 32,
        cursor: 'pointer',
        position: 'absolute',
        top: 8,
        right: 8
    }
});

export default GeneratePlaylist;