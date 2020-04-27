import { UNSELECT_SONG, SORTBY_NAME, SORTBY_ARTIST, SORTBY_ALBUM, SORTBY_YEAR, SORTBY_DURATION, SORTBY_POPULARITY, SORTBY_BPM, SORTBY_LOUDNESS,
FILTERBY_BPM } from './Constants';
import { combineReducers } from 'redux';

export const songList = [
    {
        "name": "Not Afraid",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 50,
        "bpm": 3005,
        "loudness": 150,
        "filteredOutBy": {
            "name": false,
            "artist": false,
            "album": false,
            "year": false,
            "duration": false,
            "popularity": false,
            "bpm": false,
            "loudness": false
        }
    },
    {
        "name": "Love the Way You Lie",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 35,
        "bpm": 4000,
        "loudness": 140,
        "filteredOutBy": {
            "name": false,
            "artist": false,
            "album": false,
            "year": false,
            "duration": false,
            "popularity": false,
            "bpm": false,
            "loudness": false
        }
    },
    {
        "name": "Space Bound",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 103,
        "bpm": 2005,
        "loudness": 170,
        "filteredOutBy": {
            "name": false,
            "artist": false,
            "album": false,
            "year": false,
            "duration": false,
            "popularity": false,
            "bpm": false,
            "loudness": false
        }
    }
]

const songs = (state = songList, action) => {
    switch(action.type) {
        case UNSELECT_SONG:
            // use filter function
            return state;
        case SORTBY_NAME:
            return [...state.sort((a, b) => (a.name > b.name) ? 1 : -1)];
        case SORTBY_ARTIST:
            return [...state.sort((a, b) => (a.artist > b.artist) ? 1 : -1)];
        case SORTBY_ALBUM:
            return [...state.sort((a, b) => (a.album > b.album) ? 1 : -1)];
        case SORTBY_YEAR:
            return [...state.sort((a, b) => (a.year > b.year) ? 1 : -1)];
        case SORTBY_DURATION:
            return [...state.sort((a, b) => (a.duration > b.duration) ? 1 : -1)];
        case SORTBY_POPULARITY:
            return [...state.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1)];
        case SORTBY_BPM:
            return [...state.sort((a, b) => (a.bpm > b.bpm) ? 1 : -1)];
        case SORTBY_LOUDNESS:
            return [...state.sort((a, b) => (a.loudness > b.loudness) ? 1 : -1)];
        case FILTERBY_BPM:
            return [
                ...state.map(song => {
                    return {...song, 
                        filteredOutBy: {
                            ...song.filteredOutBy,
                            bpm: ((song.bpm < action.range[0]) || (song.bpm > action.range[1]))
                        }
                    }
                })
            ];
        default:
            return state;
    }
}

export default combineReducers({
    songs
});