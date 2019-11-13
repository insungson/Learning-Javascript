//////////////////////////////인터넷 부분
//https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
//함수 표현식 vs 함수 선언식

// //1)함수 선언식 - Function Declarations
// function 함수명() {
//   구현 로직
// }
// // 예시
// function funcDeclarations() {
//   return 'A function declaration';
// }
// funcDeclarations(); // 'A function declaration'

// //2) 함수 표현식 - Function Expressions
// var 함수명 = function () {
//   구현 로직
// };

// // 예시
// var funcExpression = function () {
//   return 'A function expression';
// }
// funcExpression(); // 'A function expression'

// //3) 함수 선언식과 표현식의 차이점
// // 함수 선언식은 호이스팅에 영향을 받지만, 함수 표현식은 호이스팅에 영향을 받지 않는다.

// // 함수 선언식은 코드를 구현한 위치와 관계없이 자바스크립트의 특징인 호이스팅에 따라 
// // 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어 올려진다.

// // 실행 전
// logMessage();
// sumNumbers();
// function logMessage() {
//   return 'worked';
// }
// var sumNumbers = function () {
//   return 10 + 20;
// };

// // 실제 실행 시 아래의 순서로 실행된다
// function logMessage() {
//   return 'worked';
// }
// var sumNumbers;
// logMessage(); // 'worked'
// sumNumbers(); // Uncaught TypeError: sumNumbers is not a function
// sumNumbers = function () {
//   return 10 + 20;
// };

// //4) 함수 표현식의 장점
// //‘함수 표현식이 호이스팅에 영향을 받지 않는다’ 는 특징 이외에도 함수 선언식보다 유용하게 쓰이는 경우는 다음과 같다.
// //  1. 클로져로 사용
// //  2. 콜백으로 사용 (다른 함수의 인자로 넘길 수 있음)

// //1. 클로져 예시 - 렉시컬 스코프에 의해 i는 선언되는 var i 를 찾기 위해 2단계 위로 올라가서 var i를 찾는다
// var tabs = document.querySelectorAll('.tab');
// var i;
// for (i = 0; i < tabs.length; i += 1) {
//     tabs[i].onclick = function (event) {
//       console.log(i); //위의 var i 를 가르킨다
//       // 어느 탭을 클릭해도 항상 tabs.length (i 의 최종 값) 이 출력
//     };
// }
// // 좀더 풀어서 보자
// var tabs = document.querySelectorAll('.tab');
// var i;
// var logIndex = function (event) {
//   console.log(i); // 3    //위의 var i 를 가르킨다
// };
// for (i = 0; i < tabs.length; i += 1) {
//     tabs[i].onclick = logIndex;
// }

// //위의 문제를 클로져를 적용하여 해결해보자
// function tabsHandler(index) { // 이건 var index = 입력값;  과 같다
//   return function tabClickEvent(event) {
//       // 바깥 함수인 tabsHandler 의 index 인자를 여기서 접근할 수 있다.
//       console.log(index);  //이걸 클릭할 때마다 렉시컬 스코프에 의해 위의 index를 가르킨다
//       // 탭을 클릭할 때 마다 해당 탭의 index 값을 표시
//   };
// }
// var tabs = document.querySelectorAll('.tab');
// var i;
// for (i = 0; i < tabs.length; i += 1) {
//   tabs[i].onclick = tabsHandler(i);
// }

//////////////////////////////////////////////////////////////////////
// //함수 표현 방법

// //1) 함수선언식(function declaration)
// function company() {  
//   /* 실행코드 */
// }
// //2) 기명 함수표현식(named function expression) 
// var company = function company() {  
//   /* 실행코드 */
// }; 
// //3) 익명 함수표현식(anonymous function expression)
// var company = function() {  
//   /* 실행코드 */
// };
// //4) 기명 즉시실행함수(named immediately-invoked function expression)
// (function company() {
//   /* 실행코드 */
// }());

