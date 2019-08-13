//브라우저의 자바스크립트 (브라우저에서 스크립트 기능을 쓰기 때문에 html파일을 브라우저로 띄우면 된다.)
//DOM, 즉 문서 객체 모델은 HTML 문서의 구조를 나타내는 표기법인 동시에 브라우저가 
//HTML 문서를 조작하는 핵심이기도 하다.
//DOM 트리는 노드(node)로 구성된다.

// DOM tree 노드 사진 넣기 (이전에 node에 대한 사진 넣기)
// node 부모 자매 관계, node element 구조 부모 자식 형제 관계 사진 넣기

//루트 노드를 제외하면 모든 노드는 부모가 있고, 자식 노드는 있어도 되고 없어도 된다.
//DOM 트리의 모든 노드는 Node 클래스의 인스턴스이다.(Node.js와는 다르다.)
//Node 객체에는 트리 구조를 나타내는 parentNode, childNode 프로퍼티, 
//자신에 대한 nodeName, nodeType 프로퍼티가 있다.
//(nodeType은 그 노드가 어떤 타입인지 나타내는 정수이다.)
//* DOM은 노드로만 구성된다. 하지만 모든 노드가 HTML이 아니다.
// 예를 들면 <p>는 HTML요소지만, 그 문단에 포함된 텍스트는 텍스트 노드이다.
//이 장에서 말하는 노드는 거의 HTML요소이고 '요소'라고 하면 그건 '요소 노드'를 가르키는 것이다.


///////////////////
//get 메서드 
//DOM에서 HTML 요소를 빨리 찾을 수 있는 메서드가 있다.
//document.getElementById 를 쓰면 고유 요소를 쉽게 얻을 수 있다.
//document.getElementByClassName 은 주어진 클래스 이름에 해당하는 요소들을 반환한다.
//ducument.getElementByTagName 은 주어진 태그이름에 해당하는 요소들을 반환한다.

///////////////////
//DOM 요소 쿼리
//위의 get~ 메서드는 한가지 조건만 찾을 수 있다.
// querySelector, querySelectorAll 는 CSS 선택자를 사용해 요소를 찾는 메서드이다.

////////////////////////
//DOM 요소 조작
//요소를 찾는 방법을 알았다. 그럼 수정은 어떻게 할까?
//수정하는 방법을 알아보자
//앞서 말했듯이 모든 요소에는 textContent, innerHTML 프로퍼티가 있다.
//위의 프로퍼티를 통해서 요소의 컨텐츠에 접근하거나 수정할 수 있다.
//textContent : HTML 태그를 모두 제거하고 순수한 텍스트 데이터를 제공한다.
//innerHTML : HTML 태그를 그대로 제공한다.
//HTML 파일을 통해 수정해보자
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_textcontent
//위의 예제가 좋은 예이다.

/////////////////
//새 DOM 요소 만들기
//앞에서 innerHTML 프로퍼티를 바꿔서 DOM노드를 새로 만들 수 있다는 것을 이미 봤다.
//document.createElement 메서드를 쓰면 새 노드를 만들 수 있다.
//* 이 함수는 새 요소를 만들지만 DOM에 추가하지는 않는다. DOM에 추가하는 일은 따로 해야한다.
//insertBefore(p1, firstChild) : 첫번째요소p1 은 삽입할 요소, 두번째firstChild는 삽입할 위치 요소이다.
//appendChild() : 항상 마지막 자식 요소로 추가되므로 삽입할 요소만 넣으면 된다.

///////////////
//요소 스타일링
//DOM API를 써도 요소 스타일을 정교하게 지정할 수 있지만 요소 프로퍼티를 직접 수정하는 것보단... 
//CSS 클래스를 새로 만들어서 그 클래스에 원하는 요소를 지정하는 편이 좋다. 
//자바스크립트는 쉽게 요소에 CSS 클래스를 적용할 수 있다.

//////////////
//데이터 속성
//HTML5에서는 데이터(data-) 속성을 도입했다. 
//이 속성을 사용하면 HTML요소에 임의의 데이터를 추가할 수 있다.
//브라우저는 이 데이터를 완전히 무시하므로 자바스크립트에서 쉽게 
//요소에 관한 정보를 읽거나 수정할 수 있다.
//(html에 highlight 클래스 함수 관련 버튼을 생성한다.)

///////////////
//이벤트
//DOM API는 200개 가까운 이벤트가 정의되어 있고 브라우저들 마다 비표준 이벤트를 따로 만들기 때문에
//click 이벤트를 예제로 해보자
//html 파일에 addEventListner라는 메서드를 찾을 수 있다.
//이 메서드를 통해 이벤트가 일어났을 때 호출할 함수를 지정할 수 있다!
//* 호출할 함수는 Event타입의 객체 하나만 매개변수로 받는다.
//* 이벤트 객체에는 해당 이벤트에 관한 정보가 모두 포함되어 있다.
// 예를 들면 click이벤트는 클릭한 좌표를 나타내는 clientX,clientY 프로퍼티와 이벤트가
// 일어난 요소를 나타내는 target 프로퍼티도 있다.

//* 이벤트 모델은 이벤트 하나에 여러 가지 함수(핸들러)를 연결할 수 있도록 설계되어있다.
// 기본핸들러가 지정된 이벤트도 많다. 
// 예르 들면 사용자가 <a>링크를 클릭하면 브라우저는 이벤트에 응답해서 요청 페이지를 불러온다.
//* 이런 기본 핸들러를 막으려면 이벤트 객체에서 preventDefault()를 호출한다. 
//기본핸들러의 동작에 다른 기능을 추가하는 이벤트 핸들러를 만들 생각이 아니라면,
//대부분의 이벤트 핸들러에서 preventDefault()를 사용하게 될 것이다.

