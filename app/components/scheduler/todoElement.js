var React = require('react');

import classnames from 'classnames';

import Icon from '../icons/icon.js';
import { formatDay, formatTime, formatDate } from '../utilities/dates.js';

import styles from './todoElement.less';

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
			<TodoTextPiece content={this.props.title} extraClass={styles.upperLeft} size="big" />
			<TodoTextPiece content={this.props.text} extraClass={styles.lowerLeft} size="small" />
			<TodoTextPiece content={this.props.activeTab === 'Soon' ? date : time} 
				extraClass={styles.upperRight} size="big" />
			{this.props.activeTab === 'Soon' && 
				<TodoTextPiece content={time} extraClass={styles.lowerRight} size="big" />}
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
