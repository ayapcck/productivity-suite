var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';

import styles from './form.css';

export default class SignupForm extends React.Component {
  constructor(props) {
	super(props);
	
	this.handleSubmit = this.handleSubmit.bind(this);
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
			alert(JSON.stringify(myJson));
		});
  }
	
  
  handleSubmit(e) {
	e.preventDefault();
	var username = e.target[0].value;
	var email = e.target[1].value;
	var password = e.target[2].value;
	var confirmPassword = e.target[3].value;
	
	password == confirmPassword ? 
		this.postUser(username, email, password) : 
		alert("Not working");
  }
  
  render() {
    var signupForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Create an Account</h1>
		<form onSubmit={this.handleSubmit}>
			<InputBox text="Username" name="signupUsername" pattern="[A-Za-z_\d]{5,12}" required={true}
				tooltipText="5-12 characters, case insensitive, a-b, 0-9, and underscores allowed" />
			<InputBox text="Email" name="signupEmail" pattern="[A-Za-z_\-\d]+@[A-Za-z_\-\d]+.com" required={true}
				tooltipText="Must be of form me@me.com" />
			<InputBox text="Password" type="password" name="signupPassword" pattern=".{10,}" required={true}
				tooltipText="Must be over 10 characters" />
			<InputBox text="Confirm Password" type="password" name="signupConfirmPassword" required={true} />
			<FormButton text="Submit" type="submit"/>
		</form>
	</div>
	return signupForm;
  }
}