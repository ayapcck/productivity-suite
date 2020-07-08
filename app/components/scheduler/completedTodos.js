import React, { useState } from 'react';
import styled from 'styled-components';

import { TodoButton } from './todoButton';
import { TodoHeader } from './todoHeader';

import { device } from '../../config/device';

const ClearButtonContainer = styled.div`
	display: flex;
	height: 10%;
	margin-top: auto;
	overflow: hidden;
	transition-delay: 0.45s;
	width: 100%;

	@media ${device.tablet} {
		transition-delay: ${ ({ collapsed }) => collapsed ? `0s` : `0.45s`};
		visibility: ${ ({ collapsed }) => collapsed ? `hidden` : `visible`};
	}
`;

const CompletedIcon = styled.i`
	margin: auto;
	/* padding: 0 10px; */
`;

const CompletedTasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
	width: 100%;
`;

const CompletedTasksWrapper = styled.div`
	background-color: ${(props) => props.theme.backgroundColor};
	border-color: ${(props) => props.theme.borderColor};
	border-radius: 15px 0 0 0;
	border-style: solid;
	border-width: 0 0 0 2px;
	box-sizing: border-box;
	display: flex;
	margin-top: 10px;
	transition: 0.5s;
	width: 25%;

	@media ${device.tablet} {
		width: ${ ({ collapsed }) => collapsed ? `7%` : `35%`};
	}

	@media ${device.mobileL} {
		width: ${ ({ collapsed }) => collapsed ? `10%` : `90%`};
	}
`;

const FinishedTodo = styled.p`
	margin: 0;
	padding: 5px;
	width: 100%;

	&::before {
		content: '• ';
	}
`;

const FinishedItems = styled.div`
	box-sizing: border-box;
	color: ${(props) => props.theme.textColor};
	display: flex;
	flex-direction: column;
	overflow: auto;
	overflow-x: hidden;
	padding: 10px;
    width: 100%;

	@media ${device.tablet} {
		transition-delay: ${ ({ collapsed }) => collapsed ? `0s` : `0.45s`};
		visibility: ${ ({ collapsed }) => collapsed ? `hidden` : `visible`};
	}
`;

const Title = styled.span`	
	margin: auto;

	@media ${device.tablet} {
		transition-delay: ${ ({ collapsed }) => collapsed ? `0s` : `0.45s`};
		visibility: ${ ({ collapsed }) => collapsed ? `hidden` : `visible`};
	}
`;

export const CompletedTodos = (props) => {
	const [ collapsed, setCollapsed ] = useState(true);
	
	const { clearCompleted, elementDicts } = props;
	
    let finishedElements = [];

    for (let i in elementDicts.Completed) {
        let element = elementDicts.Completed[i];
        finishedElements.push(<FinishedTodo key={i}>{element.title}</FinishedTodo>);
    }

	const TodoTitle = <React.Fragment>
		<CompletedIcon className="far fa-check-square" aria-hidden="true" 
			onClick={() => setCollapsed(!collapsed)} collapsed={collapsed} />
		<Title collapsed={collapsed}>Completed Tasks</Title>
	</React.Fragment>

    return <CompletedTasksWrapper collapsed={collapsed}>
		<CompletedTasksContainer>
			<TodoHeader side='right' title={TodoTitle}></TodoHeader>
			<FinishedItems collapsed={collapsed}>
				{finishedElements}
			</FinishedItems>
			<ClearButtonContainer collapsed={collapsed}>
				<TodoButton onClick={clearCompleted} text='Clear' />
			</ClearButtonContainer>
		</CompletedTasksContainer>
	</CompletedTasksWrapper>;
};