var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';

import styles from './form.css';

export default class SignupForm extends React.Component {
  render() {
    var signupForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Create an Account</h1>
		<InputBox text="Username" name="signupUsername" />
		<InputBox text="Email" name="signupEmail" />
		<InputBox text="Password"  type="password" name="signupPassword" />
		<InputBox text="Confirm Password" type="password" name="signupConfirmPassword" />
		<FormButton text="Submit" />
	</div>
	return signupForm;
  }
}