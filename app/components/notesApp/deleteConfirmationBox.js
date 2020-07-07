import React from 'react';
import styled from 'styled-components';

import FormButton from '../formElements/button';
import { CloseIcon } from '../icons/closeIcon';

import { device } from '../../config/device';

const ButtonContainer = styled.div`
    display: flex;
    margin: auto;
    width: 100%;
`;

const ContentWrapper = styled.div`
    display: flex;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const DeleteConfirmation = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 25px;
    color: ${(props) => props.theme.textColor};
    display: flex;
    flex-direction: column;
    height: 35%;
    margin: auto;
    width: 35%;
    z-index: 1;

    @media ${device.mobileL} {
        height: 35%;
        width: 80%;
    }
`;

const DeleteText = styled.span`
    font-size: x-large;
    margin: auto;
    text-align: center;
    width: 75%;
`;

const ScreenOverlay = styled.div`
    background-color: ${(props) => props.theme.opaqueOverlay};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

export const DeleteConfirmationBox = (props) => {
    const { deleteNote, handleClose } = props;

    return <ContentWrapper>
        <ScreenOverlay onClick={handleClose} />
        <DeleteConfirmation>
            <CloseIcon onClick={handleClose} />
            <DeleteText>Are you sure you want to delete this note?</DeleteText>
            <ButtonContainer>
                <FormButton onClick={deleteNote} text="Delete" />
            </ButtonContainer>
        </DeleteConfirmation>
    </ContentWrapper>;

    // return <CenterPanel content={deleteConfirmation} 
    //     handleClose={handleClose}
    //     heightSpacing="35%"
    //     id="deleteNoteConfirmation"
    //     widthSpacing="35%" />;
};