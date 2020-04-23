import React from 'react';
import styled, { css } from 'styled-components';

import classnames from 'classnames';

import Icon from '../icons/icon.js';
import { formatTime, formatDate } from '../utilities/dates.js';

import styles from './todoElement.less';

const TodoElement = styled.div`
	height: calc(100% / 8);
	color: ${(props) => props.theme.textColor};
	border-style: solid;
	border-width: 1.5px;
	border-color: ${(props) => props.theme.textColor};
	box-sizing: border-box;
	cursor: -webkit-grab;
	display: grid;
	grid-template-rows: 35% 65%;
	grid-template-columns: 45% 25% 15% 15%;
	border-radius: 25px;
	padding: 5px 15px;
	margin: 2.5px 10px;
	user-select: none;
	position: relative;
	${ ({ priority, theme }) => priority === 1 && `
        color: ${theme.priorityTodoColor}!important;
		border-color: ${theme.priorityTodoColor}!important;
    `}
`;

const TodoPiece = css`
	margin: 0;
	padding: 5px;
	text-align: left;
`;
const TodoContent = styled.h5`
	${TodoPiece}
	grid-row: 2;
`;
const TodoDateOrTime = styled.h4`
	${TodoPiece}
	grid-column: 2;
	grid-row: 1;
	text-align: right;
`;
const TodoTime = styled.h4`
	${TodoPiece}
	grid-column: 2;
	grid-row: 2;
	text-align: right;
`;
const TodoTitle = styled.h4`
	${TodoPiece}
	grid-row: 1;
`;

export default class ToDoElement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: false
		}

		this.showHoverIcons = this.showHoverIcons.bind(this);
		this.hideHoverIcons = this.hideHoverIcons.bind(this);
	}

	showHoverIcons() {
		this.setState({ hovered: true });
	}

	hideHoverIcons() {
		this.setState({ hovered: false });
	}
	
	render() {
		const { activeTab, datetime, draggable, id, onDragEnd, onDragStart, 
			onEditClicked, onTodoCompleted, priority, title, text } = this.props;

		let date = '';
		let time = '';
		if (datetime != 'T') {
			let dateAndTime = datetime.split('T');
			date = formatDate(dateAndTime);
			time = formatTime(dateAndTime[1]);
		};

		const dragSettings = { draggable, onDragEnd, onDragStart };
		const hoverSettings = {
			onMouseEnter: this.showHoverIcons,
			onMouseMove: this.showHoverIcons,
			onMouseLeave: this.hideHoverIcons
		};
		
		// todo element id is of form 'todo_1'
		let elementId = id.split('_')[1];
		let onEditProps = { title, content: text, datetime, priority, id: elementId };
		
		let element = <TodoElement id={id} priority={priority} {...dragSettings} {...hoverSettings}>
			{ this.state.hovered && <React.Fragment>
				<EditIcon onClick={() => onEditClicked(onEditProps)} />
				<DoneIcon onClick={() => onTodoCompleted(elementId)} />
			</React.Fragment> }
			<TodoTitle>{title}</TodoTitle>
			<TodoContent>{text}</TodoContent>
			<TodoDateOrTime>{activeTab === 'Soon' ? date : time}</TodoDateOrTime>
			{activeTab === 'Soon' && 
				<TodoTime>{time}</TodoTime>}
		</TodoElement>;
		return element;
	}
}

const DoneIcon = (props) => {
	const { onClick } = props;
	return <Icon iconClass="far fa-check-circle"
		wrapperStyles={classnames(styles.elementDone, styles.todoIconWrapper)} 
		iconStyles={styles.todoIcon} onClick={onClick} />;
};

const EditIcon = (props) => {
	const { onClick } = props;
	return <Icon iconClass="far fa-edit"
		wrapperStyles={classnames(styles.elementEdit, styles.todoIconWrapper)} 
		iconStyles={styles.todoIcon} onClick={onClick} />;
};

ToDoElement.defaultProps = {
	datetime: ' T '
}
