const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app');
import '../dist/index.css';

ReactDOM.hydrate(<App />, document.getElementById('root'));
