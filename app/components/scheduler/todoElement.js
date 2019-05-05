var React = require('react');

import classnames from 'classnames';

import styles from './todoElement.css';

export default class ToDoElement extends React.Component {
	render() {
		var dateAndTime = this.props.datetime.split('T');
		var element = <div className={styles.todoElement}>
			<h4 className={classnames(styles.todoPiece, styles.elementTitle)}>{this.props.title}</h4>
			<h5 className={classnames(styles.todoPiece, styles.elementText)}>{this.props.text}</h5>
			<h4 className={classnames(styles.todoPiece, styles.elementDate)}>{dateAndTime[0]}</h4>
			<h4 className={classnames(styles.todoPiece, styles.elementTime)}>{dateAndTime[1]}</h4>
		</div>
		return element
	}
}

ToDoElement.defaultProps = {
	datetime: " T "
}