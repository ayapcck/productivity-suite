var React = require('react');

import Icon from '../icons/icon.js';

import styles from './navigationBar.css';

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			accountHovered: false
		}
		
		this.hideAccountSettings = this.hideAccountSettings.bind(this);
		this.showAccountSettings = this.showAccountSettings.bind(this);
		this.loginLogoutClick = this.loginLogoutClick.bind(this);
	}
	
	showAccountSettings() {
		this.setState({accountHovered: true});
	}
	
	hideAccountSettings() {
		this.setState({accountHovered: false});
	}
	
	componentDidMount() {
		var navMenuHeight = document.getElementsByName("navMenu")[0].offsetHeight;
		document.getElementsByName("navSpacer")[0].style.height = navMenuHeight + "px";
	}
	
	loginLogoutClick() {
		if (this.props.userLoggedIn) {
			this.hideAccountSettings();
			this.props.onLogout();
		} else {
			this.props.loginToggle();
		}
	}
	
	isUserLoggedIn() {
		return this.props.username != "";
	}
	
	capitalizeUsername() {
		var user = this.props.username;
		return user.charAt(0).toUpperCase() + user.slice(1);
	}
		
	render() {
		const handleHoverSettings = {
			onMouseMove: this.showAccountSettings,
			onMouseEnter: this.showAccountSettings,
			onMouseLeave: this.hideAccountSettings
		}
		
		var accountOptions = <div className={styles.accountOptions} {...handleHoverSettings}>
			<div className={styles.menuElement} 
				onClick={this.loginLogoutClick}>
					{this.props.userLoggedIn ? "Logout" : "Login/Create"}
				</div>
			<div className={styles.menuElement}>Settings</div>
		</div>
		
		var accountOrName = this.isUserLoggedIn() ? this.capitalizeUsername() : "Account";
		
		var navigationBar = <React.Fragment>
			<div name="navMenu" className={styles.navBarContainer}>
				<div className={styles.menuElement} 
					{...handleHoverSettings}>
					<Icon iconClass={this.state.accountHovered ? "fas fa-angle-up" : "fas fa-angle-down"}
						iconText={accountOrName} iconStyles={styles.menuIcon} />
				</div>
				<div className={styles.menuElement}>Home</div>
				<div name="navSpacer" className={styles.spacer}></div>
			</div>
			{this.state.accountHovered && accountOptions}
		</React.Fragment>
		return navigationBar;
	}
};
