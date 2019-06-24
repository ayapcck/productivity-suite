import React from 'react';
import classnames from 'classnames';

import { capitalizeUsername } from '../utilities/stringUtils';

import styles from './welcomeContent.less';

export default class WelcomeContent extends React.Component {
    render() {
        const { username } = this.props;
        
        const welcomeText = username === '' ? 'User' : capitalizeUsername(username);
        const welcomeContent = <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
                {`Welcome, ${welcomeText}!`}
            </div>
        </div>;
        return welcomeContent;
    }
}