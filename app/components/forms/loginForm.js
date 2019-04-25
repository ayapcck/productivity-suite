var React = require('react');

import InputBox from './inputBox.js';

import styles from './loginForm.css';

export default class LoginForm extends React.Component {
  render() {
    var loginForm = <div className={styles.loginForm}>
		<InputBox text="Username" />
		<InputBox text="Password"  type="password" />
	</div>
	return loginForm;
  }
}