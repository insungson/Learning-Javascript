//노드
//자바스크립트를 서버에서 사용할 목적으로 만든 언어.
//DOM이 없다. (HTML이 없기 때문에 당연하다) 그렇기 때문에 무엇이 자바스크립트이고,
// 무엇이 API의 일부인지 구분할 수 있어야 한다. 
//windows, document는 브라우저 환경에서 제공하는 API이다. (자바스크립트의 일부가 아니다!!)

//chap20_1,2,3 을 보자 
//1,2 에서 modules.export = calculate 는 module은 노드에서 모듈을 구현하기 위해 만든 특별한 객체이다.
//exports는 프로퍼티에 무엇을 할당하든 모듈은 그것을 내보낸다.(export).
//3에서는 require로 각 모듈의 메서드들을 가져온다.

//chap20_4,5 에서 위의 1,2,3을 합친 다른 형태를 써본다.

//(** exports를 사용한 단축 문법은 객체를 내보낼 때만 쓸 수 있다.
//함수나 기타 다른 값을 내보낼 때는 반드시 module.exports를 써야한다! 
//또한 두 문법을 섞어서 쓸 수 없다. 모듈 하나에 한 가지 문법만 써야한다.)

////////////////////////////////
//코어모듈, 파일모듈, npm모듈
//모듈은 크게 위의 3가지가 있다.
//코어모듈은  fs, os 처럼 노드 자체에서 제공하는 모듈이고, 이들 모두는 예약어 이다.
//파일모듈은 앞에서 chap20_1,2,4 같은 것을 말한다.
//npm모듈은 특별한 디렉토리 node_modules에 저장되는 모듈 파일이다.
//자세한건 아래의 표를 보자

//모듈타입
/////////////////////////////////////////////////////
//타입          매개변수                                    예제
//코어          /,,/,,,/등으로 시작하지 않는다.              require('fs')
//                                                         require('os')
//                                                         require('http')
//                                                         require('child_process')
////////////////////////////////////////////////////
//파일          /../,../등으로 시작한다.                     require('./debug.js')
//                                                         require('./chap20_1')
//                                                          require('../../a.js')
/////////////////////////////////////////////////////
//npm           코어모듈이 아니며/../.../로 시작하지 않는다.    require('debug')
//                                                          require('express')
//                                                          require('chalk')
//                                                          require('koa')

//코어모듈 간략정리
//모듈              전역여부    설명
//assert            아님       테스트 목적으로 사용한다.(값이 true인지 false인지 분별)
//buffer            전역       입출력 I/O 작업에 사용한다.(주로 파일과 네트워크), 바이너리데이터를 핸들링할때 쓰임.
//child_process     아님       외부 프로그램(노드 프로그램이 아니어도 된다)을 실행할때 필요한 함수이다.
//                             (자식 프로세스기능을 사용할 수 있게 한다. 자세한 내용은 아래 있다.)
// (자식 프로세스를 생성하려면 require('child_process').spawn()나 require('child_process').fork()를 사용해야한다.)
//                              http://nodejs.sideeffect.kr/docs/v0.8.15/api/child_process.html
//                              https://codeday.me/ko/qa/20190314/68837.html
//cluster           아님        다중 프로세스를 이용해 성능을 올릴 수 있게 한다.
//crypto            아님        내장된 암호화 라이브러리이다.
//dns               아님        네트워크 이름 해석에 쓰이는 도메인 이름 시스템(DNS) 함수이다.
//domain            아님        에러를 고립시키기 위해 I/O작업이나 기타 비동기적 작업을 그룹으로 묶을 수 있다.
//events            아님        비동기적 이벤트를 지원한다.
//fs                아님        파일시스템 작업에 쓰인다.
//http              아님        HTTP 서버 및 관련된 유틸리티이다.
//https             아님        HTTPS 서버 및 관련된 유틸리티이다.
//net               아님        비동기적 소켓 기반 네트워크 API이다.
//os                아님        운영체제 유틸리티이다.
//path              아님        파일시스템에서 사용하는 경로(path)관련 유틸리티이다.
//punycode          아님        유니코드 인코딩을 지원하며 ASCII 부분집랍을 일부 사용합니다.
//querystring       아님        URL쿼리스트링을 해석하고 만드는데 쓰인다.
//readline          아님        대화형I/O유틸리티, 주로 명령줄 프로그램에서 사용한다.
//smalloc           아님        버퍼에 메모리를 명시적으로 할당할 떄 사용한다.
//stream            전역        스트림 기반 데이터 전송에 사용한다.
//스트림 데이터: 수천 개의 데이터 소스에서 연속적으로 생성되는 데이터로서, 보통 데이터 레코드를 작은 크기(KB 단위)로 동시에 전송합니다.
//string_decoder    아님        버퍼를 문자열로 변환한다.
//tls               아님        보안 전송 계층(TLS) 통신 유틸리티이다.
//tty               아님        저수준 TTY(TeleTYpewriter)함수이다.
//dgram             아님        사용자 데이터그램 프로토콜(UDP) 네트워크 유틸리티이다.
//url               전역        URL 파싱 유틸리티이다.
//util              아님        내부 노드 유틸리티이다.
//vm                아님        자바스크립트 가상 머신이다. 메타프로그래밍이나 컨텍스트 생성에 쓰인다.
//zlib              아님        압축 유틸리티이다.


