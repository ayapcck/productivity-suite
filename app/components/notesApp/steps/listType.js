import React from 'react';
import _ from 'lodash';

import Icon from '../../icons/icon';

import styles from '../notes.less';
import utilStyles from '../../utilities/utilities.less';

export class ListType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listItemIds: ["LI1"],
            listItems: [{id: "LI1", content: this.props.content}]
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    addNewElement(ev) {
        const { listItemIds } = this.state;
        const focusedListItemId = ev.target.parentNode.id;
        const indexInList = _.indexOf(listItemIds, focusedListItemId);
        const indexPlusOne = indexInList + 1;
        let newListItemIds = _.slice(listItemIds, 0, indexPlusOne);
        const indexPlusTwo = indexPlusOne + 1;
        newListItemIds.push('LI' + indexPlusTwo);
        const listItemIdsToShift = _.slice(listItemIds, indexPlusOne);
        _.forEach(listItemIdsToShift, (value) => {
            const idNum = parseInt(value.replace('LI', '')) + 1;
            newListItemIds.push('LI' + idNum);
        })

        this.setState({ listItemIds: newListItemIds });
    }

    handleRemoveElement(ev) {
        const listContent = ev.target.innerText;
        const numberListItems = document.getElementsByClassName(styles.listItem).length;
        if (listContent === '' && numberListItems !== 1) {
            ev.preventDefault();
            const listItemId = ev.target.parentNode.id;
            const listItem = document.getElementById(listItemId);
            listItem.parentNode.removeChild(listItem);
        }
    }

    handleKeyDown(ev) {
        switch(ev.which) {
            case 8:
                this.handleRemoveElement(ev);
                break;
            case 13:
                ev.preventDefault();
                this.addNewElement(ev);
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
        const { content } = this.props;

        return <div className={styles.listType}>
            <div className={utilStyles.spanHeader}>List</div>
            <div className={styles.noteContainer}>
                {content && _.map([content], (listItem) => {
                    return <ListItem key={listItem.id} id={listItem.id} content={listItem.content} />;
                })}
            </div>
        </div>;
    }
}

const ListItem = (props) => {
    const { content, id } = props;
    return <div id={id} className={styles.listItem}>
        <Icon iconClass="fas fa-circle" iconStyles={styles.bulletPoint}
            wrapperStyles={styles.bulletPointWrapper} />
        <span className={styles.listContent} contentEditable={true}>{content}</span>
    </div>;
}