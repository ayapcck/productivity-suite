import React, { useState } from 'react';
import styled from 'styled-components';

import { device } from '../../config/device';

const monthlyExpenseItems = {
    date: {
        content: '',
        required: true,
        title: 'Date'
    }, 
    expenses: {
        content: '',
        required: true,
        title: 'Expenses'
    },
    track: {
        content: '',
        required: false,
        title: 'Track'
    }
};

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
        <p>
            To add a sheet to a sheet to an existing spreadsheet, you need a 'use' tag. Expand the below entires for more information on the individual tags of this DSL.
        </p>
        <LanguageBlock content={<UseContent />} title='Use' />
        <LanguageBlock content={<SheetTypeContent />} title='SheetType' />
    </DSLHowToContent>
</DSLHowToContainer>;

const LanguageBlock = ({ content, title }) => {
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

const UseContent = () => <React.Fragment>
    <p>Format:</p>
    <p>use spreadsheet XXXXX</p>
    <p>{`<SheetType>`}</p>
    <p>use</p>
</React.Fragment>;

const SheetTypeContent = () => <React.Fragment>
    <p>SheetType: one of the following</p>
    <MonthlyExpenses />
    <p>Format:</p>
    <p>{`add <SheetType>`}</p>
    <p>{`<SheetProperties>`}</p>
    <p>add</p>
</React.Fragment>;

const MonthlyExpenses = () => <LanguageBlock title='Monthly Expenses'
    content={<MonthlyExpensesContent />}/>;

const MonthlyExpensesContent = () => <React.Fragment>
        <p>SheetType: monthlyExpenses</p>
        <p>SheetProperties: the following properties</p>
        <MonthlyExpenseProperties />
    </React.Fragment>

const MonthlyExpenseProperties = () => {
    return _.map(monthlyExpenseItems, (item) => {
        const title = item.required ? `${item.title} - required` : item.title;

        return <LanguageBlock key={`${item.title}_langElt`} 
            content={item.content} title={title} />
    });
}
