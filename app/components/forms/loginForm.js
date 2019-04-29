var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';
import { loadJson } from '../utilities/jsonHelpers.js';

import styles from './form.css';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
  
  getUser(username, password) {
	var headers = new Headers()
	var fetchOptions = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}
	
	var url = "http://192.168.0.26:5000/getUser?user=" + username + "";
	
	loadJson(url, fetchOptions).then(myJsonUser => {
			var retPassword = myJsonUser[2];
			password == retPassword ?
				alert("Logged In") :
				alert("Incorrect user/password combination");
		}).catch(error => {
			if (error.response.status == 404) {
				alert("Incorrect user/password combination");
			}
		});
  }
  
  handleSubmit(e) {
	e.preventDefault();
	var username = e.target[0].value;
	var password = e.target[1].value;
	
	var emptyValues = username == "" || password == "";
	
	emptyValues ? 
		alert("Please fill in each section") : 
		this.getUser(username, password);
  }
  
  render() {
    var loginForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Log In</h1>
		<form onSubmit={this.handleSubmit}>
			<InputBox text="Username" name="loginUsername" tooltipText="Username used to sign up" requiredField={true} />
			<InputBox text="Password" name="loginPassword" type="password" requiredField={true} />
			<FormButton text="Submit" type="submit" />
		</form>
	</div>
	return loginForm;
  }
}