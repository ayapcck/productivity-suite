export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USERNAME = 'SET_USERNAME';

export const setUserLoggedIn = userLoggedIn => ({
    type: SET_USER_LOGGED_IN,
    value: userLoggedIn
});

export const setUsername = username => ({
    type: SET_USERNAME,
    value: username
});