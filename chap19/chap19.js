//http://tcpschool.com/jquery/intro
//위 사이트에서 제이쿼리에 대해 따로 보자

//제이쿼리란?
//제이쿼리는 자바스크립트 언어를 간편하게 사용할 수 있도록 단순화시킨 
//오픈 소스 기반의 자바스크립트 라이브러리입니다.
//제이쿼리를 이용하면 문서 객체 모델(DOM)과 이벤트에 관한 처리를 손쉽게 구현할 수 있습니다.
//또한, Ajax 응용 프로그램 및 플러그인도 제이쿼리를 활용하여 빠르게 개발할 수 있습니다.

//제이쿼리 사용의 장점
//1. 제이쿼리를 사용하면 브라우저 호환성을 걱정하지 않아도 된다.
//  특히 오래된 브라우저를 지원해야 할 때 골치 아픈 일이 줄어든다.
//2. 제이쿼리가 제공하는 Ajax API는 무척 단순하다.
//  요즘 웹사이트에서 Ajax를 아주 많이 사용하므로 이 장점을 무시할 수 없다.
//3. 제이쿼리는 내장된 DOM API를 더 유용하고 단순하게 바꾼 메서드를 제공한다.

<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
//제이쿼리를 불러오는 가장 쉬운 방법은 위의 방법이다.(CDN 이용)

//브라우저 HTML 파일을 읽고 해석하고 랜더링하는 과정은 복잡하다.
//경험이 부족한 웹 개발자는 브라우저가 DOM을 구축하기도 전에 요소에 접근하다가 에러를 겪는 일이 많다.
//제이쿼리에서는 브라우저가 페이지를 완전히 읽고 DOM을 구축한 다음에만 호출되는 콜백안에 코드를 작성해야
//문제없이 작동이 가능하다.
$(document).ready(function(){
    //여기 있는 코드는 HTML을 모두 불러오고
    //DOM이 구성된 다음 실행된다.
})
//아래와 같이 써도 된다.
$(function(){
    //여기 있는 코드는 HTML을 모두 불러오고
    //DOM이 구성된 다음 실행된다.
})

//제이쿼리로 DOM을 조작할 때 많이 쓰이는 방법은 제이쿼리로 DOM요소를 감싸는 방법이다.
//제이쿼리로 DOM을 조작할 때는 우선 DOM 요소 셋(set)을 감싸는 제이쿼리 객체를 만든다.
//css 선택자로 제이쿼리를 호출하면 해당 선택자에 일치하는 제이쿼리 객체가 반환된다.
//*이 객체는 document.querySelectorAll이 반환하는 컬렉션과 거의 비슷하다.
const $paras = $('p');
$paras.length; //문단수
typeof $paras; //"object"
$paras instanceof $; //true
$paras instanceof jQuery; //true

const $newPara = $('<p>Newly created paragraph...</p>');
//위의 두 예제에서는 제이쿼리 객체를 가리키는 변수 이름을 달러로 시작했다. ($)
//*(꼭 할 필요는 없지만 어떤 변수가 제이쿼리 객체인지 금방 알 수 있도록 표기하는게 좋다. 이렇게 습관을 들이자)

//제이쿼리에서 text, html 메서드가 있다.
//이들은 각각 요소의 textContent, innerHTML 프로퍼티에 대응한다.
//(예를 들면 모든 문단의 텍스트를 똑같이 바꾸려면 아래와 같이 쓴다.)
$('p').text('ALL PARAGRAPHS REPLACE');
//html 메서드를 쓰면 DOM을 수정할 수 있다.
$('p').html('<i>ALL</i> ALL PARAGRAPHS REPLACE');

//DOM API로 같은 일을 하려면 document.querySelectorAll()이 반환하는 
//컬렉션을 순회하면서 작업해야 한다.
$('p')      //모든 문단에 일치한다.
    .eq(2)  //세번째 문단(인덱스는 0으로 시작한다.)
    .html('<i>THIRD</i> ALL PARAGRAPHS REPLACE');

//요소를 제거할 때는 제이쿼리 객체에서 remove를 호출한다.
$('p').remove();
//제이쿼리를 사용할 때 체인을 사용했다. 메서드를 체인으로 연결하면 쉽게 요소들을 조작할 수 있다.

$('p')
    .append('<sup>*</sup>');
