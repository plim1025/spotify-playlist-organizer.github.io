import { UNSELECT_SONG, SORTBY_TITLE } from './Constants';

export const unselectSong = song => ({type: UNSELECT_SONG, song: song});
export const sortByTitle = () => ({type: SORTBY_TITLE});