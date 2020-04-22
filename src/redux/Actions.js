import { UNSELECT_SONG } from './Constants';

export const unselectSong = song => ({type: UNSELECT_SONG, song: song});