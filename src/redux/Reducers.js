import { UNSELECT_SONG, SORT_SONGS, FILTER_RANGE, FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from './Constants';
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
        "name": "Redbone",
        "artist": "Childish Gambino",
        "album": "Awaken My Love",
        "year": 2018,
        "duration": 200,
        "popularity": 3,
        "bpm": 1005,
        "loudness": 170,
        "filteredOutBy": {
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
        case SORT_SONGS:
            return [...state.sort((a, b) => (a[action.category] > b[action.category]) ? 1 : -1)];
        case FILTERALL_OUT:
            return [...state.map(song => {
                return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: true }}
            })];
        case FILTERALL_IN:
            return [...state.map(song => {
                return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: false }};
            })];
        case FILTER_ADD:
            return [...state.map(song => {
                if(song.artist == action.addedFilter)   
                    return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: false}};
                else
                    return song
            })];
        case FILTER_REMOVE:
            return [...state.map(song => {
                if(song.artist == action.removedFilter)   
                    return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: true}};
                else
                    return song
            })];
        case FILTER_RANGE:
            return [
                ...state.map(song => {
                    return {...song, 
                        filteredOutBy: {
                            ...song.filteredOutBy,
                            [action.category]: ((song[action.category] < action.range[0]) || (song[action.category] > action.range[1]))
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