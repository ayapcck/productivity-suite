var React = require('react');

import LoginApp from '../loginApp/loginApp.js';
import NavigationBar from '../navigation/navigationBar.js';

export default class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginApp: false
        }
        
        this.displayLoginApp = this.displayLoginApp.bind(this);
        this.hideLoginApp = this.hideLoginApp.bind(this);
    }

    hideLoginApp() {
        this.setState({ showLoginApp: false });
    }

    displayLoginApp() {
        this.setState({ showLoginApp: true });
    }

    render() {
        const { setUsername, setUserLoggedIn, userLoggedIn, username } = this.props;

        const loginAppProps = {
            hideLoginApp: this.hideLoginApp,
            setUserLoggedIn: setUserLoggedIn,
            setUsername: setUsername,
            showLoginApp: this.state.showLoginApp
        };
        const navigationBarProps = {
            setUserLoggedIn: setUserLoggedIn,
            setUsername: setUsername,
            showLoginApp: this.displayLoginApp,
            userLoggedIn: userLoggedIn,
            username: username
        };

        const pageHeader = <React.Fragment>
            {this.state.showLoginApp && <LoginApp {...loginAppProps} />}
            <NavigationBar {...navigationBarProps} />
        </React.Fragment>;
        
        return pageHeader;
    }
}