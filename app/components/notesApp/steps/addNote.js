import React from 'react';

import Icon from '../../icons/icon';

import styles from '../notes.less';

export const AddNote = (props) => {
    const { changeStep } = props;

    return <Icon iconClass="fa fa-plus-circle" 
        iconStyles={styles.addNoteIcon} noWrapper={true} onClick={() => changeStep('chooseType')} />;
};
