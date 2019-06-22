var React = require('react');

import PageHeader from './components/pageTemplate/pageHeader.js';
import SchedulerApp from './components/scheduler/schedulerApp.js';

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;
		let indexPage = <React.Fragment>
			<PageHeader setUsername={setUsername} setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} username={username} />
			<SchedulerApp userLoggedIn={userLoggedIn} username={username} />
		</React.Fragment>
		return indexPage;
	}
}
