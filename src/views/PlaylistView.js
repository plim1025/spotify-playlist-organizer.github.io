import React from 'react';
import { useSelector } from 'react-redux';
import Song from '../components/Song';

const PlaylistView = (props) => {

    const songs = useSelector(state => state.songs);

    return (
        <div>
            {
                songs.length ? songs.map(song => song.selected ? <Song key={song.name} details={song}/> : null)
                : null
            }
        </div>
    )
}

export default PlaylistView;