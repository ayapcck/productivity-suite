var React = require('react');

import classnames from 'classnames';

import ToDoElement from './todoElement.js';
import styles from './todoColumn.css';
import todoStyles from './todoElement.css';

export default class TodoColumn extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			orderUpdated: true
		}
		
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
		console.log("about to drop element");
		if (this.props.orderUpdated) {
			let draggedElementData = ev.dataTransfer.getData("idText");
			ev.dataTransfer.clearData("idText");
			let draggedElementNode = document.getElementById(draggedElementData);
			let nextSpacer = draggedElementNode.nextSibling;
			
			let dropLocationNode = ev.target;
			let todoContainerNode = document.getElementById("todoContainer");
			
			todoContainerNode.insertBefore(draggedElementNode, dropLocationNode);
			todoContainerNode.insertBefore(nextSpacer, draggedElementNode);
			this.updateOrder();
		}
		ev.preventDefault();
	}
	
	updateOrder() {
		console.log("starting update order function");
		let todos = document.getElementsByClassName(todoStyles.todoElement);
		let todoIds = [];
		for (let i = 0; i < todos.length; i++) {
			todoIds.push(todos[i].id);
		}
		this.setState({orderUpdated: false});
		this.props.updateOrder(todoIds);
	}
	
	render() {
		const todosAndSpacers = [];
		let todoLength = this.props.elementDicts.length;
		
		todosAndSpacers.push(<Spacer key={"spacer_0"} id={"spacer_0"} onDragOver={this.allowDrop} onDrop={this.drop} />);
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