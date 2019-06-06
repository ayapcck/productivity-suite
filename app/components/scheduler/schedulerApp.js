var React = require('react');
var ReactDOM = require('react-dom');

import classnames from 'classnames';

import FormButton from '../forms/button.js';
import FormPopup from '../formPopup/formPopup.js'
import Icon from "../icons/icon.js";
import TodoColumn from './todoColumn.js';
import TodoForm from './todoForm.js';
import styles from './schedulerApp.less';
import utilities from '../utilities/utilities.less';
import { postJson, getJson } from '../utilities/jsonHelpers.js';

var Logger = require('../utilities/logger');

export default class SchedulerApp extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			editingTodoId: null,
			elementDicts: {},
			numberTodo: 0,
			orderObj: {},
			showEditTodoPopup: false,
			todoTimeEnabled: false
		}
		
		this.clearCompleted = this.clearCompleted.bind(this);
		this.hideEditTodoForm = this.hideEditTodoForm.bind(this);
		this.markCompleted = this.markCompleted.bind(this);
		this.postTodoElement = this.postTodoElement.bind(this);
		this.showEditTodoForm = this.showEditTodoForm.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
	}
	
	log(message, functionName) {
		Logger.log(message, "schedulerApp", functionName);
	}

	componentDidMount() {
		this.updateTodosFromDB();
	}
	
	componentDidUpdate(prevProps) {
		prevProps.username != this.props.username && this.updateTodosFromDB();
	}
	
	postTodoElement(title, content, datetime, priority) {
		var url = "http://192.168.0.26:5000/addTodo";
		var jsonBody = {
			user: this.props.username,
			title: title,
			content: content,
			datetime: datetime,
			priority: priority
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
					let completed = todoItem[4];
					let newElement = {
						title: todoItem[0], text: todoItem[1], datetime: todoItem[2], 
						id: todoItem[3], completed: todoItem[4], order: todoItem[5], 
						priority: todoItem[6]
					}
					elements[newElement['id']] = newElement;
					if (completed == 0) {
						orderObj[newElement['order']] = newElement['id'];
					}
					numberTodos += 1;
				});
				
				this.handleOrderAfterUpdate(orderObj);
				
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
			this.log("starting", "markCompleted");
			var url = "http://192.168.0.26:5000/markCompleted?user=" + this.props.username + "&id=" + id + "";
			
			this.log("POST todo id: " + id + " as completed", "markCompleted");
			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.log("passing off to updateTodosFromDB, inside post.then()", "markCompleted");
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
			this.log("finished", "markCompleted");
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
	
	handleOrderAfterUpdate(orderObj) {
		this.log("starting", "handleOrderAfterUpdate");
		
		this.log("this.state.orderObj before setState: " + JSON.stringify(this.state.orderObj), "updateTodosFromDB");
		this.log("orderObj before setState: " + JSON.stringify(orderObj), "updateTodosFromDB");
		
		let stateOrderKeys = Object.keys(this.state.orderObj);
		let orderObjKeys = Object.keys(orderObj);
		let firstTodoInList = (orderObjKeys.length == 1) && (orderObjKeys[0] == "null");
		let notEmptyButDifferentSize = (stateOrderKeys.length != 0) && (orderObjKeys.length != stateOrderKeys.length);
		
		if (firstTodoInList) {
			this.updateOrder(["todo_" + Object.values(orderObj)[0]]);
		}
		else {
			if (notEmptyButDifferentSize) {
				this.log("order size was different, passing off to updateOrderAfterUpdateTodos", "updateTodosFromDB");
				this.updateOrderAfterUpdateTodos(orderObj);
			}
		}
		
		this.log("done", "handleOrderAfterUpdate");
	}
	
	// this allows usage of this.updateOrder to run after updateTodosFromDB
	updateOrderAfterUpdateTodos(orderObj) {
		let todoIds = [];
		for (const val of Object.values(orderObj)) {
			todoIds.push("todo_" + val);
		}
		this.updateOrder(todoIds);
	}
	
	updateOrder(todoIds) {
		this.log("starting", "updateOrder");
		let elementsToBeUpdated = this.state.elementDicts;
		let orderObj = [];
		let stateOrderObj = {};
		for (let i in todoIds) {
			let id = parseInt(todoIds[i].split('_')[1]);
			let order = parseInt(i) + 1;
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

	hideEditTodoForm() {
		this.setState({ showEditTodoPopup: false });
	}

	showEditTodoForm(elementId) {
		this.setState({ 
			editingTodoId: elementId,
			showEditTodoPopup: true 
		});
	}
	
	render() {
		let finishedElements = [];
		
		for (let i in this.state.elementDicts) {
			let element = this.state.elementDicts[i];
			element.completed &&
				finishedElements.push(<span key={i} className={styles.finishedItem}>{element.title}</span>);
		}
		
		let todoFormProps = {
			postTodoElement: this.postTodoElement,
			userLoggedIn: this.props.username != ""
		};

		let todoColumnProps = {
			classes: classnames(styles.gridElement, styles.middleColumn),
			onEditClicked: this.showEditTodoForm,
			elementDicts: this.state.elementDicts,
			markTodoCompleted: this.markCompleted,
			order: this.state.orderObj,
			updateOrder: this.updateOrder
		}

		let schedulerApp = <div name="schedulerBody" className={styles.schedulerContent}>
			{this.state.showEditTodoPopup && <FormPopup handleCloseForm={this.hideEditTodoForm} 
				content={
					<React.Fragment>
						<Icon iconClass="far fa-times-circle" onClick={this.hideEditTodoForm} />
						<TodoForm userLoggedIn={this.props.userLoggedIn != ""} 
							postTodoElement={this.postTodoElement} />
					</React.Fragment>
				} />}
			<div className={classnames(styles.gridElement, styles.leftColumn)}>
				<TodoForm {...todoFormProps} />
			</div>
			<TodoColumn {...todoColumnProps} />
			<div className={classnames(styles.gridElement, styles.rightColumn)}>
				<div className={styles.completedTasksContainer}>
					<span className={styles.finishedHeader}>Completed Tasks</span>
					<div className={styles.finishedItems}>
						{finishedElements}
					</div>
					<FormButton text="Clear" type="button" containerClass={styles.pushDown} onClick={this.clearCompleted} />
				</div>
			</div>
		</div>
		return schedulerApp;
	}
};

const editTodoPopup = ({ }) => {
	return <React.Fragment>
		<Icon iconClass="far fa-times-circle" onClick={this.handleCloseForm} />
		<TodoForm userLoggedIn={this.props.userLoggedIn} postTodoElement={this.props.postTodoElement} />
	</React.Fragment>;
}
