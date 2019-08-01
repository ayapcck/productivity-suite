import React from 'react';

import PageHeader from '../components/pageTemplate/pageHeader';
import SchedulerApp from '../components/scheduler/schedulerApp';

export default class SchedulerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = 'Scheduler';
	}

	render() {
		const { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

		const pageHeaderProps = {
			setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const schedulerPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
			<SchedulerApp userLoggedIn={userLoggedIn} username={username} />
		</React.Fragment>;
		return schedulerPage;
	}
}
