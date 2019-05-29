var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';
import { getJson } from '../utilities/jsonHelpers.js';
import { generateHmac } from '../utilities/validation.js';

import styles from './form.css';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  
  loginUser(username, password) {
	var url = "http://192.168.0.26:5000/getUser?user=" + username + "";
	
	getJson(url).then(myJsonUser => {
			var retPassword = myJsonUser[1];
			var salt = myJsonUser[2];
			var active = myJsonUser[3];
			if (generateHmac(password, salt) == retPassword) {
				active == 1 ? this.props.onLoginSuccess(username) : alert("You need to verify your email");
			} else {
				alert("Incorrect user/password combination")
			}
		}).catch(error => {
			if (error.response.status == 404) {
				alert("Incorrect user/password combination");
			}
		});
  }
  
  clearForm(e) {
	[0,1].forEach(i => {
		e.target[i].value = "";
	});
  }
  
  handleSubmit(e) {
	e.preventDefault();
	var username = e.target[0].value;
	var password = e.target[1].value;
	
	var emptyValues = username == "" || password == "";
	
	if (!emptyValues) {
		this.clearForm(e);
		this.loginUser(username, password);
	} else {
		alert("Please fill in each section");
	}
  }
  
  render() {
    var loginForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Log In</h1>
		<form id="loginForm" onSubmit={this.handleSubmit}>
			<InputBox text="Username" name="loginUsername" tooltipText="Username used to sign up" requiredField={true} />
			<InputBox text="Password" name="loginPassword" type="password" requiredField={true} />
			<FormButton text="Submit" type="submit" name="loginFormSubmit" />
		</form>
	</div>
	return loginForm;
  }
}