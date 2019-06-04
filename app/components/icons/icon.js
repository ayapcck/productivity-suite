var React = require('react');

import styles from './icon.less';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		let iconClass = this.props.iconClass;
		let iconStyles = this.props.iconStyles || styles.icon;
		let wrapperStyles = this.props.wrapperStyles || styles.iconWrapper;
		let icon = <div className={wrapperStyles}>
			{this.props.iconText}
			<i className={classnames(iconStyles, iconClass)} onClick={this.props.onClick}></i>
		</div>
		return icon;
	}
}
