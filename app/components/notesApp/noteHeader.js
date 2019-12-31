import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import Icon from '../icons/icon';

import styles from './notes.less';
import utilStyles from '../utilities/utilities.less';

const HeaderContainer = styled.div`
    box-sizing: border-box;
    height: 100%!important;
    position: relative;
`;

const NameInput = styled.input`
    background-color: ${props => props.theme.lightPurple};
    border-color: ${props => props.theme.lightPurple};
    border-radius: 15px;
    border-style: solid;
    border-width: 2px;
    margin: 0 5px 0 0;
    padding: 2.5px;
    text-align: center;

    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${props => props.theme.inputFocusColor};
    }
`;

export const NoteHeader = (props) => {
    const { editing, listName, onEditClick, onNameChange } = props;

    return <HeaderContainer className={utilStyles.spanHeader}>
        <NameInput type="text" value={listName}
            disabled={!editing} onChange={onNameChange} props={props} />
        <Icon iconClass="far fa-edit" noWrapper={true} 
            iconStyles={classnames(styles.editNoteButton, editing ? styles.editNoteButtonActive : '')} 
            onClick={onEditClick} />
    </HeaderContainer>;
};