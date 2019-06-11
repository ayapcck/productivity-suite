var React = require('react');

import styles from './tabBar.less';

import classnames from 'classnames';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.tabHeaders[0]
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(title) {
        this.setState({ activeTab: title });
        this.props.showTabHeaderContent(title);
    }

    render() {
        let tabs = this.props.tabHeaders.map((title, index) => {
            let active = this.state.activeTab === title;
            let classes = classnames(styles.tab, active && styles.activeTab);
            return <Tab key={index} classes={classes} onClick={this.setActiveTab} title={title} />;
        });

        let tabBar = <div className={styles.tabBarContainer}>
            {tabs}
        </div>;
        
        return tabBar;
    }
}

const Tab = ({ classes, onClick, title }) => {
    return <div className={classes} onClick={() => onClick(title)}>{title}</div>
};