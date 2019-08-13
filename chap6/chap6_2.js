// this에 대해서 (https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb)
//브라우저 콘솔(F12)을 켜고, this를 쳐봅시다.
this; // Window {}
//네 window네요. 함수 안에 넣어서 해봅시다
function a() { console.log(this); };
a(); // Window {}
//네. window네요(strict 모드일 경우는 undefined). 자, this는 window였습니다!

//this는 기본적으로 window입니다. 그렇다면 this가 window가 아닌 경우를 외우면 되겠죠?
var obj = {
    a: function() { console.log(this); },
  };
  obj.a(); // obj
//객체 메서드 a 안의 this는 객체를 가리킵니다. 
//이것은 객체의 메서드를 호출할 때 this를 내부적으로 바꿔주기 때문에 그렇습니다.

//단 위의 예제에서 다음과 같이 하면 결과가 달라집니다.
var a2 = obj.a;
a2(); // window
//호출할 때, 호출하는 함수가 객체의 메서드인지 그냥 함수인지가 중요합니다. 
//a2는 obj.a를 꺼내온 것이기 때문에 더 이상 obj의 메서드가 아닙니다.

var obj2 = { c: 'd' };
function b() {
  console.log(this);
}
b(); // Window
b.bind(obj2).call(); // obj2
b.call(obj2); // obj2 
b.apply(obj2); // obj2
//명시적으로 this를 바꾸는 함수 메서드 삼총사 bind, call, apply를 사용하면 this가 객체를 가리킵니다.
//(자세한건 아래의 다른 내용을 참조하자)

//이제 마지막으로 생성자의 경우입니다. 처음부터 공포스러운 this를 쓰는 무시무시한 친구입니다.
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function(){
    console.log(this.name, this.age);
}
//생성자 함수도 함수라는 것 알고 계시죠? 만약 new로 호출하지 않고 그냥 호출한다면 어떻게 될까요?
Person('ZeroCho', 25);
console.log(window.name, window.age); // ZeroCho 25
//그냥 함수에서 this가 window를 가리킨다고 했죠? 
//그래서 this.name 과 this.age는 window.name, window.age가 되어버립니다.

//이를 막으려면 new Person을 사용해야 합니다.
var hero = new Person('Hero', 33); // Person {name: "Hero", age: 33}
hero.sayHi(); // Hero 33
//이렇게 new를 붙이면 this가 생성자를 통해 생성된 인스턴스(hero 자신)가 됩니다. 
//실수로 new를 안 붙이는 문제를 막는 장치가 class가 ES6에서 추가되었습니다.

//예외1)
document.body.onclick = function() {
    console.log(this); // <body>
}
//아니, 이건 그냥 함수인데 this가 window가 아니라 <body>입니다. 
//객체 메서드도 아니고, bind한 것도 아니고, new 붙인 것도 아닌데 말이죠. 
//누가 바꿨을까요? 바로 이벤트가 발생할 때, 내부적으로 this가 바뀐 것입니다. 
//내부적으로 바뀐 것이기 때문에 동작을 외울 수밖에 없습니다. ㅠㅠ

//예외2)
$('div').on('click', function() {
    console.log(this);
});
//이런 제이쿼리 코드 많이 보셨죠? this는 클릭한 div가 됩니다. 왜 그렇냐고요?
//내부적으로 function을 호출할 때 그렇게 this를 바꿔버렸습니다. 이런 건 어쩔 수 없이 외워야 합니다.

//예외3)
$('div').on('click', function () {
    console.log(this); // <div>
    function inner() {
        console.log('inner', this); // inner Window
    }
    inner();
});
//방금 전 클릭 이벤트에서 제이쿼리가 내부적으로 this를 바꿔버린다고 했습니다. 
//근데 inner 함수 호출 시에는 this가 window입니다.
//inner는 죄가 없습니다. 함수의 this는 기본적으로 window라는 원칙을 충실히 따른 것이죠. 
//그저 click 이벤트 리스너가 잘못한 겁니다
//(잘못했다기 보다는 내부적으로 this를 바꿨음에도 명시적으로 알리지 않은 것).

