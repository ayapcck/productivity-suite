import React from 'react';

import styles from './icon.less';

import classnames from 'classnames';

export default class FormButton extends React.Component {
	render() {
		const { iconClass, iconStyles, wrapperStyles, 
				iconText, iconTextStyles, onClick, noWrapper } = this.props;

		const iconStyle = iconStyles || styles.icon;
		const wrapperStyle = wrapperStyles || styles.iconWrapper;
		const iconTextStyle = iconTextStyles || styles.iconText;

		const icon = <i className={classnames(iconStyle, iconClass)} onClick={onClick}></i>;

		const iconWithWrapper = <IconWrapper wrapperStyle={wrapperStyle}>
			{iconText && <IconText text={iconText} iconTextStyle={iconTextStyle} />}
			{icon}
		</IconWrapper>;

		return noWrapper ? icon : iconWithWrapper;
	}
}

const IconWrapper = (props) => {
	const { children, wrapperStyle } = props;

	return <div className={wrapperStyle}>
		{children}
	</div>;
};

const IconText = (props) => {
	const { text, iconTextStyle } = props;

	return <span className={iconTextStyle}>{text}</span>;
};
