var React = require('react');

import styles from './icon.css';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		var iconClass = this.props.iconClass;
		var icon = <div className={styles.iconWrapper}>
			<i className={classnames(styles.icon, iconClass)} onClick={this.props.onClick}></i>
		</div>
		return icon;
	}
}
