import React from 'react';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import Note from './note';
import { NoteSteps } from './steps';
import { NoteTypes } from './types';
import { postJson, getJson } from '../utilities/jsonHelpers';
import { LinkedList } from '../utilities/dataStructures';

import { colorTheme } from '../../colors';
import styles from './notes.less';

const parseNotes = notes => {
    const allNotes = [];
    _.forEach(notes, item => {
        const type = item.noteType;
        allNotes.push(NoteTypes[type].parse(item));
    });
    return allNotes;
}

export default class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstFetch: false,
            allNotes: [{name: '',  listItems: new LinkedList()}]
        };

        this.getNotes = this.getNotes.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }

    componentDidMount(){
        this.getNotes();
    }

    getNotes() {
        const { username } = this.props;
        if (username && username !== '') {
            const url = `http://192.168.0.26:5000/retrieveNotes?user=${username}`;

            getJson(url).then(response => {
                let allNotes = [];
                _.forEach(response, (note) => allNotes.push(note));

                allNotes = parseNotes(allNotes);
                this.setState({ firstFetch: true, allNotes });
            }).catch(error => alert(error));
        } else {
            this.setState({ allNotes: [
                { name: '',  listItems: new LinkedList() }
            ]});
        }
    }

    async updateNote(content, name, id) {
        const { username } = this.props;
        if (username && username !== '') {
            const url = `http://192.168.0.26:5000/updateNote`;
            const jsonBody = {
                content,
                id,
                name,
                user: username
            };

            try {
                await postJson(url, jsonBody);
                this.getNotes();
            }
            catch (error) {
                alert(error);
            }
        }
    }

    render() {
        const { firstFetch, allNotes } = this.state;

        const notes = renderNotes(allNotes, this.updateNote);

        return <ThemeProvider theme={colorTheme}>
            <div className={styles.notesAppContent}>
                {firstFetch && notes}
            </div>;
        </ThemeProvider>;
    }
}

const renderNotes = (allNotes, updateNote) => {
    let id = '';
    let lastIndex = 0;
    const notes = [];
    _.forEach(allNotes, (note, index) => {
        id = `note${index}`;
        lastIndex = index + 1;
        notes.push(<Note key={id} noteId={id} step={note.type} content={note} updateNote={updateNote} />);
    });
    id = `note${lastIndex}`;
    notes.push(unititializedNote(id));
    return <React.Fragment>
        {notes}
    </React.Fragment>;
}

const unititializedNote = (id) => {
    const content = {id, name: ''};
    return <Note key={id} noteId={id} step="uninitialized" content={content} />;
}