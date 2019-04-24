var React = require('react');

import styles from './centerPanel.css';

export default class CenterPanel extends React.Component {
  render() {
    var centeredPanel = <div className={styles.centeredBox}>
		Hello
	</div>
	return centeredPanel;
  }
}