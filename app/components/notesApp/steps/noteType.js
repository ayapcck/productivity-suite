import React from 'react';

import styles from '../notes.less';
import utilStyles from '../../utilities/utilities.less';

export const NoteType = (props) => {
    return <div className={styles.noteType}>
        <div className={utilStyles.spanHeader}>Note</div>
        <div className={styles.noteContent}></div>
    </div>;
};