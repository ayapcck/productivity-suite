import React from 'react';

import PageHeader from '../components/pageTemplate/pageHeader';
import NotesApp from '../components/notesApp/notesApp';

export default class NotesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = 'Notes';
    }

    render() {
        const { serverAddress, username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

        const pageHeaderProps = {
            serverAddress,
            setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const notesPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
            <NotesApp serverAddress={serverAddress} username={username} userLoggedIn={userLoggedIn} />
        </React.Fragment>;
        
		return notesPage;
    }
}