// //5) 익명 즉시실행함수(immediately-invoked function expression)
// // Javascript 대가이신 더글라스 클락포트의 권장 표기법
// (function() {
//   /* 실행코드 */
// }());

// //6) 익명 즉시실행함수(immediately-invoked function expression)
// (function() {
//   /* 실행코드 */
// })();


// //고차함수의 이해
// var buyCar = (carName) => () => { // () => 로 고차함수를 추가했기 때문에  
//   console.log('내가 구매한 차는 ' + carName + '입니다.');
// };

// buyCar('소나타');
// //아래가 출력됨
// // () => {  
// //   console.log('내가 구매한 차는 ' + carName + '입니다.');
// // }

// buyCar('소나타')(); //즉시호출하면 내부의 함수가 실행됨
// //아래가 출력됨
// //내가 구매한 차는 소나타입니다.


///////////////////////////////////////////////////////////////////////
//https://webclub.tistory.com/114

// //값으로서의 함수

// // 1. 함수는 리터럴에 의해 생성된다.
// //    함수는 함수 리터럴 표현식이 가능하다.
// var sum = new Function('x','y','return x+y');
// sum(2,3); //5    이것도 5로 출력이 된다
// var sum2 = function(x,y) {
//     return x + y;
// };
// sum2(2,3); //5

// // 2. 함수는 함수의 인자로 전달이 가능하다.
// //    함수는 값이기 때문에 다른 함수의 인자로도 전달될 수가 있습니다
// function cal(func, num){
//   return func(num)
// }
// function increase(num){
//   return num+1
// }
// function decrease(num){
//   return num-1
// }
// console.log(cal(increase, 1)); //2
// console.log(cal(decrease, 1)); //0

// // 3. 변수나 배열의 원소, 객체의 프로퍼티 등에 할당이 가능하다.
// function cal(mode){
//   var funcs = {
//       'plus' : function(left, right){return left + right},
//       'minus' : function(left, right){return left - right}
//   };
//   return funcs[mode]; // 리턴 값으로 함수를 사용
// }
// console.log(cal('plus')(2,1)); // 3
// // cal('plus') 이 부분은 funcs.puls, funcs[plus]이므로 cal('plus')의 값으로
// // function(left, right){return left + right}을 가지고 있는 것이고 이 값인 함수를 호출하기 위해서
// // cal('plus')() 이중 호출의 형태를 보이게 된 것이다.
// console.log(cal('minus')(2,1)); // 1

// // 4. 함수는 함수의 리턴값으로 리턴이 가능하다.
// //    계속해서 강조하지만 자바스크립트에서는 함수도 객체입니다.
// //    즉, 함수의 기본 기능인 코드 실행뿐만 아니라, 함수 자체가 일반 객체처럼 
// //    프로퍼티를 생성하고 할당이 가능하다는 것입니다.
// // 함수 선언문 방식으로 add() 함수 정의
// function add(x,y) {
//   return x + y;
// }
// // add()함수도 객체처럼 프로퍼티를 가질 수 있다.
// // add()함수 객체에 result, status 프로퍼티를 추가해 본다.
// add.result = add(3,4);
// add.status = 'complete';
// console.log(add.result); // 7
// console.log(add.status); // 'complete'

// // 5. 함수는 동적으로 프로퍼티를 생성 및 할당이 가능하다.
// //    함수는 배열의 값으로도 사용할 수 있습니다.
// var process = [
//   function(input){ return input + 10;}, // 1 + 1 = 11
//   function(input){ return input * input;}, // 11 * 11 = 121
//   function(input){ return input / 2;} // 121 / 2 = 60.5
// ];
// var input = 1;
// for(var i = 0; i < process.length; i++){
//   input = process[i](input);
// }
// console.log(input); // 60.5


