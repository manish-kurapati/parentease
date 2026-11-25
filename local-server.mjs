import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const routes = new Set(['/', '/about', '/pricing', '/services', '/faq', '/contact-us', '/book']);
  const route = pathname.replace(/\/$/, '') || '/';
  const isPage = routes.has(route) || /^\/services\/[a-z-]+$/.test(route);
  const file = resolve(root, `.${isPage ? '/index.html' : pathname}`);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    const headers = {
      'content-type': types[extname(file)] || 'application/octet-stream',
      'accept-ranges': 'bytes',
      'cache-control': 'no-store',
    };
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || '');
    if (match && extname(file) === '.mp4') {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : body.length - 1;
      if (start >= body.length || end < start) {
        response.writeHead(416, { 'content-range': `bytes */${body.length}` }).end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        'content-range': `bytes ${start}-${Math.min(end, body.length - 1)}/${body.length}`,
        'content-length': Math.min(end, body.length - 1) - start + 1,
      });
      response.end(body.subarray(start, Math.min(end, body.length - 1) + 1));
      return;
    }
    response.writeHead(200, { ...headers, 'content-length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
}).listen(4173, '127.0.0.1', () => {
  console.log('ParentEase preview: http://127.0.0.1:4173');
});
