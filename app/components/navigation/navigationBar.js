var React = require('react');
import { Link } from 'react-router-dom';

import Icon from '../icons/icon.js';

import styles from './navigationBar.less';


const productivityHeaderId = ev => ev.currentTarget.id === 'productivityHeader';
const productivityElementsId = ev => {
	return ev.relatedTarget 
		? ev.relatedTarget.id === 'productivityElements' || ev.currentTarget.id === 'productivityElements'
		: false;
};
const accountHeaderId = ev => ev.currentTarget.id === 'accountHeader';
const accountElementsId = ev => {
	return ev.relatedTarget 
		? ev.relatedTarget.id === 'accountElements' || ev.currentTarget.id === 'accountElements'
		: false;
}

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			accountHovered: false,
			productivityHovered: false
		}
		
		this.hideHoverElements = this.hideHoverElements.bind(this);
		this.showHoverElements = this.showHoverElements.bind(this);
		this.loginLogoutClick = this.loginLogoutClick.bind(this);
	}
	
	showHoverElements(ev) {
		if (productivityElementsId(ev) || productivityHeaderId(ev)) {
			this.setState({ productivityHovered: true })
		} 
		if (accountElementsId(ev) || accountHeaderId(ev)) {
			this.setState({ accountHovered: true });
		}
	}
	
	hideHoverElements(ev) {
		if (productivityElementsId(ev) || productivityHeaderId(ev)) {
			this.setState({ productivityHovered: false })
		} 
		if (accountElementsId(ev) || accountHeaderId(ev)) {
			this.setState({ accountHovered: false });
		}
	}
	
	loginLogoutClick() {
		const { userLoggedIn, showLoginApp, setUsername, setUserLoggedIn } = this.props;

		if (userLoggedIn) {
			this.hideHoverElements();
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
			onMouseMove: this.showHoverElements,
			onMouseEnter: this.showHoverElements,
			onMouseLeave: this.hideHoverElements
		}
		
		const accountOptions = <div id='accountElements' className={styles.accountOptions} {...handleHoverSettings}>
			<div className={styles.menuElement} 
				onClick={this.loginLogoutClick}>
					{this.props.userLoggedIn ? "Logout" : "Login/Create"}
				</div>
			<div className={styles.menuElement}>Settings</div>
		</div>

		const productivityElements = <div id='productivityElements' className={styles.productivityElements} 
			{...handleHoverSettings}>
			<div className={styles.menuElement}>
				<Link to={`/scheduler`}>Scheduler</Link>
			</div>
		</div>
		
		const accountOrName = this.props.userLoggedIn ? this.capitalizeUsername() : "Account";

		const navigationBar = <React.Fragment>
			<div name="navMenu" className={styles.navBarContainer}>
				<div id='accountHeader' className={styles.menuElement} 
					{...handleHoverSettings}>
					<Icon iconClass={this.state.accountHovered ? "fas fa-angle-up" : "fas fa-angle-down"}
						iconText={accountOrName} iconStyles={styles.menuIcon} />
				</div>
				<div id='productivityHeader' 
					className={styles.menuElement} {...handleHoverSettings}>
					Productivity
				</div>
				<div className={styles.menuElement}>
					<Link to={`/`}>Home</Link>
				</div>
				<div name="navSpacer" className={styles.spacer}></div>
			</div>
			{this.state.accountHovered && accountOptions}
			{this.state.productivityHovered && productivityElements}
		</React.Fragment>
		return navigationBar;
	}
};
