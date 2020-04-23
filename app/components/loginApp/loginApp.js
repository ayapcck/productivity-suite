var React = require('react');
var classnames = require('classnames');

import CenterPanel from '../centerPanel/centerPanel';
import { clickedInsideContainer } from '../utilities/DOMHelper.js';
import Icon from '../icons/icon';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

import styles from './loginApp.less';

export default class LoginApp extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		showLoginForm: true
	}
	
	//this.closeOnEsc = this.closeOnEsc.bind(this);
	this.handleAfterLogin = this.handleAfterLogin.bind(this);
	this.handleCloseForm = this.handleCloseForm.bind(this);
	this.handleCloseFromClickOutside = this.handleCloseFromClickOutside.bind(this);
	this.toggleLoginForm = this.toggleLoginForm.bind(this);
  }
  
  // This alternates between showing login form and signup form
  toggleLoginForm() {
	this.setState(state => ({
		showLoginForm: !this.state.showLoginForm,
	}));
  }
  
  handleCloseForm() {
	this.setState({showLoginForm: true});
	this.props.hideLoginApp();
  }
  
  handleCloseFromClickOutside(e) {
	const loginContainer = document.getElementById("LoginApp");
	!clickedInsideContainer(e, loginContainer) && this.handleCloseForm();
  }

  handleAfterLogin(username) {
	const { setUsername, setUserLoggedIn } = this.props;
	setUsername(username);
	setUserLoggedIn(true);
	window.sessionStorage.setItem("username", username);
	this.props.hideLoginApp();
  }
  
  render() {
	const { serverAddress } = this.props;
	
	var loginApp = <React.Fragment>
		<Icon iconClass="far fa-times-circle" onClick={this.handleCloseForm} />
		{this.state.showLoginForm ? 
		<LoginForm handleLoginSuccess={this.handleAfterLogin} serverAddress={serverAddress} /> : 
		<SignupForm handleExit={this.handleCloseForm} serverAddress={serverAddress} />}
		{this.state.showLoginForm ? 
			<RedirectLink text="Need an account?" onClick={this.toggleLoginForm} /> : 
			<RedirectLink text="Already have an account?" onClick={this.toggleLoginForm} />}
	</React.Fragment>;
	
	return <CenterPanel content={loginApp} handleClose={this.handleCloseForm} id="LoginApp" />;
  }
};

const RedirectLink = ({text, onClick}) => (
	<div className={styles.textContainer}>
		<h4 className={styles.formText}>{text}</h4>
		<h4 className={classnames(styles.redirectLink, styles.formText)} onClick={onClick}>Click Here</h4>
	</div>
);