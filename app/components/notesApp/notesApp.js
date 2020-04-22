import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { DeleteConfirmationBox } from './deleteConfirmationBox';
import Note from './note';
import { NoteTypes } from './types';
import { postJson, getJson } from '../utilities/jsonHelpers';
import { LinkedList } from '../utilities/dataStructures';

import { colorTheme } from '../../colors';

import Logger from '../utilities/logger';

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
        this.deleteNote = this.deleteNote.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.hideDeleteNoteConfirmation = this.hideDeleteNoteConfirmation.bind(this);
        this.showDeleteNoteConfirmation = this.showDeleteNoteConfirmation.bind(this);
        this.updateNote = this.updateNote.bind(this);
    }

    log(message, functionName) {
		Logger.log(message, 'notesApp', functionName);
	}

    componentDidMount(){
        this.getNotes();
    }

    async getNotes() {
        const { serverAddress, username } = this.props;
        if (username && username !== '') {
            const url = `${serverAddress}/retrieveNotes?user=${username}`;

            this.log('starting note retrieval', 'getNotes');
            try {
                this.log('calling getJson, awaiting results', 'getNotes');
                let response = await getJson(url);
                this.log('got response from getJson', 'getNotes');

                let allNotes = [];
                _.forEach(response, (note) => allNotes.push(note));

                allNotes = parseNotes(allNotes);

                this.log('calling setState', 'getNotes');
                this.setState({ allNotes, firstFetch: true, needsUpdate: false });
                this.log('done with setState', 'getNotes');

                this.log('done with note parsing', 'getNotes');
            }
            catch(error) {
                alert(error);
            }
            this.log('finished note retrieval', 'getNotes');
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
            };

            try {
                this.log('before post', 'addNote');
                await postJson(url, jsonBody);
                this.log('after post', 'addNote');
                
                this.log('calling get notes', 'addNote');
                await this.getNotes();
                this.log('back from get notes', 'addNote')
            } catch (error) {
                alert(error);
            }
        }
    }

    async deleteNote(id) {
        const { serverAddress, username } = this.props;
        const { noteToBeDeleted } = this.state
        if (username && username !== '' && noteToBeDeleted) {
            const url = `${serverAddress}/deleteNote`;
            const jsonBody = {
                id: noteToBeDeleted,
                user: username
            }

            try {
                this.log('calling postJson', 'deleteNote');
                await postJson(url, jsonBody);
                this.log('done with postJson', 'deleteNote');

                this.log('calling get notes', 'deleteNote');
                await this.getNotes();
                this.log('back from get notes', 'deleteNote');
                
                this.hideDeleteNoteConfirmation();
            } catch (error) {
                alert(error);
            }
        }
    }

    showDeleteNoteConfirmation(id) {
        this.setState({ noteToBeDeleted: id, showDeleteConfirmation: true });
    }

    hideDeleteNoteConfirmation() {
        this.setState({ noteToBeDeleted: null, showDeleteConfirmation: false });
    }

    render() {
        const { allNotes, firstFetch, showDeleteConfirmation } = this.state;

        this.log('creating notes component', 'render');
        this.log('notes at this point: ' + _.map(allNotes, 'name'), 'render');
        const notes = renderNotes(allNotes, 
            this.addNote, 
            this.showDeleteNoteConfirmation, 
            this.updateNote);
        this.log('notes component created', 'render');

        return <ThemeProvider theme={colorTheme}>
            <AppContent>
                { showDeleteConfirmation && <DeleteConfirmationBox deleteNote={this.deleteNote} 
                    handleClose={this.hideDeleteNoteConfirmation} /> }
                { firstFetch && notes }
            </AppContent>
        </ThemeProvider>;
    }
}

const renderNotes = (allNotes, addNote, showDeleteNoteConfirmation, updateNote) => {
    let id = '';
    const notes = [];
    _.forEach(allNotes, (note) => {
        id = `note${note.id}`;
        notes.push(<Note key={id} 
            noteId={id} 
            step={note.type} 
            content={note}
            showDeleteNoteConfirmation={showDeleteNoteConfirmation}
            updateNote={updateNote} />);
    });
    id = 'note_temp';
    notes.push(unititializedNote(addNote, id));
    return <React.Fragment>
        {notes}
    </React.Fragment>;
};

const unititializedNote = (addNote, id) => {
    const content = {id, name: ''};
    return <Note key={id} noteId={id} step="uninitialized" addNote={addNote} content={content} />;
};