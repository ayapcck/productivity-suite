import React from 'react';
import styled from 'styled-components';

import { TodoButton } from './todoButton';

const ClearButtonContainer = styled.div`
	display: flex;
	height: 10%;
	margin-top: auto;
	overflow: hidden;
	width: 100%;
`;

const CompletedTasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
	width: 100%;
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
`;

const Header = styled.div`
	border-color: ${(props) => props.theme.borderColor};
	border-style: solid;
	border-width: 0 0 2px 0;
	color: ${(props) => props.theme.textColor};
	font-size: x-large;
	padding: 10px;
	text-align: center;
`;

export const CompletedTodos = (props) => {
    const { clearCompleted, elementDicts } = props;
	
    let finishedElements = [];

    for (let i in elementDicts.Completed) {
        let element = elementDicts.Completed[i];
        finishedElements.push(<FinishedTodo key={i}>{element.title}</FinishedTodo>);
    }

    return <CompletedTasksContainer>
        <Header>Completed Tasks</Header>
        <FinishedItems>
            {finishedElements}
        </FinishedItems>
		<ClearButtonContainer>
			<TodoButton onClick={clearCompleted} text='Clear' />
		</ClearButtonContainer>
    </CompletedTasksContainer>;
};