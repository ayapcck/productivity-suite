import React from 'react';
import { ThemeProvider } from 'styled-components';

import LoginApp from '../loginApp/loginApp.js';
import NavigationBar from '../navigation/navigationBar.js';

import { colorTheme } from '../../colors';

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
        const { serverAddress, setUsername, setUserLoggedIn, userLoggedIn, username } = this.props;

        const loginAppProps = {
            hideLoginApp: this.hideLoginApp,
            serverAddress,
            setUserLoggedIn,
            setUsername,
            showLoginApp: this.state.showLoginApp
        };
        const navigationBarProps = {
            serverAddress,
            setUserLoggedIn,
            setUsername,
            showLoginApp: this.displayLoginApp,
            userLoggedIn,
            username
        };

        const pageHeader = <React.Fragment>
            {this.state.showLoginApp && <LoginApp {...loginAppProps} />}
            <NavigationBar {...navigationBarProps} />
        </React.Fragment>;
        
        return <ThemeProvider theme={colorTheme}>
            {pageHeader}
        </ThemeProvider>;
    }
}