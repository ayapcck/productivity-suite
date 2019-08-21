import React from 'react';
import _ from 'lodash';

import Note from './note';
import { NoteSteps } from './steps';
import { postJson, getJson } from '../utilities/jsonHelpers';

import styles from './notes.less';

export default class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
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

                this.setState({ notes });
            }).catch(error => alert(error));
        } else {
            this.setState({ notes: [] });
        }
    }

    render() {
        const { notes } = this.state;

        return <div className={styles.notesAppContent}>
            <Note step='list' content={notes[0]} />
        </div>;
    }
}