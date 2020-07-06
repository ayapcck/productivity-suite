import React, { useState } from 'react';
import styled from 'styled-components';

import { UseBlock } from './useBlock';
import { UseOptions } from './useOptions';

import { device } from '../../../config/device';

const CloseIcon = styled.i`
    color: ${(props) => props.theme.textColor};
    position: absolute;
    right: 6%;

    &:hover,:active {
        color: ${(props) => props.theme.inputFocusColor};
    }

    @media ${device.tablet} {
        display: none;
    }
`;

const DSLHowToContent = styled.div`
    color: ${(props) => props.theme.textColor};
    height : 100%;
    overflow: auto;
`;

const DSLHowToContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.borderColor};
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 100%;
    padding: 5px 5px 10px 5px;
    overflow: hidden;

    & p {
        margin: 0;
        padding: 10px;
    }

    @media ${device.mobileL} {
        height: 90%;
        margin: auto;
        position: relative;
        width: 90%;
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

export const ContentExplanation = ({ closeMenu }) => <DSLHowToContainer>
    <CloseIcon className="fa fa-times" aria-hidden="true" onClick={closeMenu} />
    <DSLHowToContent>
        <InitialDescription>
            To modify an existing spreadsheet, you need a 'use' tag. Expand the below entires for more information on the individual tags of this DSL.
        </InitialDescription>
        <UseBlock />
        <UseOptions />
    </DSLHowToContent>
</DSLHowToContainer>;

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
