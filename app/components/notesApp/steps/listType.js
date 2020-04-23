import React from 'react';
import _ from 'lodash';

import { ListTypeItem } from '../listTypeItem';

const parseIndexFromId = (id, noteId) => {
    return parseInt(id.replace(`${noteId}LI`, ''));
}

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
        const { noteId } = this.props;
        const { listItems } = this.state;
        const id = ev.target.parentNode.id;
        const targetIndex = parseIndexFromId(id, noteId);
        const index = targetIndex + 1;
        listItems.insertAt(index, {content: ''});
        this.setState({ listItems }, () => this.focusNewElement(index));
    }

    focusNewElement(index) {
        const { noteId } = this.props;
        document.getElementById(`${noteId}LI${index}`).lastChild.focus();
    }

    removeElement(ev) {
        const { noteId } = this.props;
        const listContent = ev.target.innerText;
        const note = document.getElementById(noteId);
        const numberListItems = note.getElementsByClassName("listItem").length;
        if (listContent === '' && numberListItems !== 1) {
            ev.preventDefault();
            const { listItems } = this.state;
            const id = ev.target.parentNode.id;
            const targetIndex = parseIndexFromId(id, noteId);
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
        const newContent = ev.target.innerText;
        const newData = Object.assign({}, listNode.data, { content: newContent });
        listNode.data = newData;
        this.setState({ listItems });
    }

    componentDidMount() {
        const { noteId } = this.props;
        const listContainer = document.getElementById(noteId);
        listContainer.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        const { noteId } = this.props;
        const listContainer = document.getElementById(noteId);
        listContainer.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const { listItems } = this.state;
        const { editing, noteId } = this.props;

        return <React.Fragment>
            {renderListItems(listItems, editing, noteId, this.listItemContentChange)}
        </React.Fragment>;
    }
}

const renderListItems = (content, editing, noteId, onItemContentChange) => {
    let listItems = [];
    if (_.isUndefined(content) || content.getHead() === null) {
        const id = `${noteId}LI1`;
        listItems.push(noContentItem(editing, id, onItemContentChange));
    } else {
        listItems = listContentItems(content, editing, noteId, onItemContentChange);
    }
    return listItems;
}

const noContentItem = (editing, id, onChange) => <ListTypeItem key={id} id={id} content="" editing={editing} onChange={onChange} />;

const listContentItems = (listItems, editing, noteId, onChange) => {
    let items = [];
    let item = listItems.getHead();
    let index = 0;
    const firstId = `${noteId}LI${index}`;
    items.push(<ListTypeItem key={firstId} id={firstId} content={item.data.content} editing={editing} onChange={onChange} />);
    while (item.hasNext() && item.next.data !== null) {
        item = item.next;
        index += 1;
        const content = item.data.content;
        const nextId = `${noteId}LI${index}`;
        items.push(<ListTypeItem key={nextId} id={nextId} content={content} editing={editing} onChange={onChange} />);
    }
    return items;
}
