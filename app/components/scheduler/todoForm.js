var React = require('react');

import classnames from 'classnames';

import InputBox from '../forms/inputBox.js';
import FormButton from '../forms/button.js';
import styles from './todoForm.less';

var Logger = require('../utilities/logger');

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTimeEnabled: false
        }

        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
	
	log(message, functionName) {
		Logger.log(message, "todoForm", functionName);
	}

    addTodoClicked(e) {
		this.log("starting", "addTodoClicked");
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
				this.log("submit conditions acceptible, passing off to postTodoElement", "addTodoClicked");
				this.props.postTodoElement(todoTitle, todoContent, todoDateTime, todoPriority);
			}
		} else {
			e.preventDefault();
			alert("You need an account to use this feature");
		}
		this.log("done", "addTodoClicked");
	}
	
	clearForm(e) {
		e.target[0].value = "";
		e.target[1].checked = false;
		e.target[2].checked = false;
		e.target[3].value = this.getCurrentISOTime();
		e.target[4].value = "";

		this.setState({ todoTimeEnabled: false });
	}
	
	getCurrentISOTime() {
		var timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
		var localISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, 16);
		return localISOTime;
	}

    handleTimeChange(ev) {
        let checked = ev.target.checked;
        this.setState({ todoTimeEnabled: checked });
    }

    render() {
        let todoForm = <div className={styles.addTodoContainer}>
            <form id="addTodoForm" onSubmit={this.addTodoClicked}>
                <InputBox text="Title" type="text" name="toDoTitle" />
                <div className={styles.checkboxContainer}>
                    <label>
                        Time enabled: 
                        <input type="checkbox" value="time" onChange={this.handleTimeChange}/>
                    </label>
                    <label>
                        High priority: 
                        <input type="checkbox" value="priority" />
                    </label>
                </div>
                <InputBox text="Date" type="datetime-local" name="toDoDate" 
                    val={this.getCurrentISOTime()} disabled={!this.state.todoTimeEnabled} 
                    disabledTooltipText="Disabled" />
                <InputBox text="Content" type="area" name="toDoBody" />
                <FormButton text="Submit" type="submit" name="addTodoFormSubmit" />
            </form>
        </div>;

        return todoForm;
    }
}
