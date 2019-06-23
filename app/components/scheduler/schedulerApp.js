var React = require('react');
var ReactDOM = require('react-dom');

import classnames from 'classnames';

import FormButton from '../forms/button.js';
import FormPopup from '../formPopup/formPopup.js'
import Icon from '../icons/icon.js';
import TabBar from '../tabs/tabBar.js';
import TodoColumn from './todoColumn.js';
import TodoForm from './todoForm.js';
import styles from './schedulerApp.less';
import utilities from '../utilities/utilities.less';
import { postJson, getJson } from '../utilities/jsonHelpers.js';
import { currentTimeString, tomorrowTimeString } from '../utilities/dates.js';

var Logger = require('../utilities/logger');

const tabHeaders = [{
	name: 'Today',
	getValue: () => currentTimeString()
}, {
	name: 'Tomorrow',
	getValue: () => tomorrowTimeString()
}, {
	name: 'Soon',
	getValue: () => ''
}];
const initialElementDicts = () => {
	let elements = {};
	tabHeaders.map(value => {
		let tabName = value.name;
		elements[tabName] = {};
	});
	elements['Completed'] = {};
	return elements;
};

export default class SchedulerApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: tabHeaders[0].name,
			editingTodoProps: null,
			elementDicts: initialElementDicts(),
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
		this.showTabHeaderContent = this.showTabHeaderContent.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.updateTodoElement = this.updateTodoElement.bind(this);
	}

	log(message, functionName) {
		Logger.log(message, 'schedulerApp', functionName);
	}

	componentDidMount() {
		this.updateTodosFromDB();
	}

	componentDidUpdate(prevProps) {
		prevProps.username != this.props.username && this.updateTodosFromDB();
	}

	postTodoElement(title, content, datetime, priority) {
		var url = 'http://192.168.0.26:5000/addTodo';
		var jsonBody = {
			user: this.props.username,
			title: title,
			content: content,
			datetime: datetime,
			priority: priority,
			tab: this.state.activeTab
		}

		postJson(url, jsonBody).then(response => {
			this.setState({ needsUpdate: true });
			this.updateTodosFromDB();
		}).catch(error => {
			alert(error);
		});
	}

	updateTodoElement(title, content, datetime, priority) {
		let url = 'http://192.168.0.26:5000/updateTodo';
		let jsonBody = {
			user: this.props.username,
			title: title,
			content: content,
			datetime: datetime,
			priority: priority,
			id: this.state.editingTodoProps.id
		}

		postJson(url, jsonBody).then(response => {
			this.setState({ needsUpdate: true, showEditTodoPopup: false });
			this.updateTodosFromDB();
		}).catch(error => {
			alert(error);
		});
	}

	updateTodosFromDB() {
		if (this.props.username && this.props.username !== '') {
			this.log('starting', 'updateTodosFromDB');
			var url = 'http://192.168.0.26:5000/retrieveTodos?user=' +
				this.props.username + '&tab=' + this.state.activeTab;
			getJson(url).then(response => {
				var numberTodos = 0;
				var elements = initialElementDicts();

				response.forEach(todoItem => {
					let order = parseInt(todoItem[4]);
					let tabName = todoItem[6];
					let newElement = {
						title: todoItem[0], text: todoItem[1], datetime: todoItem[2],
						id: todoItem[3], order: order, priority: todoItem[5],
						tabName: tabName
					}
					elements[tabName][newElement.id] = newElement;
					numberTodos += 1;
				});

				let orderObj = this.handleOrderWithCollisions(this.state.activeTab, elements)
				this.handleOrderAfterUpdate(orderObj);

				this.setState(prevState => ({
					numberTodo: numberTodos,
					elementDicts: elements,
					orderObj: orderObj,
					needsUpdate: false
				}));
				this.log('done', 'updateTodosFromDB');
			}).catch(error => {
				alert(error);
			});
		} else {
			this.setState({
				numberTodo: 0,
				elementDicts: initialElementDicts(),
				orderObj: {},
				needsUpdate: false
			});
		}
	}

	markCompleted(id) {
		if (this.props.username != '') {
			this.log('starting', 'markCompleted');
			var url = 'http://192.168.0.26:5000/markCompleted?user=' + this.props.username + '&id=' + id + '';

			this.log('POST todo id: ' + id + ' as completed', 'markCompleted');
			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.log('passing off to updateTodosFromDB, inside post.then()', 'markCompleted');
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
			this.log('finished', 'markCompleted');
		}
	}

	clearCompleted() {
		if (this.props.username != '') {
			var url = 'http://192.168.0.26:5000/clearCompleted?user=' + this.props.username;

			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
		}
	}

	handleOrderWithCollisions(tabName, elementDicts) {
		let orderObj = {};
		let collisions = [];
		let lastOrder = 0;
		let todos = elementDicts[tabName];

		Object.entries(todos).forEach(entry => {
			if (entry) {
				let todo = entry[1];
				let id = todo && todo.id;
				let order = todo && todo.order;
				if (!(order in orderObj)) {
					lastOrder = order > lastOrder ? order : lastOrder;
					orderObj[order] = id;
				} else {
					collisions.push(id);
				}
			}
		});

		if (collisions != []) {
			collisions.forEach(id => {
				orderObj[lastOrder + 1] = id;
				lastOrder++;
			});
			this.handleOrderAfterUpdate(orderObj);
		}

		return orderObj;
	}

	updateOrderAfterHeaderSwitch(tabName) {
		let orderObj = this.handleOrderWithCollisions(tabName, this.state.elementDicts);
		this.log('orderObj: ' + JSON.stringify(orderObj), 'updateOrderAfterHeaderSwitch');
		this.setState({ orderObj: orderObj });
	}

	handleOrderAfterUpdate(orderObj) {
		this.log('starting', 'handleOrderAfterUpdate');

		let compareOrdObj = JSON.stringify(orderObj);
		let compareStateOrdObj = JSON.stringify(this.state.orderObj);
		this.log('this.state.orderObj before setState: ' + compareStateOrdObj, 'handleOrderAfterUpdate');
		this.log('orderObj before setState: ' + compareOrdObj, 'handleOrderAfterUpdate');

		let orderObjKeys = Object.keys(orderObj);
		let firstTodoInList = (orderObjKeys.length == 1) && (orderObjKeys[0] == 'null');

		if (firstTodoInList) {
			this.updateOrder(['todo_' + Object.values(orderObj)[0]]);
		}
		else {
			if (compareOrdObj !== compareStateOrdObj) {
				this.log('order size was different, passing off to updateOrderAfterUpdateTodos', 'handleOrderAfterUpdate');
				this.updateOrderAfterUpdateTodos(orderObj);
			}
		}

		this.log('done', 'handleOrderAfterUpdate');
	}

	// this allows usage of this.updateOrder to run after updateTodosFromDB
	updateOrderAfterUpdateTodos(orderObj) {
		let todoIds = [];
		for (const val of Object.values(orderObj)) {
			todoIds.push('todo_' + val);
		}
		this.updateOrder(todoIds);
	}

	updateOrder(todoIds) {
		this.log('starting', 'updateOrder');
		let elementsToBeUpdated = this.state.elementDicts;
		let orderObj = [];
		let stateOrderObj = {};
		for (let i in todoIds) {
			let id = parseInt(todoIds[i].split('_')[1]);
			let order = parseInt(i) + 1;
			orderObj.push([id, order]);
			stateOrderObj[order] = id;
		}
		this.log('going into postOrderChange with orderObj: ' + JSON.stringify(orderObj), 'updateOrder');
		this.postOrderChange(orderObj);
		this.log('back from postOrderChange', 'updateOrder');
		this.log('done', 'updateOrder');
	}

	postOrderChange(orderObj) {
		this.log('starting', 'postOrderChange');
		if (this.props.username != '') {
			var url = 'http://192.168.0.26:5000/changeOrder';
			var jsonBody = {
				user: this.props.username,
				orderObj: orderObj,
			}

			this.log('return postJson promise', 'postOrderChange');
			return postJson(url, jsonBody).then(() => {
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
		}
		this.log('done', 'postOrderChange');
	}

	hideEditTodoForm() {
		this.setState({ showEditTodoPopup: false });
	}

	showEditTodoForm(elementProps) {
		this.setState({
			editingTodoProps: elementProps,
			showEditTodoPopup: true
		});
	}

	showTabHeaderContent(tabName) {
		this.log('starting', 'showTabHeaderContent');
		if (tabName !== this.state.activeTab) {
			this.log('setting active tab to ' + tabName, 'showTabHeaderContent');
			this.setState({ activeTab: tabName });
			this.updateOrderAfterHeaderSwitch(tabName);
		}
		this.log('done', 'showTabHeaderContent');
	}

	render() {
		let finishedElements = [];

		for (let i in this.state.elementDicts.Completed) {
			let element = this.state.elementDicts.Completed[i];
			finishedElements.push(<span key={i} className={styles.finishedItem}>{element.title}</span>);
		}

		let todoFormProps = {
			userLoggedIn: this.props.userLoggedIn
		};

		let todoColumnProps = {
			activeTab: this.state.activeTab,
			classes: styles.todoColumn,
			elementDicts: this.state.elementDicts[this.state.activeTab],
			markTodoCompleted: this.markCompleted,
			onEditClicked: this.showEditTodoForm,
			order: this.state.orderObj,
			updateOrder: this.updateOrder
		}

		let schedulerApp = <div name='schedulerBody' className={styles.schedulerContent}>
			{this.state.showEditTodoPopup && <FormPopup handleCloseForm={this.hideEditTodoForm}
				content={
					<React.Fragment>
						<Icon iconClass='far fa-times-circle' onClick={this.hideEditTodoForm} />
						<TodoForm {...todoFormProps} headerText='Edit Todo'
							handleAfterSubmit={this.updateTodoElement} displayAsPopup={true}
							prePopulatedContent={this.state.editingTodoProps} />
					</React.Fragment>
				} />}
			<div className={classnames(styles.gridElement, styles.leftColumn)}>
				<TodoForm {...todoFormProps} headerText='Add Todo'
					handleAfterSubmit={this.postTodoElement} />
			</div>
			<div className={classnames(styles.gridElement, styles.middleColumn)} >
				<TabBar tabHeaders={tabHeaders} showTabHeaderContent={this.showTabHeaderContent} />
				<TodoColumn {...todoColumnProps} />
			</div>
			<div className={classnames(styles.gridElement, styles.rightColumn)}>
				<div className={styles.completedTasksContainer}>
					<span className={styles.spanHeader}>Completed Tasks</span>
					<div className={styles.finishedItems}>
						{finishedElements}
					</div>
					<FormButton text='Clear' type='button' containerClass={styles.pushDown} onClick={this.clearCompleted} />
				</div>
			</div>
		</div>
		return schedulerApp;
	}
};

const editTodoPopup = ({ }) => {
	return <React.Fragment>
		<Icon iconClass='far fa-times-circle' onClick={this.handleCloseForm} />
		<TodoForm userLoggedIn={this.props.userLoggedIn} postTodoElement={this.props.postTodoElement} />
	</React.Fragment>;
}
