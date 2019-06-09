var React = require('react');

import classnames from 'classnames';

import InputBox from '../forms/inputBox.js';
import FormButton from '../forms/button.js';
import styles from './todoForm.less';

var Logger = require('../utilities/logger');

const containerHeader = (text) => <span className={styles.spanHeader}>{text}</span>;
const popupHeader = (text) => <h1 className={styles.textHeader}>{text}</h1>;
const currentISOTime = () => {
	let timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
	let localISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 16);
	return localISOTime;
}

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
		
		let prefill = typeof this.props.prePopulatedContent !== 'undefined';
		let datetime = prefill ? this.props.prePopulatedContent.datetime : '';
		let datetimeEmpty = datetime === 'T' || datetime === '';
		let todoTimeEnabled = !datetimeEmpty;
		datetime = datetimeEmpty ? currentISOTime() : datetime;

        this.state = {
			content: prefill ? this.props.prePopulatedContent.content : '',
			datetime: datetime,
			prefill: prefill,
			priority: prefill && this.props.prePopulatedContent.priority,
			title: prefill ? this.props.prePopulatedContent.title : '',
			todoTimeEnabled: todoTimeEnabled
        }

		this.submitClicked = this.submitClicked.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
	
	log(message, functionName) {
		Logger.log(message, "todoForm", functionName);
	}

    submitClicked(e) {
		this.log("starting", "submitClicked");
		if (this.props.userLoggedIn) {
			e.preventDefault();
			let todoTitle = e.target[0].value;
			let timeEnabled = e.target[1].checked;
			let todoPriority = e.target[2].checked ? 1 : 0;
			let todoDateTime = timeEnabled ? e.target[3].value : "T";
			let todoContent = e.target[4].value;
			
			let emptyValues = todoTitle == "";
			
			if (emptyValues) {
				alert("Please fill title section");
			} else {
				this.clearForm(e);
				this.log("submit conditions acceptible, passing off to postTodoElement", "submitClicked");
				this.props.handleAfterSubmit(todoTitle, todoContent, todoDateTime, todoPriority);
			}
		} else {
			e.preventDefault();
			alert("You need an account to use this feature");
		}
		this.log("done", "submitClicked");
	}
	
	clearForm(e) {
		e.target[0].value = "";
		e.target[1].checked = false;
		e.target[2].checked = false;
		e.target[3].value = currentISOTime();
		e.target[4].value = "";

		this.setState({ todoTimeEnabled: false });
	}

	handlePriorityChange(ev) {
		let checked = ev.target.checked;
		this.setState({ priority: checked });
	}

    handleTimeChange(ev) {
        let checked = ev.target.checked;
        this.setState({ todoTimeEnabled: checked });
    }

    render() {
		let header = (text) => this.props.displayAsPopup ? popupHeader(text) : containerHeader(text);
		let borderClass = !this.props.displayAsPopup && styles.addTodoContainerBorder;

		let timeCheckbox = <input type="checkbox" value="time" 
			onChange={this.handleTimeChange} checked={this.state.todoTimeEnabled} />;
		let priorityCheckbox = <input type="checkbox" value="priority" 
			onChange={this.handlePriorityChange} checked={this.state.priority || this.state.priority === 1} />;

		let todoForm = <div className={classnames(styles.addTodoContainer, borderClass)}>
            {header(this.props.headerText)}
			<form id="addTodoForm" className={styles.addTodoForm} onSubmit={this.submitClicked}>
                <div className={styles.formInputs}>
					<InputBox text="Title" type="text" name="toDoTitle" val={this.state.title} />
					<div className={styles.checkboxContainer}>
						<label>
							Time enabled: 
							{timeCheckbox}
						</label>
						<label>
							High priority: 
							{priorityCheckbox}
						</label>
					</div>
					<InputBox text="Date" type="datetime-local" name="toDoDate" 
						val={this.state.datetime} disabled={!this.state.todoTimeEnabled} 
						disabledTooltipText="Disabled" />
					<InputBox text="Content" type="area" name="toDoBody" val={this.state.content} />
				</div>
				<FormButton text="Submit" type="submit" name="addTodoFormSubmit" 
					containerClass={styles.pushDown} />
            </form>
        </div>;

        return todoForm;
    }
}

TodoForm.defaultProps = {
	displayAsPopup: false
}
