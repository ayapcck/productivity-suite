import React from 'react';
import styled from 'styled-components';

const DSLTextEntry = styled.textarea`
    background-color: ${(props) => props.theme.lightGrey};
    border-radius: 10px;
    box-sizing: border-box;
    height: 90%;
    padding: 10px;
    width: 95%;

    &:focus {
        outline: 0;
        box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
    }
`;

const DSLEntryContainer = styled.div`
    align-items: center;
    border-color: ${(props) => props.theme.accentColor};
    border-radius: 15px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    display: flex;
    height: 60%;
    justify-content: center;
    width: 90%;
`;

export const DSLEntry = () => {
    return <DSLEntryContainer>
        <DSLTextEntry id="DSLEntryArea"></DSLTextEntry>
    </DSLEntryContainer>;
}

export const getDSLContent = () => {
    return document.getElementById("DSLEntryArea").value;
}