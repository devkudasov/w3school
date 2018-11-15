const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('demofile1.html', (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Sorry!');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  });
}).listen(8080);