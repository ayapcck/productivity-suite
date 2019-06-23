var React = require('react');

import PageHeader from './components/pageTemplate/pageHeader.js';

export default class IndexPage extends React.Component {
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

		const indexPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
			This is a test page.
		</React.Fragment>
		return indexPage;
	}
}
