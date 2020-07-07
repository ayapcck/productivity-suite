import React from 'react';
import styled from 'styled-components';

import CenterPanel from '../centerPanel/centerPanel';
import FormButton from '../formElements/button';
import { CloseIcon } from '../icons/closeIcon';

const ButtonContainer = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
`;

const DeleteConfirmation = styled.div`
    align-items: center;
    display: grid;
    grid-template-rows: 60% 1fr;
    height: 100%;
    justify-content: center;
`;

const DeleteText = styled.span`
    font-size: x-large;
    margin: 0 auto;
    text-align: center;
    width: 75%;
`;

export const DeleteConfirmationBox = (props) => {
    const { deleteNote, handleClose } = props;

    const deleteConfirmation = <React.Fragment>
        <CloseIcon onClick={handleClose} />
        <DeleteConfirmation>
            <DeleteText>Are you sure you want to delete this note?</DeleteText>
            <ButtonContainer>
                <FormButton onClick={deleteNote} text="Delete" />
            </ButtonContainer>
        </DeleteConfirmation>
    </React.Fragment>

    return <CenterPanel content={deleteConfirmation} 
        handleClose={handleClose}
        heightSpacing="35%"
        id="deleteNoteConfirmation"
        widthSpacing="35%" />;
};