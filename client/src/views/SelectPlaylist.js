import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select, MenuItem, Chip, ListItemText } from '@material-ui/core';
import Checkmark from '../assets/img/checkmark.svg';
import { useLocation } from 'react-router-dom';
import { SET_SONGS } from '../redux/Constants';

const Home = () => {

    const query = new URLSearchParams(useLocation().search);
    const [library, setLibrary] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const accessToken = query.get('access_token');
        const refreshToken = query.get('refresh_token');
        fetch('https://api.spotify.com/v1/me/tracks', {
            headers: {'Authorization': 'Bearer ' + accessToken }
        })
        .then(response => response.json())
        .then(data => setLibrary(data.items));
        // .then(data => console.log(data))

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken }
        })
        .then(response => response.json())
        .then(data => setPlaylists(data.items));
        // .then(data => console.log(data))
    }, []);

    const handleChange = () => {
        // dispatch({SET_SONGS, songs}));
    }

    return (
        <FormControl id="dropdownFilterParent">
            <InputLabel>Choose Songs from Playlists</InputLabel>
            <Select 
                className="dropdownFilterSelect"
                multiple value={songs} 
                onChange={handleChange}
                input={<Input />}
                renderValue={item => <div>{item.map(item => <Chip key={item} style={{height: 20}} label={item} />)}</div>} 
            >
                <MenuItem value={"Saved Songs"}>
                    <div style={{background: '#606060', border: '2px solid #606060'}}>
                        <Checkmark style={{fill: '#fff'}}/>
                    </div>
                    <ListItemText primary={"Saved Songs"} />
                </MenuItem>
                {playlists.map((playlist, index) => (
                    <MenuItem key={index} className="dropdownFilterMenuItem" value={playlist.description}>
                        <div className="dropdownFilterCheckmark" style={{background: '#606060', border: '2px solid #606060'}}>
                            <Checkmark style={{fill: '#fff'}}/>
                        </div>
                        <ListItemText primary={playlist.description} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        // <div></div>
    )
}

export default Home;
