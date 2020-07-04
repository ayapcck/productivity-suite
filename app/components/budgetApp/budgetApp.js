import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { BuildButton } from './buildButton';
import { ContentExplanation } from './contentExplanation';
import { DSLEntry, getDSLContent } from './DSLEntry';
import { dslLiterals } from './DSL/dslLiterals';
import { EvaluateVisitor } from './DSL/evaluateVisitor';
import { handleClientLoad } from './sheetsAPI/setup';
import { Parser } from './DSL/parser';
import { Tokenizer } from './DSL/tokenizer';

import { colorTheme } from '../../colors';
import { device } from '../../config/device';

const AppContent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    display: grid;
    grid-template-columns: 30% 1fr;
    height: 100%;

    @media ${device.mobileL} {
        display: flex;
        flex-direction: column;
    }
`;

const ExplanationContainer = styled.div`
    border-color: ${(props) => props.theme.accentColor};
    border-style: solid;
    border-width: 0 1px 0 0;
    box-sizing: border-box;
    grid-column: 1;
    height: 100%;
    overflow: hidden;
    padding: 10px;

    @media ${device.mobileL} {
        display: none;
    }
`;

const DSLEntryContainer = styled.div`
    border-color: black;
    border-style: solid;
    border-width: 0 0 0 1px;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: 100%;
`;

const build = () => {
    const tokenizer = Tokenizer();
    const dslContent = getDSLContent();
    tokenizer.createTokenizer(dslContent, dslLiterals);
    tokenizer.tokenize();
    const AST = Parser(tokenizer).parse();
    AST.accept(EvaluateVisitor().visitProgram);
}

export default class BudgetApp extends React.Component {
    constructor(props) {
        super (props);
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.onload = () => handleClientLoad();
        document.body.appendChild(script);
    }

    render() {
        console.log(__dirname);
        return <ThemeProvider theme={colorTheme}>
            <AppContent>
                <ExplanationContainer>
                    <ContentExplanation />
                </ExplanationContainer>
                <DSLEntryContainer>
                    <DSLEntry />
                    <BuildButton onClick={() => build()} />
                    <button id="authorize_button">Authorize</button>
                    <button id="signout_button">Sign out</button>
                </DSLEntryContainer>
            </AppContent>
        </ThemeProvider>;
    }
}