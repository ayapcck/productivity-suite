import React from 'react';

import styles from '../notes.less';

export const ChooseNote = (props) => {
    const { changeStep } = props;

    return <React.Fragment>
        <div className={styles.chooseNoteOption}
            onClick={() => changeStep('list')}>List</div>
        <div className={styles.chooseNoteOption}
            onClick={() => changeStep('note')}>Note</div>
    </React.Fragment>;
};