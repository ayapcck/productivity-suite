import React from 'react';

import PageHeader from '../components/pageTemplate/pageHeader';

export default class BudgetPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = 'Budget Helper';
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

        return budgetPage(pageHeaderProps);
    }
}

const budgetPage = (props) => <React.Fragment>
    <PageHeader {...props} />
</React.Fragment>;