// //콜백함수
// var numbers = [20, 10, 9,8,7,6,5,4,3,2,1];
// console.log(numbers.sort()); // [1,10,2,20,3,4,5,6,7,8,9]
// // .(쩜)앞에 있는 모든 것은 객체라고 봐도 무방하다. 배열은 객체에 속한다.
// // 배열객체에는 빌트인 메소드 sort가 있기 때문에 sort 메소드를 사용할 수 있다.
// function sortNumber(a,b){
//     // 위의 예제와 비교해서 a와 b의 순서를 바꾸면 정렬순서가 반대가 된다.
//     return b-a;
// }
// var numbers2 = [20, 10, 9,8,7,6,5,4,3,2,1];
// alert(numbers2.sort(sortNumber)); // array, [20,10,9,8,7,6,5,4,3,2,1]
// //sortNumber 함수를 매개변수로 넘어왔다


// 일반 함수 : 가장 일반적으로 사용되는 함수( 냉무 ㅋ) 

// 중첩 함수 : 함수 안에 함수가 있는 경우를 중첩되어있다라고 하며 이때 함수 안에 
// 있는 함수를 중첩함수라고 합니다. 

// 콜백 함수 : 함수의 실행 결과값을 리턴이 아닌 매개변수로 넘어온 함수를 호출해서 
// 념겨주는 방식을 콜백이라 하며, 이때 매개변수로 넘어온 함수를 콜백 함수라고 합니다. 

// 클로저 함수 : 일반적인 함수의 경우 함수 호출에 의해 함수 내부의 실행구문을 모두 실행하게 되면 
// 함수 내부에서 만든 지역 변수가 자동으로 사라지지만 어떤 경우에는 사라지지 않고 남아있는 경우가 있습니다.
// 이러한 현상을 클로저라고 하며 이 현상을 일으키는 함수를 클로저 함수라고 합니다. 

// 멤버 함수(메서드) : 멤버 함수는 클래스 내부에 만들어지며 주로 메서드라고 부릅니다. 



/////////////////////////////////////////////책부분////////////////////
// function getGreeting(){
//     return "hello world!";
// }
// console.log(getGreeting, getGreeting()); //[Function: getGreeting] 'hello world!'
// //()를 넣으면 함수의 리턴값이 반환되고 쓰지 않으면 함수를 참조한다.

// const q = getGreeting;
// console.log(q()); //hello world!
// //위 처럼 함수를 변수에 할당 할 수 있다.

// const w = {};
// w.q = getGreeting;
// console.log(w.q()); //hello world!
// //위 처럼 함수를 객체 프로퍼티에 할당 할 수 있다.

// const arr = [1,2,3];
// arr[1] = getGreeting;
// console.log(arr[1]()); //hello world!
// //배열의 요소로 할당 가능

// /////////////
// //함수와 매개변수
// function f(x){
//     console.log(`f 내부: x=${x}`);
//     x=5;
//     console.log(`f 내부: f=${x} (할당 후)`);
// }
// let x = 3; //변수에 원시값으로 지정하였다.
// console.log(`f를 호출하기 전: x = ${x}`);
// f(x);
// console.log(`f를 호출한 다음: x = ${x}`);
// // f를 호출하기 전: x = 3
// // f 내부: x=3
// // f 내부: f=5 (할당 후)
// // f를 호출한 다음: x = 3

// //위는 코드를 출력한 결과이다.
// //함수안에서 x값으로 매개변수를 할당해도 함수 바깥에선 값이 그대로이다.

// //아래의 코드를 보자
// function f(o){
//     o.message = `f안에서 수정함(이전 값 : '${o.message}')`; //객체에 값 설정
// };
// let o = {message : "초기값"};
// console.log(`f를 호출하기 전: o.message = "${o.message}"`);
// f(o);
// console.log(`f를 호출한 다음: o.message = "${o.message}"`);
// // f를 호출하기 전: o.message = "초기값"
// // f를 호출한 다음: o.message = "f안에서 수정함(이전 값 : '초기값')"

// //*** 위의 두가지 예를 통해 원시 값을 담은 변수는 수정할 수 있지만(다른값으로 변경가능)
// //원시 값 자체는 바뀌지 않는다. 반면에 객체는 바뀔 수 있다.

