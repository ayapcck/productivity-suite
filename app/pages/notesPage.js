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
        const { username, userLoggedIn, setUsername, setUserLoggedIn } = this.props;

        const pageHeaderProps = {
			setUsername,
			setUserLoggedIn: setUserLoggedIn,
			userLoggedIn: userLoggedIn,
			username: username
		}

		const notesPage = <React.Fragment>
			<PageHeader {...pageHeaderProps} />
            <NotesApp username={username} userLoggedIn={userLoggedIn} />
        </React.Fragment>;
        
		return notesPage;
    }
}