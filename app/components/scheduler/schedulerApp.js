var React = require('react');
var ReactDOM = require('react-dom');

import classnames from 'classnames';

import InputBox from '../forms/inputBox.js';
import FormButton from '../forms/button.js';
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
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	updateDimensions() {
		var headerHeight = document.getElementsByName("navMenu")[0].offsetHeight;
		var screenHeight = document.documentElement.clientHeight;
		var schedulerBody = document.getElementsByName("schedulerBody")[0];
		schedulerBody.style.height = (screenHeight - headerHeight) + "px";
		schedulerBody.style.top = headerHeight + "px";
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	
	addTodoElement(title, content, datetime) {
		this.setState(prevState => ({
			numberTodo: this.state.numberTodo + 1,
			elementDicts: [...prevState.elementDicts, {title: title, text: content, datetime: datetime}]
		}));
	}
	
	getCurrentISOTime() {
		var timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
		var localISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 16);
		return localISOTime;
	}
	
	clearForm(e) {
		e.target[0].value = "";
		e.target[1].value = this.getCurrentISOTime();
		e.target[2].value = "";
	}
	
	handleSubmit(e) {
		e.preventDefault();
		var todoTitle = e.target[0].value;
		var todoDateTime = e.target[1].value;
		var todoContent = e.target[2].value;
		
		var emptyValues = todoTitle == "" || todoDateTime == "";
		
		if (emptyValues) {
			alert("Please fill title section");
		} else {
			this.clearForm(e);
			this.addTodoElement(todoTitle, todoContent, todoDateTime);
		}
	}
	
	render() {
		const todoElements = [];
		
		for (var i = 0; i < this.state.numberTodo; i++) {
			var element = this.state.elementDicts[i];
			todoElements.push(<ToDoElement key={i} title={element.title} text={element.text} datetime={element.datetime} />);
		}
		
		var schedulerApp = <div name="schedulerBody" className={styles.schedulerContent}>
				<div className={classnames(styles.gridElement, styles.leftColumn)}>
					<form onSubmit={this.handleSubmit}>
						<InputBox text="Title" type="text" name="toDoTitle" />
						<InputBox text="Date" type="datetime-local" name="toDoDate" val={this.getCurrentISOTime()} />
						<InputBox text="Content" type="area" name="toDoBody" />
						<FormButton text="Add to-do" type="submit" />
					</form>
				</div>
				<div className={classnames(styles.gridElement, styles.middleColumn)}>
					{todoElements}
				</div>
				<div className={classnames(styles.gridElement, styles.rightColumn)}></div>
			</div>
		return schedulerApp;
	}
};