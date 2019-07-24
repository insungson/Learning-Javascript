// const fs = require('fs');

// fs.writeFile('hello.txt', 'hello from Node!', function(err){
//     if(err) return console.log('Error writing ro file.');
// });
// //위의 코드를 실행하면 hello.txt 파일이 생성되고 그 안내의 내용은 hello from Node! 이다.


// const fs = require('fs');

// fs.writeFile(__dirname + '/hello.txt',
//         'hello from Node!', function(err){
//             if(err) return console.error('Error writing ro file.');
// });
// //__dirname을 넣어두면 실행 시 현재 작업 디렉토리 변수로 저장한다.
// //hello.txt는 이제 chap20_8.js가 있는 디렉토리에서 만들어진다.
// //문자열 병합으로 __dirname과 파일 이름이 합쳐져 파일 경로를 얻는다.


const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'), 'hello from Node!', function(err){
    if(err) return console.error('Error writing to file.');
});
//노드의 path모듈은 운영체제 독립적인 경로 이름 유틸이 있다. 그러므로 이 모듈을 사용하면 
//어떤 운영체제든 파일경로에 대해 올바르게 사용할 수 있다.
//path.join은 운영체제에 따라 그에 맞게 디렉토리 구분자를 알맞게 사용하므로 이 메서드를 
//사용하자


//비동기적 방법으로 파일을 생성할 땐 아래와 같이 한다. hello1.txt 생성()
try{
    fs.writeFileSync(path.join(__dirname,'hello1.txt'), 'Hello1 from Node!');
}catch(err){
    console.log('Error writing file.');
}