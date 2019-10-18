const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./app');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client-dist')));

app.get('*', function response(req, res) {
  const html = ReactDOMServer.renderToString(<App />);
  const _frontHtml = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      </head>
      <body>
          <div id="root">${html}</div>
          <script src="/main.js"></script>
      </body>
  </html>`
  res.send(_frontHtml);
});

var server = app.listen(process.env.PORT || 8005, '0.0.0.0', function () {
  console.log('app listening on port ', process.env.PORT || 8005);
});
