var React = require('react');
var ReactDOM = require('react-dom');

import { connect, Provider } from 'react-redux';
import { getStore } from '../redux/store';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { setUsername, setUserLoggedIn } from '../redux/loginActions';

const history = createBrowserHistory();

import IndexPage from '../index';
import SchedulerPage from '../pages/schedulerPage';
import ShufflerPage from '../pages/shufflerPage';

const mapStateToProps = (state) => {
    const { username, userLoggedIn } = state.auth;
    return {
        username, 
        userLoggedIn
    };
};

const mapDispatchToProps = {
    setUsername,
    setUserLoggedIn
};

const IndexPageContainer = connect(mapStateToProps, mapDispatchToProps)(IndexPage);
const SchedulerPageContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulerPage);
const ShufflerPageContainer = connect(mapStateToProps, mapDispatchToProps)(ShufflerPage);

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
                    <Route exact path='/' component={IndexPageContainer} />
                    <Route exact path='/scheduler' component={SchedulerPageContainer} />
                    <Route exact path='/shuffler' component={ShufflerPageContainer} />
                </Switch>
            </Router>
        </Provider>;
        return routeHandler;
    }
}

let contentDiv = document.getElementById('content');
ReactDOM.render(<RouteHandler />, contentDiv);
