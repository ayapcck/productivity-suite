import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routes } from '../../routes/routeHelper';
import { device } from '../../config/device';

import { capitalizeUsername } from '../utilities/stringUtils';

const ExpandIcon = styled.i`
    font-size: x-small;
    margin: auto 0;
`;

const MenuContainer = styled.div`
    visibility: ${ ({ showMenu }) => showMenu ? `visible` : `hidden`};
    height: 100%;
    position: absolute;
    transition: 0.5s;
    width: 100%;
    z-index: 10;
`;

const MenuElement = styled.div`
    color: ${(props) => props.expanded ? props.theme.inputFocusColor : props.theme.textColor};
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
    background-color: ${ ({ theme, showMenu }) => showMenu ? `${theme.opaqueOverlay}` : `rgba(0,0,0,0)`};
    height: 100%;
    position: absolute;
    transition: 0.5s;
    width: 100%;
    /* visibility: ${ ({ showMenu }) => showMenu ? `visible` : `hidden`}; */
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
    overflow: hidden;
    position: fixed;
    transition: 0.5s;
    width: ${ ({ showMenu }) => showMenu ? `25%` : `0`};

    & a, a:active {
        text-decoration: none;
    }

    @media ${device.mobileL} {
        width: ${ ({ showMenu }) => showMenu ? `50%` : `0`};;
    }
`;

const SubMenu = styled.div`
    display: ${ ({ expanded }) => !expanded && `none`};
`;

const SubMenuElement = styled(MenuElement)`
    color: ${(props) => props.theme.textColor};
    padding: 5px 10px 5px 45px;
`;

export const NavigationMenu = ({ hideMenu, loginLogoutClick, showMenu, userLoggedIn }) => {
    const [ appsExpanded, setAppsExpanded ] = useState(false);
    const [ accountExpanded, setAccountExpanded ] = useState(false);

    const handleClose = () => {
        hideMenu();
        setAppsExpanded(false);
        setAccountExpanded(false);
    };

    const handleLoginMenuOpen = () => {
        handleClose();
        loginLogoutClick();
    }

    return <MenuContainer showMenu={showMenu}>
        <ScreenOverlay onClick={handleClose} showMenu={showMenu} />
        <StyledMenu showMenu={showMenu}>
            <StyledCloseIcon className="fa fa-times" onClick={handleClose} aria-hidden="true"/>
            <Link to="/">
                <MenuElement>Home</MenuElement>
            </Link>
            <MenuElement expanded={appsExpanded} onClick={() => setAppsExpanded(!appsExpanded)}>
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
            <MenuElement expanded={accountExpanded} onClick={() => setAccountExpanded(!accountExpanded)} >
                { accountExpanded ? 
                    <MinimizeIcon className="fa fa-minus" aria-hidden="true" /> :
                    <ExpandIcon className="fa fa-plus" aria-hidden="true" /> }
                <MenuText>Account</MenuText>
            </MenuElement>
            <SubMenu expanded={accountExpanded}>
                <SubMenuElement onClick={handleLoginMenuOpen}>
                    {userLoggedIn ? 'Logout' : 'Login/Create'}
                </SubMenuElement>
                <SubMenuElement>Settings</SubMenuElement>
            </SubMenu>
        </StyledMenu>
    </MenuContainer>;
};