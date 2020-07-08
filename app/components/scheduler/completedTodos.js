import React from 'react';
import styled from 'styled-components';

import { TodoButton } from './todoButton';
import { TodoHeader } from './todoHeader';

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

export const CompletedTodos = (props) => {
    const { clearCompleted, elementDicts } = props;
	
    let finishedElements = [];

    for (let i in elementDicts.Completed) {
        let element = elementDicts.Completed[i];
        finishedElements.push(<FinishedTodo key={i}>{element.title}</FinishedTodo>);
    }

    return <CompletedTasksContainer>
        <TodoHeader side='right' title='Completed Tasks'></TodoHeader>
        <FinishedItems>
            {finishedElements}
        </FinishedItems>
		<ClearButtonContainer>
			<TodoButton onClick={clearCompleted} text='Clear' />
		</ClearButtonContainer>
    </CompletedTasksContainer>;
};