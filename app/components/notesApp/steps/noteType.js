import React from 'react';

import styles from '../notes.less';

export const NoteType = (props) => {
    return <div className={styles.noteType}>
        <div className={styles.noteContainer}>
            <div className={styles.noteContent} contentEditable={true}></div>
        </div>
    </div>;
};