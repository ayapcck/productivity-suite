import React from 'react';
import styled from 'styled-components';

const NoteContent = styled.div`
    border-radius: 15px;
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
    text-align: left;
    white-space: pre;
    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
    }
`;

export const NoteType = (props) => {
    const { content, editing } = props;

    return <NoteContent className="noteContent" contentEditable={editing}
        suppressContentEditableWarning="true">{content.content}</NoteContent>;
};