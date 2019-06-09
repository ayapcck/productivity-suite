var React = require('react');
var ReactDOM = require('react-dom');

import LoginApp from './components/loginApp/loginApp.js';
import NavigationBar from './components/navigation/navigationBar.js';
import SchedulerApp from './components/scheduler/schedulerApp.js';

import styles from './index.css';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		
		var userLoggedIn, username;
		if  (window.sessionStorage.getItem("username")) {
			userLoggedIn = true;
			username = window.sessionStorage.getItem("username");
		} else {
			userLoggedIn = false;
			username = "";
		}
		
		this.state = {
			showLoginApp: false,
			userLoggedIn: userLoggedIn,
			username: username,
		}
		
		this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.toggleLoginApp = this.toggleLoginApp.bind(this);
	}
  
	// This handles whether the login app itself is visible or not
	toggleLoginApp() {
		this.setState(state => ({
			showLoginApp: !this.state.showLoginApp,
		}));
	}
	
	handleLoginSuccess(user) {
		window.sessionStorage.setItem("username", user);
		this.setState({userLoggedIn: true, username: user});
		this.toggleLoginApp();
	}
	
	isLoggedIn() {
		this.state.loggedInUser ? true : false;
	}
	
	onLogout() {
		window.sessionStorage.removeItem("username");
		this.setState({userLoggedIn: false, username: ""});
	}
	
	render() {
		var indexPage = <React.Fragment>
		{this.state.showLoginApp && <LoginApp onExit={this.toggleLoginApp} onLoginSuccess={this.handleLoginSuccess} showLoginApp={this.state.showLoginApp} />}
			<NavigationBar username={this.state.username} loginToggle={this.toggleLoginApp} 
				userLoggedIn={this.state.userLoggedIn} onLogout={this.onLogout} />
			<SchedulerApp username={this.state.username}/>
		</React.Fragment>
		return indexPage;
	}
}

var contentDiv = document.getElementById('content');
ReactDOM.render(<IndexPage />, contentDiv);
