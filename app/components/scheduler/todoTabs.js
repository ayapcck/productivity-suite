import React, { useState } from 'react';
import styled from 'styled-components';

const Extra = styled.div`
    font-size: small;
    margin: 0 auto;
`;

const StyledTab = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.borderColor};
    border-radius: 15px 15px 0 0;
    border-style: solid;
    border-width: 2px 2px 0 2px;
    box-sizing: border-box;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 2.5px;
    user-select: none;
    width: 25%;

    &:first-of-type {
        margin-left: auto;
    }
    &:last-of-type {
        margin-right: auto;
    }

    ${ ({ active, theme }) => active && `
        background-color: ${theme.opaqueLightAccent};
        color: ${theme.backgroundColor};
    `}
`;

const TabBarContainer = styled.div`
    border-color: ${(props) => props.theme.borderColor};
    border-style: solid;
    border-width: 0 0 2px 0;
    display: flex;
    height: 10%;
    width: -webkit-fill-available;
`;

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const Title = styled.div`
    font-size: medium;
    font-weight: bold;
    margin: 0 auto;
`;

export const TodoTabs = ({ showTabHeaderContent, tabHeaders }) => {
    const [ activeTab, setActiveTab ] = useState(tabHeaders[0].name);

    const tabClick = (title) => {
        setActiveTab(title);
        showTabHeaderContent(title);
    }

    const tabs = tabHeaders.map((val, index) => {
        let active = activeTab === val.name;
        return <Tab key={index} active={active} onClick={tabClick} 
            title={val.name} val={val.getValue()} />;
    });

    return <TabBarContainer>
        {tabs}
    </TabBarContainer>;
};

export const Tab = ({ active, onClick, title, val }) => {
    return <StyledTab active={active} onClick={() => onClick(title)}>
        <TabContent>
            <Title>{title}</Title>
            <Extra>{val}</Extra>
        </TabContent>
    </StyledTab>;
};