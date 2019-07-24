// const http = require('http');

// const server = http.createServer(function (req,res) {
//     console.log(`${req.method} ${req.url}`);
//     res.end('hello world!');
//   });

//   const port = 8080;
//   server.listen(port, function(){
//       //서버가 시작되었을 때 호출될 콜백을 넘길 수 있다.
//       console.log(`Server started on port ${port}`);
//   });

// // GET /
// // GET /favicon.ico
// //서버를 키고 브라우저에 접속하면 위의 출력이 뜬다.
// //(웹사이트에서 favicon.ico는 URL 막대나 탭에 표시할 아이콘을 요청하는 것이다.)

//아래애서 좀더 발전시켜보자
const http = require('http');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/favicon.ico') { //req 해더정보(HTTP정보)
        const fs = require('fs');
        fs.createReadStream('favicon.ico'); //이미지 하날 선택해서 favicon.ico 로 바꾸면 탭의 이미지가 바뀐다.
        fs.pipe(res); //end 대신 사용할 수 있다. (브라우저에 보낼 정보(프로퍼티, 매서드))
    } else {
        console.log(`${req.method} ${req.url}`);
        res.end('Hello world!');
    }
});

const port = 8080;
server.listen(port, function () {
    //서버가 시작되었을 때 호출될 콜백을 넘길 수 있다.
    console.log(`Server started on port ${port}`);
});

// Server started on port 8080
// GET /
// GET /favicon.ico

//위의 결과가 나온다.