import LoginApp from './components/loginApp/loginApp.js';

var React = require('react');
var ReactDOM = require('react-dom');

import styles from './index.css';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			showLoginApp: true,
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
			<h1 style={{margin: 0}}>This is a title</h1>
			<ToggleLink text="Want to login?" onClick={this.toggleLoginApp} />
		</React.Fragment>
		return indexPage;
	}
}

const ToggleLink = ({text, onClick}) => (
	<div>
		<h4>{text}</h4>
		<h4 onClick={onClick}>Click Here</h4>
	</div>
);

var containerDiv = document.getElementById('everything');
ReactDOM.render(<IndexPage />, containerDiv);
