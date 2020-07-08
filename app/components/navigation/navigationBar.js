import React from 'react';
import styled, { css } from 'styled-components';

import { NavigationMenu } from './navigationMenu';

import { device } from '../../config/device';

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
	display: flex;
	height: 100%;
	transition: 0.5s;

	@media ${device.laptopL} {
		background-image: linear-gradient(to right, ${ ({ theme }) => 
			`${theme.navBarColor}, ${theme.navBarColor}, ${theme.backgroundColor}` });
		width: ${ ({ hoverMenu }) => hoverMenu ? `100%` : `30%`};
	}

	@media ${device.mobileL} {
		background-color: ${(props) => props.theme.navBarColor};
		width: 100%;
	}
`;

const NavBarWrapper = styled.div`
	background-color: ${(props) => props.theme.backgroundColor};
	width: 100%;
`;

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hoverMenu: false,
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
		const { hoverMenu, showMenu } = this.state;

		const navigationBar = <NavBarWrapper>
			<NavigationMenu showMenu={showMenu} hideMenu={this.hideNavMenu}
				loginLogoutClick={this.loginLogoutClick} userLoggedIn={userLoggedIn} />
			<NavBarContainer hoverMenu={hoverMenu} name='navMenu'>
				<OpenMenuIcon onClick={this.showNavMenu} 
					onMouseOver={() => this.setState({ hoverMenu: true })} 
					onMouseOut={() => this.setState({ hoverMenu: false })} />
			</NavBarContainer>
		</NavBarWrapper>
		return navigationBar;
	}
};

const OpenMenuIcon = (mouseHandlers) => {
	return <StyledOpenMenu className='fa fa-bars' {...mouseHandlers} aria-hidden="true"></StyledOpenMenu>;
}
