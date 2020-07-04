import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routes } from '../../routes/routeHelper';

import { capitalizeUsername } from '../utilities/stringUtils';

const ExpandIcon = styled.i`
    font-size: x-small;
    margin: auto 0;
`;

const MenuContainer = styled.div`
    display: ${ ({ showMenu }) => !showMenu && `none`};
    height: 100%;
    position: absolute;
    width: 100%;
`;

const MenuElement = styled.div`
    color: ${(props) => props.theme.textColor};
    display: flex;
    padding: 5px 0 5px 10px;
    user-select: none;

    &:hover {
        color: ${(props) => props.theme.inputFocusColor};
        cursor: pointer;
    }
`;

const MenuText = styled.span`
    padding: 0 0 0 10px;
`;

const MinimizeIcon = styled(ExpandIcon)``;

const ScreenOverlay = styled.div`
    background-color: ${(props) => props.theme.textColor};
    height: 100%;
    position: absolute;
    opacity: 0.5;
    width: 100%;
`;

const StyledCloseIcon = styled.i`
    margin: 0 0 0 auto;
    padding: 5px;

    &:hover {
        color: black;
        cursor: pointer;
    }
`;

const StyledMenu = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    width: 25%;

    & a, a:active {
        text-decoration: none;
    }
`;

const SubMenu = styled.div`
    display: ${ ({ expanded }) => !expanded && `none`};
`;

const SubMenuElement = styled(MenuElement)`
    padding: 5px 45px;
`;

export const NavigationMenu = ({ hideMenu, showMenu }) => {
    const [ appsExpanded, setAppsExpanded ] = useState(false);
    const [ accountExpanded, setAccountExpanded ] = useState(false);

    return <MenuContainer showMenu={showMenu}>
        <ScreenOverlay onClick={hideMenu} />
        <StyledMenu>
            <StyledCloseIcon className="fa fa-times" onClick={hideMenu} aria-hidden="true"/>
            <Link to="/">
                <MenuElement>Home</MenuElement>
            </Link>
            <MenuElement onClick={() => setAppsExpanded(!appsExpanded)}>
                { appsExpanded ? 
                    <MinimizeIcon className="fa fa-minus" aria-hidden="true" /> :
                    <ExpandIcon className="fa fa-plus" aria-hidden="true" /> }
                <MenuText>Apps</MenuText>
            </MenuElement>
            <SubMenu expanded={appsExpanded}>
                {_.map(routes, (val, key) => key !== 'index' && (<Link to={val.address}>
                        <SubMenuElement>{val.name}</SubMenuElement>
                    </Link>))}
            </SubMenu>
            <MenuElement onClick={() => setAccountExpanded(!accountExpanded)} >
                { accountExpanded ? 
                    <MinimizeIcon className="fa fa-minus" aria-hidden="true" /> :
                    <ExpandIcon className="fa fa-plus" aria-hidden="true" /> }
                <MenuText>Account</MenuText>
            </MenuElement>
            <SubMenu expanded={accountExpanded}>
                <SubMenuElement>Login/Logout</SubMenuElement>
                <SubMenuElement>Settings</SubMenuElement>
            </SubMenu>
        </StyledMenu>
    </MenuContainer>;
};