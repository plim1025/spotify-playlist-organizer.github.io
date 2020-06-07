import { SET_SONGS, TOGGLE_SELECT, TOGGLE_SELECT_ALL, SORT_SONGS, SORT_SONGS_REVERSE, FILTER_RANGE, FILTERALL_OUT, FILTERALL_IN, FILTER_ADD, FILTER_REMOVE } from './Constants';
import { combineReducers } from 'redux';

const songs = (state = [], action) => {
    switch(action.type) {
        case SET_SONGS:
            console.log(action.songs)
            return action.songs;
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
                if(song[action.category] == action.addedFilter)   
                    return {...song, filteredOutBy: {...song.filteredOutBy, [action.category]: false}};
                else
                    return song
            })];
        case FILTER_REMOVE:
            return [...state.map(song => {
                if(song[action.category] == action.removedFilter)   
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