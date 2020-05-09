import React from 'react';
import { useSelector } from 'react-redux';
import Song from '../components/Song';
import SortBy from '../components/SortBy';

const SongView = (props) => {

    const songs = useSelector(state => state.songs);

    const songNotFiltered = filterObj => {
        for(var o in filterObj)
            if(filterObj[o])
                return false;
        return true;
    }

    return (
        <>
            <SortBy />
            {
                songs.length ? songs.map(song => songNotFiltered(song.filteredOutBy) ? 
                    (!song.selected ? 
                        <Song key={song.name} details={song}/> 
                        : <Song key={song.name} background={true} iconFill={true} details={song}/>
                    ) 
                    : null
                )
                : null
            }
        </>
    )
}

export default SongView;