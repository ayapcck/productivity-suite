var React = require('react');
var ReactDOM = require('react-dom');

import LoginApp from './components/loginApp/loginApp.js';
import NavigationBar from './components/navigation/navigationBar.js';
import SchedulerApp from './components/scheduler/schedulerApp.js';

import styles from './index.css';

class SchedulerPage extends React.Component {

    render() {
        var schedulerPage = <React.Fragment>
        {this.state.showLoginApp && <LoginApp onExit={this.toggleLoginApp} onLoginSuccess={this.handleLoginSuccess} showLoginApp={this.state.showLoginApp} />}
            <NavigationBar username={this.state.username} loginToggle={this.toggleLoginApp} 
                userLoggedIn={this.state.userLoggedIn} onLogout={this.onLogout} />
            <SchedulerApp username={this.state.username}/>
        </React.Fragment>
        return schedulerPage;
    }
}

var contentDiv = document.getElementById('content');
ReactDOM.render(<SchedulerPage />, contentDiv);
