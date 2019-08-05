import React from 'react';
import _ from 'lodash';

import Icon from '../../icons/icon';

import styles from '../notes.less';
import utilStyles from '../../utilities/utilities.less';

export class ListType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: [1]
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    addNewElement() {
        let { listItems } = this.state;
        listItems = _.concat(listItems, _.last(listItems) + 1);
        this.setState({ listItems });
    }

    handleRemoveElement(ev) {
        console.log('here');
    }

    handleKeyDown(ev) {
        switch(ev.which) {
            case 8:
                this.handleRemoveElement(ev);
                break;
            case 13:
                ev.preventDefault();
                this.addNewElement();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        const listContainer = document.getElementsByClassName(styles.listType)[0];
        listContainer.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        const listContainer = document.getElementsByClassName(styles.listType)[0];
        listContainer.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const { listItems } = this.state;

        return <div className={styles.listType}>
            <div className={utilStyles.spanHeader}>List</div>
            <div className={styles.noteContainer}>
                {_.map(listItems, (value) => <ListItem key={"LI" + value} />)}
            </div>
        </div>;
    }
}

const ListItem = (props) => {
    return <div className={styles.listItem}>
        <Icon iconClass="fas fa-circle" iconStyles={styles.bulletPoint}
            wrapperStyles={styles.bulletPointWrapper} />
        <span className={styles.listContent} contentEditable={true}></span>
    </div>;
}