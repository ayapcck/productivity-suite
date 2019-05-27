var React = require('react');

import classnames from 'classnames';

import ToDoElement from './todoElement.js';
import styles from './todoColumn.css';
import todoStyles from './todoElement.css';

var Logger = require('../utilities/logger');

export default class TodoColumn extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			draggedTodoId: null,
		}
		
		this.addDraggedTodoClass = this.addDraggedTodoClass.bind(this);
		this.addDropClass = this.addDropClass.bind(this);
		this.allowDrop = this.allowDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.removeDraggedTodoClass = this.removeDraggedTodoClass.bind(this);
		this.removeDropClass = this.removeDropClass.bind(this);
		this.startDrag = this.startDrag.bind(this);
	}
	
	log(message, functionName) {
		Logger.log(message, "todoColumn", functionName);
	}
	
	allowDrop(ev) {
		ev.preventDefault();
	}
	
	addDropClass(ev) {
		let dropTargetNode = ev.target;
		dropTargetNode.classList.add(styles.dropLocationHovered);
	}
	
	addDraggedTodoClass(draggedTodoId) {
		let draggedTodoNode = document.getElementById(draggedTodoId);
		draggedTodoNode.classList.add(styles.hideTodo);
	}
	
	removeDropClass(ev) {
		let dropTargetNode = ev.target;
		dropTargetNode.classList.remove(styles.dropLocationHovered);
	}
	
	removeDraggedTodoClass(draggedTodoId=null) {
		draggedTodoId = draggedTodoId !== null && this.state.draggedTodoId;
		let draggedTodoNode = document.getElementById(draggedTodoId);
		try {
			draggedTodoNode.classList.remove(styles.hideTodo);
		} catch (e) {};
	}
	
	startDrag(ev) {
		this.log("starting drag event", "startDrag");
		let draggedTodoId = ev.target.id;
		ev.dataTransfer.setData("idText", draggedTodoId);
		this.setState({draggedTodoId: draggedTodoId});
		this.addDraggedTodoClass(draggedTodoId);
	}
	
	drop(ev) {
		this.log("starting", "drop");
		
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
		
		ev.preventDefault();
		this.log("passing off to props.updateOrder with todo ids: " + JSON.stringify(todoIds), "drop");
		this.props.updateOrder(todoIds);
		this.removeDropClass(ev);
		this.removeDraggedTodoClass(draggedTodoId);
		this.setState({draggedTodoId: null});
		this.log("back from props.updateOrder", "drop");
		this.log("done", "drop");
	}
	
	render() {
		const todosAndDropLocations = [];
		let todoLength = this.props.elementDicts.length;
		
		const dropTargetProps = {
			onDragEnter: this.addDropClass,
			onDragOver: this.allowDrop,
			onDragLeave: this.removeDropClass,
			onDrop: this.drop,
		};
		
		todosAndDropLocations.push(<DropLocation key={"DropLocation_0"} id={"DropLocation_0"} {...dropTargetProps} />);
		this.log("order at this point: " + JSON.stringify(this.props.order), "render");
		for (let i in this.props.order) {
			let elementId = this.props.order[i];
			var element = this.props.elementDicts[elementId];
			if (!element.completed) {
				this.log("creating todo_" + element.id + " element", "render");
				let todoProps = {
					key: i,
					id: "todo_" + element.id + "",
					title: element.title,
					text: element.text,
					datetime: element.datetime,
					draggable: "true",
					onDragStart: this.startDrag,
					/* onClick: this.markCompleted */ 
				};
				todosAndDropLocations.push(<ToDoElement {...todoProps} onDragEnd={this.removeDraggedTodoClass} />);
				let id = "DropLocation_" + i + "";
				(i !== todoLength - 1) && 
					todosAndDropLocations.push(<DropLocation key={id} id={id} {...dropTargetProps} />);
			}
		}
		
		var todoColumn = <div id="todoContainer" className={classnames(this.props.classes)}>
			{todosAndDropLocations}
		</div>;
		return todoColumn;
	}
}

const DropLocation = (props) => (
	<div key={props.id} id={props.id} className={styles.dropLocation} onDragOver={props.onDragOver} onDrop={props.onDrop}
		onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>
);