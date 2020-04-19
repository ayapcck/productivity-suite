import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { DeleteConfirmationBox } from './deleteConfirmationBox';
import Note from './note';
import { NoteTypes } from './types';
import { postJson, getJson } from '../utilities/jsonHelpers';
import { LinkedList } from '../utilities/dataStructures';

import { colorTheme } from '../../colors';

const AppContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    display: grid;
    grid-auto-rows: 50%;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 50% 50%;
    justify-content: center;
    overflow: auto;
    padding: 10px;
`;

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
            allNotes: [{name: '',  listItems: new LinkedList()}],
            firstFetch: false,
            showDeleteConfirmation: false
        };

        this.addNote = this.addNote.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.toggleDeleteNoteConfirmation = this.toggleDeleteNoteConfirmation.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }

    componentDidMount(){
        this.getNotes();
    }

    getNotes() {
        const { serverAddress, username } = this.props;
        if (username && username !== '') {
            const url = `${serverAddress}/retrieveNotes?user=${username}`;

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
        const { serverAddress, username } = this.props;
        if (username && username !== '') {
            const url = `${serverAddress}/updateNote`;
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

    async addNote(content, name, type) {
        const { serverAddress, username } = this.props
        if (username && username !== '') {
            const url = `${serverAddress}/addNote`;
            const jsonBody = {
                content,
                user: username,
                name,
                type
            }

            try {
                await postJson(url, jsonBody);
                this.getNotes();
            } catch (error) {
                alert(error);
            }
        }
    }

    toggleDeleteNoteConfirmation() {
        const { showDeleteConfirmation } = this.state;
        this.setState({ showDeleteConfirmation: !showDeleteConfirmation });
    }

    render() {
        const { allNotes, firstFetch, showDeleteConfirmation } = this.state;

        const notes = renderNotes(allNotes, 
            this.addNote, 
            this.toggleDeleteNoteConfirmation, 
            this.updateNote);

        return <ThemeProvider theme={colorTheme}>
            <AppContent>
                { showDeleteConfirmation && <DeleteConfirmationBox /> }
                { firstFetch && notes }
            </AppContent>
        </ThemeProvider>;
    }
}

const renderNotes = (allNotes, addNote, toggleDeleteNoteConfirmation, updateNote) => {
    let id = '';
    let lastIndex = 0;
    const notes = [];
    _.forEach(allNotes, (note, index) => {
        id = `note${index}`;
        lastIndex = index + 1;
        notes.push(<Note key={id} 
            noteId={id} 
            step={note.type} 
            content={note}
            toggleDeleteNoteConfirmation={toggleDeleteNoteConfirmation}
            updateNote={updateNote} />);
    });
    id = `note${lastIndex}`;
    notes.push(unititializedNote(addNote, id));
    return <React.Fragment>
        {notes}
    </React.Fragment>;
};

const unititializedNote = (addNote, id) => {
    const content = {id, name: ''};
    return <Note key={id} noteId={id} step="uninitialized" addNote={addNote} content={content} />;
};