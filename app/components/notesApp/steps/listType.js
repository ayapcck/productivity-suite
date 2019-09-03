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
        const { listItems } = this.state;
        const targetIndex = parseInt(ev.target.parentNode.id.replace('LI', ''));
        const index = targetIndex + 1;
        listItems.insertAt(index, {content: ''});
        this.setState({ listItems }, () => this.focusNewElement(index));
    }

    focusNewElement(index) {
        document.getElementById(`LI${index}`).lastChild.focus();
    }

    removeElement(ev) {
        const listContent = ev.target.value;
        const numberListItems = document.getElementsByClassName(styles.listItem).length;
        if (listContent === '' && numberListItems !== 1) {
            ev.preventDefault();
            const { listItems } = this.state;
            const targetIndex = parseInt(ev.target.parentNode.id.replace('LI', ''));
            listItems.remove(targetIndex);
            this.setState({ listItems }, () => document.activeElement.blur());
        }
    }

    handleKeyDown(ev) {
        const { editing } = this.props;

        switch(ev.which) {
            case 8:
                this.removeElement(ev);
                break;
            case 13:
                if (editing) {
                    ev.preventDefault();
                    this.addNewElement(ev);
                }
                break;
            default:
                break;
        }
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
    let index = 0;
    const firstId = `LI${index}`;
    items.push(<ListItem key={firstId} id={firstId} content={item.data.content} disabled={!editing} onChange={onChange} />);
    while (item.hasNext() && item.next.data !== null) {
        item = item.next;
        index += 1;
        const content = item.data.content;
        const nextId = `LI${index}`;
        items.push(<ListItem key={nextId} id={nextId} content={content} disabled={!editing} onChange={onChange} />);
    }
    return items;
}
