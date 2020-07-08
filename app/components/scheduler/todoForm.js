import React from 'react';
import styled from 'styled-components';

import InputBox from '../formElements/inputBox';
import FormButton from '../formElements/button';
import { TodoHeader } from './todoHeader';
import { currentISOTime, soonISOTime, tomorrowISOTime } from '../utilities/dates';

import { logger } from '../utilities/logger';

const containerHeader = (text) => {
	const title = <AddTodoTitle>{text}</AddTodoTitle>;
	return <TodoHeader side='left' title={title} />;
}
const popupHeader = (text) => <TextHeader>{text}</TextHeader>;
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

const AddTodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
	width: 100%;
`;

const AddTodoForm = styled.form`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: hidden;
`;

const AddTodoTitle = styled.div`
	margin: auto;
`;

const CheckboxContainer = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	color: ${(props) => props.theme.textColor};

	& label {
		display: flex;
		justify-content: center;
	}

	& label, input {
		cursor: pointer;
	}
`;

const DateTimeContainer = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;

	& input {
		text-align: center;
	}
`;

const FormButtonContainer = styled.div`
	display: flex;
	height: 10%;
	margin-top: auto;

	${ ({ displayAsPopup }) => displayAsPopup && `
		margin: auto;
		margin-bottom: 10px;
	`}
`;

const FormInputs = styled.div`
	padding: 10px;
`;

const TextHeader = styled.h1`
	text-align: center;
	margin: 0;
	padding: 0 0 10px 0;
`;

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
		logger.log(message, 'todoForm', functionName);
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

		this.setState({ priority: false, todoTimeEnabled: false });
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
		const { displayAsPopup } = this.props;

		const header = (text) => displayAsPopup ? popupHeader(text) : containerHeader(text);

		const timeCheckbox = <input type='checkbox' value='time' 
			onChange={this.handleTimeChange} checked={this.state.todoTimeEnabled} />;
		const priorityCheckbox = <input type='checkbox' value='priority' 
			onChange={this.handlePriorityChange} checked={this.state.priority || this.state.priority === 1} />;

		return <AddTodoContainer>
			<AddTodoForm id='addTodoForm' onSubmit={this.submitClicked}>
				{header(this.props.headerText)}
                <FormInputs>
					<InputBox text='Title' type='text' name='toDoTitle' val={this.state.title} />
					<CheckboxContainer>
						<label>
							High priority: 
							{priorityCheckbox}
						</label>
						<label>
							Time enabled: 
							{timeCheckbox}
						</label>
					</CheckboxContainer>
					<DateTimeContainer>
						<InputBox text='Date' type='date' name='toDoDate'
							val={this.state.date} onChange={this.changeDate} />
						<InputBox text='Time' type='time' name='toDoTime' 
							val={this.state.time} disabled={!this.state.todoTimeEnabled} 
							disabledTooltipText='Disabled' />
					</DateTimeContainer>
					<InputBox text='Content' type='area' name='toDoBody' val={this.state.content} />
				</FormInputs>
				<FormButtonContainer displayAsPopup={displayAsPopup}>
					<FormButton text='Submit' type='submit' name='addTodoFormSubmit' />
				</FormButtonContainer>
            </AddTodoForm>
        </AddTodoContainer>;
    }
}

TodoForm.defaultProps = {
	displayAsPopup: false
}
