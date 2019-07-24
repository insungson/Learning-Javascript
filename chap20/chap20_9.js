// //파일 콘텐츠를 읽을 때는 fs.readFile을 이용한다.
// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.join(__dirname, 'hello.txt'), function(err,data){
//     if(err) return console.error('Error reading file.');
//     console.log('Read file contents:');
//     console.log(data);
// })
// // Read file contents:
// // <Buffer 68 65 6c 6c 6f 20 66 72 6f 6d 20 4e 6f 64 65 21>
// //위 코드의 실행결과는 위와 같다.. 이는 16진수 코드를 ASCII/Unicode로 바꾸면 hello from Node!가 된다.
// //fs.readFile에 인코딩을 명시하지않으면 가공되지않은 바이너리데이터로 반환한다. 그래서 UTF-8을 명시한다.
// // 위의 코드를 수정한 것은 아래와 같다.

const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'), {encoding : 'UTF-8'}, function(err, data){
    if(err) return console.error('Error reading file.');
    console.log('File contents : ' + data);
});
// File contents : hello from Node!
//위와 같이 제대로 나오는 것을 볼 수 있다.

try{
    const data = fs.readFileSync(path.join(__dirname, 'hello1.txt'),{encoding : 'utf-8'});
    console.log('file contents1 : '+data);
}catch(err){
    console.error('Error reading file');
}

// file contents1 : Hello1 from Node!
// File contents : hello from Node!
//위의 코드로 나온다. 여기선 동기적으로 작업하고 비동기적 작업이 나중에 실행되는 것을 확인할 수 있다.