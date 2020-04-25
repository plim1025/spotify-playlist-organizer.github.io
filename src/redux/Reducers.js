import { UNSELECT_SONG, SORTBY_NAME, SORTBY_ARTIST, SORTBY_ALBUM, SORTBY_YEAR, SORTBY_DURATION, SORTBY_POPULARITY } from './Constants';
import { combineReducers } from 'redux';

const songList = [
    {
        "name": "Not Afraid",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "duration": 350,
        "popularity": 50
    },
    {
        "name": "Love the Way You Lie",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "duration": 350,
        "popularity": 35
    },
    {
        "name": "Space Bound",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "duration": 350,
        "popularity": 103
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
        default:
            return state;
    }
}

export default combineReducers({
    songs
});