import { UNSELECT_SONG } from './Constants';
import { combineReducers } from 'redux';

const songList = [
    {
        "title": "Love the Way You Lie",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "time": 350,
        "popularity": 35
    },
    {
        "title": "Not Afraid",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "time": 350,
        "popularity": 50
    },
    {
        "title": "Space Bound",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "genre": "hip hop/rap",
        "time": 350,
        "popularity": 103
    }
]

const songs = (state = songList, action) => {
    switch(action.type) {
        case UNSELECT_SONG:
            // use filter function
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    songs
});