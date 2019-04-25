var React = require('react');

import CenterPanel from './centerPanel/centerPanel.js';
import LoginForm from './forms/loginForm.js';

import styles from './style.css';

export default class App extends React.Component {
  render() {
	var form = <LoginForm />
	var app = <div className={styles.container}>
		<CenterPanel 
			content={form}
		/>
	</div>
    return app;
  }
}
