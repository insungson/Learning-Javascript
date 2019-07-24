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
// console.log(o); //{ message: 'f에서 수정함' }
// //f를 호출하기 전: o.message="초기값"
// //f 내부: o.message="새로운 객체!" (할당 후)
// //f를 호출한 다음: o.message="f에서 수정함"

// // 위는 출력값이다.
// // 이 코드의 핵심은 함수 내부의 매개변수 o와 
// // 함수의 바깥 변수o는 다르다는 것이다.
// // f를 호출하면 둘은 같은 객체를 가르키지만 
// // f내부에서 o에 할당한 객체는 새로운, 전혀다른 객체이다.
// // 함수 바깥읜 o는 여전히 원래 객체를 가리키고 있다.


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
// //해체할당 처럼 프로퍼티 이름은 반드시!! 같은 식별자여야 한다.
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