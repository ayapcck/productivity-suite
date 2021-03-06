import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import { BuildButton } from './buildButton';
import { ContentExplanation } from './contentExplanation/contentExplanation';
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
    display: flex;
    flex-direction: row-reverse;
    height: 100%;

    @media ${device.mobileL} {
        flex-direction: column;
    }
`;

const DSLEntryContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: 100%;

    @media ${device.tablet} {
        border-color: ${(props) => props.theme.borderColor};
        border-style: solid;
        border-width: 0 0 0 2px;
        width: 70%;
    }
`;

const ExplanationIcon = styled.i`
    color: ${(props) => props.theme.textColor};
    float: right;
    font-size: x-large;
    padding: 10px;

    @media ${device.tablet} {
        display: none;
    }
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

        this.state = {
            expandExplanation: false,
            showExplanation: false
        }
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.onload = () => handleClientLoad();
        document.body.appendChild(script);
    }

    render() {
        const { showExplanation } = this.state;

        return <ThemeProvider theme={colorTheme}>
            <AppContent>
                <ContentExplanation showExplanation={showExplanation} 
                    hideExplanation={() => this.setState({ showExplanation: false })} />
                <DSLEntryContainer>
                    <div>
                        <ExplanationIcon className="fa fa-question-circle-o" aria-hidden="true" 
                            onClick={() => this.setState({ showExplanation: true })} />
                    </div>
                    <DSLEntry />
                    <BuildButton onClick={() => build()} />
                    <button id="authorize_button">Authorize</button>
                    <button id="signout_button">Sign out</button>
                </DSLEntryContainer>
            </AppContent>
        </ThemeProvider>;
    }
}