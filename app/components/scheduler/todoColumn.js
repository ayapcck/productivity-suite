var React = require('react');

import classnames from 'classnames';

import ToDoElement from './todoElement.js';
import styles from './todoColumn.css';
import todoStyles from './todoElement.css';

export default class TodoColumn extends React.Component {
	constructor(props) {
		super(props);
		
		this.allowDrop = this.allowDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.startDrag = this.startDrag.bind(this);
	}
	
	allowDrop(ev) {
		ev.preventDefault();
	}
	
	startDrag(ev) {
		console.log("starting drag event");
		ev.dataTransfer.setData("idText", ev.target.id);
	}
	
	drop(ev) {
		console.log("starting drop method in todoColumn");
		
		let eventX = ev.clientX;
		let eventY = ev.clientY;
		
		let targetNode = ev.target;
		let prevSibNode = targetNode.previousSibling;
		let previousTodoId = prevSibNode == null ? null : prevSibNode.id;
		let draggedTodoId = ev.dataTransfer.getData("idText");
		
		let todos = document.getElementsByClassName(todoStyles.todoElement);
		let todoIds = [];
		previousTodoId == null && todoIds.push(draggedTodoId);
		for (let i = 0; i < todos.length; i++) {
			let id = todos[i].id;
			if (previousTodoId != null && id === previousTodoId) {
				todoIds.push(id);
				todoIds.push(draggedTodoId);
			} else {
				id !== draggedTodoId && todoIds.push(id);
			}
		}
		
		ev.dataTransfer.clearData("idText");
		ev.preventDefault();
		console.log("passing off to props.updateOrder with todo ids: " + JSON.stringify(todoIds));
		this.props.updateOrder(todoIds);
		console.log("back from props.updateOrder");
	}
	
	render() {
		const todosAndSpacers = [];
		let todoLength = this.props.elementDicts.length;
		
		todosAndSpacers.push(<Spacer key={"spacer_0"} id={"spacer_0"} onDragOver={this.allowDrop} onDrop={this.drop} />);
		console.log("elements at this point: " + JSON.stringify(this.props.elementDicts));
		console.log("order at this point: " + JSON.stringify(this.props.order));
		for (let i in this.props.order) {
			let elementId = this.props.order[i];
			var element = this.props.elementDicts[elementId];
			if (!element.completed) {
				console.log("creating todo_" + element.id + " element");
				todosAndSpacers.push(<ToDoElement key={i} id={"todo_" + element.id + ""} title={element.title} text={element.text} 
					datetime={element.datetime} draggable="true" onDragStart={this.startDrag} /*onClick={this.markCompleted}*/ />);
				let id = "spacer_" + i + "";
				(i !== todoLength - 1) && 
					todosAndSpacers.push(<Spacer key={id} id={id} onDragOver={this.allowDrop} onDrop={this.drop} />);
			}
		}
		
		var todoColumn = <div id="todoContainer" className={classnames(this.props.classes)}>
			{todosAndSpacers}
		</div>;
		return todoColumn;
	}
}

const Spacer = ({id, onDragOver, onDrop}) => (
	<div key={id} id={id} className={styles.spacer} onDragOver={onDragOver} onDrop={onDrop}></div>
);