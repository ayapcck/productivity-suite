var React = require('react');
var classnames = require('classnames');

import CenterPanel from '../centerPanel/centerPanel.js';
import Icon from '../icons/icon.js';
import LoginForm from '../forms/loginForm.js';
import SignupForm from '../forms/signupForm.js';

import styles from './loginApp.css';
import centeredBoxStyles from '../centerPanel/centerPanel.css';

export default class LoginApp extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		showLoginForm: true
	}
	
	//this.closeOnEsc = this.closeOnEsc.bind(this);
	this.handleCloseForm = this.handleCloseForm.bind(this);
	this.handleCloseFromClickOutside = this.handleCloseFromClickOutside.bind(this);
	this.toggleLoginForm = this.toggleLoginForm.bind(this);
  }
  
  /* componentDidMount() {
	document.addEventListener("keydown", this.closeOnEsc, false);
  }
  
  componentWillUnmount() {
	document.removeEventListener("keydown", this.closeOnEsc, false);
  }
  
  closeOnEsc(e) {
	e.keyCode === 27 && this.props.onExit();
  } */
  
  // This alternates between showing login form and signup form
  toggleLoginForm() {
	this.setState(state => ({
		showLoginForm: !this.state.showLoginForm,
	}));
  }
  
  handleCloseForm() {
	this.setState({showLoginForm: true});
	this.props.onExit();
  }
  
  handleCloseFromClickOutside(e) {
	let loginContainer = document.getElementsByClassName(centeredBoxStyles.centeredBox);
	let containerRect = loginContainer[0].getBoundingClientRect();
	let clickX = e.clientX;
	let clickY = e.clientY;
	let clickInsideContainer = clickX > containerRect.left && clickX < containerRect.right &&
								clickY > containerRect.top && clickY < containerRect.bottom;
	clickX !== 0 && clickY !== 0 && !clickInsideContainer && this.handleCloseForm();
  }
  
  render() {
	var visibility = this.props.showLoginApp ? styles.visible : styles.hidden;
	var loginApp = <React.Fragment>
	<div className={classnames(styles.opaqueBackground, visibility)}></div>
	<div className={classnames(styles.container, visibility)} onClick={this.handleCloseFromClickOutside}>
		<CenterPanel 
			content={ 
				<React.Fragment>
					<Icon iconClass="far fa-times-circle" onClick={this.handleCloseForm} />
					{this.state.showLoginForm ? 
						<LoginForm onLoginSuccess={this.props.onLoginSuccess} handleExit={this.handleCloseForm} /> : 
						<SignupForm handleExit={this.handleCloseForm} />}
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