var React = require('react');

import PageHeader from '../components/pageTemplate/pageHeader.js';
import SchedulerApp from '../components/scheduler/schedulerApp.js';

export default class SchedulerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

		const pageHeaderProps = {
			setUsername: setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const schedulerPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
			<SchedulerApp userLoggedIn={userLoggedIn} username={username} />
		</React.Fragment>
		return schedulerPage;
	}
}
