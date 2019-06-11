var React = require('react');

import classnames from 'classnames';

import Icon from '../icons/icon.js';

import styles from './todoElement.less';

const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
const formatDay = (day) => {
	let retVal = day[0] === '0' ? day.slice(1) : day; 
	let lastDigit = day[day.length - 1];
	if (lastDigit === '1' && day !== '11') {
		return retVal + 'st';
	} else if (lastDigit === '2' && day !== '12') {
		return retVal + 'nd';
	} else if (lastDigit === '3' && day !== '13') {
		return retVal + 'rd';
	} else {
		return retVal + 'th';
	}
};
const formatDate = (date) => {
	let dateObj = new Date(new Date(date) + timezoneOffset);
	let datePieces = dateObj.toDateString().split(' ');
	return datePieces[0] + ', ' + datePieces[1] + ' ' + formatDay(datePieces[2]);
};
const formatTime = (time) => {
	let hour = parseInt(time.split(':')[0]);
	let minutes = time.split(':')[1];
	if (hour > 12) return hour - 12 + ':' + minutes + ' PM';
	return time + ' AM';
};

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
		let date = '';
		let time = '';
		if (this.props.datetime != 'T') {
			let dateAndTime = this.props.datetime.split('T');
			date = formatDate(dateAndTime);
			time = formatTime(dateAndTime[1]);
		};
		const dragSettings = {
			draggable: this.props.draggable,
			onDragStart: this.props.onDragStart,
			onDragEnd: this.props.onDragEnd
		};
		const hoverSettings = {
			onMouseEnter: this.showHoverIcons,
			onMouseMove: this.showHoverIcons,
			onMouseLeave: this.hideHoverIcons
		};
		
		// todo element id is of form 'todo_1'
		let elementId = this.props.id.split('_')[1];
		let elementClasses = classnames(styles.todoElement, this.props.priority == 1 && styles.priority);
		let onEditProps = {
			title: this.props.title,
			content: this.props.text,
			datetime: this.props.datetime,
			priority: this.props.priority,
			id: elementId
		};
		let element = <div id={this.props.id} className={elementClasses} {...dragSettings}
			{...hoverSettings}>
			{this.state.hovered && <React.Fragment>
			<Icon iconClass="far fa-check-circle" 
				wrapperStyles={classnames(styles.elementDone, styles.todoIconWrapper)} 
				iconStyles={styles.todoIcon} onClick={() => this.props.onTodoCompleted(elementId)} />
			<Icon iconClass="far fa-edit" 
				wrapperStyles={classnames(styles.elementEdit, styles.todoIconWrapper)} 
				iconStyles={styles.todoIcon} onClick={() => this.props.onEditClicked(onEditProps)} />
			</React.Fragment>}
			<TodoTextPiece content={this.props.title} extraClass={styles.elementTitle} size="big" />
			<TodoTextPiece content={this.props.text} extraClass={styles.elementText} size="small" />
			<TodoTextPiece content={date} extraClass={styles.elementDate} size="big" />
			<TodoTextPiece content={time} extraClass={styles.elementTime} size="big" />
		</div>;
		return element;
	}
}

const TodoTextPiece = ({ content, extraClass, size }) => {
	let classes = classnames(styles.todoPiece, extraClass);
	let retElement = size === "big" ? 
		<h4 className={classes}>{content}</h4> : 
		<h5 className={classes}>{content}</h5>;
	return retElement;
}

ToDoElement.defaultProps = {
	datetime: ' T '
}