//이벤트 버블링과 캡처링
//HTML은 계층적이라서 이벤트를 꼭 한곳에서만 처리할 필요는 없다.
// 예를 들면 머튼을 클릭했을때 버튼 자체에서 이벤트처리를 해도 되지만, 버튼의 부모나
// 부모의 부모에서 처리를 해도 되는 식이다.
//기본적으로 2가지 방법이 있다.
// 첫번째는 가장 먼 조상부터 시작하는 방법인 캡처링(capturing)이라 한다.
//18_2html에서  (body(div id="content"(butten)))  이런 계층형 구조로 되어있다.
//그러므로 body도 butten에서 일어난 이벤트를 캡처 할수 있다.
// 두번째는 이벤트가 일어난 요소에서 시작해 거슬러 올라가는 방법이다.
//이를 버블링(Bubbling)이라 부른다.

//이벤트 핸들러에는 다른 핸들러가 어떻게 호출될지 영향을 주는 세가지 방법이 있다.(18_4.html에서 예제보기)
//1. preventDefault 
// 메서드는 이벤트를 취소한다. 취소한 이벤트는 계속 전달되기는 하지만, defaultPrevent
//프로퍼티가 true로 바뀐 채 계속 전달된다.
//*@@브라우저의 이벤트 핸들러는 defaultPrevent 프로퍼티가 true로 바뀐 이벤트를
//무시하고 아무 일도 일어나지 않는다.
//(프로그래머가 만든 이벤트 핸들러에서는 defaultPrevented 프로퍼티를 무시한채
// 동작수행이 가능하고, 보통 그렇게 한다.)
//2. stopPropagation
//이 메서드는 이벤트를 현재 요소에서 끝내고 더는 전달되지 않게 막는다.
// 즉, 해당 요소에 연결된 이벤트 핸들러는 동작하지만. 다른 요소에 연결된 
//이벤트 핸들러는 작동하지 않는다.
//3. StopImmediatePropagation
//가장 강력한 방법으로 이 메서드는 다른 이벤트 핸들러, 심지어 현재 요소에 연결된 
//이벤트 핸들러도 동작하지 않게 막는다.
//chap18_3,4파일을 보자

//젠장... 왜 chap18_4.html 실행결과가 capture 먼져나오고 bubble 이 나중에 나오는지 몰랐는데..
//addEventListener API문서를 보니깐 알겠다...
//아래가 EventListener의 기본 형태이다.
//element.addEventListener(event, function, useCapture)
//event : 그냥 이벤트이다. 이벤트들의 자세한 종류는 아래의 링크를 참조하자
// https://www.w3schools.com/jsref/dom_obj_event.asp
//function : 이벤트가 일어날때 실행하고 싶은 메서드 지정
//useCapture : (옵션이다.) 캡처링이나 버블링이냐에 따라 boolean 값을 가진다.
// true : 캡쳐링일때 
// false : 버블링일때

//addEventListener는 이벤트를 추가하는 구식 방법인 'on' 프로퍼티를 대체할 목적으로
//만들어졌다. 
// 예를 들면 예전에는 요소elt에 클릭 핸들러를 추가할 때
// elt.onclick = function(evt){ /* handler */ } 같은 문법을 썼다.
// 이전 문법의 큰 단점은 이벤트에 핸들러 단 하나만 등록할 수 있다.

//(제이쿼리 이벤트 리스너에서 명시적으로 false를 반환하는것은 stopPropagation을 호출하는것과
//동등한 효과가 있다. 하지만 이것은 제이쿼리의 단축문법일 뿐 DOMAPI에서는 동작하지 않는다.)

// DOM 이벤트 카테고리 ( https://www.w3schools.com/jsref/dom_obj_event.asp)
//1. 드래그 이벤트
// dragstart : 사용자가 element에서 드레그를 시작할 때 이벤트 발생
// drag : element 가 드레그 될때 이벤트 발생
// dragend : 사용자가 element를 드레그하는 것을 끝냈을 때 이벤트 발생
// drop : 드레그 된 이벤트가 drop target에 드롭될 때 이벤트 발생
//2. 포커스 이벤트
// 사용자가 폼 필드 같은 편집 가능한 요소를 조작하려 할 때 반응할 수 있다.
// focus : 사용자가 입력필드를 클릭하거나, 탭을 다시 누르거나, 다른 곳을 터치하는 등
//        필드에 '들어갈 때' 이벤트 발생 
//        (https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onfocus)
// blur : 다른곳을 클릭하거나, 탭을 다시 누르거나, 다른곳을 터치해서 필드에서 '나올 때'
//       이벤트 발생 
//change : 사용자가 필드의 내용을 바꿀 때 이벤트 발생
//3. 폼 이벤트
// submit : 사용자가 전송 버튼을 클릭하거나, 적절한 위치에서 엔터를 눌러 폼을 전송하면
//          이벤트 발생
//4. 입력 장치 이벤트 (키보드 이벤트, 마우스 이벤트)
// 1) 마우스 이벤트
//  mousedown : 사용자가 마우스로 element의 버튼을 누를 때 이벤트 발생
//  mousemove : element의 위로 포인터를 움직일 때 이벤트 발생
//  mouseup : 사용자가 element 마우스 버튼을 누르고 땔때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmousedown
//  mouseenter : 마우스 포인터가 element로 올려놓을 때 이벤트 발생
//  mouseleave : 마우스 포인터가 element에서 벗어날 때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmouseenter
//  mouseover : 마우스 포인터가 element에 올려놓을 때 이벤트 발생 (자식도 됨.)
//  wheel : 마우스 휠을 움직일때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onwheel_addeventlistener
// 2) 키보드 이벤트
//  keydown : 사용자가 키보드를 누를 때 이벤트 발생
//  keypress : 사용자가 키보드를 누를 때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onkeypress
//  keyup : 사용자가 키보드를 누르고 땔 때 이벤트 발생
//  * 터치장치는 마우스 이벤트보다 우선한다.
// 3) 미디어 이벤트
//  pause : 사용자나 프로그램적으로 미디어에서 pause가 될때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onpause
//  play : 미디어가 시작될 때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onplay
// 4) 진행(progress) 이벤트
//  브라우저가 콘텐츠를 불러오는 과정에서 발생한다. (널리 쓰이는 건 load이벤트이다)
//  load : 객체가 로드(load)될 때 이벤트 발생
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onload
//  error : 외부 파일을 로딩하는 동안 에러가 발생할 때 이벤트 발생
// 5) 터치 이벤트 
//  touches : 터치가 되는 기기에서 터치할때 이벤트 발생


