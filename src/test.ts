import http from 'http';

const server = http.createServer((req, res) => {
  const url = req.url ?? '/';
  const method = req.method ?? 'GET';

  console.log('--- REQUEST ---');
  console.log('method:', method);
  console.log('url:', url);

  if (method === 'GET' && url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('pong');
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('not found');
});

server.listen(3000, () => {
  console.log('server start: http://localhost:3000');
});


// import http from 'http';

// const server = http.createServer((req, res) => {

// 	console.log('--- REQUEST ---.');
// 	console.log('method: ', req.method);
// 	console.log('url: ', req.url);
// 	console.log('headers: ', req.headers);

// 	if (req.url == '/ping') {
// 		res.statusCode = 200;
// 		res.end('pong');
// 		return ;
// 	}
	
// 	res.statusCode = 404;
// 	res.end('not found');
// });



// server.listen(3000, () => {
// 	console.log('server start: http;//localhost:3000');
// });

// function add(a: number, b:number): number {
// 	return (a + b);
// }