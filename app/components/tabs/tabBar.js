import React from 'react';
import styled from 'styled-components';

const Extra = styled.div`
    font-size: small;
`;

const StyledTab = styled.div`
    align-items: center;
    border-color: ${(props) => props.active ? 
        props.theme.lightAccentColor :
        props.theme.borderColor};
    border-radius: 15px 15px 0 0;
    border-style: solid;
    border-width: 2px 2px 0 2px;
    box-sizing: border-box;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    user-select: none;
    width: 25%;
`;

const TabBarContainer = styled.div`
    border-color: ${(props) => props.theme.borderColor};
    border-style: solid;
    border-width: 0 0 2px 0;
    display: flex;
    height: 10%;
    justify-content: center;
    width: -webkit-fill-available;
`;

const Title = styled.div`
    font-size: medium;
`;

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.tabHeaders[0].name
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(title) {
        this.setState({ activeTab: title });
        this.props.showTabHeaderContent(title);
    }

    render() {
        let tabs = this.props.tabHeaders.map((val, index) => {
            let active = this.state.activeTab === val.name;
            return <Tab key={index} active={active} onClick={this.setActiveTab} 
                title={val.name} val={val.getValue()} />;
        });

        let tabBar = <TabBarContainer>
            {tabs}
        </TabBarContainer>;
        
        return tabBar;
    }
}

const Tab = ({ active, onClick, title, val }) => {
    return <StyledTab active={active} onClick={() => onClick(title)}>
        <Title>{title}</Title>
        <Extra>{val}</Extra>
    </StyledTab>;
};