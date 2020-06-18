import React from 'react';
import styled from 'styled-components';

// import { action } from '@storybook/addon-actions';

import { DSLEntry } from '../DSLEntry';

const FullHeightContainer = styled.div`
    align-items: center;
    background-color: ${(props) => props.theme.backgroundColor};
    display: flex;
    height: 100vh;
    justify-content: center;
`;

export default {
    title: `Budget Helper/DSL Text Entry`,
    component: DSLEntry,
};

export const Basic = () => (
    <FullHeightContainer>
        <DSLEntry />
    </FullHeightContainer>
);