///////////////////////
//(ajax작동원리 사진 올리기)
//Ajax
//Ajax의 핵심 개념은 브라우저 자바스크립트에서 HTTP 요청을 만들어 서버에 보내고 
// 데이터를 받는다.  받는 데이터는 보통 JSON 형식이다. XML로 받을 수 있지만.. 
//JSON이 자바스크립트로 처리하기 훨씬 쉽다. 그리고 브라우저에서 그 데이터를 사용한다.
//Ajax 역시 다른 웹 페이지와 마찬가지로 HTTP 위에서 동작하지만 페이지를 불러오고
//페이지를 불러오고 렌더링 하는 부담이 줄어들기 때문에 웹 어플리케이션이 훨씬 빨라진다.
//http://tcpschool.com/ajax/intro 
//위의 사이트는 ajax를 배우는 사이트이다.

//chap18_5.js (노드로 실행) ,  chap18_6.html(크롬으로 파일열기)  참조


/////////////////////////
//http://tcpschool.com/ajax/intro
//위의 사이트에서 정리한 내용을 여기 적어본다.
//////////////////////////////////
//Ajax 시작

//Ajax의 장점
//1. 웹페이지를 전체 다시 로딩하지 않고도, 웹페이지의 일부분만 갱신할 수 있다.
//2. 웹페이지가 로드된 후에 서버로 데이터 요청을 보낼수 있다.
//3. 웹페이지가 로드된 후에 서버로부터 데이터를 받을 수 있다.
//4. 백그라운드 영역에서 서버로 데이터를 보낼 수 있다.

//Ajax의 한계
//1. Ajax는 클라이언트가 서버에 데이터를 요청하는 클라이언트 풀링(client pooling) 방식을 
//   사용하므로, 서버 푸시(Server Push)방식의 실시간 서비스는 만들 수 없다.
//* 클라이언트 풀링 : 사용자가 원하는 정보를 직접 서버에 요청하는 방식
//* 서버 푸시 : 사용자가 요청하지 않아도 자동으로 특정 정보를 제공하는 방식
//2. Ajax로는 바이너리 데이터를 보내거나 받을 수 없다.
//3. Ajax 스크립트가 포함된 서버가 아닌 다른 서버로 Ajax요청을 보낼 수 없다.
//4. 클라이언트의 PC로 Ajax 요청을 보낼 수는 없다.

//Ajax의 프레임 워크
//-> Prototype, jquery

//Ajax 가 사용되는 부분
//Ajax는 웹페이지의 일부분만을 갱신할 수 있도록 해주는 개발기업으로 아래와 같이 사용된다.
//1. 웹페이지 표현을 위한 HTML CSS
//2. 데이터에 접근하거나 화면 구성을 동적으로 조작하기 위해 사용되는 DOM 모델
//3. 데이터의 교환을 위한 JSON, XML 
//4. 웹 서버와의 비동기식 통신을 위한 XMLHTTPRequest 객체
//5. 위에서 언급된 기술들을 결합하여 사용자의 작업 흐름을 제어하는데 사용되는 자바스크립트

//Ajax의 동작원리
//Ajax를 이용한 웹 응용 프로그램은 자바스크립트 코드를 통해 웹 서버와 통신을 하게 된다.
//그러므로 사용자의 동작에 영향을 주지 않고, 백그라운드에서 지속해서 서버와 통신을 할 수 있다.

// (ajax를 이용한 웹 응용 프로그램 동작원리 사진넣기)
// (기존 웹 응용 프로그램 동작원리 사진 넣기)

