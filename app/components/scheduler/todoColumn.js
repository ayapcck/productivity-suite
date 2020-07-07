import React from 'react';
import styled from 'styled-components';

import classnames from 'classnames';

import ToDoElement from './todoElement.js';
import styles from './todoColumn.less';

import { logger } from '../utilities/logger';

const StyledTodoColumn = styled.div`
	height: 90%;
	overflow: auto;
`;

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
		this.removeDraggedTodoClassWrapper = this.removeDraggedTodoClassWrapper.bind(this);
		this.removeDropClass = this.removeDropClass.bind(this);
		this.startDrag = this.startDrag.bind(this);
	}
	
	log(message, functionName) {
		logger.log(message, 'todoColumn', functionName);
	}
	
	previousOrNextSpacer(dropTargetId) {
		let draggedTodoId = this.state.draggedTodoId;
		let draggedTodoNode = document.getElementById(draggedTodoId);
		let prevSpacerId = draggedTodoNode.previousSibling.id
		let nextSpacerId = draggedTodoNode.nextSibling.id;
		return dropTargetId == nextSpacerId || dropTargetId == prevSpacerId
	}
	
	allowDrop(ev) {
		if (!this.previousOrNextSpacer(ev.target.id)) {
			ev.preventDefault();
		}
	}
	
	addDropClass(ev) {
		let dropTargetNode = ev.target;
		if (!this.previousOrNextSpacer(dropTargetNode.id)) {
			dropTargetNode.classList.add(styles.dropLocationHovered);
		}
	}
	
	addDraggedTodoClass(draggedTodoId) {
		this.log('adding class', 'addDraggedTodoClass');
		let draggedTodoNode = document.getElementById(draggedTodoId);
		draggedTodoNode.classList.add(styles.hideTodo);
	}
	
	removeDropClass(ev) {
		let dropTargetNode = ev.target;
		dropTargetNode.classList.remove(styles.dropLocationHovered);
	}
	
	removeDraggedTodoClassWrapper(ev) {
		let dropEffect = ev.dataTransfer.dropEffect;
		if (dropEffect === 'none') {
			this.removeDraggedTodoClass();
		}
	}
	
	removeDraggedTodoClass(draggedTodoId=null) {
		this.log('removing class', 'removeDraggedTodoClass');
		if (draggedTodoId === null) {
			draggedTodoId = this.state.draggedTodoId;
		}
		let draggedTodoNode = document.getElementById(draggedTodoId);
		try {
			draggedTodoNode.classList.remove(styles.hideTodo);
			this.setState({draggedTodoId: null});
		} catch (e) {};
	}
	
	startDrag(ev) {
		this.log('starting drag event', 'startDrag');
		let draggedTodoId = ev.target.id;
		let previousSiblingId = ev.target.previousSibling.id; 
		let nextSiblingId = ev.target.nextSibling.id;
		ev.dataTransfer.setData('idText', draggedTodoId);
		this.setState({draggedTodoId: draggedTodoId});
		this.addDraggedTodoClass(draggedTodoId);
	}
	
	drop(ev) {
		this.log('starting', 'drop');
		
		const targetNode = ev.target;
		const prevSibNode = targetNode.previousSibling;
		const previousTodoId = prevSibNode == null ? null : prevSibNode.id.replace('todo_', '');
		const draggedTodoId = ev.dataTransfer.getData('idText').replace('todo_', '');
		
		const todos = document.getElementsByClassName("todoElement");
		let orderObj = {};
		let order = 1;
		if (previousTodoId == null) {
			orderObj[order] = draggedTodoId;
			order += 1;
		}

		for (let i = 0; i < todos.length; i++) {
			let id = todos[i].id.replace('todo_', '');
			if (previousTodoId != null && id === previousTodoId) {
				orderObj[order] = id;
				order += 1;
				orderObj[order] = draggedTodoId;
				order += 1;
			} else {
				if (id !== draggedTodoId) {
					orderObj[order] = id;
					order += 1;
				}
			}
		}
		
		ev.preventDefault();
		this.log('passing off to props.updateOrder with todo ids: ' + JSON.stringify(orderObj), 'drop');
		this.props.updateOrder(orderObj);
		this.log('back from props.updateOrder', 'drop');
		this.removeDropClass(ev); 
		this.log('done', 'drop');
	}
	
	logElements(elements) {
		let retVal = [];
		Object.keys(elements).map((value) => {
			retVal.push("ord: " + elements[value].order + " id: " + elements[value].id);
		});
		return retVal;
	}

	shouldComponentUpdate(nextProps, nextState) {
		this.log('Next props order: ' + JSON.stringify(nextProps.order), 'shouldComponentUpdate');
		this.log('Current props order: ' + JSON.stringify(this.props.order), 'shouldComponentUpdate');
		this.log('Next props elements: ' + JSON.stringify(this.logElements(nextProps.elementDicts)), 'shouldComponentUpdate');
		this.log('Current props elements: ' + JSON.stringify(this.logElements(this.props.elementDicts)), 'shouldComponentUpdate');
		let emptyButNotBoth = Object.entries(this.props.order).length === 0 && this.props.order !== nextProps;
		if (emptyButNotBoth) {
			this.log('component should update', 'shouldComponentUpdate');
			return true;
		}
		if (nextProps.order !== this.props.order || 
				nextProps.elementDicts !== this.props.elementDicts) {
			this.log('component should update', 'shouldComponentUpdate');
		 	this.removeDraggedTodoClass(this.state.draggedTodoId);
		 	return true;
		}
		this.log('component should not update', 'shouldComponentUpdate');
		return false;
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
		
		todosAndDropLocations.push(<DropLocation key={'DropLocation_0'} id={'DropLocation_0'} {...dropTargetProps} />);
		this.log('order at this point: ' + JSON.stringify(this.props.order), 'render');
		for (let i in this.props.order) {
			let elementId = this.props.order[i];
			var element = this.props.elementDicts[elementId];
			if (element) {
				this.log('creating todo_' + element.id + ' element', 'render');
				let todoProps = {
					key: i,
					activeTab: this.props.activeTab,
					id: 'todo_' + element.id + '',
					title: element.title,
					text: element.text,
					datetime: element.datetime,
					draggable: 'true',
					onDragStart: this.startDrag,
					onDragEnd: this.removeDraggedTodoClassWrapper,
					onTodoCompleted: this.props.markTodoCompleted,
					onEditClicked: this.props.onEditClicked,
					priority: element.priority
				};
				todosAndDropLocations.push(<ToDoElement {...todoProps} />);
				let id = 'DropLocation_' + i+1 + '';
				(i !== todoLength - 1) && 
					todosAndDropLocations.push(<DropLocation key={id} id={id} {...dropTargetProps} />);
			}
		}

		let todoColumn = <StyledTodoColumn id='todoContainer'>
			{todosAndDropLocations}
		</StyledTodoColumn>;
		return todoColumn;
	}
}

const DropLocation = (props) => (
	<div key={props.id} id={props.id} className={styles.dropLocation} onDragOver={props.onDragOver} onDrop={props.onDrop}
		onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>
);