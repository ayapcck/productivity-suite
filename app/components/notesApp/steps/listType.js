import React from 'react';

import styles from '../notes.less';
import utilStyles from '../../utilities/utilities.less';

export const ListType = (props) => {
    return <div className={styles.listType}>
        <div className={utilStyles.spanHeader}>List</div>
        <div className={styles.noteContent}></div>
    </div>;
};