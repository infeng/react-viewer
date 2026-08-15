const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app');

ReactDOM.hydrate(<App />, document.getElementById('root'));
