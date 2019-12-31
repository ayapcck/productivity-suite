import React from 'react';
import classnames from 'classnames';

import styles from '../notes.less';

export const NoteType = (props) => {
    const { content, editing } = props;

    return <div className={styles.noteType}>
        <div className={styles.noteContainer}>
            <div className={classnames(styles.noteContent, 'noteContent')} contentEditable={editing}
                suppressContentEditableWarning="true">{content.content}</div>
        </div>
    </div>;
};