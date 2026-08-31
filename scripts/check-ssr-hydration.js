const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const serverMarkup = [
  '<!doctype html><html><body>',
  '<div id="root"><div data-reactroot=""><button>open</button></div></div>',
  '</body></html>',
].join('');
const dom = new JSDOM(serverMarkup, {
  runScripts: 'outside-only',
  url: 'http://127.0.0.1:8005/',
});

async function verifyHydration() {
  dom.window.requestAnimationFrame = callback => dom.window.setTimeout(callback, 0);
  dom.window.cancelAnimationFrame = id => dom.window.clearTimeout(id);

  const bundlePath = path.join(__dirname, '..', 'ssr-test', 'client-dist', 'main.js');
  dom.window.eval(fs.readFileSync(bundlePath, 'utf8'));

  const openButton = dom.window.document.querySelector('#root button');
  assert(openButton, 'The SSR fixture must preserve its server-rendered button during hydration');
  assert.strictEqual(openButton.textContent, 'open');

  openButton.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  await new Promise(resolve => dom.window.setTimeout(resolve, 50));

  assert.strictEqual(openButton.textContent, 'close', 'The hydrated fixture must respond to user input');
  assert(
    dom.window.document.querySelector('[aria-label="Close viewer"]'),
    'The hydrated fixture must render the Viewer component'
  );

  console.log('SSR fixture hydrated and opened the Viewer component.');
}

verifyHydration()
  .then(() => {
    dom.window.close();
  })
  .catch(error => {
    dom.window.close();
    console.error(error);
    process.exit(1);
  });
