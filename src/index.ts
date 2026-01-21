import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
  const url = req.url ?? '/';
  const method = req.method ?? 'GET';

  // 쿼리스트링 제거
  const pathname = url.split('?')[0];

  console.log('--- REQUEST ---');
  console.log('method:', method);
  console.log('url:', url);
  console.log('pathname:', pathname);

  if (method === 'GET' && pathname === '/') { // url → pathname
    const filePath = path.join(__dirname, '../public/index.html');
    const html = fs.readFileSync(filePath);
    console.log('__dirname:', __dirname);
    console.log('filePath:', filePath);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
    return;
  }

  if (method === 'GET' && pathname === '/ping') { // url → pathname
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
