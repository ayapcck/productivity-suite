var React = require('react');
import { Link } from 'react-router-dom';

import Icon from '../icons/icon.js';
import { capitalizeUsername } from '../utilities/stringUtils';

import { routes } from '../../routes/routeHelper';

import styles from './navigationBar.less';


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
		
		const accountOptions = <div id='acccountMenuElements' className={styles.accountOptions} {...handleHoverSettings}>
			<TextMenuElement contentText={this.props.userLoggedIn ? 'Logout' : 'Login/Create'}
				onClick={this.loginLogoutClick} />
			<TextMenuElement contentText='Settings' />
		</div>

		const appMenuElements = <div id='appMenuElements' className={styles.appMenuElements} {...handleHoverSettings}>
			{_.map(routes, (val, key) => key !== 'index' && <LinkMenuElement linkTo={val.address} menuText={val.name} />)}
		</div>;
		
		const accountOrName = this.props.userLoggedIn ? capitalizeUsername(this.props.username) : 'Account';

		const navigationBar = <React.Fragment>
			<div name='navMenu' className={styles.navBarContainer}>
				<DropDownMenuHeader id='accountMenuHeader' hoverSettings={handleHoverSettings}
					iconUp={this.state.accountHovered} iconText={accountOrName} />
				<DropDownMenuHeader id='appMenuHeader' hoverSettings={handleHoverSettings}
					iconUp={this.state.appsHovered} iconText='Apps' />
				<LinkMenuElement linkTo='/' menuText='Home' />
				<div name='navSpacer' className={styles.spacer}></div>
			</div>
			{this.state.accountHovered && accountOptions}
			{this.state.appsHovered && appMenuElements}
		</React.Fragment>
		return navigationBar;
	}
};

const DropDownMenuHeader = ({ id, hoverSettings, iconUp, iconText }) => {
	return <div id={id} className={styles.menuElement} 
		{...hoverSettings}>
		<Icon iconClass={iconUp ? 'fas fa-angle-up' : 'fas fa-angle-down'}
			iconText={iconText} iconStyles={styles.menuIcon} iconTextStyles={styles.menuText} />
	</div>;
};

const LinkMenuElement = ({ linkTo, menuText }) => {
	return <Link to={`${linkTo}`}>
		<TextMenuElement contentText={menuText} />
	</Link>;
};

const TextMenuElement = ({ contentText, onClick=null }) => {
	return <div className={styles.menuElement} onClick={onClick}>
		<span className={styles.menuText}>{contentText}</span>
	</div>;
};
