import { combineReducers } from 'redux';
import { authReducers } from './authReducer';

const createReducer = (reducers, initialState = {}) => (state = initialState, action) => {
    const { type, value } = action;
    const reducer = reducers[type];
    if (reducer) {
        return reducer(state, value);
    }
    return state;
}

export default combineReducers({
    auth: createReducer(authReducers)
});