//위의 문제를 해결하기 위해서는
//1) this를 that이라는 변수에 저장하든지
$('div').on('click', function () {
    console.log(this); // <div>
    var that = this;
    function inner() {
        console.log('inner', that); // inner <div>
    }
    inner();
});
//2) ES6 화살표 함수를 씁니다. 
//   ES6 화살표 함수는 this로 window 대신 상위 함수의 this를 가져옵니다(여기서는 <div>)
$('div').on('click', function () {
    console.log(this); // <div>
    const inner = () => {
        console.log('inner', this); // inner <div>
    }
    inner();
});

//this에 대한 정리!!
//1) this는 기본적으로 window이지만, 
//2) 객체 메서드, bind call apply, new일 때 this가 바뀝니다. 
//3) 그리고 이벤트리스너나 기타 라이브러리처럼 this를 내부적으로 바꿀 수도 있으니 
//   항상 this를 확인해보셔야 하고요. 
//4) 여러분이 선언한 function의 this는 항상 window라는 것 알아두세요.


// //this 키워드 *********** 
// //일반적으로 this는 객체의 프로퍼티인 함수에서 의미가 있다.
// //** 메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 된다.**
// //아래의 예를 보자
// const o = {
//     name : 'wallace',
//     speak(){return `My name is ${this.name}!`;},
// }
// //o.speak()를 호출하면 this는 객체o에 묶인다.
// console.log(o.speak()); //My name is wallace!
// const speak = o.speak;
// console.log(speak === o.speak); //true 두변수는 같은 함수를 가르킨다.
// console.log(speak()); //My name is undefined!
// //위와 같이 함수를 호출하면 이 함수가 어느 객체에 묶이는지 모르기 때문에
// //this는 undefined에 묶인다.

// // 다음예제를 보자
// const v = {
//     name: 'Julie',
//     greetBackWords: function(){
//         function getReverseName(){
//             let nameBackwords = '';  
//             for(let i=this.name.length-1;i>=0;i--){ //Cannot read property 'length' of undefined
//                 nameBackwords += this.name[i]; //상위상위가 name 이기 때문에 여기서 this를 사용하면 에러발생
//             }
//             return nameBackwords;
//         }
//         return `${getReverseName()} si eman ym ,olleH`; 
//     },
// };
// console.log(v.greetBackWords()); 
// //위의 코드는 에러가 뜬다. Cannot read property 'length' of undefined

// //앞에서 나온 this를 변수self에 할당해보자
// const v = {
//     name: 'Julie',
//     greetBackwards: function() {
//         const self = this; //this -> self 로 할당하였다.. that으로도 할당 가능하다.
//         function getReverseName() {
//             let nameBackwards = '';
//             for(let i=self.name.length-1; i>=0; i--) {
//                 nameBackwards += self.name[i];
//             }
//             return nameBackwards;
//         }
//         return `${getReverseName()} si eman ym ,olleH`;
//     },
// };
//    console.log(v.greetBackwards()); //eiluJ si eman ym ,olleH
//    //this를 self로 할당해 주니 문제없이 잘작동됨을 알 수 있다.

//////////////////////////////////////////
//this에 대해서 (https://k9e4h.tistory.com/141 참조)
// javascript의 this가 해당 함수 호출 패턴에 따라 어떻게 객체를 참조(바인딩)하는지에 대한 규칙

// 1. 기본적으로 this는 전역 객체를 참조한다.
// 2. 메소드 내부의 this는 해당 메소드를 호출한 부모 객체를 참조한다.
// 3. 생성자 함수 코드 내부의 this는 새로 생성된 객체를 참조한다.(위의 예시가 그런 예이다.) @@
// 4. call()과 apply() 메소드로 함수를 호출할 때, 함수의 this는 첫 번째 인자로 넘겨받은 객체를 참조한다.
// 5. 프로토타입 객체 메소드 내부의 this도 해당 메소드를 호출한 부모 객체를 참조한다.
// 6. JavaScript의 this 키워드는 접근제어자 public 역할을 한다.

// 함수 실행에 있어서 this의 바인딩은 함수의 직접적인 호출부에 따라 달라진다. 
// 이단 호출부를 식별한 다음 4가지 규칙을 열거한 우선순위에 따라 적용한다.

