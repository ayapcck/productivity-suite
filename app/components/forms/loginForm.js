var React = require('react');

import InputBox from './inputBox.js';

import styles from './loginForm.css';

export default class LoginForm extends React.Component {
  render() {
    var loginForm = <div className={styles.form}>
		<h1 className={styles.formTitle}>Log In</h1>
		<InputBox text="Username" />
		<InputBox text="Password"  type="password" />
	</div>
	return loginForm;
  }
}