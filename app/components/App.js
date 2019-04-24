var React = require('react');

import styles from './style.css';

class Greeting extends React.Component {
  render(){
    return <div class={styles.box}>Hello World Today!</div>;
  }
}

module.exports = Greeting;
