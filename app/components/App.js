var React = require('react');

import CenterPanel from './centerPanel/centerPanel.js';

import styles from './style.css';

export default class App extends React.Component {
  render() {
	var app = <div className={styles.container}>
		<CenterPanel />
	</div>
    return app;
  }
}
