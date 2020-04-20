import React from 'react';
import styled from 'styled-components';

import CenterPanel from '../centerPanel/centerPanel';
import FormButton from '../forms/button';

const ButtonContainer = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
`;

const DeleteButton = styled.button`
    border-radius: 15px;
    height: 35%;
    width: 50%;

    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
    }
`;

const DeleteConfirmation = styled.div`
    align-items: center;
    display: grid;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;

export const DeleteConfirmationBox = (props) => {
    const { handleClose } = props;

    const deleteConfirmation = <DeleteConfirmation>
        Are you sure you want to delete this note?
        <ButtonContainer>
            <FormButton />
        </ButtonContainer>
    </DeleteConfirmation>

    return <CenterPanel content={deleteConfirmation} 
        handleClose={handleClose}
        heightSpacing="35%"
        id="deleteNoteConfirmation"
        widthSpacing="35%" />;
};