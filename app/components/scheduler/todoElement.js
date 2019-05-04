var React = require('react');

import styles from './todoElement.css';

export default class ToDoElement extends React.Component {
	render() {
		var element = <div className={styles.todoElement}>
			<h4 className={styles.elementTitle}>{this.props.title}</h4>
			<h5 className={styles.elementText}>{this.props.text}</h5>
		</div>
		return element
	}
}