var React = require('react');

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
		const { serverAddress, username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

		const pageHeaderProps = {
			serverAddress,
			setUsername,
			setUserLoggedIn,
			userLoggedIn,
			username
		}

		const welcomePageProps = {
			username
		}

		const indexPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
			<WelcomeContent {...welcomePageProps} />
		</React.Fragment>
		return indexPage;
	}
}
