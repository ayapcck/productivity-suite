import React from 'react';
import styled, { css } from 'styled-components';

import { NavigationMenu } from './navigationMenu';

const StyledOpenMenu = styled.i`
	float: left;
	font-size: x-large;
	margin: auto 0;
	padding: 0 10px;

	&:hover {
		color: white;
		cursor: pointer;
	}
`;

const NavBarContainer = styled.div`
	background-color: ${(props) => props.theme.lightAccentColor};
	border-color: ${(props) => props.theme.accentColor};
	border-style: solid;
	border-width: 0 0 2px 0;
	display: flex;
	width: 100%;
`;

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showMenu: false
		}

		this.hideNavMenu = this.hideNavMenu.bind(this);
		this.loginLogoutClick = this.loginLogoutClick.bind(this);
		this.showNavMenu = this.showNavMenu.bind(this);
	}
	
	loginLogoutClick() {
		const { userLoggedIn, showLoginApp, setUsername, setUserLoggedIn } = this.props;

		if (userLoggedIn) {
			// TODO: hide new nav menu
			setUsername('');
			setUserLoggedIn(false);
			window.sessionStorage.removeItem('username');
		} else {
			showLoginApp();
		}
	}

	showNavMenu() {
		this.setState({ showMenu: true });
	}
	hideNavMenu() {
		this.setState({ showMenu: false });
	}
		
	render() {
		const { userLoggedIn } = this.props;
		const { showMenu } = this.state;

		const navigationBar = <React.Fragment>
			<NavigationMenu showMenu={showMenu} hideMenu={this.hideNavMenu} 
				loginLogoutClick={this.loginLogoutClick} userLoggedIn={userLoggedIn} />
			<NavBarContainer name='navMenu'>
				<OpenMenuIcon onClick={this.showNavMenu} />
			</NavBarContainer>
		</React.Fragment>
		return navigationBar;
	}
};

const OpenMenuIcon = ({ onClick }) => {
	const props = {
		className: 'fa fa-bars',
		onClick
	}
	return <StyledOpenMenu {...props} aria-hidden="true"></StyledOpenMenu>;
}
