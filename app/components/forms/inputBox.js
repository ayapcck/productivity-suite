var React = require('react');

import styles from './form.css';

export default class InputBox extends React.Component {
	render() {
		var returnBox = <div className={styles.inputContainer}>
			{ this.props.type == "password" ? 
				<input type="password" className={styles.inputBox} placeholder={this.props.text} /> : 
				<input type="text" className={styles.inputBox} placeholder={this.props.text} />
			}
		</div>
		return returnBox;
	}
}

InputBox.defaultProps = {
	type: "text"
}