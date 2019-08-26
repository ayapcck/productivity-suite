import React from 'react';
import _ from 'lodash';

import Icon from '../../icons/icon';
import { LinkedList } from '../../utilities/dataStructures';

import classnames from 'classnames';
import styles from '../notes.less';
import utilStyles from '../../utilities/utilities.less';

export class ListType extends React.Component {
    constructor(props) {
        super(props);

        const propName = this.props.content.name;

        const listName = propName === '' ? 'List' : propName;

        this.state = {
            editing: false,
            name: listName
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.listNameChange = this.listNameChange.bind(this);
        this._toggleEditing = this._toggleEditing.bind(this);
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

    handleClick(ev) {
        if (this.state.editing) {
            const clickX = ev.clientX;
            const clickY = ev.clientY;
            if (clickX !== 0 && clickY !== 0) {
                const listContainer = document.getElementsByClassName(styles.listType)[0];
                const listContainerBox = listContainer.getBoundingClientRect();
                const clickInsideContainer = clickX > listContainerBox.left 
                    && clickX < listContainerBox.right 
                    && clickY > listContainerBox.top 
                    && clickY < listContainerBox.bottom;
                !clickInsideContainer && this._toggleEditing();
            }
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

    listNameChange(ev) {
        const { name } = this.state;
        ev.target.value !== name && this.setState({ name: ev.target.value });
    }

    componentDidMount() {
        const listContainer = document.getElementsByClassName(styles.listType)[0];
        listContainer.addEventListener('keydown', this.handleKeyDown);
        document.getElementById('content').addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        const listContainer = document.getElementsByClassName(styles.listType)[0];
        listContainer.removeEventListener('keydown', this.handleKeyDown);
        document.getElementById('content').removeEventListener('mousedown', this.handleClick);
    }

    _toggleEditing() {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        const { content } = this.props;
        const { editing, name } = this.state;

        const headerProps = {
            editing,
            listName: name,
            onEditClick: this._toggleEditing,
            onNameChange: this.listNameChange
        }

        return <div className={styles.listType}>
            {renderHeader(headerProps)}
            <div className={styles.noteContainer}>
                {renderListItems(content.listItems, editing)}
            </div>
        </div>;
    }
}

const ListItem = props => {
    const { content, id, disabled } = props;
    return <div id={id} className={styles.listItem}>
        <Icon iconClass="fas fa-circle" iconStyles={styles.bulletPoint}
            wrapperStyles={styles.bulletPointWrapper} />
        <input type="text" className={styles.listContent}
            value={content} disabled={disabled} />
    </div>;
}

const renderHeader = props => {
    const { editing, listName, onEditClick, onNameChange } = props;

    const headerStyles = classnames(utilStyles.spanHeader, styles.noteHeader,
        editing ? styles.noteHeaderEditing : '');

    return <div className={headerStyles}>
        {editing && <span>Editing - </span>}
        <input type="text" className={classnames(styles.listName, editing ? styles.listNameEditing : '')} 
            value={listName} disabled={!editing} onChange={onNameChange} />
        <Icon iconClass="far fa-edit" noWrapper={true} 
            iconStyles={classnames(styles.editNoteButton, editing ? styles.editNoteButtonActive : '')} 
            onClick={onEditClick} />
    </div>;
}

const renderListItems = (content, editing) => {
    let listItems = [];
    if (_.isUndefined(content) || content.getHead() === null) {
        listItems.push(noContentItem(editing));
    } else {
        listItems = listContentItems(content, editing);
    }
    return listItems;
}

const noContentItem = editing => <ListItem key="LI1" id="LI1" content="" disabled={!editing} />;

const listContentItems = (listItems, editing) => {
    let items = [];
    let item = listItems.getHead();
    const firstId = item.data.id;
    items.push(<ListItem key={firstId} id={firstId} content={item.data.content} disabled={!editing} />);
    while (item.hasNext() && item.next.data !== null) {
        item = item.next;
        const content = item.data.content;
        const nextId = item.data.id;
        items.push(<ListItem key={nextId} id={nextId} content={content} disabled={!editing} />);
    }
    return items;
}
