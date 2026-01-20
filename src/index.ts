import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
  const url = req.url ?? '/';
  const method = req.method ?? 'GET';

  console.log('--- REQUEST ---');
  console.log('method:', method);
  console.log('url:', url);

  if (method === 'GET' && url === '/') {
    const filePath = path.join(__dirname, '../public/index.html');
    const html = fs.readFileSync(filePath);
    console.log('__dirname:', __dirname);
    console.log('filePath:', filePath);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
    return;
  }

  if (method === 'GET' && url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('pong');
    return;
  }

  res.statusCode = 404;
  res.end('not found');
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
