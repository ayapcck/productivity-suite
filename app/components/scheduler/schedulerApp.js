var React = require('react');
var ReactDOM = require('react-dom');

import classnames from 'classnames';

import InputBox from '../forms/inputBox.js';
import FormButton from '../forms/button.js';
import TodoColumn from './todoColumn.js';
import styles from './schedulerApp.css';
import { postJson, getJson } from '../utilities/jsonHelpers.js';

var Logger = require('../utilities/logger');

export default class SchedulerApp extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			numberTodo: 0,
			elementDicts: {},
			orderObj: {}
		}
				
		this.addTodoClicked = this.addTodoClicked.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
		this.markCompleted = this.markCompleted.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
	}
	
	log(message, functionName) {
		Logger.log(message, "schedulerApp", functionName);
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
		this.updateTodosFromDB();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	
	componentDidUpdate(prevProps) {
		prevProps.username != this.props.username && this.updateTodosFromDB();
	}
	
	postTodoElement(title, content, datetime) {
		var url = "http://192.168.0.26:5000/addTodo";
		var jsonBody = {
			user: this.props.username,
			title: title,
			content: content,
			datetime: datetime
		}
		
		postJson(url, jsonBody).then(response => {			
			this.setState({ needsUpdate: true });
			this.updateTodosFromDB();
		}).catch(error => {
			alert(error);
		});
	}
	
	updateTodosFromDB() {
		if (this.props.username != "") {
			var url = "http://192.168.0.26:5000/retrieveTodos?user=" + this.props.username;
			getJson(url).then(response => {
				var numberTodos = 0;
				var elements = {};
				var orderObj = {};
				response.forEach(todoItem => {
					numberTodos += 1;
					let newElement = {
						title: todoItem[0], text: todoItem[1], datetime: todoItem[2], 
						id: todoItem[3], completed: todoItem[4], order: todoItem[5]
					}
					elements[newElement['id']] = newElement;
					orderObj[newElement['order']] = newElement['id'];
				})
				this.log("order at this point: " + JSON.stringify(orderObj), "updateTodosFromDB");
				this.setState(prevState => ({
					numberTodo: numberTodos,
					elementDicts: elements,
					orderObj: orderObj,
					needsUpdate: false
				}));
			}).catch(error => {
				alert(error);
			});
		} else {
			this.setState({
				numberTodo: 0,
				elementDicts: {},
				orderObj: {},
				needsUpdate: false
			});
		}
	}
	
	markCompleted(id) {
		if (this.props.username != "") {
			var url = "http://192.168.0.26:5000/markCompleted?user=" + this.props.username + "&id=" + id + "";
			
			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.updateTodosFromDB();				
			}).catch(error => {
				alert(error);
			});
		}
	}
	
	clearCompleted() {
		if (this.props.username != "") {
			var url = "http://192.168.0.26:5000/clearCompleted?user=" + this.props.username;
			
			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
		}
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
	
	addTodoClicked(e) {
		if (this.props.username != "") {
			e.preventDefault();
			var todoTitle = e.target[0].value;
			var todoDateTime = e.target[1].value;
			var todoContent = e.target[2].value;
			
			var emptyValues = todoTitle == "" || todoDateTime == "";
			
			if (emptyValues) {
				alert("Please fill title section");
			} else {
				this.clearForm(e);
				this.postTodoElement(todoTitle, todoContent, todoDateTime);
			}
		} else {
			e.preventDefault();
			alert("You need an account to use this feature");
		}
	}
	
	updateOrder(todoIds) {
		this.log("starting", "updateOrder");
		let elementsToBeUpdated = this.state.elementDicts;
		let orderObj = [];
		let stateOrderObj = {};
		for (let i in todoIds) {
			let id = parseInt(todoIds[i].split('_')[1]);
			let order = parseInt(i) + 1;
			elementsToBeUpdated[id]['order'] = order;
			orderObj.push([id, order]);
			stateOrderObj[order] = id;
		}
		this.log("going into postOrderChange", "updateOrder");
		this.postOrderChange(orderObj);
		this.log("back from postOrderChange", "updateOrder");
		this.log("done", "updateOrder");
	}
	
	postOrderChange(orderObj) {
		this.log("starting", "postOrderChange");
		if (this.props.username != "") {
			var url = "http://192.168.0.26:5000/changeOrder";			
			var jsonBody = {
				user: this.props.username,
				orderObj: orderObj,
			}
			
			this.log("return postJson promise", "postOrderChange");
			return postJson(url, jsonBody).then(() => {
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
		}
		this.log("done", "postOrderChange");
	}
	
	render() {
		const finishedElements = [];
		
		for (let i in this.state.elementDicts) {
			let element = this.state.elementDicts[i];
			element.completed &&
				finishedElements.push(<span key={i} className={styles.finishedItem}>{element.title}</span>);
		}
		
		var schedulerApp = <div name="schedulerBody" className={styles.schedulerContent}>
				<div className={classnames(styles.gridElement, styles.leftColumn)}>
					<form id="addTodoForm" onSubmit={this.addTodoClicked}>
						<InputBox text="Title" type="text" name="toDoTitle" />
						<InputBox text="Date" type="datetime-local" name="toDoDate" val={this.getCurrentISOTime()} />
						<InputBox text="Content" type="area" name="toDoBody" />
						<FormButton text="Add to-do" type="submit" name="addTodoFormSubmit" />
					</form>
				</div>
				<TodoColumn classes={classnames(styles.gridElement, styles.middleColumn)} elementDicts={this.state.elementDicts} 
					updateOrder={this.updateOrder} order={this.state.orderObj} />
				<div className={classnames(styles.gridElement, styles.rightColumn)}>
					<span className={styles.finishedHeader}>Completed Tasks</span>
					<div className={styles.finishedItems}>
						{finishedElements}
						<FormButton text="Clear" type="button" containerClass={styles.pushDown} onClick={this.clearCompleted} />
					</div>
				</div>
			</div>
		return schedulerApp;
	}
};