// 1. new로 호출했다면 새로 생성된 객체로 바인딩된다.
// 2. call이나 apply 또는 bind로 호출됐다면 주어진 객체로 바인딩된다.
// 3. 호출의 주체인 콘텍스트 객체로 호출됐다면 바로 이 콘텍스트 객체로 바인딩된다.
// 4. 기본 바인딩에서 엄격 모드는 undefined, 그 밖엔 전역 객체로 바인딩된다.



// // /////////////////
// // 함수의 화살표 표기법

// const f1 = function(){return "hello!";}
// //위의 것을 아래처럼 바꿀 수 있다.
// const f1 = () => "hello!";

// const f2 = function(name){return `Hello, ${name}!`;}
// //위의 것을 아래처럼 바꿀 수 있다.
// const f2 = name => `Hello, ${name}!`;

// const f3 = function(a,b){return a+b};
// //위의 것을 아래처럼 바꿀 수 있다.
// const f3 = (a,b)=>a+b;

// //화살표 함수를 위의 거꾸로 출력되는 코드를 바꿔보자
// const v = {
//     name: 'Julie',
//     greetBackWords: function(){
//         const getReverseName = () => {
//             let nameBackwards = '';
//             for(let i=this.name.length-1;i>=0;i--){ //위처럼 self 없이 그냥 this 씀.
//                 nameBackwards += this.name[i];
//             }
//             return nameBackwards; //위의 예시처럼 그냥 return만 있으면 매개변수 => 리턴 하면되지만
//         };                        //이 예시처럼 중간식이 있으면 그냥 {}안에 리턴까지 넣는다!
//         return `${getReverseName()} si eman ym ,olleH`;
//     },
// };
// console.log(v.greetBackWords()); //eiluJ si eman ym ,olleH
// // 화살표 함수 VS 일반적인 함수의 차이
// // this가 다른 변수와 마찬가지로 정적으로(lexically) 묶인다.
// // lexical은 실행기준이 아닌 코드 그대로의 환경을 기준으로 정의한 변수
// // scope 내에서 검색을 한다.


// ////////////////////////////////////////
// //***********call, apply, bind에 대해 알아보자**************
// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call 참조
// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind 
// //call 메서드의 기본형
// //function.call(thisArg, arg1, arg2, ...)
// //thisArg : 함수
// //arg1,2 : 인자

// //apply 메서드의 기본형
// //function.apply(thisArg, [argsArray])
// //thisArg : 함수(만약  non-strict mode 라면 null, undefined가 들어갈 수 있다.)
// //argsArray : 배열인자

// //bind 메서드의 기본형
// //function.bind(thisArg[, arg1[, arg2[, ...]]])
// //thisArg : 전달 받을 값
// //arg1 : 추가할 인자들
// var module = {
//     x: 42,
//     getX: function() {
//       return this.x;
//     }
//   };
//   const bruce = {x:"Bruce"};
//   console.log(module.getX.call(bruce));
//   // expected output: "Bruce" 

//   //this.x=1;
//   var unboundGetX = module.getX;
//   console.log(unboundGetX()); // 이 함수는 글로벌 스코프를 가르킨다.(this.x를 밖으로 빼서 global scope만들면됨)
//   // expected output: undefined 
//   // this.x=1 주석을 풀면 1이 출력 
//   var boundGetX = unboundGetX.bind(module);
//   console.log(boundGetX());
//   // expected output: 42


// //////////////////////////////////////////////////////////////////

// //call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 지정값으로 (Call <-> this 관계)
// //지정할 수 있다.
// const bruce = {name:"Bruce"};
// const madeline = {name:"Madeline"};
// //이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용한다.
// function greet(){
//     return `Hello, I'm ${this.name}!`;  //bruce,madeline 모두 name 프로퍼티를 가진다.
// }
// console.log(greet()); //Hello, I'm undefined!
// console.log(greet.call(bruce)); //Hello, I'm Bruce!
// console.log(greet.call(madeline)); //Hello, I'm Madeline!
// // 이처럼 함수를 호출하면서 call을 사용하고 this로 사용할 객체를 
// // 넘기면 해당 함수가 주어진 객체의 메서드인 것처럼 사용할 수 있다.
// // call의 첫번째 매개변수는 this로 사용할 값이고 매개변수가 더 있으면
// // 그 매개변수는 호출하는 함수로 전달한다.