// function f(o){
//     o.message = "f에서 수정함"; //이건 프로퍼티에 할당
//     o = {
//         message: "새로운 객체!" //이건 객체 o에 할당
//     };
//     console.log(`f 내부: o.message="${o.message}" (할당 후)`);
// }
// let o = {
//     message: `초기값`
// };
// console.log(`f를 호출하기 전: o.message="${o.message}"`);
// f(o);
// console.log(`f를 호출한 다음: o.message="${o.message}"`);
// console.log(o); 
// //f를 호출하기 전: o.message="초기값"
// //f 내부: o.message="새로운 객체!" (할당 후)
// //f를 호출한 다음: o.message="f에서 수정함"
// //{ message: 'f에서 수정함' }

// // 위는 출력값이다.
// // **이 코드의 핵심은 함수 내부의 매개변수 o와 
// // **함수의 바깥 변수o는 다르다는 것이다.
// // **f를 호출하면 둘은 같은 객체를 가르키지만 
// // **f내부에서 o에 할당한 객체는 새로운, 전혀다른 객체이다.
// // **함수 바깥읜 o는 여전히 원래 객체를 가리키고 있다.


// //자바에서 f(x)와 f(x,y)는 다르다. 왜냐하면 다른 매개변수를 받기 때문이다.
// //하지만 자바스크립트에선 그런차이가 없다. 함수f가 있으면 매개 변수가 몇개든
// //같은 함수를 호출하는 것이다.
// function f(x){
//     return `in f: x=${x}`;
// }
// console.log(f()); //in f: x=undefined   변수가 없으면 undefined가 뜬다.

// /////////////
// //매개변수의 해체
// //앞에서 배운 해체 할당처럼 매개변수도 해체가 가능하다. 아래의 예제를 보자
// function getSentence({subject, verb, object}){ //매개변수를 {}를 통해 프로퍼티식으로 받음
//     return `${subject} ${verb} ${object}`
// }
// const o = {
//     subject : "I",
//     verb : "love",
//     object : "JavaScript",
// };
// console.log(getSentence(o)); //I love JavaScript
// //해체할당 처럼 프로퍼티 이름은 반드시!! 같은 식별자여야 한다. (argument)
// //해당 식별자가 없으면 위 코드 위의 예제처럼 undefined가 뜬다.

// //이제 배열의 해체코드를 보자
// function getSentence1([subject, verb, object]){
//     return `${subject} ${verb} ${object}`
// }
// const arr1=["I","love","JavaScript"];
// console.log(getSentence1(arr1)); //I love JavaScript

// //확산연산자(...)의 예제도 살펴보자
// function addPrefix(prefix, ...words){
//     //나중에 좀더 세련된 방법을 볼 것이다.
//     const prefixedWords = [];
//     for(let i=0; i<words.length;i++){ //...는 그냥 선언이고 호출시는 그냥 words만 쓴다.
//         prefixedWords[i] = prefix + words[i];
//     }
//     return prefixedWords;
// }
// console.log(addPrefix("con", "verse", "vex")); //[ 'converse', 'convex' ]

// //ES6에서는 매개변수의 기본값도 추가되었다.
// function f2(a,b = "default", c=3){
//     return `${a}-${b}-${c}`;
// }
// console.log(f2(5,6,7)); //5-6-7
// console.log(f2(5,6)); //5-6-3
// console.log(f2(5)); //5-default-3
// console.log(f2()); //undefined-default-3

// /////////////////////
// //객체의 프로퍼티인 함수
// //객체의 프로퍼티인 함수 -> 매서드
// //매서드는 일반적인 함수와 다르다.(나중에 설명한다.)
// const o = {
//     name : "wallace", //원시 값 프로퍼티
//     bark : function(){return 'woof!';}, //함수 프로퍼티(메서드)
// }
// //위의 문법을 ES6에선 아래와 같이 표현할 수있다.
// const o = {
//     name : "wallace0", //원시값 프로퍼티
//     bark(){return 'woof!';}, //함수 프로퍼티(메서드)
// }