// npm 모듈은 node_modules에 저장된 노드파일들로 실행 순서는 아래왁 같다.
// 모듈 X를 가져올 때 -> X가 코어모듈 이름이 아니라면 -> 현재 node_modules 서브 디렉토리가 있는지 확인한다
// -> 모듈이 없으면 부모 디렉토리로 올라가서 모듈 X를 찾는다. 이런식으로 찾거나 루트 디렉토리까지 올라간다.
//예를들어 프로젝트가 home/jdoe/test_project에 있고 앱파일에서 require('X') 를 호출하면 노드는 아래의 순서로 찾는다.
// home/jdoe/test_project/node_modules/X
// home/jdoe/node_modules/X
// home/node_modules/X
// /node_modules/X

//*직접 만드는 모듈을 node_modules에 넣으면 안된다. 
//node_modules는 package.json과 연결되어 있기 때문에 node_moduels가 지워져도 다시 설치가 가능하다.
//node_moduels는 npm으로 처리를 하자
//(스마트미러도 이런식으로 작업합)

/////////////////////////////
//함수 모듈을 통한 모듈 커스터마이징
// 모듈은 대부분 객체를 export 하지만 가끔 함수 하나만 내보내는 경우도 있다. 
// 보통 이럴땐 그 모듈의 함수를 즉시 호출하려는 의도로 만들때가 대부분이다.
// 이때 필요한 것은 그 함수가 아니라 리턴값이다.(리턴값이 함수일수 있지만...)
// npm debug 를 설치하고 이를 써보고 한번 비슷하게 구현해보자
// chap20_6,7.js에 구현해보자

//*노드는 노드앱을 실행할 때 어떤 모듈이든 단 한번만 임포트 한다! 
//따라서 debug 모듈을 두번 임포트 하더라도, 노드는 해당 모듈을 이미 임포트했음을 인식하고
//다시 임포트하지는 않는다. 그래서 setTimeout에서는 첫번째는 setTimeout이 걸려서 200ms 뒤에 되지만.
//두번째는 setTimeout이 적용 안되서 나오는 것이다.
//debug1,2는 서로 다른 함수지만, 둘은 chap20_6.js에서 같은 lastMessage를 참조한다.
//(만약 lastMessage를 함수 안으로 넣어서 다른 변수를 참조하면 둘다 따로 적용된다)

//////////////////////////////
//파일 시스템 접근
//보통 프로그래밍 책에서 대개 파일시스템 접근에 대해 설명을 한다.... 
//하지만 자바스크립트는 노드가 만들어지기 전까지 파일시스템에 접근할 수 없었다.
//파일을 만들때는 fs.writeFile을 사용한다. 그리고 파일을 읽을 떄는 fs.readFile을 쓴다.
//chap20_8,9.js를 보자
//fs.writeFile 이나 fs.readFile은 비동기적으로 작동하는데 fs.writeFileSync,fs.readFileSync는 
//동기적으로 작동한다. 이에 대한 것도 위의 파일에 같이 적어 놓았다.

