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
  }
  
  handleSubmit(e) {
	e.preventDefault();
	var text="Username: " + e.target[0].value;
	var text1="Email: " + e.target[1].value;
	var text2="Password: " + e.target[2].value;
	var text3="Confirm Password: " + e.target[3].value;
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