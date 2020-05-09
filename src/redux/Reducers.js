import { TOGGLE_SELECT, TOGGLE_SELECT_ALL, SORT_SONGS, SORT_SONGS_REVERSE, FILTER_RANGE, FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from './Constants';
import { combineReducers } from 'redux';

export const songList = [
    {
        "id": "1",
        "name": "Not Afraid",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 50,
        "bpm": 3005,
        "loudness": 150,
        "selected": false,
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
        "id": "2",
        "name": "Love the Way You Lie",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 35,
        "bpm": 4000,
        "loudness": 140,
        "selected": false,
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
        "id": "3",
        "name": "Space Bound",
        "artist": "Eminem",
        "album": "Recovery",
        "year": 2010,
        "duration": 350,
        "popularity": 103,
        "bpm": 2005,
        "loudness": 170,
        "selected": false,
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
        "id": "4",
        "name": "Redbone",
        "artist": "Childish Gambino",
        "album": "Awaken My Love",
        "year": 2018,
        "duration": 200,
        "popularity": 3,
        "bpm": 1005,
        "loudness": 170,
        "selected": false,
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
        case TOGGLE_SELECT:
            return [...state.map(song => {
                if(song.id == action.id)
                    return {...song, selected: !song.selected};
                else
                    return song;
            })];
        case TOGGLE_SELECT_ALL:
            return [...state.map(song => {
                return {...song, selected: action.mode}
            })];
        case SORT_SONGS:
            return [...state.sort((a, b) => (a[action.category] > b[action.category]) ? 1 : -1)];
        case SORT_SONGS_REVERSE:
            return [...state.sort((a, b) => (a[action.category] < b[action.category]) ? 1 : -1)];
        case FILTERALL_OUT:
            return [...state.map(song => {
                return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: true }
            }})];
        case FILTERALL_IN:
            return [...state.map(song => {
                return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: false }
            }})];
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