//Ajax웹 응용 프로그램 동작순서
//1. 사용자에 의한 요청 발생
//2. 요청 이벤트 발생 시 이벤트 핸들러에 의해 자바스크립트 호출됨.
//3. 자바스크립트는 XMLHTTPRequest 객체를 사용하여 서버로 요청을 보냄.
//   이때 웹 브라우저는 요청을 보내고 서버의 응답을 기다리지 않고 다른 작업 처리 가능
//4. 서버는 전달받은 XMLHTTPRequest 객체를 가지고 Ajax 요청을 처리한다.
//5,6. 서버는 처리된 결과를 JSON,XML 형태의 데이터로 웹 브라우저에 전달.
//     이때 전달되는 데이터는 전부가 아니라 필요한 데이터만 전달한다.
//7. 서버로부터 전달받은 데이터로 웹 페이지의 일부분만을 갱신하는 자바스크립트를 호출한다.
//8. 결과적으로 웹페이지의 일부분만이 다시 로딩 된다.

//////////////////////////////////////////
// Ajax 기본

// (dom tree model 사진 추가)

//DOM 요소의 선택
//DOM 요소를 선택하는 방법은 아래와 같다.
//1. 태그 이름(tag name)을 통한 선택                getElementsByTagName()
//2. 아이디(id)를 통한 선택                         getElementById() 
//3. 클래스(class)를 통한 선택                      getElementsByClassName()
//4. CSS선택자(selector)를 통한 선택                querySelectorAll()
//5. HTML 객체집합(object collection)을 통한 선택   document.write(title) //title은 예시
//querySelector() 의 좀 더 정확한 방법은 <>태그 안의 문자열을 검색하는 것이다.


//DOM 요소의 내용 변경
// innerHTML 를 이용하여 내용변경

/////////////
//Node
//HTML DOM은 node라고 불리우는 계층적 단위에 정보를 저장하고 있다.
// 노드의 관계는 아래의 사진과 같다.

// (노드의 관계 올리기)

// (Dom tree model 올리기)

//HTML을 구성하는 노드의 종류는 아래의 사진과 같다.

// (dom tree 노드 사진)

//문서노드 (document node) : HTML 문서 전체를 나타내는 노드이다.
//요소노드 (element node) : 모든 HTML 요소는 요소 노드이고, 속성 노드를 가질수 있는 유일한 노드이다.
//속성노드 (attribute node) : 모든 HTML 요소의 속성은 속성 노드이며, 요소 노드에 관한 정보를 가지고 있다.
//                            (하지만 해당 요소 노드의 자식(child node)에는 포함되지 않는다.)
//텍스트노드 (text node) : HTML 문서의 모든 텍스트는 텍스트 노드이다.
//주석노드 (comment node) : HTML 문서의 모든 주석은 주석 노드이다.

//노드에 대한 정보
//DOM 노드에 대한 정보는 다음과 같은 속성을 통해 접근할 수 있다.
//1. nodeName : 노드 고유의 이름을 명시하므로 수정할수 없는 읽기전용 프로퍼티이다.
//              요소 노드의 nodeName 프로퍼티는 언제나 해당 HTML 요소의 태그 이름을 대문자로 저장한다.
//2. nodeValue : 노드의 값을 명시함
//3. nodeType : 노드 고유의 타입을 명시함
//              노드별 프로퍼티값은 다음과 같다(요소노드:1, 속성노드:2, 텍스트노드:3, 주석노드:4, 문서노드:5)

//노드리스트(nodelist)
//노드리스트는 getElementsByTagName() 메소드나  childNodes 속성의 속성값으로 반환되는 객체이다. 
//노드리스트는 아래의 그림과 같은 순서로 문서 내의 모든 노드를 리스트 형태로 저장하고 있다.

// (노드리스트 저장방법)

//DOM API Ajax를 이용하여 웹 페이지의 일부분만을 갱신하려면 더욱 다양한 DOM 속성을 활용해야한다.
//DOM과 관련된 API를 이용하여 node를 동적으로 관리해보자
// http://tcpschool.com/javascript/js_dom_nodeManage  ((이거 따로 실습 파일 만들기))

//노드의 추가 관련 메서드 
//1. appendChild()
// 새로운 노드를 해당 노드의 자식 노드리스트의 맨마지막에 추가한다.
function appendNode() {
    var parent = document.getElementById("list");  // 아이디가 "list"인 요소를 선택함.
    var newItem = document.getElementById("item"); // 아이디가 "item"인 요소를 선택함.
    parent.appendChild(newItem);                   // 해당 요소의 맨 마지막 자식 노드로 추가함.
}
//2. insertBefore()
// 새로운 노드를 특정 자식 노드 바로 앞에 추가한다.

//부모노드.insertBefore(새로운자식노드, 기준자식노드);
// 새로운 자식노드 : 자식 노드 리스트(child node list)에 새롭게 추가할 자식 노드 전달
// 기준자식노드 : 새로운 노드를 삽입할 때 기준이 되는 노드로, 이 노드 바로 앞에 새로운노드가 추가된다.
function appendNode(){
    var parent = document.getElementById("list"); //부모노드 list 아디로 찾기
    var criteriaItem = document.getElementById("criteria"); //기준자식노드 
    var newItem = document.getElementById("item"); //새로운자식노드
    parent.insertBefore(newItem, criteriaItem); //해당 노드를 기준이 되는 자식 바로 앞에 추가
}
//* 기준자식노드를 null로 넣는다면 appendChild() 메소드와 같은 동작을 한다.
//3. insertData()
// 텍스트노드에 있는 기존의 텍스트 데이터에 새로운 텍스트 데이터를 추가한다.

