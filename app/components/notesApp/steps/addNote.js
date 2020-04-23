import React from 'react';
import styled from 'styled-components';

const StyledPlus = styled.i`
    font-size: 5em;
    &:hover {
        color: ${(props) => props.theme.onHoverColor};
        cursor: pointer;
    }
    &:active {
        color: ${(props) => props.theme.onActiveColor};
    }
`;

export const AddNote = (props) => {
    const { changeStep } = props;

    return <StyledPlus className="fa fa-plus-circle"
        onClick={() => changeStep('chooseType')}></StyledPlus>;
};
