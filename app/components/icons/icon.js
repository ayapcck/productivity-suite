var React = require('react');

import styles from './icon.css';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		var iconClass = this.props.iconClass;
		var iconStyles = this.props.iconStyles || styles.icon;
		var icon = <div className={styles.iconWrapper}>
			{this.props.iconText}
			<i className={classnames(iconStyles, iconClass)} onClick={this.props.onClick}></i>
		</div>
		return icon;
	}
}
