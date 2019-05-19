var React = require('react');

import styles from './form.css';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		var formButton = <div className={this.props.containerClass} style={{"textAlign": "center"}}>
			<input type={this.props.type} className={styles.formButton} value={this.props.text} onClick={this.props.onClick} readOnly />
		</div>
		return formButton;
	}
}