const http = require('http');
const server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({
        platform: process.platform,
        nodeVersion: process.version,
        uptime: Math.round(process.uptime()),
    }));
});
const port = 8080;
server.listen(port, function () {
    console.log(`Ajax server started on port ${port}`);
});
//{"platform":"win32","nodeVersion":"v8.15.0","uptime":6}
// 위의 내용으로 브라우저 창에 뜬다.
