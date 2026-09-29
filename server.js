// =============================================================================
// PRODUCTION HTTP SERVER FOR RENDER / CLOUD HOSTING
// Built with native Node.js HTTP modules - Zero External Dependencies
// Binds to 0.0.0.0:${PORT} and includes /healthz endpoint for Render health checks
// =============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '0.0.0.0';
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Render Health Check endpoint
  if (pathname === '/healthz' || pathname === '/health') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end('OK');
    return;
  }

  // Prevent directory traversal attacks
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);

  // Check if target is a directory, if so look for index.html
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (statErr, fileStats) => {
      if (statErr || !fileStats.isFile()) {
        // Fallback to index.html for SPA routing if not requesting an asset extension
        const ext = path.extname(filePath);
        if (!ext || ext === '.html') {
          serveFile(path.join(PUBLIC_DIR, 'index.html'), req, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('404 File Not Found');
        }
        return;
      }

      serveFile(filePath, req, res, fileStats);
    });
  });
});

function serveFile(targetFile, req, res, fileStats) {
  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Generate lightweight ETag
  const mtime = fileStats ? fileStats.mtime.toUTCString() : new Date().toUTCString();
  const etag = fileStats ? `W/"${fileStats.size}-${fileStats.mtimeMs}"` : null;

  if (etag && req.headers['if-none-match'] === etag) {
    res.writeHead(304, { 'ETag': etag });
    res.end();
    return;
  }

  fs.readFile(targetFile, (readErr, data) => {
    if (readErr) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('500 Internal Server Error');
      return;
    }

    const isCompressible = ext === '.html' || ext === '.css' || ext === '.js' || ext === '.json' || ext === '.svg' || ext === '.txt';
    const isStaticAsset = ext === '.css' || ext === '.js' || ext === '.pdf' || ext === '.png' || ext === '.jpg' || ext === '.svg' || ext === '.woff2';
    const cacheControl = isStaticAsset ? 'public, max-age=604800, stale-while-revalidate=86400' : 'no-cache, must-revalidate';

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };

    if (etag) headers['ETag'] = etag;
    if (mtime) headers['Last-Modified'] = mtime;

    const acceptEncoding = req.headers['accept-encoding'] || '';

    // Gzip Compression
    if (isCompressible && acceptEncoding.includes('gzip')) {
      zlib.gzip(data, (gzipErr, compressedData) => {
        if (!gzipErr) {
          headers['Content-Encoding'] = 'gzip';
          headers['Vary'] = 'Accept-Encoding';
          res.writeHead(200, headers);
          res.end(compressedData);
        } else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
}

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  Diwakar Jha - Executive ML Portfolio Production Server`);
  console.log(`  Listening on http://${HOST}:${PORT}`);
  console.log(`  Health Check: http://${HOST}:${PORT}/healthz`);
  console.log(`  Ready for Render Deployment!`);
  console.log(`====================================================`);
});

// Graceful termination
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
