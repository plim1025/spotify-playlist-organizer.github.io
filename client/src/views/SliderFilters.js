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
                filter['danceability'] = [0, 1];
            }
            if(!songFilters.duration.length) {
                filter['duration'] = [0, Math.max(...[...songs.map(song => song.duration)])];
            }
            if(!songFilters.energy.length) {
                filter['energy'] = [0, 1];
            }
            if(!songFilters.instrumentalness.length) {
                filter['instrumentalness'] = [0, 1];
            }
            if(!songFilters.loudness.length) {
                filter['loudness'] = [Math.min(...[...songs.map(song => song.loudness)]), Math.max(...[...songs.map(song => song.loudness)])];
            }
            if(!songFilters.speechiness.length) {
                filter['speechiness'] = [0, 1];
            }
            if(!songFilters.popularity.length) {
                filter['popularity'] = [0, Math.max(...[...songs.map(song => song.popularity)])];
            }
            if(!songFilters.tempo.length) {
                filter['tempo'] = [0, Math.max(...[...songs.map(song => song.tempo)])];
            }
            if(!songFilters.valence.length) {
                filter['valence'] = [0, 1];
            }
            setSongFilters(filter);
        }
    }, [songs]);

    return (
        <div className={css(ss.wrapper)}>
            <SliderFilter category={'danceability'} title={'Danceability'} />
            <SliderFilter category={'energy'} title={'Energy'} />
            <SliderFilter category={'instrumentalness'} title={'Instrumental'} />
            <SliderFilter category={'duration'} title={'Length'} />
            <SliderFilter category={'loudness'} title={'Loudness (dB)'} />
            <SliderFilter category={'popularity'} title={'Popularity'} />
            <SliderFilter category={'speechiness'} title={'Speech'} />
            <SliderFilter category={'tempo'} title={'Tempo (bpm)'} />
            <SliderFilter category={'valence'} title={'Positivity'} />
        </div>
    )
}

const ss = StyleSheet.create({
    wrapper: {
        marginTop: 20
    }
});

export default SliderFilters;
