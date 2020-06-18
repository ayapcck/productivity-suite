import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { BuildButton } from './buildButton';
import { ContentExplanation } from './contentExplanation';
import { DSLEntry, getDSLContent } from './DSLEntry';

import { colorTheme } from '../../colors';

const AppContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    display: grid;
    grid-template-columns: 30% 1fr;
    height: 100%;
`;

const LeftContainer = styled.div`
    border-color: ${(props) => props.theme.accentColor};
    border-style: solid;
    border-width: 0 1px 0 0;
    box-sizing: border-box;
    grid-column: 1;
    height: 100%;
    overflow: hidden;
    padding: 10px;
`;

const RightContainer = styled.div`
    align-items: center;
    border-color: black;
    border-style: solid;
    border-width: 0 0 0 1px;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    justify-content: center;
`;

const build = () => {
    content = getDSLContent();
}

export default class BudgetApp extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        console.log(__dirname);
        return <ThemeProvider theme={colorTheme}>
            <AppContent>
                <LeftContainer>
                    <ContentExplanation />
                </LeftContainer>
                <RightContainer>
                    <DSLEntry />
                    <BuildButton onClick={() => build()} />
                </RightContainer>
            </AppContent>
        </ThemeProvider>;
    }
}