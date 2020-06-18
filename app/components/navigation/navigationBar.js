import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { capitalizeUsername } from '../utilities/stringUtils';

const MenuText = styled.span`
	padding: 0 5px 0 0;
`;

const MenuIcon = styled.i`
	float: none;
	padding: 0 0 0 5px;
`;

const MenuElement = styled.div`
	color: ${(props) => props.theme.darkTextColor};
	cursor: pointer;
	background-color: ${(props) => props.theme.navBarColor};
	border-color: ${(props) => props.theme.navBarAccentColor};
	border-style: solid;
	border-width: 0 0 2px 2px;
	box-sizing: border-box;
	float: right;
	height: 100%;
	padding: 8px 0;
	text-align: center;
	user-select: none;
	width: 8%;

	&:hover ${MenuText}, &:hover ${MenuIcon} {
		color: white;
	}

	&:hover ${MenuText} {
		text-decoration: underline;
	}
`;

const HoverElement = css`
	grid-row: 2;
	padding: 0;
	position: absolute;	
	width: 8%;
	z-index: 10;
`;

const AccountOptions = styled.div`
	${HoverElement}
	right: 0;

	${MenuElement} {
		clear: right;
		width: 100%;
	}
`;

const AppMenuElements = styled.div`
	${HoverElement}
	right: 8%;

	${MenuElement} {
		border-width: 0 2px 2px 2px;
		width: 100%;
	}
`;

const NavBarContainer = styled.div`
	width: 100%;
	background-color: ${(props) => props.theme.navBarColor};
	overflow: hidden;
`;

const Spacer = styled.div`
	border-color: ${(props) => props.theme.navBarAccentColor};
	border-style: solid;
	border-width: 0 0 2px 0;
	box-sizing: border-box;
	float: right;
	height: 100%;
	width: 76%;
`;

const appMenuHeaderId = ev => ev.currentTarget.id === 'appMenuHeader';
const appMenuElementsId = ev => {
	return ev.relatedTarget 
		? ev.relatedTarget.id === 'appMenuElements' || ev.currentTarget.id === 'appMenuElements'
		: false;
};
const accountMenuHeaderId = ev => ev.currentTarget.id === 'accountMenuHeader';
const acccountMenuElementsId = ev => {
	return ev.relatedTarget 
		? ev.relatedTarget.id === 'acccountMenuElements' || ev.currentTarget.id === 'acccountMenuElements'
		: false;
}

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			accountHovered: false,
			appsHovered: false
		}
		
		this.hideHoverElementsOnMove = this.hideHoverElementsOnMove.bind(this);
		this.showHoverElementsOnMove = this.showHoverElementsOnMove.bind(this);
		this.loginLogoutClick = this.loginLogoutClick.bind(this);
	}
	
	showHoverElementsOnMove(ev) {
		if (appMenuElementsId(ev) || appMenuHeaderId(ev)) {
			this.setState({ appsHovered: true })
		} 
		if (acccountMenuElementsId(ev) || accountMenuHeaderId(ev)) {
			this.setState({ accountHovered: true });
		}
	}
	
	hideHoverElementsOnMove(ev) {
		if (appMenuElementsId(ev) || appMenuHeaderId(ev)) {
			this.setState({ appsHovered: false })
		} 
		if (acccountMenuElementsId(ev) || accountMenuHeaderId(ev)) {
			this.setState({ accountHovered: false });
		}
	}

	forceHideHoverElements() {
		this.setState({ accountHovered: false, appsHovered: false});
	}
	
	loginLogoutClick() {
		const { userLoggedIn, showLoginApp, setUsername, setUserLoggedIn } = this.props;

		if (userLoggedIn) {
			this.forceHideHoverElements();
			setUsername('');
			setUserLoggedIn(false);
			window.sessionStorage.removeItem('username');
		} else {
			showLoginApp();
		}
	}
		
	render() {
		const handleHoverSettings = {
			onMouseMove: this.showHoverElementsOnMove,
			onMouseEnter: this.showHoverElementsOnMove,
			onMouseLeave: this.hideHoverElementsOnMove
		}
		
		const accountOptions = <AccountOptions id='acccountMenuElements' {...handleHoverSettings}>
			<TextMenuElement contentText={this.props.userLoggedIn ? 'Logout' : 'Login/Create'}
				onClick={this.loginLogoutClick} />
			<TextMenuElement contentText='Settings' />
		</AccountOptions>

		const appMenuElements = <AppMenuElements id='appMenuElements' {...handleHoverSettings}>
			<LinkMenuElement linkTo='/notes' menuText='Notes' />
			<LinkMenuElement linkTo='/scheduler' menuText='Scheduler' />
		</AppMenuElements>;
		
		const accountOrName = this.props.userLoggedIn ? capitalizeUsername(this.props.username) : 'Account';

		const navigationBar = <React.Fragment>
			<NavBarContainer name='navMenu'>
				<DropDownMenuHeader id='accountMenuHeader' hoverSettings={handleHoverSettings}
					iconUp={this.state.accountHovered} menuText={accountOrName} />
				<DropDownMenuHeader id='appMenuHeader' hoverSettings={handleHoverSettings}
					iconUp={this.state.appsHovered} menuText='Apps' />
				<LinkMenuElement linkTo='/' menuText='Home' />
				<Spacer name='navSpacer'></Spacer>
			</NavBarContainer>
			{this.state.accountHovered && accountOptions}
			{this.state.appsHovered && appMenuElements}
		</React.Fragment>
		return navigationBar;
	}
};

const DropDownMenuHeader = ({ id, hoverSettings, iconUp, menuText }) => {
	return <MenuElement id={id} {...hoverSettings}>
		<MenuText>{menuText}</MenuText>
		<MenuIcon className={iconUp ? 'fas fa-angle-up' : 'fas fa-angle-down'} />
	</MenuElement>;
};

const LinkMenuElement = ({ linkTo, menuText }) => {
	return <Link to={`${linkTo}`}>
		<TextMenuElement contentText={menuText} />
	</Link>;
};

const TextMenuElement = ({ contentText, onClick=null }) => {
	return <MenuElement onClick={onClick}>
		<MenuText>{contentText}</MenuText>
	</MenuElement>;
};
