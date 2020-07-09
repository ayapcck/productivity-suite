import React, { useState } from 'react';
import styled from 'styled-components';

import { UseBlock } from './useBlock';
import { UseOptions } from './useOptions';

import { device } from '../../../config/device';

const CloseIcon = styled.i`
    color: ${(props) => props.theme.textColor};
    position: absolute;
    right: 3%;
    top: 3%;

    &:hover,:active {
        color: ${(props) => props.theme.inputFocusColor};
    }

    @media ${device.laptopL} {
        visibility: hidden;
    }

    @media ${device.mobileL} {
        visibility: visible;
    }
`;

const DSLHowToContent = styled.div`
    color: ${(props) => props.theme.textColor};
    height : 100%;
    overflow: auto;
`;

const DSLHowToContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    box-sizing: border-box;
    height: 100%;
    padding: 5px 5px 10px 5px;
    overflow: hidden;

    & p {
        margin: 0;
        padding: 10px;
    }

    @media ${device.mobileL} {
        border-radius: 15px;
        height: 95%;
        margin: auto;
        position: relative;
        width: 95%;
    }
`;

const ExpandExplanationMenuIcon = styled.i`
    margin: auto;
`;

const ExpandIconContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.borderColor};
    border-radius: 0 10px 10px 0;
    border-style: solid;
    border-width: 2px 2px 2px 0;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    display: flex;
    height: 35px;
    position: absolute;
    right: 0;
    top: 20px;
    width: 28px;

    &:hover {
        color: black;
    }

    @media ${device.laptopL} {
        visibility: visible;
    }

    @media ${device.mobileL} {
        visibility: hidden;
    }
`;

const ExplanationContainer = styled.div`
    box-sizing: border-box;
    grid-column: 1;
    height: 100%;
    overflow: hidden;
    padding: 10px;

    @media ${device.laptopL} {
        flex: 1;
        margin-right: -30px;
        padding-right: 30px;
        position: relative;
    }

    @media ${device.mobileL} {
        display: flex;
        height: 100%;
        left: 0;
        margin-right: 0;
        padding-right: 10px;
        position: absolute;
        top: 0;
        width: 100%;
    }
`;

const ExpandIcon = styled.i`
    font-size: small;
    padding: 0 5px 0 0;
`;
const MinimizeIcon = styled(ExpandIcon)``;

const InitialDescription = styled.p`
    padding: 10px 15px!important;
`;

const MenuWrapper = styled.div``;

const ScreenOverlay = styled.div`
    background-color: ${ ({ theme, expandExplanation }) => expandExplanation ? `${theme.opaqueOverlay}` : `rgba(0,0,0,0)`};
    height: 94%;
    left: 0;
    position: absolute;
    transition: 1s;
    width: 100%;
    visibility: ${ ({ expandExplanation }) => expandExplanation ? `visible` : `hidden`};
`;

const StyledBlock = styled.div`
    border-color: ${(props) => props.theme.backgroundColor};
    border-style: solid;
    border-width: 1px 1px;
    margin: 0 10px 0 5px;
    padding: 5px 15px 5px 10px;

    &:hover {
        border-color: ${(props) => props.theme.borderColor};
        border-radius: 15px;
        border-width: 1px;
        box-shadow: 3px 2px ${(props) => props.theme.mediumGrey};
    }
`;

const TokenTitle = styled.p`
    margin: 10px;
`;

const ExplanationPositionedParent = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.borderColor};
    border-style: solid;
    border-width: 0 2px 0 0;
    height: 94%;    
    left: 0;
    position: absolute;
    transition: 1s;
    width: ${ ({ expandExplanation }) => expandExplanation ? `60%` : `30%`};

    @media ${device.mobileL} {
        background-color: ${(props) => props.theme.opaqueOverlay};
        display: ${({ showExplanation }) => !showExplanation && `none` };
        width: 100%;
    }
`;

export const ContentExplanation = ({ hideExplanation, showExplanation }) => {
    const [ expandExplanation, setExpandExplanation ] = useState(false); 

    return <MenuWrapper >
        <ScreenOverlay expandExplanation={expandExplanation} 
            onClick={() => setExpandExplanation(!expandExplanation)} />
        <ExplanationPositionedParent showExplanation={showExplanation} expandExplanation={expandExplanation}>
            <ExplanationContainer showExplanation={showExplanation}>
                <ExpandIconContainer onClick={() => setExpandExplanation(!expandExplanation)}>
                    {expandExplanation ?
                        <ExpandExplanationMenuIcon className="fas fa-angle-double-left" /> :
                        <ExpandExplanationMenuIcon className="fas fa-angle-double-right" /> }  
                </ExpandIconContainer>
                <DSLHowToContainer>
                    <CloseIcon className="fa fa-times" aria-hidden="true" 
                        onClick={hideExplanation} />
                    <DSLHowToContent>
                        <InitialDescription>
                            To modify an existing spreadsheet, you need a 'use' tag. Expand the below entires for more information on the individual tags of this DSL.
                        </InitialDescription>
                        <UseBlock />
                        <UseOptions />
                    </DSLHowToContent>
                </DSLHowToContainer>
            </ExplanationContainer>
        </ExplanationPositionedParent>
    </MenuWrapper>;
};

export const LanguageBlock = ({ content, title }) => {
    const [ expandContent, setExpandContent ] = useState(false);

    return <StyledBlock key={`${title}_block`}>
        <TokenTitle key={`${title}_title`} onClick={() => setExpandContent(!expandContent)}>
            { expandContent ?
                <MinimizeIcon className="fa fa-minus" aria-hidden="true" /> :
                <ExpandIcon className="fa fa-plus" aria-hidden="true" /> }
            {title}
        </TokenTitle>
        { expandContent && content }
    </StyledBlock>;
};
