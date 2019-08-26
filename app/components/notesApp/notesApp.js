import React from 'react';
import _ from 'lodash';

import Note from './note';
import { NoteSteps } from './steps';
import { postJson, getJson } from '../utilities/jsonHelpers';
import { LinkedList } from '../utilities/dataStructures';

import styles from './notes.less';

const parseNotes = notes => {
    const lists = [];
    _.forEach(notes, item => {
        if (item.noteType === 'list') {
            const listItems = new LinkedList();
            _.forEach(item.content.split(','), (content, index) => {
                listItems.add({id: `LI${index}`, content: content});
            });
            lists.push({name: item.name, listItems});
        }
    });
    return {lists};
}

export default class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstFetch: false,
            lists: [{name: '',  listItems: new LinkedList()}]
        };

        this.getNotes = this.getNotes.bind(this);
    }

    componentDidMount(){
        this.getNotes();
    }

    getNotes() {
        const { username } = this.props;
        if (username && username !== '') {
            const url = 'http://192.168.0.26:5000/retrieveNotes?user=' + username;

            getJson(url).then(response => {
                let notes = [];
                _.forEach(response, (note) => notes.push(note));

                notes = parseNotes(notes);
                this.setState({ firstFetch: true, lists: notes.lists});
            }).catch(error => alert(error));
        } else {
            this.setState({ lists: {name: '', listItems: new LinkedList()} });
        }
    }

    render() {
        const { firstFetch, lists } = this.state;

        return <div className={styles.notesAppContent}>
            {firstFetch && <Note step='list' content={lists[0]} />}
        </div>;
    }
}