import App from './components/App.js';

var React = require('react');
var ReactDOM = require('react-dom');

var containerDiv = document.getElementById('container');
containerDiv.className += 'mainContent';

ReactDOM.render(<App />, containerDiv);
