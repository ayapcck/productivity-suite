var React = require('react');

import styles from './form.css';

export default class FormButton extends React.Component {
	render() {
		var formButton = <div className={styles.formButton}>{this.props.text}</div>
		return formButton;
	}
}