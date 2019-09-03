import React from 'react';
import _ from 'lodash';

import Icon from '../../icons/icon';

import styles from '../notes.less';

export class ListType extends React.Component {
    constructor(props) {
        super(props);
        
        const { content } = this.props;
        const { listItems } = content;

        this.state = {
            listItems
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.listItemContentChange = this.listItemContentChange.bind(this);
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
        // switch(ev.which) {
        //     case 8:
        //         this.handleRemoveElement(ev);
        //         break;
        //     case 13:
        //         ev.preventDefault();
        //         this.addNewElement(ev);
        //         break;
        //     default:
        //         break;
        // }
    }

    listItemContentChange(ev) {
        const { listItems } = this.state;
        const listIndex = parseInt(ev.target.parentNode.id.replace('LI', ''));
        const listNode = listItems.get(listIndex);
        const newContent = ev.target.value;
        const newData = Object.assign({}, listNode.data, { content: newContent });
        listNode.data = newData;
        this.setState({ listItems });
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
        const { editing } = this.props;

        return <div className={styles.listType}>
            <div className={styles.noteContainer}>
                {renderListItems(listItems, editing, this.listItemContentChange)}
            </div>
        </div>;
    }
}

const ListItem = props => {
    const { content, id, disabled, onChange } = props;
    return <div id={id} className={styles.listItem}>
        <Icon iconClass="fas fa-circle" iconStyles={styles.bulletPoint}
            wrapperStyles={styles.bulletPointWrapper} />
        <input type="text" className={styles.listContent}
            value={content} disabled={disabled} onChange={onChange} />
    </div>;
}

const renderListItems = (content, editing, onItemContentChange) => {
    let listItems = [];
    if (_.isUndefined(content) || content.getHead() === null) {
        listItems.push(noContentItem(editing, onItemContentChange));
    } else {
        listItems = listContentItems(content, editing, onItemContentChange);
    }
    return listItems;
}

const noContentItem = (editing, onChange) => <ListItem key="LI1" id="LI1" content="" disabled={!editing} onChange={onChange} />;

const listContentItems = (listItems, editing, onChange) => {
    let items = [];
    let item = listItems.getHead();
    const firstId = item.data.id;
    items.push(<ListItem key={firstId} id={firstId} content={item.data.content} disabled={!editing} onChange={onChange} />);
    while (item.hasNext() && item.next.data !== null) {
        item = item.next;
        const content = item.data.content;
        const nextId = item.data.id;
        items.push(<ListItem key={nextId} id={nextId} content={content} disabled={!editing} onChange={onChange} />);
    }
    return items;
}
