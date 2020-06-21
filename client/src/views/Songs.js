import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DropdownFilters from '../views/DropdownFilters';
import SliderFilters from '../views/SliderFilters';
import SortCategory from '../components/SortCategory';
import Song from '../components/Song';
import './Songs.css';
import Checkmark from '../assets/img/checkmark.svg';

export const SongsContext = React.createContext();
export const SongFiltersContext = React.createContext();

const Songs = (props) => {

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
        duration: [],
        popularity: [],
        tempo: [],
        loudness: []
    });
    const [checkmark, toggleCheckmark] = useState(false);
    const [sortedBy, sortBy] = useState(null);
    const [sortDirection, toggleSortDirection] = useState(1);
    const [toggledSongIDs, setToggledSongIDs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');

    useEffect(() => {
        getSongsFromURL('http://localhost:3000/song');
    }, []);

    useEffect(() => {
        if(sortedBy) {
            getSongsFromURL(`http://localhost:3000/song?sortCategory=${sortedBy}&sortDirection=${sortDirection}`);
        }   
    }, [sortedBy, sortDirection]);

    useEffect(() => {
        if(checkmark) {
            setToggledSongIDs(songs.map(song => song.id));
        } else {
            setToggledSongIDs([]);
        }
    }, [checkmark]);

    useEffect(() => {
        if(songs.length) {
            let fetchString = `http://localhost:3000/song?`;
            Object.keys(songFilters).forEach(category => {
                if(category === 'sort') {
                    fetchString += `sortCategory=${songFilters.sort.category}&sortDirection=${songFilters.sort.direction}`;
                } else {
                    fetchString += `&${category}=${JSON.stringify(songFilters[category])}`;
                }
            });
            getSongsFromURL(encodeURI(fetchString));
        }
    }, [songFilters]);

    const sort = category => {
        if(sortedBy !== category) {
            toggleSortDirection(1);
            sortBy(category);
        } else {
            if(sortDirection == 1) {
                toggleSortDirection(-1);
            } else {
                toggleSortDirection(1);
            }
        }
    }

    const toggleSong = (selected, id) => {
        if(selected) {
            setToggledSongIDs([...toggledSongIDs, id]);
        } else {
            setToggledSongIDs(toggledSongIDs.filter(songid => songid !== id ? songid : null));
        }
    }

    const getSongsFromURL = URL => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(err => console.log(err));
    }

    const generatePlaylist = () => {
        // if(playlistName && .length) {
        //     const accessToken = query.get('access_token');
        //     const userID = query.get('user_id');
        //     fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Bearer ' + accessToken,
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({name: playlistName})
        //     })
        //     .then(response => response.json())
        //     .then(playlistData => {
        //         const songURIs = .map(song => song.uri);
        //         for(let i = 0; i < songURIs.length; i += 100) {
        //             fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Authorization': 'Bearer ' + accessToken,
        //                     'Accept': 'application/json',
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify({uris: songURIs.slice(i, i+100)})
        //             })
        //             .then(response => response.json())
        //             .then(data => console.log(data))
        //             .catch(err => console.log(err));
        //         }
        //     })
        //     .catch(err => console.log(err));
        // } else {
        //     if(!playlistName && !songs.length) {
        //         alert('Playlist name cannot be blank and must have at least one song selected');
        //     } else if (!playlistName) {
        //         alert('Playlist name cannot be blank');
        //     } else if (!songs.length) {
        //         alert('Must have at least one song selected');
        //     }
        // }
    }

    return (
        <SongsContext.Provider value={songs}>
        <SongFiltersContext.Provider value={{songFilters: songFilters, setSongFilters: setSongFilters}}>
            <div className='flex'>
                <div className='filters'>
                    <DropdownFilters/>
                    <div style={{height: 20}}/>
                    <SliderFilters/>
                </div>
                <div className='songs'>
                    <div className='sortByParent'>
                        <div className='sortByCheckmark' style={{background: checkmark ? '#606060' : null, border: checkmark ? '2px solid #606060' : null}} onClick={() => toggleCheckmark(checkmark => !checkmark)}>
                            <Checkmark style={{fill: checkmark ? '#fff' : null}}/>
                        </div>
                        <SortCategory category={'name'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'artist'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                        <SortCategory category={'album'} sortedBy={sortedBy} sortDirection={sortDirection} handleSort={sort}/>
                    </div>
                    {
                        songs.length ? songs.map(song => 
                            <Song 
                                key={song.id} 
                                details={song} 
                                handleToggle={toggleSong}
                                toggled={toggledSongIDs.includes(song.id)}
                            />
                        ) : null
                    }
                </div>
            </div>
            <input placeholder={'Enter Playlist Name: '} onChange={e => setPlaylistName(e.target.value)}/>
            <button onClick={generatePlaylist}>Generate Playlist</button>
        </SongFiltersContext.Provider>
        </SongsContext.Provider>
    )
}

export default Songs;