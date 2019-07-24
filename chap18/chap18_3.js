var http = require('http'); //18_4.html의 서버 코드이다.
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('chap18_4.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080,() => {
    console.log(`Server running at http://localhost:8080/`);
});