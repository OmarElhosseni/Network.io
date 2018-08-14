const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const route = (__dirname + '/..') + (req.url !== '/' ? req.url : '/index.html');
  fs.readFile(route, 'utf8', function(err, data) {
    res.status = err ? 500 : 200;

    if (err) return res.end();

    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
