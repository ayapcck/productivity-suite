var React = require('react');
var classnames = require('classnames');

import CenterPanel from './centerPanel/centerPanel.js';
import LoginForm from './forms/loginForm.js';
import SignupForm from './forms/signupForm.js';

import styles from './style.css';

export default class App extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
		showLogin: true,
	}
	
	this.toggleLogin = this.toggleLogin.bind(this);
  }
  
  toggleLogin() {
	this.setState(state => ({
		showLogin: !this.state.showLogin,
	}));
  }
  
  render() {
	//var form = showLogin ? <LoginForm /> : <SignupForm />;
	//var redirect = showLogin ? <RedirectLink text="Need an account?" /> : <RedirectLink text="Already have an account?" />;
	var app = <div className={styles.container}>
		<CenterPanel 
			content={ 
				<React.Fragment>
					{this.state.showLogin ? <LoginForm /> : <SignupForm />}
					{this.state.showLogin ? 
						<RedirectLink text="Need an account?" onClick={this.toggleLogin} /> : 
						<RedirectLink text="Already have an account?" onClick={this.toggleLogin} />}
				</React.Fragment>
			}
		/>
	</div>
    return app;
  }
};

const RedirectLink = ({text, onClick}) => (
	<div className={styles.textContainer}>
		<h4 className={styles.formText}>{text}</h4>
		<h4 className={classnames(styles.redirectLink, styles.formText)} onClick={onClick}>Click Here</h4>
	</div>
);