//텍스트노드.insertData(오프셋, 새로운데이터);
// 오프셋 : 기존 텍스트 데이터의 몇 번째 위치부터 추가할지 전달한다.
// 새로운데이터 : 새로 삽입할 텍스트 데이터
var text = document.getElementById("text").firstChild; 
//아이디가 "text"인 요소의 텍스트 노드 선택(text id가 1개더라도 firstChild를 구체적으로 선택해야 한다.)
function appendText(){
    //텍스트 노드의 6번째 문자부터 "나른한" 이란 텍스트를 추가한다.
    text.insertData(6, "나른한");
}


//노드의 생성
//1. createElement()  --> 요소 노드의 생성
// 새로운 요소 노드를 만들 수 있다.
function createNode(){
    //기준이 되는 element 
    var criteriaNode = document.getElementById("text");
    var newNode = document.createElement("p"); //새로운 <p> 요소 생성함.
    newNode.innerHTML = "새로운 단락입니다."; //innerHTML로 텍스트 추가
    //노드 추가 (부모요소).insertBefore(추가할 요소, 기준 요소)
    document.body.insertBefore(newNode, criteriaNode); 
}
//2. createAttribute() --> 속성 노드의 생성
// 새로운 속성 노드를 만들 수 있다.
// (만약 같은 이름의 속성 노드가 이미 존재한다면, 기존의 속성노드는 새로운 속성 노드로 대체된다.)
function createNode(){
    var text = document.getElementById("text");             //text 아이디 찾음 (element)
    var newAttribute = document.createAttribute("style");   //style속성 노드 생성
    newAttribute.value = "color:red";                       //value 프로퍼티에 빨강색 추가
    text.setAttribute(newAttribute);                        //해당요소의 노드를 넣는다.
}                                                           //이과정을 추가안하면 작동안됨.
//3. createTextNode() --> 텍스트 노드의 생성
// 새로운 텍스트 노드를 만들 수 있다.
function createNode(){
    var elementNode = document.getElementById("text");      //text 아이디 요소 찾음
    var newText = document.createTextNode("새로운 텍스트에요"); //새로운 텍스트 노드 생성함.
    elementNode.appendChild(newText);          //해당요소의 자식노드로 추가함.
}


//노드의 제거
//1. removeChild() --> 자식 노드리스트에서 특정 자식 노드를 삭제한다.
// 성공적으로 노드를 제거하고 제거된 노드를 반환한다.
// 노드가 제거될 때는 제거된 노드의 모든 자식 노드들도 같이 삭제됨.
var parent = document.getElementById("list");
var removedItem = document.getElementById("item");
parent.removeChild(removedItem);    //지정된 요소 삭제
//2. removeAttribute() --> 속성의 이름을 이용하여 특정 속성 노드를 삭제한다.
var text = document.getElementById("text");
text.removeAttribute("style"); //해당요소의 "style 속성 제거"


//노드의 복제
//cloneNode() --> 기존의 존재하는 노드와 똑같은 새로운 노드를 생성하여 반환한다.
//복제할노드.cloneNode(자식노드복제여부)
//자식노드복제여부 true : 복제되는 노드의 모든 속성 노드와 자식 노드도 같이 복제
//               false : 속성노드만 복제하고 자식 노드는 복제하지 않는다.
function cloneElement(){
    var parent = document.getElementById("list"); //
    var originitem = document.getElementById("item"); //복제할 노드 선택
    parent.appendChild(originitem.cloneNode(true)); //해당 노드를 복제하여 리스트의 맨마지막에 추가함
}


//노드의 값 변경
// nodeValue 프로퍼티를 사용하면 특정 노드의 값을 변경 할 수 있다.
// setAttribute() 메소드는 속성 노드의 속성값을 변경할 수 있게 해준다.
var para = document.getElementById("text");
function changeText(){
    para.firstChild.nodeValue = "텍스트값 변경 완료";
}


//노드의 교체
//replaceChild() --> 특정노드 그자체를 다른 노드로 바꿀 수 있다.
var parent = document.getElementById("parent");
var first = document.getElementById("first");
var third = document.getElementById("third");
function changeNode() {
    parent.replaceChild(third, first); //first요소 삭제후, 그 자리에 third요소 추가
}


///////////////////////////////
//서버와의 통신

//XMLHTTPRequest 객체
// Ajax에서 가장 핵심적인 역할을 하는 것으로 XMLHTTPRequest 객체는 웹 브라우저가 
//서버와 통신을 하여 데이터를 주고받게 도와준다.
//객체를 사용하여 서버와 데이터를 교환하기 때문에 XMLHTTPRequest() 인스턴스를 생성하고
//open(), send() 메서드를 사용하여 요청을 보낼 수 있다.

//open()
//서버로 보낼 Ajax 요청의 형식을 설정한다.
//open(전달방식, URL주소, 동기비동기여부)
//전달방식 : 요청의 전달 방식으로 get방식인지 post방식인지 선택을 한다.
//URL주소 : 요청을 처리할 서버의 파일 주소 전달
//동기비동기여부 : 요청을 동기식인지 비동기식인지 결정하여 전달 (true:비동기, false:동기)

//send()
//작성된 Ajax요청을 서버로 전달한다.
//전달 방식에 따라 인수를 가질수도 안가질수도 있다.(문법은 아래와같고 get,post방식에 차이가 있다.)
//send(); //GET방식
//send(문자열); //POST방식

