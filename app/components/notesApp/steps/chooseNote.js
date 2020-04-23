import React from 'react';
import styled from 'styled-components';

const Option = styled.div`
    align-items: center;
    border-radius: 15px;
    display: grid;
    font-size: 2em;
    height: 100%;
    user-select: none;
    &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.onHoverColor};
        color: #000000;
    }
    &:active {
        background-color: ${(props) => props.theme.onActiveColor};
        color: #000000;
    }
`;

export const ChooseNote = (props) => {
    const { changeStep } = props;

    return <React.Fragment>
        <Option onClick={() => changeStep('list')}>List</Option>
        <Option onClick={() => changeStep('note')}>Note</Option>
    </React.Fragment>;
};