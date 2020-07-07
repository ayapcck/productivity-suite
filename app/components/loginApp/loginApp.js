import React from 'react';
import styled from 'styled-components';

import CenterPanel from '../centerPanel/centerPanel';
import { CloseIcon } from '../icons/closeIcon';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

const RedirectText = styled.h4`
	margin: 0;
	text-align: center;
`;

const RedirectLinkText = styled(RedirectText)`
	cursor: pointer;
`;

const RedirectContainer = styled.div`
	margin: auto 0 5% 0;
`;

export default class LoginApp extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		showLoginForm: true
	}
	
	this.handleAfterLogin = this.handleAfterLogin.bind(this);
	this.handleCloseForm = this.handleCloseForm.bind(this);
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
		<CloseIcon onClick={this.handleCloseForm} />
		{this.state.showLoginForm 
			? <LoginForm handleLoginSuccess={this.handleAfterLogin} serverAddress={serverAddress} />
			: <SignupForm handleExit={this.handleCloseForm} serverAddress={serverAddress} /> }
		{this.state.showLoginForm
			? <RedirectLink text="Need an account?" onClick={this.toggleLoginForm} />
			: <RedirectLink text="Already have an account?" onClick={this.toggleLoginForm} /> }
	</React.Fragment>;
	
	return <CenterPanel content={loginApp} handleClose={this.handleCloseForm} id="LoginApp" />;
  }
};

const RedirectLink = ({text, onClick}) => (
	<RedirectContainer>
		<RedirectText>{text}</RedirectText>
		<RedirectLinkText onClick={onClick}>Click Here</RedirectLinkText>
	</RedirectContainer>
);
