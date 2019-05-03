var React = require('react');

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
		
	render() {
		var handleHoverSettings = {
			onMouseMove: this.showAccountSettings,
			onMouseEnter: this.showAccountSettings,
			onMouseLeave: this.hideAccountSettings
		}
		
		var accountOptions = <div className={styles.accountOptions} {...handleHoverSettings}>
			<div className={styles.menuElement} 
				onClick={this.loginLogoutClick}>
					{this.props.userLoggedIn ? "Logout" : "Login"}
				</div>
			<div className={styles.menuElement}>Settings</div>
		</div>
		
		var navigationBar = <React.Fragment>
			<div name="navMenu" className={styles.navBarContainer}>
				<div className={styles.menuElement} 
					{...handleHoverSettings}>
					Account
				</div>
				<div className={styles.menuElement}>Home</div>
				<div name="navSpacer" className={styles.spacer}>{this.props.bannerText}</div>
			</div>
			{this.state.accountHovered && accountOptions}
		</React.Fragment>
		return navigationBar;
	}
};
