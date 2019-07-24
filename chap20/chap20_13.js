//child_process에서 exec 는 쉘을 불러오는 함수이고 쉘에서 dir은 목록을 불러오는 것이므로 아래와 같이 나온다.
// 만약 dir을 dir1로 바꾸면 안된다. 바꾸더라도 쉘명령어로 바꿔야 한다.
const exec = require('child_process').exec; 
//** 여기서 child_process를 임포트하고 바로 exec를 바로 별칭으로 지정했다.(이 방법이 자주 쓰인다.)

exec('dir', {encoding : 'utf8'}, function (err, stdout, stderr) {
    if(err) return console.error('Error executing "dir"');
    stdout = stdout.toString(); //Buffer를 문자열로 바꿔준다.
    console.log(stdout);
    stderr = stderr.toString();
    if(stderr !== ''){
        console.error('error : ');
        console.error(stderr);
    }
  });
//exec의 특징
//1. 위에서 말했듯이 exec는 시스템 쉘을 불러오는 것으로 따로 경로를 지정할 필요는 없으나..
//  외부 프로그램을 실행한다면 exec에서 전체 경로를 지정해야한다.
//2. 호출되는 콜백은 Buffer 객체 두개를 받는다.
//  stdout : 일반적인 프로그램 출력 결과
//  stderr : 에러 출력 결과
//3. 옵션을 설정할 수 있다. 
//  자세한 사항은 아래 링크에서 확인
//https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback