var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';

import styles from './form.css';

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
  
  postUser(username, email, password) {
	var headers = new Headers()
	var fetchOptions = {
		method: 'POST',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}
	
	var url = "http://192.168.0.26:5000/addUser?user=" + username +
		"&email=" + email + 
		"&password=" + password + "";
	
	fetch(url, fetchOptions)
		.then(response => {
			return response.json();
		}).then(myJson => {
			// TODO: clear form on successful creation
			alert(JSON.stringify(myJson));
		});
  }
	
  clearError(e) {
	var inputName =  e.target.name.replace("signup", "").toLowerCase() + "Invalid";
	var stateObj = {};
	stateObj[inputName] = false;
	this.setState( stateObj );
  }
	
  checkValididity(e) {
    var inputValue = e.target.value;
	var inputName =  e.target.name;
	var invalid = inputValue == "";
	
	var usernamePattern = new RegExp("[A-Za-z_\d]{5,12}");
	var emailPattern = new RegExp("[A-Za-z_\-\d]+@[A-Za-z_\-\d]+.com");
	var passwordPattern = new RegExp(".{10,}");
	
	switch(inputName) {
		default:
			invalid = false;
			break;
		case "signupUsername":
			this.setState({ usernameInvalid: inputValue != "" && !usernamePattern.test(inputValue)});
			break;
		case "signupEmail":
			this.setState({ emailInvalid: inputValue != "" && !emailPattern.test(inputValue)});
			break;
		case "signupPassword":
			this.setState({ passwordInvalid: inputValue != "" && !passwordPattern.test(inputValue)});
			break;
	}
	
	this.setState({ invalid: invalid });
  }
  
  handleSubmit(e) {
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
		this.postUser(username, email, password);
	}
	
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