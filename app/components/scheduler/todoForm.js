import React from 'react';
import styled from 'styled-components';

import InputBox from '../formElements/inputBox';
import FormButton from '../formElements/button';
import { currentISOTime, soonISOTime, tomorrowISOTime } from '../utilities/dates';
import { SpanHeader } from '../utilities/utilityStyles';

import { logger } from '../utilities/logger';

const containerHeader = (text) => <SpanHeader>{text}</SpanHeader>;
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
	display: grid;
	grid-template-rows: 10% 90%;
	margin: 10px auto;
	user-select: none;
	width: 90%;

	${ ({ displayAsPopup, theme }) => !displayAsPopup && `
		border-color: ${theme.borderColor};
		border-radius: 15px;
		border-style: solid;
		border-width: 2px;
	`}
`;

const AddTodoForm = styled.form`
	display: grid;
	grid-template-rows: 85% 15%;
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
	align-items: center;
	display: flex;
	grid-row: 2;
	width: -webkit-fill-available;
`;

const FormInputs = styled.div`
	grid-row: 1;
	margin: auto 0;
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
		let header = (text) => this.props.displayAsPopup ? popupHeader(text) : containerHeader(text);

		let timeCheckbox = <input type='checkbox' value='time' 
			onChange={this.handleTimeChange} checked={this.state.todoTimeEnabled} />;
		let priorityCheckbox = <input type='checkbox' value='priority' 
			onChange={this.handlePriorityChange} checked={this.state.priority || this.state.priority === 1} />;

		let todoForm = <AddTodoContainer displayAsPopup={this.props.displayAsPopup}>
            {header(this.props.headerText)}
			<AddTodoForm id='addTodoForm' onSubmit={this.submitClicked}>
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
				<FormButtonContainer>
					<FormButton text='Submit' type='submit' name='addTodoFormSubmit' />
				</FormButtonContainer>
            </AddTodoForm>
        </AddTodoContainer>;

        return todoForm;
    }
}

TodoForm.defaultProps = {
	displayAsPopup: false
}
