import React from 'react';
import styled from 'styled-components';

import { CloseIcon } from '../icons/closeIcon';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

import { device } from '../../config/device';

const ContentWrapper = styled.div`
	display: flex;
	height: 100%;
	position: absolute;
	width: 100%;
`;

const LoginAppContainer = styled.div`
	background-color: ${(props) => props.theme.backgroundColor};
	border-radius: 25px;
	color: ${(props) => props.theme.textColor};
	display: flex;
	flex-direction: column;
	height: 75%;
	margin: auto;
	width: 35%;
	z-index: 1;

	@media ${device.mobileL} {
		height: 80%;
		width: 80%
	}
`;

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

const ScreenOverlay = styled.div`
	background-color: ${(props) => props.theme.opaqueOverlay};
	height: 100%;
	position: absolute;
	width : 100%;
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
	
	return <ContentWrapper>
		<ScreenOverlay onClick={this.handleCloseForm} />
		<LoginAppContainer>
			<CloseIcon onClick={this.handleCloseForm} />
			{this.state.showLoginForm 
				? <LoginForm handleLoginSuccess={this.handleAfterLogin} serverAddress={serverAddress} />
				: <SignupForm handleExit={this.handleCloseForm} serverAddress={serverAddress} /> }
			{this.state.showLoginForm
				? <RedirectLink text="Need an account?" onClick={this.toggleLoginForm} />
				: <RedirectLink text="Already have an account?" onClick={this.toggleLoginForm} /> }
		</LoginAppContainer>
	</ContentWrapper>;
  }
};

const RedirectLink = ({text, onClick}) => (
	<RedirectContainer>
		<RedirectText>{text}</RedirectText>
		<RedirectLinkText onClick={onClick}>Click Here</RedirectLinkText>
	</RedirectContainer>
);
