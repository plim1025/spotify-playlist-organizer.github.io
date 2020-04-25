import React from 'react';
import { useSelector } from 'react-redux';
import Song from '../components/Song';

const PlaylistView = (props) => {

    const songs = useSelector(state => state.songs);

    return (
        <div>
            {
                songs ? songs.map(song => <Song key={song.name} details={song}/>)
                : null
            }
        </div>
    )
}

export default PlaylistView;