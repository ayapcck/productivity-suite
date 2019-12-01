var React = require('react');

import styles from './form.less';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		let buttonProps = {
			type: this.props.type,
			className: styles.formButton,
			onClick: this.props.onClick,
			name: this.props.name
		}
		
		var formButton = <div className={this.props.containerClass} style={{"textAlign": "center"}}>
			{this.props.type === "button" ? 
			<button {...buttonProps} readOnly>{this.props.text}</button> : 
			<input {...buttonProps} value={this.props.text} readOnly /> }
		</div>
		return formButton;
	}
}