//디렉토리에 어떤 파일이 있는지 확인해 보려면 fs.readdir을 사용한다.
//chap20_10.js에서 확인해보자


////////////////////////////
//process
//실행중인 노드 프로그램은 모두 process변수에 접근 할 수 있다.
//process 변수는 해당 프로그램에 관한 정보를 담고 있고, 실행 자체를 컨트롤 할 수도 있다.
//(예를 들어 애플리케이션이 치명적인 에러를 만나, 더 실행해도 의마가 없는 상황이라면 
//precess.exit를 호출해 즉시 실행을 멈출 수 있다.)
//exit code (숫자형 종료코드) 를 쓰면 프로그램이 성공적으로 종료되었는지 에러가 있었는지 확인이 가능하다.
// exit(0) : 에러없이 프로그램을 끝냈을 때.
// exit(0이 아닌 다른숫자) : 에러가 있다는 뜻.
//chap20_11.js 에 관련 코딩을 해보자


///////////////////////////////
//운영체제
//os모듈은 프로그램을 실행하는 컴퓨터의 운영체제에 관한 정보를 제공한다. 
//자세한 예는 chap20_12.js 에서 확인하자

///////////////////////////////////
//child_process 모듈
//child_process 모듈은 애플리케이션에서 다른 프로그램을 실행할 때 사용한다.
//실행할 프로그램은 다른 노드 프로그램, 실행파일, 다른 언어로 만든 스크립트 언어도 상관없다.
//child_process 모듈에서 제공하는 메서드는 크게 exec, exeFile, fork 세가지이다. 
//(동기식으로는 execSync, execFileSync, forkSync가 있다.) 
//exec : 운영체제의 명령줄이나 다름없는 셀을 호출한다.
//exeFile : 셀을 통하지 않고 실행 파일을 직접 실행하므로 메모리와 자원 관리면에서 좀 더 효율적이지만,
//          그만큼 더 주의 해야한다.
//fork : 다른 노드 스크립트를 실행할때 사용(exec로도 가능함.)
//*fork는 별도의 노드 엔진을 호출하기 때문에 소모하는 자원면에서는 exec와 동일하지만 프로세스 사이에 
// 통신이 가능하다.
//예제에선 exec를 다룰 것이다. chap20_13.js 에서 확인하자

//////////////////////////////////
//스트림
//스트림은 노드에서 중요한 개념이다.
//스트림은 스트림 형태의 데이터를 다루는 객체이다.
//스트림은 3가지 종류가 있다.
//1. read 스트림
//2. write 스트림
//3. duplex 스트림
//스트림의 예는 사용자의 타이핑, 클라이언트와 통신하는 웹서비스 등이 있다
//chap20_14.js에서 스트림을 살펴보자


/////////////////////////////////
//웹서버
//노드 웹서버의 핵심은 들어오는 요청을 모두 응답하는 콜백함수이다.
//콜백 함수는 매개변수로 IncomingMessage 객체(보통 req라 한다)와 ServerRequest 객체(보통 res라 한다)를
//받는다. 
//IncomingMessage 객체 : 요청받은 URL, 보낸 헤더, 바디에 들어있는 데이터 등 HTTP요청에 관한 정보
//ServerRequest 객체 : 클라이언트(브라우저)에 보낼 응답을 커트롤하는 프로퍼티와 메서드가 들어있다.
//ServerResponse 객체 : 쓰기 스트림 인터페이스이며 이를 통해 데이터를 클라리언트에 보낸다. 또한 파일보내기도 쉽다.
//                      파일 읽기 스트림을 만들어 HTTP응답에 파이프로 연결하기만 하면 된다.
//chap20_15.js에 관련 코딩을 해보자


///////////////////////////
//Window 관련(https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)
//window :  브라우저 전체를 담당하는 게 Window 객체
//document : 웹사이트만 담당하는게 Document 객체

//window는 모든 객체의 조상입니다
//전역객체(글로벌객체)라고 하는데요. 모든 객체를 다 포함하고 있기 때문에 window는 그냥 생략가능합니다.
// var really = 'Really?'
// window.really; // 'Really?'

//window.close() : 현재 창을 닫습니다. 아까 말했듯이 window는 생략 가능하기 때문에 그냥 close(); 해도 됩니다. 

