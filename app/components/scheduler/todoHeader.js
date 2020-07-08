import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	background-color: ${(props) => props.theme.opaqueLightAccent};
	border-color: ${(props) => props.theme.borderColor};
	border-style: solid;
    border-width: 0 0 2px 0;
	color: ${(props) => props.theme.backgroundColor};
	font-size: x-large;
	font-weight: bold;
	padding: 10px;
	text-align: center;

    ${ ({ side }) => side === 'right' ?
        `border-radius: 15px 0 0 0;` :
        `border-radius: 0 15px 0 0;`
    }
`;

export const TodoHeader = ({ side, title }) => <Header side={side}>{title}</Header>;