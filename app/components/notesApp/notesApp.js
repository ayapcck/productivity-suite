import React from 'react';

import Note from './note';
import { NoteSteps } from './steps';

import styles from './notes.less';

export default class NotesApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.notesAppContent}>
            <Note step='list' />
        </div>;
    }
}