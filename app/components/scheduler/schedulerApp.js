var React = require('react');
var ReactDOM = require('react-dom');

import classnames from 'classnames';

import ToDoElement from './todoElement.js';
import styles from './schedulerApp.css';

export default class SchedulerApp extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			numberTodo: 1,
			elementDicts: [{title: "Testing Element", text: "Seeing how this looks"}]
		}
		
		this.addTodoElement = this.addTodoElement.bind(this);
	}
	
	componentDidMount() {
		var headerHeight = document.getElementsByName("navMenu")[0].offsetHeight;
		var screenHeight = document.documentElement.clientHeight;
		var schedulerBody = document.getElementsByName("schedulerBody")[0];
		schedulerBody.style.height = (screenHeight - headerHeight) + "px";
		schedulerBody.style.top = headerHeight + "px";
	}
	
	addTodoElement() {
		this.setState(prevState => ({
			numberTodo: this.state.numberTodo + 1,
			elementDicts: [...prevState.elementDicts, {title: "Testing2", text: "Does this look good"}]
		}));
	}
	
	render() {
		const todoElements = [];
		
		for (var i = 0; i < this.state.numberTodo; i++) {
			var element = this.state.elementDicts[i];
			todoElements.push(<ToDoElement key={i} title={element.title} text={element.text} />);
		}
		
		var schedulerApp = <div name="schedulerBody" className={styles.schedulerContent}>
				<div className={classnames(styles.gridElement, styles.leftColumn)}>
					<AddTodoButton text="Add to-do" onClick={this.addTodoElement} />
				</div>
				<div className={classnames(styles.gridElement, styles.middleColumn)}>
					{todoElements}
				</div>
				<div className={classnames(styles.gridElement, styles.rightColumn)}></div>
			</div>
		return schedulerApp;
	}
}

const AddTodoButton = ({text, onClick}) => (
	<div className={styles.addbutton} onClick={onClick}>{text}</div>
);