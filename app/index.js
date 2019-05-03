var React = require('react');
var ReactDOM = require('react-dom');

import LoginApp from './components/loginApp/loginApp.js';
import NavigationBar from './components/navigation/navigationBar.js';

import styles from './index.css';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		
		var userLoggedIn;
		if  (window.sessionStorage.getItem("username")) {
			userLoggedIn = true;
		} else {
			userLoggedIn = false;
		}
		
		this.state = {
			showLoginApp: false,
			userLoggedIn: userLoggedIn,
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
		this.setState({userLoggedIn: true});
		this.toggleLoginApp();
	}
	
	isLoggedIn() {
		this.state.loggedInUser ? true : false;
	}
	
	onLogout() {
		window.sessionStorage.removeItem("username");
		this.setState({userLoggedIn: false});
	}
	
	render() {
		var bannerText = this.state.userLoggedIn ? "Welcome, " + window.sessionStorage.getItem("username") : "";
		var indexPage = <React.Fragment>
			{this.state.showLoginApp && <LoginApp onExit={this.toggleLoginApp} onLoginSuccess={this.handleLoginSuccess} />}
			<NavigationBar bannerText={bannerText} loginToggle={this.toggleLoginApp} 
				userLoggedIn={this.state.userLoggedIn} onLogout={this.onLogout} />
			<div className={styles.bodyContent}>
				<h1 style={{margin: 0}}>This is a title</h1>
			</div>
		</React.Fragment>
		return indexPage;
	}
}

var contentDiv = document.getElementById('content');
ReactDOM.render(<IndexPage />, contentDiv);
