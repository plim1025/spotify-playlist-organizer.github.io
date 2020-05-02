import React from 'react';
import { useSelector } from 'react-redux';
import Song from '../components/Song';

const PlaylistView = (props) => {

    const songs = useSelector(state => state.songs);

    const songNotFiltered = filterObj => {
        console.log(filterObj)
        for(var o in filterObj)
            if(filterObj[o])
                return false;
        return true;
    }

    return (
        <div>
            {
                songs.length ? songs.map(song => songNotFiltered(song.filteredOutBy) 
                    ? <Song key={song.name} details={song}/> : null)
                    : null
            }
        </div>
    )
}

export default PlaylistView;