//GET방식과 POST방식
//GET방식
//1. 주소에 데이터를 추가하여 전달한다.
//2. GET방식의 HTTP요청은 브라우저에 의해 캐시되어 저장된다.
//3. GET방식은 보통 쿼리 문자열(query stiring)에 포함되어 전송되므로, 길이의 제한이 있다.
//   보안에 취약하므로, 중요한 데이터는 POST방식으로 보내는게 좋다.
//POST방식
//1. 데이터를 별도로 첨부하여 전달한다.
//2. POST방식의 HTTP요청은 브라우저에 캐시되지 않으므로, 브라우저 히스토리에도 남지 않는다.
//3. POST방식의 HTTP요청은 의한 데이터는 쿼리 문자열과 별도로 전송된다.
//   데이터 길이 제한이 없고 GET방식보다 보안에 좋다.

//GET,POST 방식의 비교
// 특징	            |  GET 방식	                                |     POST 방식
/////////////////////////////////////////////////////////////////////////////////////////
// 캐시화(cached)	|  캐시될 수 있음.	                         |   캐시되지 않음.
//////////////////////////////////////////////////////////////////////////////////////
// 브라우저 히스토리 |	히스토리에 쿼리 문자열이 기록됨.	        |히스토리에 기록되지 않음.
////////////////////////////////////////////////////////////////////////////////////////
// 데이터 길이	    |데이터의 길이가 URL 주소의 길이 이내로 제한됨. |제한없음
// (익스플로러에서 URL 주소가 가질 수 있는 최대 길이는 2,083자이며, 이 중에서 순수 경로 길이는 2,048자까지만 허용됨)
////////////////////////////////////////////////////////////////////////////////////////
// 데이터 타입	    |오직 ASCII 문자 타입의 데이터만 전송할 수 있음. |제한 없음.
/////////////////////////////////////////////////////////////////////////////////////////////
// 보안성	        |데이터가 URL 주소에 포함되어 전송되므로, 아무나 볼 수 있어 보안에 매우 취약함.     |	브라우저 히스토리에도 기록되지 않고, 데이터가 따로 전송되므로, GET 방식보다 보안성이 높음.


