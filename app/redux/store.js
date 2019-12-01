import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './index';

let user = window.sessionStorage.getItem('username');
let userLoggedIn = !!user;
user = user === null ? '' : user;

const initialStore = {
    auth: {
        username: user,
        userLoggedIn: userLoggedIn
    }
};

export const getStore = () => {
    return createStore(reducer, initialStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}