import React from 'react';

import PageHeader from '../components/pageTemplate/pageHeader.js'
import ShufflerApp from '../components/shuffler/shufflerApp.js';

export default class ShufflerPage extends React.Component {
    componentDidMount() {
        document.title = 'Shuffler';
    }

    render() {
        const { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

		const pageHeaderProps = {
			setUsername: setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const shufflerPage = <React.Fragment>
            <PageHeader {...pageHeaderProps} />
            <ShufflerApp />
        </React.Fragment>
        return shufflerPage;
    }
}