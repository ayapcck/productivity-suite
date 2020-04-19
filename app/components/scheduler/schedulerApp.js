import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import _ from 'lodash';
import classnames from 'classnames';

import FormButton from '../forms/button.js';
import CenterPanel from '../centerPanel/centerPanel'
import Icon from '../icons/icon.js';
import TabBar from '../tabs/tabBar.js';
import TodoColumn from './todoColumn.js';
import TodoForm from './todoForm.js';
import styles from './schedulerApp.less';
import { postJson, getJson } from '../utilities/jsonHelpers.js';
import { currentTimeString, tomorrowTimeString } from '../utilities/dates.js';

import { colorTheme } from '../../colors';

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
		const { serverAddress } = this.props;
		var url = serverAddress + '/addTodo';
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
		const { serverAddress } = this.props;
		let url = serverAddress + '/updateTodo';
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
		const { serverAddress, username } = this.props;
		if (username && username !== '') {
			const { activeTab } = this.state;
			this.log('starting', 'updateTodosFromDB');
			var url = serverAddress + '/retrieveTodos?user=' +
				username + '&tab=' + activeTab;

			getJson(url).then(response => {
				var numberTodos = 0;
				var elements = initialElementDicts();

				response.forEach(todoItem => {
					elements[todoItem.tab][todoItem.id] = todoItem;
					numberTodos += 1;
				});

				let orderObj = this.handleCollisions(elements[activeTab]);
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
		const { serverAddress } = this.props;
		if (this.props.username != '') {
			this.log('starting', 'markCompleted');
			var url = serverAddress + '/markCompleted?user=' + this.props.username + '&id=' + id + '';

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
		const { serverAddress } = this.props;
		if (this.props.username != '') {
			var url = serverAddress + '/clearCompleted?user=' + this.props.username;

			postJson(url).then(response => {
				this.setState({ needsUpdate: true });
				this.updateTodosFromDB();
			}).catch(error => {
				alert(error);
			});
		}
	}

	handleCollisions(todos) {
		let orderObj = {};
		let collisions = [];
		let lastOrder = 0;

		!_.isEmpty(todos) && _.forIn(todos, (val, key) => {
			const id = val.id;
			const order = val.order;
			if (!(order in orderObj)) {
				lastOrder = order > lastOrder ? order : lastOrder;
				orderObj[order] = id;
			} else {
				collisions.push(id);
			}
		});

		if (!_.isEmpty(collisions)) {
			collisions.forEach(id => {
				orderObj[lastOrder + 1] = id;
				lastOrder++;
			});
			this.handleOrderAfterUpdate(orderObj);
		}

		return orderObj;
	}

	updateOrderAfterHeaderSwitch(tabName) {
		let orderObj = this.handleCollisions(this.state.elementDicts[tabName]);
		this.log('orderObj: ' + JSON.stringify(orderObj), 'updateOrderAfterHeaderSwitch');
		this.setState({ orderObj: orderObj });
	}

	handleOrderAfterUpdate(orderObj) {
		this.log('starting', 'handleOrderAfterUpdate');

		let compareOrdObj = JSON.stringify(orderObj);
		let compareStateOrdObj = JSON.stringify(this.state.orderObj);
		this.log('this.state.orderObj before setState: ' + compareStateOrdObj, 'handleOrderAfterUpdate');
		this.log('orderObj before setState: ' + compareOrdObj, 'handleOrderAfterUpdate');

		if (compareOrdObj !== compareStateOrdObj && !_.includes(compareStateOrdObj, 'null')) {
			this.log('order size was different, passing off to updateOrder', 'handleOrderAfterUpdate');
			this.updateOrder(orderObj);
		}
		this.log('done', 'handleOrderAfterUpdate');
	}

	updateOrder(orderedIds) {
		this.log('starting', 'updateOrder');
		let orderObj = [];
		let stateOrderObj = {};
		let lastOrder = 0;
		_.forIn(orderedIds, (val, key) => {
			const id = val;
			let order = key === 'null' ? lastOrder + 1 : parseInt(key);
			lastOrder = order > lastOrder ? order : lastOrder;

			orderObj.push([id, order]);
			stateOrderObj[order] = id;
		});
		this.log('going into postOrderChange with orderObj: ' + JSON.stringify(orderObj), 'updateOrder');
		this.postOrderChange(orderObj);
		this.log('back from postOrderChange', 'updateOrder');
		this.log('done', 'updateOrder');
	}

	postOrderChange(orderObj) {
		const { serverAddress } = this.props;
		this.log('starting', 'postOrderChange');
		if (this.props.username != '') {
			var url = serverAddress + '/changeOrder';
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
			currentTab: this.state.activeTab,
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
		const todoForm = <React.Fragment>
			<Icon iconClass='far fa-times-circle' onClick={this.hideEditTodoForm} />
			<TodoForm {...todoFormProps} headerText='Edit Todo'
				handleAfterSubmit={this.updateTodoElement} displayAsPopup={true}
				prePopulatedContent={this.state.editingTodoProps} />
		</React.Fragment>;

		const schedulerApp = <div name='schedulerBody' className={styles.schedulerContent}>
			{this.state.showEditTodoPopup && <CenterPanel content={todoForm} id="EditFormPopup"
				handleClose={this.hideEditTodoForm} />}
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
		return <ThemeProvider theme={colorTheme}>
			{schedulerApp}
		</ThemeProvider>;
	}
};
