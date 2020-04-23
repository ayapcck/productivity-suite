var React = require('react');

import Tooltip from '../tooltip/tooltip.js'

import classnames from 'classnames';
import styles from './form.less';

const inputElements = {
	area: ({ val, inputProps }) => {
		return <textarea {...inputProps} className={styles.inputBox} 
			defaultValue={val} rows={4}></textarea>;
	},
	box: ({ val, inputProps, invalid, type }) => {
		return <input {...inputProps} defaultValue={val} type={type}
			className={classnames(styles.inputBox, invalid && styles.invalid)} />;
	},
	date: ({ val, inputProps, onChange }) => {
		return <input {...inputProps} type='date' className={styles.inputBox} 
			defaultValue={val} value={val} onChange={onChange} />;
	}
};

export default class InputBox extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			showTooltip: false,
			mouseX: 0,
			boxY: 0
		};
		
		this.tooltipOn = this.tooltipOn.bind(this);
		this.tooltipOff = this.tooltipOff.bind(this);
		this.updateTooltip = this.updateTooltip.bind(this);
	}
	
	setTooltipCoordinates(e) {
		const inputBox = document.getElementsByName(this.props.name)[0];
		var rect = inputBox.getBoundingClientRect();
		this.setState({ mouseX: e.clientX, boxY: rect.top });
	}
	
	tooltipOn(e) {
		this.setTooltipCoordinates(e);
		this.setState({ showTooltip: true });
	}
	
	updateTooltip(e) {
		this.setState({ showTooltip: true });
		this.setTooltipCoordinates(e);
	}
	
	tooltipOff() {
		this.setState({ showTooltip: false });
	}

	render() {
		const { disabled, disabledTooltipText, invalid, name, 
			onBlur, onChange, onFocus, text, tooltipText, 
			type, val } = this.props;

		const { boxY, mouseX, showTooltip } = this.state;

		const mouseProps = {
			onMouseEnter: this.tooltipOn,
			onMouseMove: this.updateTooltip,
			onMouseLeave: this.tooltipOff,
		};	
		const otherProps = {
			name,
			disabled,
			placeholder: text,
			onBlur,
			onFocus
		};
		const finalProps = {
			val,
			type,
			inputProps: _.assign({}, mouseProps, otherProps),
			onChange,
			invalid
		};

		const finalShowTooltip = showTooltip && 
			((disabled && disabledTooltipText != "") || 
			tooltipText != "");
		const finalTooltipText = disabled ? disabledTooltipText : tooltipText;
		
		let finalType = 'box';
		if (type === 'area') finalType = 'area';
		if (type === 'date') finalType = 'date';

		const inputElement = inputElements[finalType](finalProps);
		const disabledInput = <div {...mouseProps}>
			{inputElement}
		</div>;
		let returnElement = <div className={styles.inputContainer}>
			{ finalShowTooltip && <Tooltip top={boxY} left={mouseX} 
				name={name + "Tooltip"} tooltipText={finalTooltipText} /> }
			{disabled ? disabledInput : inputElement}
		</div>;
		return returnElement;
	}
}

InputBox.defaultProps = {
	type: "text",
	tooltipText: ""
};
