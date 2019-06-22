var React = require('react');

import Icon from '../icons/icon.js';

import styles from './navigationBar.less';

const mapStateToProps = (state) => {
	const { userLoggedIn } = state.auth;

	return {
		userLoggedIn: userLoggedIn
	};
};

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
	
	loginLogoutClick() {
		const { userLoggedIn, showLoginApp, setUsername, setUserLoggedIn } = this.props;

		if (userLoggedIn) {
			this.hideAccountSettings();
			setUsername('');
			setUserLoggedIn(false);
			window.sessionStorage.removeItem("username");
		} else {
			showLoginApp();
		}
	}
	
	capitalizeUsername() {
		let user = this.props.username;
		return user.charAt(0).toUpperCase() + user.slice(1);
	}
		
	render() {
		const handleHoverSettings = {
			onMouseMove: this.showAccountSettings,
			onMouseEnter: this.showAccountSettings,
			onMouseLeave: this.hideAccountSettings
		}
		
		let accountOptions = <div className={styles.accountOptions} {...handleHoverSettings}>
			<div className={styles.menuElement} 
				onClick={this.loginLogoutClick}>
					{this.props.userLoggedIn ? "Logout" : "Login/Create"}
				</div>
			<div className={styles.menuElement}>Settings</div>
		</div>
		
		let accountOrName = this.props.userLoggedIn ? this.capitalizeUsername() : "Account";

		let navigationBar = <React.Fragment>
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
