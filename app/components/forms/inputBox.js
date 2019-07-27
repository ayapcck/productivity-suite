import React from 'react';

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
		let mouseProperties = {
			onMouseEnter: this.tooltipOn,
			onMouseMove: this.updateTooltip,
			onMouseLeave: this.tooltipOff,
		};	
		let properties = {
			name: this.props.name,
			disabled: this.props.disabled,
			placeholder: this.props.text,
			onBlur: this.props.onBlur,
			onFocus: this.props.onFocus
		};
		const props = {
			val: this.props.val,
			type: this.props.type,
			inputProps: _.assign({}, mouseProperties, properties),
			onChange: this.props.onChange,
			invalid: this.props.invalid
		};

		let showTooltip = this.state.showTooltip && 
			((this.props.disabled && this.props.disabledTooltipText != "") || 
			this.props.tooltipText != "");
		let tooltipText = this.props.disabled ? this.props.disabledTooltipText : this.props.tooltipText;
		
		let type = 'box';
		if (this.props.type === 'area') type = 'area';
		if (this.props.type === 'date') type = 'date';

		const inputElement = inputElements[type](props);
		let disabledInput = <div {...mouseProperties}>
			{inputElement}
		</div>;
		let returnElement = <div className={styles.inputContainer}>
			{ showTooltip && <Tooltip top={this.state.boxY} left={this.state.mouseX} 
				name={this.props.name + "Tooltip"} tooltipText={tooltipText} /> }
			{this.props.disabled ? disabledInput : inputElement}
		</div>;
		return returnElement;
	}
}

InputBox.defaultProps = {
	type: "text",
	tooltipText: ""
};
