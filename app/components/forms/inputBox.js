var React = require('react');

import Tooltip from '../tooltip/tooltip.js'

import classnames from 'classnames';
import styles from './form.less';

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
			defaultValue: this.props.val,
			disabled: this.props.disabled,
			placeholder: this.props.text,
			onBlur: this.props.onBlur,
			onFocus: this.props.onFocus,
		};		
		let inputBoxProperties = {
			type: this.props.type,
			className: classnames(styles.inputBox, this.props.invalid && styles.invalid),
		};
		let inputAreaProperties = {
			className: styles.inputBox,
			rows: 4,
		};

		let areaProps = Object.assign({}, mouseProperties, properties, inputAreaProperties);
		let boxProps = Object.assign({}, mouseProperties, properties, inputBoxProperties);
		let showTooltip = this.state.showTooltip && 
			((this.props.disabled && this.props.disabledTooltipText != "") || 
			this.props.tooltipText != "");
		let tooltipText = this.props.disabled ? this.props.disabledTooltipText : this.props.tooltipText;
		
		let inputElement = this.props.type == "area" ? 
			<textarea {...areaProps}></textarea> :
			<input {...boxProps} />
		let disabledInput = <div {...mouseProperties}>
			{inputElement}
		</div>
		let returnElement = <div className={styles.inputContainer}>
			{ showTooltip && <Tooltip top={this.state.boxY} left={this.state.mouseX} 
				name={this.props.name + "Tooltip"} tooltipText={tooltipText} /> }
			{this.props.disabled ? disabledInput : inputElement}
		</div>
		return returnElement;
	}
}

InputBox.defaultProps = {
	type: "text",
	tooltipText: ""
}