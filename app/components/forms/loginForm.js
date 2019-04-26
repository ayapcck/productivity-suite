var React = require('react');

import InputBox from './inputBox.js';
import FormButton from './button.js';

import styles from './form.css';

export default class LoginForm extends React.Component {
  render() {
    var loginForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Log In</h1>
		<InputBox text="Username" name="loginUsername" tooltipText="Username used to sign up" />
		<InputBox text="Password" name="loginPassword" type="password" />
		<FormButton text="Submit" />
	</div>
	return loginForm;
  }
}