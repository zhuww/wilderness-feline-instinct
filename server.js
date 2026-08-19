/* Minimal dependency-free static file server for the game. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

function handler(req, res) {
  try {
    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
      res.writeHead(400); res.end('Bad request'); return;
    }
    // Reject NUL and other control characters (raw bytes, decoded path or
    // decoded query) before any path/fs processing — prevents the fs DoS.
    let decodedQuery = '';
    try {
      const qi = req.url.indexOf('?');
      if (qi !== -1) decodedQuery = decodeURIComponent(req.url.slice(qi + 1));
    } catch (e) { /* undecodable query: harmless, never touches fs */ }
    if (/[\x00-\x1f\x7f]/.test(req.url) || /[\x00-\x1f\x7f]/.test(urlPath) || /[\x00-\x1f\x7f]/.test(decodedQuery)) {
      res.writeHead(400); res.end('Bad request'); return;
    }
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.normalize(path.join(root, urlPath));
    // Exact root boundary: a plain startsWith(root) prefix test lets sibling
    // directories with the same prefix (e.g. test_project_backup) slip through.
    const rel = path.relative(root, filePath);
    if (rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    // Refuse hidden files/directories (leading-dot segments, e.g. .git).
    if (urlPath.split('/').some((s) => s.startsWith('.') && s !== '.' && s !== '..')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    fs.readFile(filePath, (err, data) => {
      try {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
        });
        res.end(data);
      } catch (e) {
        if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
    });
  } catch (e) {
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Internal Server Error');
  }
}

const ports = [8080, 8081, 8082, 8090, 8123];
function tryListen(i) {
  if (i >= ports.length) {
    console.error('No free port available');
    process.exit(1);
  }
  const p = ports[i];
  const srv = http.createServer(handler);
  srv.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('port ' + p + ' busy, trying next...');
      tryListen(i + 1);
    } else {
      console.error('Server error:', e.message);
      process.exit(1);
    }
  });
  srv.listen(p, '127.0.0.1', () => {
    console.log('READY http://127.0.0.1:' + p + '  (root: ' + root + ')');
  });
}
tryListen(0);
