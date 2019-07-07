var React = require('react');

import styles from './icon.less';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		const { iconClass, iconStyles, wrapperStyles, 
				iconText, iconTextStyles, onClick } = this.props;

		const iconStyle = iconStyles || styles.icon;
		const wrapperStyle = wrapperStyles || styles.iconWrapper;
		const iconTextStyle = iconTextStyles || styles.iconText;

		const icon = <div className={wrapperStyle}>
			{iconText && <span className={iconTextStyle}>{iconText}</span>}
			<i className={classnames(iconStyle, iconClass)} onClick={onClick}></i>
		</div>
		return icon;
	}
}