//append()메서드는 선택한 element 끝에 삽입한다.
//after() 메서드는 선택한 element 뒤에 삽입한다.
//before() 메서드는 선택한 element 앞에 삽입한다.
$('p')
    .after('<hr>')
    .before('<hr>');
//위의 예시들은 객체가 주체로 객체에 자료를 append, after, before 하는 것이고,
//아래의 예시들은 자료가 주체로 객체에 append, after, before 하는 것이다.
$('<sup>*</sup>').appendTo('p');    //$('p').append('<sup>*</sup>'); 와 같다.
$('<hr>').insertAfter('p');         //$('p').after('<hr>'); 와 같다.
$('<hr>').insertBefore('p');        //$('P').before('<hr>'); 와 같다.
//$(content).appendTo(selector)
//$(content).insertAfter(selector)
//$(content).insertBefore(selector)

//클래스를 추가할 때는 addClass, 제거할 때는 removeClass를 사용한다.
//toggleClass 메서드는 추가나 제거를 할 수 있다. (사용법은 아래와 같다.)
// https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_toggleclass
//$(selector).toggleClass(classname,function(index,currentclass),switch) 가 사용방법이고
//selector : 요소선택
//classname : 추가나 제거할 클래스이름선택
//switch : true(추가), false(제거) 이다.

//:even  은 짝수번째를 선택한다.(0,2,4)
//:odd   는 홀수번째를 선택한다.(1,3,5)

$('p:odd').css('color','red');
//제이쿼리 객체를 요소하나로 줄이는 eq는 이미 있지만, filter, not, find를 써서 선택 범위를 줄일 수 있다.
// :eq()  선택한 요소의 원하는 인덱스 번호로 그부분을 선택하는게 가능하다.
//https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_sel_eq

//filter() : 선택한 요소들에 대해 배열을 생성하여 여기에 넣는다.
//  (값이 없는 배열요소에 대해선 함수를 실행하지 않는다)
//  (원래의 배열을 변경하지 않는다)
//not() : filter()의 반대이다. 
//find() : 주어진 선택자에 일치하는 자손만 남긴다. 
// (filter와 다르게 true값이 나오면 그것만 가져온다.)

//filter
$('p')
    .after('<hr>')  //모든 문단 다음에 <hr>을 붙이고
    .append('<sup>*</sup>') //끝에 <sup>*</sup> 를 붙이고
    .filter(':odd')     //filter를 체인으로 연결해 홀수 번째 문단만
    .css('color', 'red'); //빨갛게 바꿀 수 있다.
//not
$('p')
    .after('<hr>')  //모든 문단 다음에 <hr>을 붙이고
    .not('.highlight') //highlight 클래스가 없는 문단을 
    .css('margin-left', '20px'); //왼쪽으로 들여쓴다.
//find
$('p')
    .before('<hr>') //모든 문단 앞에 <hr>을 붙이고 
    .find('.code')  //클래스가 code인 자손의 요소에
    .css('font-size','30px'); //폰트크기를 다음과 같이 변경한다.

//DOM 요소에 직접 접근하려면 get 메서드를 사용한다.
//예를 들면 두번째 문단에 접근하려면 아래와 같이 코드를 짜야한다.
const para2 = $('p').get(1); //두번째 <p> (0으로 부터 시작하는 인덱스)
//모든 문단이 들어있는 배열은 아래와 같이 얻는다.
const para = $('P').get();


//Ajax 내용
//제이쿼리에는 Ajax 호출을 간편하면서도 세밀히 컨트롤 할 수 있는 메서드가 있다.
//Ajax호출을 간편하게 바꾼 get, post 메서드가 있다.  이 메서드들은 콜백을 지원하기도 하지만
//서버 응답을 처리할 때 권장하는 방법인 프라미스를 반환하기도 한다.
//앞에서 만들었던 refreshServerInfo 예제를 바꿔보자
function refreshServerInfo() {
    const $serverInfo = $('.serverInfo');
    $.get('http://localhost:7070').then(
        //성공한 경우
        function(data){
            Object.keys(data).forEach(p => {
                $(`[data-replace="${p}"]`).text(data[p]);
            });
        },
        function(jqXHR, textStaus, err){
            console.error(err);
            $serverInfo.addClass('error')
                .html('Error connecting to server.');
        }
    );
  }