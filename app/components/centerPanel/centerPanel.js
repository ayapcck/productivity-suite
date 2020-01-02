import React from 'react';
import styled from 'styled-components';

const CenteredBox = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
	border: 2px solid ${(props) => props.theme.accentColor};
	border-radius: 25px;
	box-sizing: border-box;
	color: ${(props) => props.theme.textColor};
	display: flex;
	flex-direction: column;
	grid-row: 2;
	grid-column: 2;
	height: 100%;
	user-select: none;
	width: 100%;
`;

export const CenterPanel = (props) => {
  const { content, id } = props;
  return <CenteredBox id={id}>
    {content}
  </CenteredBox>
};