// //아래의 예에서 call과 apply의 차이를 살펴보자**
// function update(birthYear, occupation){
//     this.birthYear = birthYear;
//     this.occupation = occupation;
// }
// update.call(bruce, 1949, 'singer')
//     console.log(bruce); //{ name: 'Bruce', birthYear: 1949, occupation: 'singer' }
//     //bruce는 이제 {name:"Bruce", birthYear: 1949, occupation: "singer"} 이다.

// update.call(madeline, 1942, 'actress')
//     console.log(madeline); //{ name: 'madeline', birthYear: 1942, occupation: 'actress' }
//     //madeline 이제 {name:"madeline", birthYear: 1942, occupation: "actress"} 이다.

// // apply는 call과 비슷하다.
// // call은 일반적인 함수처럼 매개변수를 받지만, apply는 매개변수를 배열로 받는다.(아래의 예를 보자)
// update.apply(bruce,[1955,"actor"]);
//     console.log(bruce); //{ name: 'Bruce', birthYear: 1955, occupation: 'actor' }

// update.apply(madeline,[1918,"writer"]);
//     console.log(madeline); //{ name: 'Madeline', birthYear: 1918, occupation: 'writer' }

// //apply의 배열 형식 설명에 흔히 사용되는게 배열의 최대값 최소값을 구하는 것이다. 아래의 예제를 보자
// const arr = [2,3,-5,15,7];
// console.log(Math.min.apply(null, arr)); //-5  선택한 배열중 최소값  
// console.log(Math.max.apply(null, arr)); //15  선택한 배열중 최대값
// //위에서 설명한것 처럼 not strict mode에서 null,undefined에서 두번째를 배열로 받을때 상황이다.

// //배열 역시 ES6에선 확산연산자(...)를 써서 같은 결과를 얻을 수 있다. 
// //아래의 코드를 보자
// const newBruce = [1940, "martial artist"];
// update.call(bruce, ...newBruce); //apply(bruce, newBruce)
// console.log(bruce); //{ name: 'Bruce', birthYear: 1940, occupation: 'martial artist' }
// console.log(Math.min(...arr)); //-5
// console.log(Math.max(...arr)); //15

// //** bind는 함수의 this값을 영구히 바꿀 수 있다!!!
// //** 주의할 점은 bind는 함수의 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 될 수 있다.
// //** bind로 매개변수를(updateBruce) 줄때... 그 매개변수(updateBruce)는 함수가 된다!!
// //  이제 updateBruce에서 call, array를 사용하면 bind에서 정의 안한 변수는 바꿀 수 있다.
// const updateBruce = update.bind(bruce);
// updateBruce(1904, "actor");
//     console.log(bruce); //{ name: 'Bruce', birthYear: 1904, occupation: 'actor' }
// updateBruce.call(madeline, 1274, "king");
//     console.log(bruce); //{ name: 'Bruce', birthYear: 1274, occupation: 'king' }
//     console.log(madeline); //{ name: 'Madeline', birthYear: 1918, occupation: 'writer' }
// //madeline이 변할꺼라 생각했지만 변하지 않는다. madeline은 위에꺼 그대로이다.
// //이제 updateBruce 변수에 call을 써서 어떤 변수를 넣어도 bruce 만 반영이 되는것이다!!

// //bind는 유용하지만 함수의 this가 어디에 묶이는지 정확히 파악하고 사용해야한다.
// //아래의 예제는 bruce가 태어난 해를 고정하고 직업은 자유롭게 바꾸는 업데이트 함수를 표현한것이다.
// const updateBruce1949 = update.bind(bruce, 1949);
// updateBruce1949("singer, songwriter");
//     console.log(bruce);
//     //{ name: 'Bruce',birthYear: 1949,occupation: 'singer, songwriter' }