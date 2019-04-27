var React = require('react');

import styles from './form.css';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		var formButton = <div style={{"textAlign": "center"}}>
			<input type={this.props.type} className={styles.formButton} value={this.props.text} readOnly />
		</div>
		return formButton;
	}
}