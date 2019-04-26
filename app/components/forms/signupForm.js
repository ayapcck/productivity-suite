var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';

import styles from './form.css';

export default class SignupForm extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		username: "",
		email: "",
		password: ""
	}
	
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handleEmailChange = this.handleEmailChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);
	this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }
  
  handleSubmit(e) {
	var text="Username: " + e.target[0].value;
	var text1="Email: " + e.target[1].value;
	var text2="Password: " + e.target[2].value;
	var text3="Confirm Password: " + e.target[3].value;
	alert(text + text1 + text2 + text3);
  }
  
  handleUsernameChange() {}
  handleEmailChange() {}
  handlePasswordChange() {}
  handleConfirmPasswordChange() {}
  
  render() {
    var signupForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Create an Account</h1>
		<form onSubmit={this.handleSubmit}>
			<InputBox text="Username" name="signupUsername" 
				tooltipText="Case insensitive, a-b, 0-9, and underscores allowed" onChange={this.handleUsernameChange} />
			<InputBox text="Email" name="signupEmail" 
				tooltipText="Must be of form me@me.com" onChange={this.handleEmailChange} />
			<InputBox text="Password"  type="password" name="signupPassword" 
				tooltipText="Must be over 10 characters" onChange={this.handlePasswordChange} />
			<InputBox text="Confirm Password" type="password" name="signupConfirmPassword" 
				onChange={this.handleConfirmPasswordChange} />
			<FormButton text="Submit" type="submit"/>
		</form>
	</div>
	return signupForm;
  }
}