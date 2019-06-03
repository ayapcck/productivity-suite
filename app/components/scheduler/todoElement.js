var React = require('react');

import classnames from 'classnames';

import styles from './todoElement.less';

export default class ToDoElement extends React.Component {
	formatTime(time) {
		let hour = parseInt(time.split(':')[0]);
		let minutes = time.split(':')[1];
		if (hour > 12) return hour - 12 + ":" + minutes + " PM";
		return time + " AM";
	}
	
	render() {
		let date, time = "";
		if (this.props.datetime != "T") {
			let dateAndTime = this.props.datetime.split('T');
			date = dateAndTime[0];
			time = this.formatTime(dateAndTime[1]);
		}
		let dragSettings = {
			draggable: this.props.draggable,
			onDragStart: this.props.onDragStart,
			onDragEnd: this.props.onDragEnd,
		}
		
		// todo element id is of form 'todo_1'
		let elementId = this.props.id.split('_')[1];
		let classes = classnames(styles.todoElement, this.props.priority == 1 && styles.priority);
		let element = <div id={this.props.id} className={classes} {...dragSettings} onClick={() => this.props.onClick(elementId)}>
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