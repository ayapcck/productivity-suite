var React = require('react');

import styles from './tabBar.less';

import classnames from 'classnames';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.tabHeaders[0].name
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(title) {
        this.setState({ activeTab: title });
        this.props.showTabHeaderContent(title);
    }

    render() {
        let tabs = this.props.tabHeaders.map((val, index) => {
            let active = this.state.activeTab === val.name;
            let classes = classnames(styles.tab, active && styles.activeTab);
            return <Tab key={index} classes={classes} onClick={this.setActiveTab} 
                title={val.name} val={val.getValue()} />;
        });

        let tabBar = <div className={styles.tabBarContainer}>
            {tabs}
        </div>;
        
        return tabBar;
    }
}

const Tab = ({ classes, onClick, title, val }) => {
    return <div className={classes} onClick={() => onClick(title)}>
        <div className={styles.tabTitle}>{title}</div>
        <div className={styles.tabExtra}>{val}</div>
    </div>;
};