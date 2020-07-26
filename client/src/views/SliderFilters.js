import React, { useEffect, useContext } from 'react';
import SliderFilter from '../components/SliderFilter';
import { SongsContext, SongFiltersContext } from './GeneratePlaylist';
import { css, StyleSheet } from 'aphrodite/no-important';

const SliderFilters = (props) => {

    const songs = useContext(SongsContext);
    const {songFilters, setSongFilters} = useContext(SongFiltersContext);

    useEffect(() => {
        if(songs.length && !songFilters.duration.length && !songFilters.energy.length && !songFilters.instrumentalness.length && !songFilters.loudness.length && !songFilters.popularity.length && !songFilters.speechiness.length && !songFilters.tempo.length && !songFilters.valence.length) {
            let filter = {...songFilters};
            if(!songFilters.danceability.length) {
                filter['danceability'] = [0, Math.max(...[...songs.map(song => song.danceability)])];
            }
            if(!songFilters.duration.length) {
                filter['duration'] = [0, Math.max(...[...songs.map(song => song.duration)])];
            }
            if(!songFilters.energy.length) {
                filter['energy'] = [0, Math.max(...[...songs.map(song => song.energy)])];
            }
            if(!songFilters.instrumentalness.length) {
                filter['instrumentalness'] = [0, Math.max(...[...songs.map(song => song.instrumentalness)])];
            }
            if(!songFilters.loudness.length) {
                filter['loudness'] = [Math.min(...[...songs.map(song => song.loudness)]), Math.max(...[...songs.map(song => song.loudness)])];
            }
            if(!songFilters.speechiness.length) {
                filter['speechiness'] = [0, Math.max(...[...songs.map(song => song.speechiness)])];
            }
            if(!songFilters.popularity.length) {
                filter['popularity'] = [0, Math.max(...[...songs.map(song => song.popularity)])];
            }
            if(!songFilters.tempo.length) {
                filter['tempo'] = [0, Math.max(...[...songs.map(song => song.tempo)])];
            }
            if(!songFilters.valence.length) {
                filter['valence'] = [0, Math.max(...[...songs.map(song => song.valence)])];
            }
            setSongFilters(filter);
        }
    }, [songs]);

    return (
        <div className={css(ss.wrapper)}>
            {
                props.categories.map(category => {
                    switch(category) {
                        case 'Danceability':
                            return <SliderFilter key={category} category={'danceability'} title={'Danceability'} />
                        case 'Energy':
                            return <SliderFilter key={category} category={'energy'} title={'Energy'} />
                        case 'Instrumentalness':
                            return <SliderFilter key={category} category={'instrumentalness'} title={'Instrumental'} />
                        case 'Duration':
                            return <SliderFilter key={category} category={'duration'} title={'Length'} />
                        case 'Loudness':
                            return <SliderFilter key={category} category={'loudness'} title={'Loudness (dB)'} />
                        case 'Popularity':
                            return <SliderFilter key={category} category={'popularity'} title={'Popularity'} />
                        case 'Speechiness':
                            return <SliderFilter key={category} category={'speechiness'} title={'Speech'} />
                        case 'Tempo':
                            return <SliderFilter key={category} category={'tempo'} title={'Tempo (bpm)'} />
                        case 'Valence':
                            return <SliderFilter key={category} category={'valence'} title={'Positivity'} />
                    }     
                })
            }
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        marginTop: 20
    }
});

export default SliderFilters;
