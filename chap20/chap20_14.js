// 파일 스트림을 통해 읽기와 쓰기 스트림을 만들고 스트림을 pipe로 연결하는 방법을 보자
const fs = require('fs');
const ws = fs.createWriteStream('stream.txt',{encoding:'utf8'}); //스트림을 만들고
ws.write('line 1\n');   //거기에 썻다.
ws.write('line 2\n');
ws.end();
// *end 메서드는 옵션으로 데이터 매개변수를 받을 수 있고, 이 매개변수는 write를 호출하는 것과 같다.
//데이터를 한번만 보내고 싶다면 end 한번만 호출해도 데이터를 보낼 수 있다.

//*end를 호출하고 다시 write 메서드를 호출하면 에러가 난다.
//(end를 호출하기 전 write를 여러번 호출 할 수 있으므로 시간을 두고 데이터를 보낼땐 쓰기 스트림이 좋다.)


//위에서 파일을 만들었으니 아래에서 그 파일을 읽어보자
const rs = fs.createReadStream('stream.txt', {encoding:'utf8'});
rs.on('data', function(data){
    console.log('>> data : ' + data.replace('\n', '\\n'));  //줄바꿈 문자를 이스케이프 처리함.
});
rs.on('end', function(data){
    console.log('>> end');
})
// >> data : line 1\n
// >> data : line 2\n
// >> end
//위의 출력 결과가 나온다.

//스트림에 데이터를 쓸 때 write를 호출하면 되고,  data,end이벤트를 listen해서(on 사용) 그에 맞게 대응한다.

//일기스트림 데이터 읽은 즉시 -> 쓰기 스트림
const rs1 = fs.createReadStream('stream.txt');
const ws1 = fs.createWriteStream('stream_copy.txt');
rs1.pipe(ws1);
//위의 예제는 읽기 스트림과 쓰기 스트림을 pipe로 연결하여 파일 콘텐츠를 복사했다.
