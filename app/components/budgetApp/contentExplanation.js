import React from 'react';
import styled from 'styled-components';

import { device } from '../../config/device';

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
    height : 100%;
    overflow: auto;
`;

const DSLHowToContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.accentColor};
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 100%;
    padding: 5px 5px 10px 5px;
    overflow: hidden;

    & p {
        margin: 5px;
    }

    @media ${device.mobileL} {
        height: 90%;
        margin: auto;
        position: relative;
        width: 90%;
    }
`;

const LanguageBlock = styled.div``;

const TokenTitle = styled.p``;

export const ContentExplanation = ({ closeMenu }) => <DSLHowToContainer>
    <CloseIcon className="fa fa-times" aria-hidden="true" onClick={closeMenu} />
    <DSLHowToContent>
        <p>
            use spreadsheet XXXXX <br /><br />
            add monthly_budget <br /><br />
            date June 2020 <br />
            expenses [ "eating out", "something", "else" ] <br /><br />
            track [ "eating out"] <br /><br />
            add <br /><br />
            use
        </p>
        <LanguageBlock>
            <TokenTitle>use</TokenTitle>
        </LanguageBlock>
        <LanguageBlock>
            <TokenTitle>add</TokenTitle>
        </LanguageBlock>
    </DSLHowToContent>
</DSLHowToContainer>;