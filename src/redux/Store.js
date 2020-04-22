import { createStore } from 'redux';
import rootReducer from './Reducers';

export const Store = (initialState) => {
    return createStore(
        rootReducer,
        initialState
    );
}