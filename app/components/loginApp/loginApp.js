var React = require('react');
var classnames = require('classnames');

import CenterPanel from '../centerPanel/centerPanel.js';
import Icon from '../icons/icon.js';
import LoginForm from '../forms/loginForm.js';
import SignupForm from '../forms/signupForm.js';

import styles from './loginApp.css';

export default class LoginApp extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		showLoginApp: true,
		showLoginForm: true,
	}
	
	this.toggleLoginForm = this.toggleLoginForm.bind(this);
  }
  
  // This alternates between showing login form and signup form
  toggleLoginForm() {
	this.setState(state => ({
		showLoginForm: !this.state.showLoginForm,
	}));
  }
  
  render() {
	var visbility = this.state.showLoginApp ? styles.visible : styles.hidden;
	var loginApp = <React.Fragment>
	<div className={classnames(styles.opaqueBackground, visbility)}></div>
	<div className={classnames(styles.container, visbility)}>
		<CenterPanel 
			content={ 
				<React.Fragment>
					<Icon iconClass="far fa-times-circle" onClick={this.props.onExit} />
					{this.state.showLoginForm ? <LoginForm onLoginSuccess={this.props.onLoginSuccess} /> : <SignupForm />}
					{this.state.showLoginForm ? 
						<RedirectLink text="Need an account?" onClick={this.toggleLoginForm} /> : 
						<RedirectLink text="Already have an account?" onClick={this.toggleLoginForm} />}
				</React.Fragment>
			}
		/>
	</div>
	</React.Fragment>
    return loginApp;
  }
};

const RedirectLink = ({text, onClick}) => (
	<div className={styles.textContainer}>
		<h4 className={styles.formText}>{text}</h4>
		<h4 className={classnames(styles.redirectLink, styles.formText)} onClick={onClick}>Click Here</h4>
	</div>
);