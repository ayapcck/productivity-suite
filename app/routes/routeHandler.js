var React = require('react');
var ReactDOM = require('react-dom');

import { connect, Provider } from 'react-redux';
import { getStore } from '../redux/store';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { setUsername, setUserLoggedIn } from '../redux/loginActions';

const history = createBrowserHistory();

import IndexPage from '../index';
import NotesPage from '../pages/notesPage';
import SchedulerPage from '../pages/schedulerPage';

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

const IndexPageContainer = connect(mapStateToProps, mapDispatchToProps)(IndexPage);
const NotesPageContainer = connect(mapStateToProps, mapDispatchToProps)(NotesPage);
const SchedulerPageContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulerPage);

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
                    <Route exact path='/notes' component={NotesPageContainer} />
                    <Route exact path='/scheduler' component={SchedulerPageContainer} />
                </Switch>
            </Router>
        </Provider>;
        return routeHandler;
    }
}

let contentDiv = document.getElementById('content');
ReactDOM.render(<RouteHandler />, contentDiv);
