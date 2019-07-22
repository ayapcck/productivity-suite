var React = require('react');

import classnames from 'classnames';

import InputBox from '../forms/inputBox';
import FormButton from '../forms/button';
import { currentISOTime, soonISOTime, tomorrowISOTime } from '../utilities/dates';
import styles from './todoForm.less';

var Logger = require('../utilities/logger');

const containerHeader = (text) => <span className={styles.spanHeader}>{text}</span>;
const popupHeader = (text) => <h1 className={styles.textHeader}>{text}</h1>;
const getTimeByTab = (tab) => {
	switch (tab) {
		case 'Today':
			return currentISOTime();
		case 'Tomorrow':
			return tomorrowISOTime();
		case 'Soon':
			return soonISOTime();
		default:
			return currentISOTime();
	}
}

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
		
		let prefill = typeof this.props.prePopulatedContent !== 'undefined';
		let datetime = prefill ? this.props.prePopulatedContent.datetime : '';
		let datetimeEmpty = datetime === 'T' || datetime === '';
		
		datetime = datetimeEmpty ? getTimeByTab(this.props.currentTab) : datetime;
		datetime = datetime.split('T');
		let date = datetime[0];
		let time = datetime[1] ;
		let timeEmpty = time === ''; 
		time = timeEmpty ? currentISOTime().split('T')[1] : datetime[1];
		let todoTimeEnabled = !datetimeEmpty && !timeEmpty;

        this.state = {
			content: prefill ? this.props.prePopulatedContent.content : '',
			date: date,
			prefill: prefill,
			priority: prefill && this.props.prePopulatedContent.priority,
			time: time,
			title: prefill ? this.props.prePopulatedContent.title : '',
			todoTimeEnabled: todoTimeEnabled
        }

		this.changeDate = this.changeDate.bind(this);
		this.submitClicked = this.submitClicked.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
	}
	
	log(message, functionName) {
		Logger.log(message, 'todoForm', functionName);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.currentTab !== nextProps.currentTab) {
			this.setState({ date: getTimeByTab(nextProps.currentTab).split('T')[0] });
		}
		return true;
	}
	
	changeDate(ev) {
		this.setState({ date: ev.target.value });
	}

    submitClicked(e) {
		this.log('starting', 'submitClicked');
		if (this.props.userLoggedIn) {
			e.preventDefault();
			let todoTitle = e.target[0].value;
			let todoPriority = e.target[1].checked ? 1 : 0;
			let timeEnabled = e.target[2].checked;
			let todoDate = e.target[3].value;
			let todoTime = timeEnabled ? e.target[4].value : '';
			let todoContent = e.target[5].value;

			let datetime = todoDate + 'T' + todoTime;
			
			let emptyValues = todoTitle == '';
			
			if (emptyValues) {
				alert('Please fill title section');
			} else {
				this.clearForm(e);
				this.log('Submit conditions acceptible, passing off to postTodoElement', 'submitClicked');
				this.props.handleAfterSubmit(todoTitle, todoContent, datetime, todoPriority);
			}
		} else {
			e.preventDefault();
			alert('You need an account to use this feature');
		}
		this.log('done', 'submitClicked');
	}
	
	clearForm(e) {
		let datetime = currentISOTime();
		let date = datetime.split('T')[0];
		let time = datetime.split('T')[1];
		e.target[0].value = '';
		e.target[1].checked = false;
		e.target[2].checked = false;
		e.target[3].value = date;
		e.target[4].value = time;
		e.target[5].value = '';

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

		let timeCheckbox = <input type='checkbox' value='time' 
			onChange={this.handleTimeChange} checked={this.state.todoTimeEnabled} />;
		let priorityCheckbox = <input type='checkbox' value='priority' 
			onChange={this.handlePriorityChange} checked={this.state.priority || this.state.priority === 1} />;

		let todoForm = <div className={classnames(styles.addTodoContainer, borderClass)}>
            {header(this.props.headerText)}
			<form id='addTodoForm' className={styles.addTodoForm} onSubmit={this.submitClicked}>
                <div className={styles.formInputs}>
					<InputBox text='Title' type='text' name='toDoTitle' val={this.state.title} />
					<div className={styles.checkboxContainer}>
						<label>
							High priority: 
							{priorityCheckbox}
						</label>
						<label>
							Time enabled: 
							{timeCheckbox}
						</label>
					</div>
					<div className={styles.dateTimeContainer}>
						<InputBox text='Date' type='date' name='toDoDate'
							val={this.state.date} onChange={this.changeDate} />
						<InputBox text='Time' type='time' name='toDoTime' 
							val={this.state.time} disabled={!this.state.todoTimeEnabled} 
							disabledTooltipText='Disabled' />
					</div>
					<InputBox text='Content' type='area' name='toDoBody' val={this.state.content} />
				</div>
				<FormButton text='Submit' type='submit' name='addTodoFormSubmit' 
					containerClass={styles.pushDown} />
            </form>
        </div>;

        return todoForm;
    }
}

TodoForm.defaultProps = {
	displayAsPopup: false
}
