var React = require('react');

import classnames from 'classnames';

import Icon from '../icons/icon.js';
import { formatTime, formatDate } from '../utilities/dates.js';

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
		let elementClasses = classnames(styles.todoElement, priority == 1 && styles.priority);
		let onEditProps = { title, content: text, datetime, priority, id: elementId };
		
		let element = <div id={id} className={elementClasses} {...dragSettings}
			{...hoverSettings}>
			{ this.state.hovered && <React.Fragment>
				<EditIcon onClick={() => onEditClicked(onEditProps)} />
				<DoneIcon onClick={() => onTodoCompleted(elementId)} />
			</React.Fragment> }
			<TodoTextPiece content={title} extraClass={styles.upperLeft} size="big" />
			<TodoTextPiece content={text} extraClass={styles.lowerLeft} size="small" />
			<TodoTextPiece content={activeTab === 'Soon' ? date : time} 
				extraClass={styles.upperRight} size="big" />
			{activeTab === 'Soon' && 
				<TodoTextPiece content={time} extraClass={styles.lowerRight} size="big" />}
		</div>;
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
