var React = require('react');

import styles from './tooltip.less';
import classnames from 'classnames';

export default class Tooltip extends React.Component {	
	constructor(props) {
		super(props);
		
		this.state = {
			width: 0
		}
		
		this.refCallback = this.refCallback.bind(this);
	}
	
	moveTooltip() {
		var tooltip = document.getElementsByName(this.props.name)[0]
		tooltip.style.left = this.props.left - (this.state.width / 2) + "px";
	}
	
	refCallback(element) {
		element && this.setState({ width: element.getBoundingClientRect().width });
	}
	
	componentDidUpdate() {
		this.moveTooltip();
	}
	
	render() {
		var bottom = window.innerHeight - this.props.top + 6;
		var tooltip = 
		<div ref={this.refCallback} 
			name={this.props.name}
			style={{bottom: bottom}} 
			className={classnames(styles.tooltip, styles.top)}>
			
			<div className={styles.tooltipArrow} />
			<div className={styles.tooltipLabel}>{this.props.tooltipText}</div>
		</div>
		return tooltip;
	}
}