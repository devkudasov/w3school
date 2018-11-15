const http = require('http'),
  url = require('url'),
  fs = require('fs');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = `.${q.pathname}`;

  fs.readFile(filename, (err, file) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 Not Found');
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(file);
    return res.end();
  });
}).listen(8080);