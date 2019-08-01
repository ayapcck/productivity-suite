import React from 'react';

import PageHeader from './components/pageTemplate/pageHeader.js';
import WelcomeContent from './components/welcomeContent/welcomeContent.js';

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = 'Welcome';
	}

	render() {
		const { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

		const pageHeaderProps = {
			setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const welcomePageProps = {
			username: username
		}

		const indexPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
			<WelcomeContent {...welcomePageProps} />
		</React.Fragment>
		return indexPage;
	}
}
