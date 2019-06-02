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
		var inputProperties = {
			name: this.props.name,
			defaultValue: this.props.val,
			disabled: this.props.disabled,
			placeholder: this.props.text,
			onMouseEnter: this.tooltipOn,
			onMouseMove: this.updateTooltip,
			onMouseLeave: this.tooltipOff,
			onBlur: this.props.onBlur,
			onFocus: this.props.onFocus
		}
		var inputBoxProperties = {
			type: this.props.type,
			className: classnames(styles.inputBox, this.props.invalid && styles.invalid),
		}
		var inputAreaProperties = {
			className: styles.inputBox,
			rows: 4,
		} 
		var returnBox = <div className={styles.inputContainer}>
			{ this.props.tooltipText != "" && this.state.showTooltip && 
			<Tooltip top={this.state.boxY} left={this.state.mouseX} 
				name={this.props.name + "Tooltip"} tooltipText={this.props.tooltipText} /> }
			{this.props.type == "area" ? 
				<textarea {...inputProperties} {...inputAreaProperties}></textarea> :
				<input {...inputProperties} {...inputBoxProperties} />}
		</div>
		return returnBox;
	}
}

InputBox.defaultProps = {
	type: "text",
	tooltipText: ""
}