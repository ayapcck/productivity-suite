var React = require('react');

import InputBox from './inputBox.js';

import styles from './loginForm.css';

export default class SignupForm extends React.Component {
  render() {
    var signupForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Create an Account</h1>
		<InputBox text="Username" />
		<InputBox text="Email" />
		<InputBox text="Password"  type="password" />
		<InputBox text="Confirm Password" type="password" />
	</div>
	return signupForm;
  }
}