//window.open() : 새 창을 엽니다. 팝업 창의 형태로도 열 수 있고 새 탭으로도 열 수 있습니다. 
//              첫 번째 인자로 주소를 받고, 
//              두 번째 인자로 새 탭으로 열지, 현재 탭에 열지를 설정할 수 있습니다. 
//              세 번째 인자로 새 창에 대한 각종 설정을 전달할 수 있습니다.
// open('https://zerocho.herokuapp.com'); // 새 탭
// open('https://zerocho.herokuapp.com', '_self'); // 현재 탭
// open('', '', 'width=200,height=200'); // 가로세로 200px의 팝업창

//window.encodeURI() : encodeURI(한글) 한글 -> 컴파일언어
//window.decodeURI() : decodeURI(외계어) 컴파일언어 -> 한글

//////////////////////////////////////////////////////
//Document객체
//document.getElementById(아이디) : html에서 해당 아이디를 가진 태그를 선택
//document.getElementsByClassName(클래스), 
//document.getElementsByName(이름), 
//document.getElementsByTagName(태그)
// 클래스, 네임, 태그명을 가진 태그를 선택
//document.querySelector(선택자), document.querySelectorAll(선택자) :  태그명[속성명=속성값, css선택자
//document.createElement(태그명) : document에 새로운 태그를 만들 때 사용합니다. 
//                                 만든다고 바로 생기는 게 아니라 변수를 통해 메모리에 저장됩니다

/////////////////////////////////////
//DOM
//1) 태그.children, 태그.childNodes : 
//  자식으로 갈 때는 children(텍스트 노드 제외)또는 childNodes(텍스트 노드 포함)를 사용합니다.
//  document.getElementById('header')로 가리킨 태그도 document.getElementById('header').children하면
//  #header의 자식들이 나옵니다
//  document.getElementsByTagName('main')하면 편할 것은 왜 굳이 children 이런 것을 쓰냐고요? 
//  한 번에 선택할 때는 getElementsByTagName같은 메소드가 더 편하지만 main의 부모를 찾아라, 
//  또는 main의 자식들을 찾아라 할 때는 이름을 모르기 때문에 children같은 속성을 사용하는 겁니다.
//2) 태그.parentNode, 태그.parentElement
//  자식은 여러 개일 수 있기 때문에 children이나 childNodes같은 복수형 단어를 썼다면 부모는 
//  항상 한명이기 때문에 단수형 parentNode입니다
//3) 태그.innerHTML, 태그.outerHTML (textContent 는 text만 불러온다)
    // var footer = document.getElementsByTagName('footer')[0];
    // footer.innerHTML; // 'hello'
    // footer.innerHTML = 'goodbye';
//4)태그.속성
    // var tag = document.getElementById('header');
    // tag.id; // 'header'
//  태그를 선택하고 그 속성을 조회할 수 있습니다. 바꿀 수도 있고요. 
//  id, className(class), name, value, placeholder, checked, disabled, readonly 
//  같은 속성 값을 볼 수 있습니다.

//메소드
//1)태그.appendChild : 마지막 순서의 자식 태그로 추가됩니다.
    // var newElement = document.createElement('div');
    // document.body.appendChild(newElement);
//  위의 코드처럼 하면 body의 마지막 자식 태그로 div 태그가 하나 추가됩니다.
//2)태그.removeChild : 선택한 자식 태그를 삭제합니다.
    // document.body.removeChild(document.body.childNodes[document.body.childNodes.length - 1]);
//  body의 마지막 자식 태그를 삭제하는 코드입니다
    //document.body.childNodes[document.body.childNodes.length - 1]
//  마지막 자식 태그를 선택하는 코드고요.
//3)태그.insertBefore : appendChild가 자식 태그로 집어넣는 거라면 insertBefore 메소드는 
//                      자신의 형제 태그로 집어넣습니다. 자신 이전에요.
    // var newElement = document.createElement('div');
    // document.body.insertBefore(newElement, document.getElementById('header'));
//  위의 코드는 부모.insertBefore(넣을 태그, 기준 태그)입니다. 위의 코드는 body의 자식으로, 
//  header 이전에 새로 만든 div태그를 넣으라는 뜻이죠.

