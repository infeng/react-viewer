const assert = require('assert');
const http = require('http');
const { createRequire } = require('module');
const request = require('request');
const requireFromRequest = createRequire(require.resolve('request'));
const FormData = requireFromRequest('form-data');

async function verifyMultipart() {
  // The retired request package pins an older form-data minor. Check that its
  // security override uses independent boundaries even with predictable PRNG.
  const random = Math.random;
  try {
    Math.random = () => 0.5;
    assert.notStrictEqual(
      new FormData().getBoundary(),
      new FormData().getBoundary(),
      'Multipart boundaries must not depend on Math.random'
    );
  } finally {
    Math.random = random;
  }

  const payload = Buffer.from([0, 1, 2, 255]);
  let uploadError;
  let received = false;
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks);
        const contentType = req.headers['content-type'];
        assert(contentType.startsWith('multipart/form-data; boundary='));
        const boundary = contentType.slice(contentType.indexOf('boundary=') + 9);
        assert(body.includes(Buffer.from('--' + boundary + '\r\n')));
        assert(body.includes(Buffer.from('name="caption"\r\n\r\nreact-viewer\r\n')));
        assert(body.includes(Buffer.from('name="image"; filename="sample.bin"')));
        assert(body.includes(Buffer.from('Content-Type: application/octet-stream')));
        assert(body.includes(payload));
        assert(body.toString('latin1').endsWith('--' + boundary + '--\r\n'));
        assert.strictEqual(Number(req.headers['content-length']), body.length);
        received = true;
        res.end('ok');
      } catch (error) {
        uploadError = error;
        res.statusCode = 400;
        res.end('invalid multipart upload');
      }
    });
  });

  try {
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    await new Promise((resolve, reject) => {
      request.post({
        url: 'http://127.0.0.1:' + server.address().port,
        timeout: 5000,
        formData: {
          caption: 'react-viewer',
          image: {
            value: payload,
            options: { filename: 'sample.bin', contentType: 'application/octet-stream' },
          },
        },
      }, (error, response, body) => {
        if (error || uploadError) return reject(error || uploadError);
        try {
          assert.strictEqual(response.statusCode, 200);
          assert.strictEqual(body, 'ok');
          assert(received, 'The local server must receive the upload');
          resolve();
        } catch (assertionError) {
          reject(assertionError);
        }
      });
    });
    console.log('Request multipart boundaries and text/binary upload passed.');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}

verifyMultipart().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