//GET방식으로 요청하기
//GET방식으로 요청을 보내면서 데이터를 동시에 전달함.
let req = new XMLHttpRequest();
req.open("GET", "/examples/media/request_ajax.php?city=Seoul&zipcode=06141", true);
req.send();
//POST방식으로 요청하기
//서버로 전송하고자 하는 데이터는 HTTP헤더에 포함되어 전송된다.
//그러므로 setRequestHeader() 메소드를 이용하여 먼저 헤더를 작성한 후에, send()메소드로
//데이터를 전송한다.
//POST방식의 요청은 데이터를 Http 헤더에 포함시켜 전송함.
let req = new XMLHttpRequest();
req.open("POST","/examples/media/request_ajax.php",true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send("city=Seoul&zipcode=0614");

//비동기식(asynchronous) 요청
//서버에 비동기식 요청을 보내기 위해서는 open()메소드의 세번째 인수를 true로 보내면 된다.
//비동기식으로 보내면, 자바스크립트는 서버로부터 응답을 기다리면서 동시에 다른 일을 할 수 있다.
//동기식 요청은 open()메소드의 세번쨰 인수에 false로 보내면 된다.
//동기식으로 보내면, 자바스크립트는 서버로부터 응답이 도착할때까지 대기하게 된다.
//따라서 사용자는 대기하는 동안 어떤 작업도 할 수없게 된다.


//서버로부터의 응답(response) 확인
//Ajax에서 서버로부터의 응답을 확인하기 위해서 사용되는 XMLHttpRequest객체의 프로퍼티는 다음과 같다.
//1. readyState 프로퍼티
//2. status 프로퍼티
//3. onreadystatechange 프로퍼티

//readyState 프로퍼티
// -> readyState 프로퍼티는 XMLHttpRequest 객체의 현재 상태를 나타낸다.
// 이 프로퍼티는 아래의 주기로 변화한다.
//1. UNSENT (숫자 0) : XMLHttpRequest 객체가 생성됨.
//2. OPENED (숫자 1) : open() 메소드가 성공적으로 실행됨.
//3. HEADERS_RECEIVED (숫자 2) : 모든 요청에 대한 응답이 도착함.
//4. LOADING (숫자 3) : 요청한 데이터를 처리 중임.
//5. DONE (숫자 4) : 요청한 데이터의 처리가 완료되어 응답할 준비가 완료됨.

//status 프로퍼티
// -> status 프로퍼티는 서버의 문서 상태를 나타낸다.
//200 : 서버에 문서가 존재함.
//404 : 서버에 문서가 존재하지 않음.

//onreadystatechange 프로퍼티
// -> onreadystatechange 프로퍼티는 XMLHttpRequest 객체의 readyState 프로퍼티 값이 
//    변할 때마다 자동으로 호출되는 함수를 설정한다.
//이 함수는 서버에서 응답이 도착할 때까지 readyState 프로퍼티 값의 변화에 따라 총 5번 호출된다.
//이 프로퍼티를 이용하면 서버에 요청한 데이터가 존재하고, 서버로부터 응답이 도착하는 순간을 특정할수 있다.
// http://tcpschool.com/examples/tryit/tryhtml.php?filename=ajax_server_response_01
// 위의 링크로 들어가면 코드를 볼 수 있다.


/////////////////////////////////////////
//HTTP 요청 헤더

//https://gmlwjd9405.github.io/2019/01/28/http-header-types.html  여길 참조하자

//HTTP 헤더
// 클라이언트와 서버 사이에 이루어지는 HTTP 요청과 응답은 HTTP헤더를 사용하여 수행된다.
// HTTP 헤더는 클라리언트와 서버가 서로에게 전달해야 할 다양한 종류의 데이터를 포함할 수 있다.

//아래와 같은 방식으로 데이터가 포함되어 있다.
// Accept: */*
// Referer: http://codingsam.com/examples/tryit/tryhtml.php?filename=ajax_header_request_01
// Accept-Language: ko-KR
// Accept-Encoding: gzip, deflate
// User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
// Host: codingsam.com
// DNT: 1
// Connection: Keep-Alive

// *HTTP 요청헤더는 원래 웹 브라우저가 자동으로 설정해서 보내는 것이므로, 사용자가 직접 설정할수 없다.
//하지만 Ajax를 통해서 HTTP요청헤더를 직접 설정할 수 있고, HTTP응답 헤더의 내용을 직접 확인할 수도 있다.

//Ajax에서는 setRequestHeader()메소드를 사용하여 HTTP요청 헤더를 작성할 수있다.
//XMLHttpRequest인스턴스.setRequestHeader(헤더이름, 헤더값);
// 헤더이름 : HTTP 요청 헤더에 포함되고자 하는 헤더의 이름
// 헤더값 : HTTP 요청 헤더에 포함되고자 하는 헤더의 값


//HTTP 응답 헤더
//Ajax에서는 서버로부터 받은 HTTP응답 헤더 내용을 아래의 메서드를 통해 확인할 수 있다.
//1. getAllResponseHeader() : HTTP 응답 헤더의 모든 헤더를 문자열로 반환한다.
//2. getResponseHeader() : HTTP 응답 헤더 중 인수로 전달받음 이름과 일치하는 헤더의 값을 문자열로 인식한다.

//Content-Type 헤더의 값을 직접 설정하지 않으면, HTML 문서의 MIME 타입인 "text/html"로 자동 설정됩니다.
//* 대부분의 Ajax응용 프로그램에서 다루게 되는 XML은 일반적인 파일 형태의 XML 문서가 아니다.
//Ajax 요청을 받은 후에 PHP같은 서버프로그램이 실행되어 동적으로 생성되는 XML 형태의 데이터이다!
//데이터 확장자가 .xml이 아니므로 header()를 사용하여 응답 데이터의 MIME 타입이 "text/xml"이라고 명시해야만 합니다.

//Ajax 요청시 쓸만한 메서드들
//1. setInterval(함수, 밀리초) : 지정한 함수를 지정한 밀리초 주기로 실행한다.
//2. setTimeout(함수, 밀리초) : 응답을 받고, 지정한 함수를 지정한 시간 후 실행한다.
//3. XMLHttpRequest인스턴스.abort() : 서버로 보낸 ajax요청에 대한 응답이 도착하기 전에 해당 요청 취소할때 사용
//4. responseText 프로퍼티 : 서버에 요청하여 응답으로 받은 데이터를 문자열에 반환한다.
 document.getElementById("text").innerHTML = xmlHttp.responseText;  //이런식으로 사용함.
//xmlHttp 는 XMLHttpRequest 인스턴스이다.
//5. responseXML 프로퍼티 : 서버에 요청하여 응답으로 받은 데이터를 XML, DOM 객체로 반환한다.
        // XML 문서의 응답 처리에 responseText 프로퍼티를 사용하면 XML 코드를 문자열로 반환함.
        document.getElementById("text").innerHTML = httpRequest.responseText;
        // XML 문서의 응답 처리는 responseXML 프로퍼티를 사용해야 함.
        document.getElementById("xml").innerHTML = httpRequest.responseXML;
//서버로부터 XML 데이터를 응답으로 받은 경우에는 responseXML 프로퍼티를 사용하여 받은 데이터를 처리할 수 있습니다.
//먼저 responseXML 프로퍼티를 사용하여 XML DOM 객체를 반환한 후에 해당 객체를 가지고 작업하면 됩니다.


////////////////////////////////////////////
//Ajax와 제이쿼리

//$.ajax() 메소드
//제이쿼리와 Ajax
//--> Ajax를 이용하여 개발을 손쉽게 할 수 있는 여러기능을 가진 개발환경을 Ajax프레임워크라고한다.
// 현재 jquery가 가장 널리 쓰이고 있다.
// $.ajax() 메소드는 모든 제이쿼리 Ajax 메소드의 핵심이 되는 메소드입니다.
// $는 jQuery원형에서 볼때 var $ = jQuery; 이므로 jQuery를 써도되고 $를 써도 된다.
// jQuery.fn = jQuery.prototype로 fn이 prototype이기 때문에 확장함수를 모든 제이쿼리 객체가 쓸 수 있던 겁니다
//$.ajax() 메소드의 원형은 다음과 같습니다.
//$.ajax([옵션])
//옵션 : HTTP 요청을 구성하는 키와 값의 쌍으로 구성되는 헤더의 집합입니다
$.ajax({
    url : "/examples/media/request_ajax.php", //클라이언트가 요청을 보낼 서버의 URL 주소
    data : {name : "홍길동"},               //HTTP 요청과 함께 서버로 보낼 데이터
    type : "GET",                          //HTTP 요청 방식(GET,POST)
    dataType : "json",                     //서버에서 보내줄 데이터 타입
})
// HTTP 요청이 성공하면 요청한 데이터가 done() 메소드로 전달됨.
.done(function (json) {
    $("<h1>").text(json.title).appendTo("body");
    $("<div class = \"content\">").html(json.html).appendTo("body");
  })
// HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
.fail(function (xhr, status, errorThrown){
    $("#text").html("오류가 발생했습니다.<br>")
    .append("오류명: " + errorThrown + "<br>")
    .append("상태: " + status);
})
// HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
.always(function (xhr, status) {
    $("#text").html("요청이 완료되었습니다.!");
  });


//$.get() 메소드
//제이쿼리에서는 Ajax를 이용하여 GET 방식의 HTTP 요청을 구현한 $.get() 메소드를 제공합니다.
//이 메소드를 사용하면 서버에 GET 방식의 HTTP 요청을 보낼 수 있습니다.
//$.get(URL주소[,콜백함수]);
//URL주소 : 클라이언트가 HTTP 요청을 보낼 서버의 주소이다.
//콜백함수 : HTTP요청이 성공했을 때 실행할 함수를 정의한다.
//예제
$(function () {
    $("#exampleBtn").on("click",function () {
        //GET방식으로 서버에 HTTP 요청 보냄
        $.get("/examples/media/jquery_ajax_data.txt",
        function(){
            $("#text").html(data+status); //전송받은 데이터와 성공여부 알려줌
        });
      });
  });


//$.post() 메소드
//제이쿼리에서는 Ajax를 이용하여 POST 방식의 HTTP 요청을 구현한 $.post() 메소드를 제공합니다.
//이 메소드를 사용하면 서버에 POST 방식의 HTTP 요청을 보낼 수 있습니다.
//$.post(URL주소[,데이터][,콜백함수]);
//URL주소 : 클라이언트가 HTTP요청을 보낼 서버의 주소이다.
//데이터 : HTTP 요청과 함께 서버로 보낼 데이터를 전달한다.
//콜백함수 : HTTP 요청이 성공했을 떄 실행할 함수를 정의한다.
// POST 방식으로 서버에 HTTP 요청을 보냄.
$.post("/examples/media/request_ajax.php", 
        {name: "이순신", grade: "A+"},  //서버가 필요한 정보를 같이 보냄.
        function(data, status){
            $("#text").html(data + "<br>" + status); // 전송받은 데이터와 전송 성공 여부를 보여줌.
        }
)


//load() 메소드
//load() 메소드는 선택한 요소에서 호출하는 유일한 제이쿼리 Ajax 메소드입니다.
//load() 메소드는 서버에서 데이터를 읽어 들인 후에 해당 HTML 코드를 선택한 요소에 배치합니다.
//이때 선택자를 URL 주소와 함께 전송하면, 읽어 들인 HTML 코드 중에서 선택자와 일치하는 요소만을 배치합니다.
$("#box").load("test.txt #para");
//위의 예제는 test.txt 파일 내에서 아이디가 para인 요소만들 읽어들여, 아이디가 box인 요소안에 배치하는 예제이다.
$("#list").load("/examples/tryit/htmlexample/jq_elementTraversing_etc_01.html li");
//위의 예제는 URL 주소에 존재하는 HTML 코드에서 <li>요소를 읽은 후 id가 "list"인 요소에 배치한다.
//load()메소드에 인수로 URL주소와 함께 선택자를 전달할 땐 앞에서처럼 하나의 문자열로 전송해야한다.
//URL주소와 선택자의 구분은 띄어쓰기로 한다.


//다른 Ajax메소드
//$.ajax() : 비동기식 ajax를 이용하여 HTTP 요청을 전송한다.
//$.get() : 전달받은 주소로 GET방식의 HTTP 요청을 전송한다.
//$.post() : 전달받은 주소로 POST방식의 HTTP 요청을 전송한다.
//$.getScript() : 웹페이지에 스크립트를 추가한다.
//$.getJSON() : 전달받은 주소로 GET방식의 HTTP 요청을 전송하여, 응답으로 JSON 파일을 전송받는다.
//load() : 서버에서 데이터를 받은 후, 읽어 들인 HTML 코드를 선택한 요소에 배치한다.

//$.ajax({name:value, name:value, ... }) 
// https://www.w3schools.com/jquery/ajax_ajax.asp

//$.get(URL,data,function(data,status,xhr),dataType)
//URL : 요청받을 곳의 URL주소
//data : (옵션), 요청과 함께 서버로 보낼 데이터
//status : 요청의 상태표시("success", "notmodified", "error", "timeout", or "parsererror")
//xhr : XMLHttpRequest의 객체
//datatype : 서버에서 받을 데이터 타입(xml, html, text, script, json, jsonp)

//$(selector).post(URL,data,function(data,status,xhr),dataType)
//URL : 요청받을 곳의 URL주소
//data : (옵션), 요청과 함께 서버로 보낼 데이터
//status : 요청의 상태표시("success", "notmodified", "error", "timeout", or "parsererror")
//xhr : XMLHttpRequest의 객체
//datatype : 서버에서 받을 데이터 타입(xml, html, text, script, json, jsonp)

//$(selector).getScript(url,success(response,status))
//url : 세부적인 요청을 보내기 위한 URL
//response : 요청으로부터의 데이터 결과를 포함한다.
//status : 요청의 상태표시("success", "notmodified", "error", "timeout", or "parsererror")

//$(selector).load(url,data,function(response,status,xhr))
//URL : 너가 불러오로 싶은 URL
//data : (옵션), 요청과 함께 서버로 보낼 데이터
//response : 요청으로부터의 데이터 결과를 포함한다.
//status : 요청의 상태표시("success", "notmodified", "error", "timeout", or "parsererror")
//xhr : XMLHttpRequest의 객체