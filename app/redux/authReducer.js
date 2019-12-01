import { SET_USER_LOGGED_IN, SET_USERNAME } from './loginActions';

const setUserLoggedIn = (state, userLoggedIn) => {
    let retVal = Object.assign({}, state, {userLoggedIn: userLoggedIn});
    return retVal;
};

const setUsername = (state, username) => {
    let retVal = Object.assign({}, state, {username: username});
    return retVal;
};

export const authReducers = {
    [SET_USER_LOGGED_IN]: setUserLoggedIn,
    [SET_USERNAME]: setUsername
};