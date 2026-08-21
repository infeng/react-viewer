const assert = require('assert');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const Viewer = require('../dist');
assert.strictEqual(
  typeof Viewer,
  'function',
  'The CommonJS package entry must export the Viewer component directly'
);

console.log('Package default export is a component.');
dom.window.close();
process.exit(0);
