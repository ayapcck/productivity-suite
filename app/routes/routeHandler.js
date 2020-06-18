import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { connect, Provider } from 'react-redux';
import { getStore } from '../redux/store';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { setUsername, setUserLoggedIn } from '../redux/loginActions';

const history = createBrowserHistory();

import IndexPage from '../index';

import { routes } from './routeHelper';

const mapStateToProps = (state) => {
    const { username, userLoggedIn } = state.auth;
    const serverAddress = "http://localhost:5000";
    return {
        serverAddress,
        username, 
        userLoggedIn
    };
};

const mapDispatchToProps = {
    setUsername,
    setUserLoggedIn
};

const makeRoutes = () => {
    return _.map(routes, (val, key) => {
        const page = key === 'index' ? IndexPage : val.page;
        const container = connect(mapStateToProps, mapDispatchToProps)(page);
        return <Route exact path={val.address} component={container} />;
    })
}

class RouteHandler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            store: getStore(),
        }
    }

    render() {
        const { store } = this.state;
        const routeHandler = <Provider store={store}>
            <Router history={history}>
                <Switch>
                    {makeRoutes()}
                </Switch>
            </Router>
        </Provider>;
        return routeHandler;
    }
}

let contentDiv = document.getElementById('content');
ReactDOM.render(<RouteHandler />, contentDiv);
