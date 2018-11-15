const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

http.createServer(function (req, res) {
  if (req.url === '/fileupload') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const oldPath = files.filetoupload.path;
      const newPath = __dirname + files.filetoupload.name;
      fs.rename(oldPath, newPath, err => {
        if (err) throw err;
        res.write('File uploaded and move');
        res.end();
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);