var React = require('react');

import Tooltip from '../tooltip/tooltip.js'

import styles from './form.css';

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
		this.setState({ mouseX: e.clientX, boxY: rect.top })
	}
	
	tooltipOn(e) {
		this.setTooltipCoordinates(e);
		this.setState({ showTooltip: true });
	}
	
	updateTooltip(e) {
		this.setTooltipCoordinates(e);
	}
	
	tooltipOff() {
		this.setState({ showTooltip: false });
	}
	
	render() {
		var inputBoxProperties = {
			name: this.props.name,
			type: this.props.type,
			className: styles.inputBox,
			placeholder: this.props.text,
			onMouseEnter: this.tooltipOn,
			onMouseMove: this.updateTooltip,
			onMouseLeave: this.tooltipOff,
			onChange: this.props.onChange,
			pattern: this.props.pattern
		}
		var returnBox = <div className={styles.inputContainer}>
			{ this.props.tooltipText != "" && this.state.showTooltip && 
			<Tooltip top={this.state.boxY} left={this.state.mouseX} 
				name={this.props.name + "Tooltip"} tooltipText={this.props.tooltipText} /> }
			{this.props.required ? 
				<input {...inputBoxProperties} required /> : 
				<input {...inputBoxProperties} />
			}
			
		</div>
		return returnBox;
	}
}

InputBox.defaultProps = {
	type: "text",
	tooltipText: ""
}