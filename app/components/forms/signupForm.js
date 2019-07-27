import React from 'react';

import InputBox from './inputBox.js';
import FormButton from './button.js';
import { postJson, getJson } from '../utilities/jsonHelpers.js';
import { generateSalt, generateActivationCode, generateHmac } from '../utilities/validation.js';

import styles from './form.less';

var Logger = require('../utilities/logger');

const usernamePattern = new RegExp("[A-Za-z_\d]{5,12}");
const emailPattern = new RegExp("[A-Za-z_\-\d]+@[A-Za-z_\-\d]+.com");
const passwordPattern = new RegExp(".{10,}");
const inputNames = [{
	name: "signupUsername",
	isValid: (val) => usernamePattern.test(val)
}, {
	name: "signupEmail",
	isValid: (val) => emailPattern.test(val)
}, {
	name: "signupPassword",
	isValid: (val) => passwordPattern.test(val)
}];

export default class SignupForm extends React.Component {
  constructor(props) {
		super(props);
		
		this.state = {
			usernameInvalid: false,
			emailInvalid: false,
			passwordInvalid: false
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearError = this.clearError.bind(this);
		this.checkValididity = this.checkValididity.bind(this);
  }
	
  log(message, functionName) {
    Logger.log(message, "schedulerApp", functionName);
  }
  
  checkCreateUserTable(user) {
		var url = "http://192.168.0.26:5000/createUserTable?user=" + user;
		
		getJson(url).then(response => {}).catch(error => {
			alert(error);
		});
  }
  
  createUser(username, email, password) {
		this.log("starting", "createUser");
		var salt = generateSalt(16);
		var passHash = generateHmac(password, salt);
		var activationCode = generateActivationCode();
		
		var url = "http://192.168.0.26:5000/addUser";
		var jsonBody = {
			user: username,
			email: email,
			password: passHash,
			salt: salt,
			activationCode: activationCode
		}
		
		this.log("POST user information", "createUser");
		postJson(url, jsonBody).then(response => {
			alert("Created successfully, please check your email, including spam folder");
		}).catch(error => {
			if (error.response.status == 409) {
				alert("Username/email already in use");
			}
		});
		this.log("done", "createUser");
  }
	
  clearError(e) {
		var inputName =  e.target.name.replace("signup", "").toLowerCase() + "Invalid";
		var stateObj = {};
		stateObj[inputName] = false;
		this.setState( stateObj );
  }
	
  checkValididity(e) {
		this.log("starting", "checkValididity");
		let inputValue = e.target.value;
		let inputName =  e.target.name;
		let inputEmpty = inputValue === "";

		let invalidKey = inputName.replace('signup', '').toLowerCase() + "Invalid";

		let invalid = inputValue == "";

		inputNames.forEach((obj) => {
			if (obj.name === inputName) {
				this.setState({ 
					[invalidKey]: !inputEmpty && !obj.isValid(inputValue)
				});
			}
		});

		this.log("done", "checkValididity");
  }
  
  clearForm(e) {
		[0,1,2,3].forEach(i => {
			e.target[i].value = "";
		});
  }
  
  handleSubmit(e) {
		this.log("starting", "handleSubmit");
		e.preventDefault();
		var username = e.target[0].value;
		var email = e.target[1].value;
		var password = e.target[2].value;
		var confirmPassword = e.target[3].value;
		
		var emptyValues = username == "" || email == "" || password == "";
		
		var invalidValues = false;
		invalidValues = this.state.usernameInvalid || this.state.emailInvalid || this.state.passwordInvalid;
		
		if (emptyValues) {
			alert("Please fill out each section");
		} else if (invalidValues) {
			alert("Please ensure all fields fit the criteria");
		} else if (password != confirmPassword) {
			alert("Passwords don't match");
		} else {
			this.clearForm(e);
			this.checkCreateUserTable(username);
			this.createUser(username, email, password);
		}
		this.log("done", "handleSubmit");
  }
  
  render() {
    var signupForm = <div className={styles.form}>
			<h1 className={styles.formTitle}>Create an Account</h1>
			<form onSubmit={this.handleSubmit}>
				<InputBox text="Username" name="signupUsername" invalid={this.state.usernameInvalid}
					tooltipText="5-12 characters, case insensitive, a-b, 0-9, and underscores allowed" 
					onBlur={this.checkValididity} onFocus={this.clearError} />
				<InputBox text="Email" name="signupEmail" invalid={this.state.emailInvalid}
					tooltipText="Must be of form me@me.com" 
					onBlur={this.checkValididity} onFocus={this.clearError} />
				<InputBox text="Password" type="password" name="signupPassword" invalid={this.state.passwordInvalid}
					tooltipText="Must be over 10 characters" 
					onBlur={this.checkValididity} onFocus={this.clearError} />
				<InputBox text="Confirm Password" type="password" name="signupConfirmPassword" />
				<FormButton text="Submit" type="submit"/>
			</form>
		</div>
		return signupForm;
  }
}