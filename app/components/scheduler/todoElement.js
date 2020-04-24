import React from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import { formatTime, formatDate } from '../utilities/dates.js';

const TodoElement = styled.div`
	align-items: center;
	color: ${(props) => props.theme.textColor};
	border-color: ${(props) => props.theme.textColor};
	border-radius: 25px;
	border-style: solid;
	border-width: 1.5px;
	box-sizing: border-box;
	cursor: -webkit-grab;
	height: auto;
	margin: 2.5px 10px;
	padding: 5px 15px;
	position: relative;
	transition: height 1s;
	user-select: none;
	${ ({ priority, theme }) => priority === 1 && `
        color: ${theme.priorityTodoColor}!important;
		border-color: ${theme.priorityTodoColor}!important;
	`}
`;

const TodoIcon = styled.i`
	cursor: pointer;
	font-size: xx-large;
	margin: 0 0 5px 0;
`;
const TodoIconWrapper = css`
	align-items: center;
	display: flex;
	justify-content: center;
`;

const DoneIcon = styled.div`
	${TodoIconWrapper}
	grid-column: 3;
`;

const EditIcon = styled.div`
	${TodoIconWrapper}
	grid-column: 2;
`;

const TodoPiece = css`
	margin: 0;
	padding: 5px;
	text-align: center;
`;
const TodoMainContent = styled.div`
	${TodoPiece}
	display: grid;
	grid-template-columns: 50% 25% 25%;
`;
const TodoHoverContent = styled.div`
	${TodoPiece}
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	grid-template-rows: 1fr;
	height: 1px;
	opacity: 0;
	padding: 0;
	transition: height 1s, visibility 0s, opacity 1s 0.75s;
	visibility: hidden;

	${ ({ hovered }) => hovered && `
		height: calc(100vh / 6);
		opacity: 1;
		visibility: visible;
	`}
`;
const TodoDate = styled.h3`
	${TodoPiece}
	grid-column: 3;
`;
const TodoTextContainer = styled.div`
	${TodoPiece}
	display: flex;
	grid-column: 1;
	overflow: auto;
`;
const TodoText = styled.h4`
	margin: auto;
`;
const TodoTime = styled.h3`
	${TodoPiece}
	grid-column: 2;
`;
const TodoTitle = styled.h3`
	${TodoPiece}
	grid-column: 1;
`;

export default class ToDoElement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: false
		}

		this.showHoverState = this.showHoverState.bind(this);
		this.hideHoverState = this.hideHoverState.bind(this);
	}

	showHoverState() {
		this.setState({ hovered: true });
	}

	hideHoverState() {
		this.setState({ hovered: false });
	}
	
	render() {
		const { activeTab, datetime, draggable, id, onDragEnd, onDragStart, 
			onEditClicked, onTodoCompleted, priority, title, text } = this.props;
		const { hovered } = this.state;

		let date = '';
		let time = '';
		if (datetime != 'T') {
			let dateAndTime = datetime.split('T');
			date = formatDate(dateAndTime);
			time = formatTime(dateAndTime[1]);
		};

		const dragSettings = { draggable, onDragEnd, onDragStart };
		const hoverSettings = {
			onMouseEnter: this.showHoverState,
			onMouseMove: this.showHoverState,
			onMouseLeave: this.hideHoverState
		};
		
		// todo element id is of form 'todo_1'
		const elementId = id.split('_')[1];
		const onEditProps = { title, content: text, datetime, priority, id: elementId };
		
		const todoElementProps = _.assign({
			className: 'todoElement',
			hovered,
			id,
			priority
		}, dragSettings, hoverSettings);

		return <TodoElement {...todoElementProps}>
			<TodoMainContent>
				<TodoTitle>{title}</TodoTitle>
				<TodoTime>{time}</TodoTime>
				<TodoDate>{activeTab === 'Soon' && date}</TodoDate>
			</TodoMainContent>
			<TodoHoverContent hovered={hovered}>
				<TodoTextContainer>
					<TodoText>{text}</TodoText>
				</TodoTextContainer>
				<EditIcon>
					<TodoIcon className="far fa-edit"
						onClick={() => onEditClicked(onEditProps)} />
				</EditIcon>
				<DoneIcon>
					<TodoIcon className="far fa-check-circle" 
						onClick={() => onTodoCompleted(elementId)} />
				</DoneIcon>
			</TodoHoverContent>
		</TodoElement>;
	}
}

const HoverState = (props) => {
	return <React.Fragment>
		
	</React.Fragment>;
}

ToDoElement.defaultProps = {
	datetime: ' T '
}
