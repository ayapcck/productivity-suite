var React = require('react');

import styles from './loginForm.css';

export default class InputBox extends React.Component {
	render() {
		var returnBox = <div className={styles.inputContainer}>
			<h3 className={styles.inputLabel}>
				{this.props.text}:
			</h3>
			{ this.props.type == "password" ? 
				<input type="password" className={styles.inputBox} /> : 
				<input type="text" className={styles.inputBox} />
			}
		</div>
		return returnBox;
	}
}

InputBox.defaultProps = {
	type: "text"
}