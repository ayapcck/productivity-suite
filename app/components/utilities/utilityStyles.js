import React from 'react';
import styled from 'styled-components';

export const SpanHeader = styled.span`
	align-items: center;
	background-color: ${(props) => props.theme.lightPurple};
	border-color: ${(props) => props.theme.accentColor};
	border-style: solid;
	border-radius: 15px 15px 0 0;
	border-width: 0 0 2px 0;
	color: ${(props) => props.theme.darkTextColor};
	display: inline-flex;
	grid-row: 1;
	justify-content: center;
	padding: 5px 0;
	user-select: none;
`;