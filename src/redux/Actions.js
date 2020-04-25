import { UNSELECT_SONG, SORTBY_NAME, SORTBY_ARTIST, SORTBY_ALBUM, SORTBY_YEAR, SORTBY_DURATION, SORTBY_POPULARITY } from './Constants';

export const unselectSong = song => ({type: UNSELECT_SONG, song: song});
export const sortByName = () => ({type: SORTBY_NAME});
export const sortByArtist = () => ({type: SORTBY_ARTIST});
export const sortByAlbum = () => ({type: SORTBY_ALBUM});
export const sortByYear = () => ({type: SORTBY_YEAR});
export const sortByDuration = () => ({type: SORTBY_DURATION});
export const sortByPopularity = () => ({type: SORTBY_POPULARITY});