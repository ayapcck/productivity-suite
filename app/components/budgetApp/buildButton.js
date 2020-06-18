import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${(props) => props.theme.buttonColor};
    border-radius: 10px;
    border-style: solid;
    border-width: 3px;
    font-size: xx-large;
    font-weight: bold;
    margin: 15px;

    &:hover {
        background-color: ${(props) => props.theme.onHoverColor};
        cursor: pointer;
    }
    &:active {
        background-color: ${(props) => props.theme.onActiveColor};
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
    }
`;

export const BuildButton = ({ onClick }) => {
    return <StyledButton onClick={onClick}>BUILD</StyledButton>;
}