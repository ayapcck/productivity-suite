var React = require('react');
var ReactDOM = require('react-dom');

import { connect, Provider } from 'react-redux';
import { getStore } from './redux/store';
import { setUsername, setUserLoggedIn } from './redux/loginActions';

import LoginApp from './components/loginApp/loginApp.js';
import NavigationBar from './components/navigation/navigationBar.js';
import SchedulerApp from './components/scheduler/schedulerApp.js';

const mapStateToProps = (state) => {
	const { username, userLoggedIn } = state.auth;
	return {
		username, 
		userLoggedIn
	};
};

const mapDispatchToProps = {
	setUsername,
	setUserLoggedIn
};

const LoginAppContainer = connect(mapStateToProps, mapDispatchToProps)(LoginApp);
const NavigationBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
const SchedulerContainer = connect(mapStateToProps)(SchedulerApp);

class IndexPage extends React.Component {
	constructor(props) {
		super(props);

		let user = window.sessionStorage.getItem('username');
		let userLoggedIn = !!user;
		user = user === null ? '' : user;

		const initialStore = {
			auth: {
				username: user,
				userLoggedIn: userLoggedIn
			}
		};

		this.state = {
			store: getStore(initialStore),
			showLoginApp: false
		}
		
		this.displayLoginApp = this.displayLoginApp.bind(this);
		this.hideLoginApp = this.hideLoginApp.bind(this);
	}

	hideLoginApp() {
		this.setState({ showLoginApp: false });
	}

	displayLoginApp() {
		this.setState({ showLoginApp: true });
	}

	render() {
		let { store } = this.state;
		let indexPage = <React.Fragment>
			<Provider store={store}>
				{this.state.showLoginApp && <LoginAppContainer {...this.props} 
					hideLoginApp={this.hideLoginApp} showLoginApp={this.state.showLoginApp} />}
				<NavigationBarContainer {...this.props} showLoginApp={this.displayLoginApp} />
				<SchedulerContainer />
			</Provider>
		</React.Fragment>
		return indexPage;
	}
}

let contentDiv = document.getElementById('content');
ReactDOM.render(<IndexPage />, contentDiv);
