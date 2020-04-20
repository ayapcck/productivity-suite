import React from 'react';
import styled from 'styled-components';

import FormButton from '../forms/button.js';
import { SpanHeader } from '../utilities/utilityStyles';

const ClearButtonContainer = styled.div`
	width: -webkit-fill-available;
	display: flex;
	align-items: flex-end;
	margin: 0 0 5px 0;
`;

const FinishedTodo = styled.span`
	width: 100%;
	display: block;
	height: 10%;
	line-height: 1.5;
	padding: 5px;
`;

const FinishedItems = styled.div`
	color: ${(props) => props.theme.textColor};
	grid-row: 2;
	overflow: auto;
	overflow-x: hidden;
	padding: 5px 0;
	position: relative;
	text-align: center;
    width: 100%;
`;

const CompletedTasksContainer = styled.div`
	border-color: ${(props) => props.theme.accentColor};
	border-radius: 15px;
	border-style: solid;
	border-width: 2px;
	display: grid;
	grid-template-rows: 10% 75% 15%;
	margin: 10px auto;
	user-select: none;
	width: 90%;
`;

export const CompletedTodos = (props) => {
    const { clearCompleted, elementDicts } = props;
	
    let finishedElements = [];

    for (let i in elementDicts.Completed) {
        let element = elementDicts.Completed[i];
        finishedElements.push(<FinishedTodo key={i}>{element.title}</FinishedTodo>);
    }

    return <CompletedTasksContainer>
        <SpanHeader>Completed Tasks</SpanHeader>
        <FinishedItems>
            {finishedElements}
        </FinishedItems>
        <ClearButtonContainer>
            <FormButton text='Clear' type='button' onClick={clearCompleted} />
        </ClearButtonContainer>
    </CompletedTasksContainer>;
};