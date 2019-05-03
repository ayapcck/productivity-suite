var React = require('react');
var ReactDOM = require('react-dom');

import LoginApp from './components/loginApp/loginApp.js';
import NavigationBar from './components/navigation/navigationBar.js';

import styles from './index.css';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			showLoginApp: false,
		}
		
		this.toggleLoginApp = this.toggleLoginApp.bind(this);
	}	
  
	// This handles whether the login app itself is visible or not
	toggleLoginApp() {
		this.setState(state => ({
			showLoginApp: !this.state.showLoginApp,
		}));
	}
	
	render() {
		var indexPage = <React.Fragment>
			{this.state.showLoginApp && <LoginApp onExit={this.toggleLoginApp}/>}
			<NavigationBar loginToggle={this.toggleLoginApp}/>
			<div className={styles.bodyContent}>
				<h1 style={{margin: 0}}>This is a title</h1>
			</div>
		</React.Fragment>
		return indexPage;
	}
}

var contentDiv = document.getElementById('content');
ReactDOM.render(<IndexPage />, contentDiv);
