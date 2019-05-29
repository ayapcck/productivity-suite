var React = require('react');

import classnames from 'classnames';

import styles from './todoElement.css';

export default class ToDoElement extends React.Component {
	formatTime(time) {
		let hour = parseInt(time.split(':')[0]);
		let minutes = time.split(':')[1];
		if (hour > 12) return hour - 12 + ":" + minutes + " PM";
		return time + " AM";
	}
	
	render() {
		var dateAndTime = this.props.datetime.split('T');
		var date = dateAndTime[0];
		var time = this.formatTime(dateAndTime[1]);
		var dragSettings = {
			draggable: this.props.draggable,
			onDragStart: this.props.onDragStart,
			onDragEnd: this.props.onDragEnd,
		}
		
		// todo element id is of form 'todo_1'
		let elementId = this.props.id.split('_')[1];
		var element = <div id={this.props.id} className={classnames(styles.todoElement)} {...dragSettings} onClick={() => this.props.onClick(elementId)}>
			<h4 className={classnames(styles.todoPiece, styles.elementTitle)}>{this.props.title}</h4>
			<h5 className={classnames(styles.todoPiece, styles.elementText)}>{this.props.text}</h5>
			<h4 className={classnames(styles.todoPiece, styles.elementDate)}>{date}</h4>
			<h4 className={classnames(styles.todoPiece, styles.elementTime)}>{time}</h4>
		</div>
		return element
	}
}

ToDoElement.defaultProps = {
	datetime: " T "
}