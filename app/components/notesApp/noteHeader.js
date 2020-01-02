import React from 'react';
import styled from 'styled-components';

import utilStyles from '../utilities/utilities.less';

const DeleteNoteButton = styled.i`
    right: 0;
    margin: 0 10px 0 0;
    position: absolute;
    &:hover {
        color: ${(props) => props.theme.textColor};
        cursor: pointer;
    }
`;

const EditNoteButton = styled.i`
    left: 0;
    margin: 0 0 0 10px;
    position: absolute;
    &:hover {
        color: ${(props) => props.theme.textColor};
        cursor: pointer;
    }
    ${ ({ editing, theme }) => editing && `
        color: ${theme.textColor};
    `}
`;

const HeaderContainer = styled.div`
    border-radius: 20px 20px 0 0;
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
        <EditNoteButton className="far fa-edit" editing={editing} 
            onClick={onEditClick}></EditNoteButton>
        <DeleteNoteButton className="far fa-trash-alt"></DeleteNoteButton>
    </HeaderContainer>;
};