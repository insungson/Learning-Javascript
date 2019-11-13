// //스코프에 대한 간략한 정의 (스코프체인 위로 올라가서 찾고 한거임)
// //외부에서 변수를 선언하면 내부에서는 안에서 그걸 찾고 없으면 찾을때까지 계속 위로 올라간다
// //내부에서 변수를 선언하면.. 외부에서는 그 변수를 찾을 수 없다! 
// var name = 'Son';
// function outer(){
//   console.log('외부',name);//외부 Son  (내부에 name이 없어서 위로 올라가서 찾았다)
//   function inner(){
//     var enemy = 'Nero';
//     console.log('내부',name);//내부 Son (내부에 name이 없어서 위로 올라가고. 또 올라가서 찾았다)
//   }
//   inner();
// }
// outer();
// console.log(enemy); //enemy는 함수 내부에서 선언했기 때문에 스코프(영역)문제로 
// //ReferenceError: enemy is not defined 에러가 발생한다


// //렉시컬 스코프(정적 스코프) (자바스크립트가 다이네믹하단 소리를 듣지만 스코프만은 정적이다)(이미 쓰기전부터 정해져있음)
// //*(정적이라는건.. 이미 var이든 name이든 코드를 적을때 이미 정해지기 때문에 정적이라는 것이다)
// //*(만약.. 자바스크립트가 동적스코프라면 var name = 'nero'; 일때 log()에서 nero가 찍혀야 한다)
// //name = 'zero'; 일때 내부에서 name, log()를 선언한게 아니기 때문에 외부에서 변수name을 찾아 값을 바꾸게 된다
// //외부 함수log()에서도 마찬가지로 name에 대한 선언이 없기 때문에 외부 name을 찾게 된다 이미 외부변수 name이
// //바뀌었으므로 nero가 된다 
// //var name = 'nero';로 다시 선언한다면 log() 함수에서 name 변수를 찾고 없으면 외부를 찾으므로 Son이 된다
// //(log()함수가 wrapper 내부에 없기 때문에 그런 것이다)
// //wrapper()에서 바로 console.log를 실행하면 그 내부 함수의 변수가 뜬다
// var name = 'Son';
// function log(){
//   console.log(name);
// }
// function wrapper(){
//   var name = 'nero'; //일땐 Son nero  (name 변수는 wrapper안에 갇히기 때문에 비밀변수로 사용할 수 있다)
//   //name = 'zero'; //일땐 zero zero
//   log();
//   console.log(name);//nero
// }
// wrapper();
//비밀변수는 코드를 감춘다면 내부 변수를 알 수 없기 때문에 유용하게 쓰인다


//클로저 (함수와 함수가 접근할 수 있는 스코프가 클로저 관계를 맺는다)
//(위에선 log(), wrapper()가 전역으로 접근되기 때문에 서로 클로저 관계라고 할 수 있다)
// 반복문과 비동기 함수가 만날때 클로저문제가 자주 발생한다
// for(var i = 0 ; i < 100; i++){
//   setTimeout(function(){
//     console.log(i); //여기서의 i는 렉시컬 스코프에 의해 쓰는 순간 선언한 i를 찾게된다(for문에서 선언된 i를 가르킨다)
//   }, i * 1000);     //그래서 i의 마지막 수가 setTimeout에 계속 찍히는 것이다
// }

// //클로저 문제 해결 방법
// for(var i = 0; i < 100; i++){
//   function closer(j){ //***closer(j) 에서 j 는 var j = 0; 을 선언한것과 같은 것이다
//     setTimeout(function(){  //i로 써도 var i = 0; 을 선언한것과 같기 때문에 렉시컬 스코프에 의해 
//       console.log(j); //여기의 i를 가르키는게 위의 var j = 0; 이므로.. 제대로 작동 된다!!
//     },j * 1000);      //(var j 는 렉시컬 스코프정의에 의해 closer() 안에 갇힌 변수이다!)
//   }
//   closer(i);
// }


// //정의 와 선언의 차이
// //정의는 let x;  선언은 let x =1;  이런것임.
// const x = 3;
// function f(){
//     console.log(x);
//     console.log(y); //ReferenceError: y is not defined 
// }
// {//새 스코프
//     const y = 5;
//     console.log(f());
// }
// // 위의 코드를 실행하면 에러가 발생한다.. y변수의 정의가 없기 때문이다.. 

///////////////////
//전역스코프 
// let name = "Irena"; //전역
// let age = 25; //전역

// function greet(){
//     console.log(`Hello, ${name}!`);
// }
// function getBirthYear(){
//     return new Date().getFullYear() - age;
// }
// greet();// Hello, Irena!
// console.log(getBirthYear());// 1994


//위의 코드를 단일 객체에 넣어보자
// let user = {
//     name : "Irena",
//     age : 25,
// };
// function greet(){
//     console.log(`Hello, ${user.name}!`);
// }
// function getBirthYear(){
//     return new Date().getFullYear() - user.age;
// }
// greet(); //Hello, Irena!
// console.log(getBirthYear()); //1994

 //처음 user 객체 만들때 책의 예제가 잘못되었다... 나도 처음안 사실임... 
 //구조체형 객체를 처음 생성할때는 {} 구조안에서 변수 선언시 = 으로 하면
 //Invalid shorthand property initializer 에러 발생...
 // = 이 아니라 : 로 해야한다!!!
 // =을 쓰는것은 아래와 같을때 사용
//  var john = new Object():
// john.father = "raja";  //1st way to assign using dot operator
// john["mother"] = "rani";// 2nd way to assign using brackets and key must be string
//객체 생성 후 프로퍼티를 추가할때 씀..

//위에서 var mom = "mother"; 을 사용할때
//john.mom 은 undefined가 나온다
//john[mom]으로 접근해야 "rani" 가 나온다 이유는 "mother" 자체가 mom으로 되있기 때문이다 
//mom은 "mother"만 가르키기 때문!

//위의 코드를 전역스코프에 의존하지 않게 바꿔보자
// let user = {
//     name : "Irena",
//     age : 25,
// };
// function greet(user){
//     console.log(`Hello, ${user.name}!`);
// }
// function getBirthYear(user){
//     return new Date().getFullYear() - user.age;
// }
// greet(user); //Hello, Irena!
// console.log(getBirthYear(user)); //1994


//**원시형 스코프 VS 객체 스코프의 범위에 대해 알아보자

// 아래는 원시형 스코프의 예제이다.. 원시형 데이터를 변수에 할당하면 변화x이다.
// {
//     //외부블록
//     let x = 'blue'; //문자로 된 원시형 리터럴
//     console.log(x); //blue
//     {
//         //내부블록
//         let x =3;
//         console.log(x); //3
//     }
//     console.log(x) //blue
// }
// console.log(typeof x); //undefined x 가 스코프내에 없다.

// //반면 객체형은 내부 데이터를 바꿀 수 있다. 아래의 예제를 보자
// {
//     //외부블럭
//     let x = {color:"blue"}; //객체로된 객체형
//     let y = x;  //x와 y는 같은 객체를 가르킨다.
//     let z = 3;
//     {
//         //내부블럭
//         let x = 5;
//         console.log(x); //5
//         console.log(y.color); //blue
//         y.color = "red";
//         console.log(z); //3
//     }
//     console.log(x.color); //red  객체는 내부 스코프에서 수정되었다.
//     console.log(y.color); //red  x와y는 같은 객체를 가르킨다.
//     console.log(z); //3
// }

///////////////////////////////////////
//클로저 
//http://chanlee.github.io/2013/12/10/understand-javascript-closure/
//(클로저 부분은 책이 아닌 위의 링크부분 참조)
//클로저는 외부함수(포함하고 있는)의 변수에 접근할 수 있는 내부 함수를 일컫습니다. 
//스코프 체인(scope chain)으로 표현되기도 합니다. 
//클로저는 세가지 스코프 체인을 가집니다: 
//1. 클로저 자신에 대한 접근(자신의 블럭내에 정의된 변수), 
//2. 외부 함수의 변수에 대한 접근,
//3. 전역 변수에 대한 접근. 
//이렇게 3단계로 구분할 수 있습니다

// //기본적인 클로저 예제를 보자
// function showtime(firstname, lastname){
//     var nameIntro = "your name is ";
//     //이 내부 함수는 외부함수의 변수 뿐만 아니라 파라미터까지 사용할 수 있다.
//     function makeFullName(){
//         return nameIntro + firstname + " " + lastname;
//     }
//     return makeFullName();
// }
// console.log(showtime("son","insung")); //your name is son insung


// //아래는 Jquery에서의 기본적인 사용법이다.(일단 그냥 보자)
// $(function() {
//     var selections = [];
//     $(".niners").click(function() { // 이 클로저는 selections 변수에 접근합니다.
//         selections.push(this.prop("name")); // 외부 함수의 selections 변수를 갱신함
//     });
// });

// //클로저 규칙과 부수 효과
// //**클로저는 외부함수가 리턴된 이후에도 외부함수의 변수에 접근할수 있습니다.
// function celebrityName(firstname){
//     var nameIntro = "This celebrity is ";
//     // 이 내부함수는 외부함수의 변수와 파라미터에 접근할 수 있다.
//     function lastname(lastname){
//         return nameIntro + firstname + " " + lastname;
//     }
//     return lastname;
// }
// var mjName = new celebrityName("Michael"); //여기서 celebrityName 외부함수가 리턴된다.
// //외부함수가 위에서 리턴된 후에, 클로저(lastname)가 호출된다.
// //아직, 클로저는 외부함수의 변수와 파라미터에 접근가능하다.
// //*lastname에서 ()함수만 제외하고 변수명이 mjName으로 들어가는 것이다!!! 
// //그래서 mjName(넣고싶은변수) 하면 뒤에께 출력되는 것이다.
// console.log(mjName); //[Function: lastname]
// console.log(mjName("jackson")); //This celebrity is Michael jackson
// //자바스크립트의 함수가 실행되었을때, 함수는 자신이 생성되었을때와 동일한 스코프 체인을 사용한다. 
// //그러므로, 당신은 내부 함수를 나중에 호출할 수 있다.


// //클로저는 외부 함수의 변수에 대한 참조를 저장합니다.
// //클로저는 실제 값을 저장하지 않습니다. 
// //클로저가 호출되기 전에 외부함수의 변수가 변경되었을때, 클로저는 더 흥미로워 집니다. 
// //그리고, 이 강력한 기능은 창의적인 방법으로 활용될 수 있습니다. 
// //아래의 내부(private) 변수예제는 더글라스 크락포드(Douglas Crockford)에 의해 처음 시연되었습니다:
// //자바에서 private 변수를 자바스크립트에서 구현한 것이다.
// function celebrityID(){
//     var celebrityID = 999;
//     //우리는 몇개의 내부함수를 가진 객체를 리턴할 것이다.
//     //모든 내부함수는 외부변수에 접근할 수 있다.
//     return {
//         getID : function(){
//             //이 내부함수는 갱신된 celebrityID의 현재값을 리턴한다.
//             //이것은 celebrityID함수가 값을 변경한 후에도 celebrity의 현재값을 리턴한다.
//             return celebrityID;
//         },
//         setID : function(theNewID){
//             //이 내부함수는 외부함수의 값을 언제든지 변경할 것이다.
//             celebrityID = theNewID;
//         }
//     }
// }
// var mjID = celebrityID(); //이시점에서 celebrity외부함수가 리턴된다.
// console.log(mjID.getID()); //999
// mjID.setID(567); //외부함수의 변수를 변경한다.
// console.log(mjID.getID()); //567  변경된 celebrityID를 리턴한다.
// console.log(mjID); //{ getID: [Function: getID], setID: [Function: setID] }


// // //클로저 오류피하기!! 
// // 클로저가 갱신된 외부함수의 변수에 접근함으로써, 
// // 외부 함수의 변수가 for문에 의해 변경될 경우 의도치 않은 버그가 발생할 수 있습니다.

// //클로저의 쉬운 예
// var arr = [];
// for(var i =0; i<5; i++){ //var -> let 하면 (global -> lexical)이기 때문에 잘된다.
//     arr[i] = function(){ //위의 같은 방법이 방법1이고 아래가 방법2이다.
//         return i;
//     }
// }
// console.log(arr[0]()); //5
// for(var index in arr){
//     console.log(arr[index]());
// }
// // 5
// // 5
// // 5
// // 5
// // 5
// //위와 같이 출력된다.

// //*위와 같이 5만 출력되는 이유를 알아보자
// //for 문의 i 가 var로 선언되어 최상위 global변수로 지정된다.
// //외부함수 for문을 돌리면서 내부함수를 돌리고 내부함수 i 는 global변수이기 때문에
// //for문을 다 돌린 결과인 5가 저장이 되는 것이다.

// //이걸 해결하기 위해선 2가지방법이 있다. for문의 변수를 스코프처리하여 for문의 
// //1. ES6에서 추가된 블록 스코프처리  (var -> let)
// //2. 새로운 스코프를 추가하여 반복시마다 그곳에 각각 따로 값을 저장하는 방식(IIRF방법)

// //위의 코드를 바꿔보자 (2번 방법임)
// var arr1 = [];
// for(var i=0; i<5; i++){
//     arr1[i] = (function(id){
//             return id;
//     })(i);
// }
// console.log(arr1); //[ [Function], [Function], [Function], [Function], [Function] ] 
// //arr도 그렇고 arr1도 그렇고 각 배열의 인덱스에 함수가 들어간것을 알 수 있다.
// for(var index in arr1){
//     console.log(arr1[index]());
// }
// // 0
// // 1
// // 2
// // 3
// // 4


// //다른 예제를 보자
// function celebrityIDcreator(theCelebrities){
//     var i;
//     var uniqueID = 100;
//     for(i=0; i<theCelebrities.length; i++){
//         theCelebrities[i]["id"] = function(){
//             return uniqueID + i;
//         }//(i)  //IIFE 원리이다. 전역변수가 바뀔때 마다 실행한다. (주석풀면 제대로 작동됨)
//     }
//     return theCelebrities;
// }
// var actionCelebs = [{name:"Stallone",id:0},{name:"Cruise",id:0},{name:"Willis",id:0}];
// var createIdForActionCelebs = celebrityIDcreator(actionCelebs);
// console.log(createIdForActionCelebs);
// var StalloneID = createIdForActionCelebs[0];
// console.log(StalloneID.id);
// // [ { name: 'Stallone', id: [Function] },
// //   { name: 'Cruise', id: [Function] },
// //   { name: 'Willis', id: [Function] } ]
// // [Function]
// //위의 결과는 주석 풀기전 아래는 주석 푼 후
// // [ { name: 'Stallone', id: 100 },
// //   { name: 'Cruise', id: 101 },
// //   { name: 'Willis', id: 102 } ]
// // 100

// //위의 예제에서, 익명의 내부함수가 실행될 시점에 i의 값은 3입니다
// //(배열의 크기만큼 증가한 값). 숫자 3은 uniqueID에 더해져 
// //모든 celebritiesID에 103을 할당합니다. 
// //그래서, 기대(100,101,102)와 달리 모든 리턴된 배열의 id=103이 됩니다.

// //이런 결과가 나타난 이유는, 앞서 언급했듯이 클로저는(이 예제에서 내부의 익명함수)
// // 외부 변수에 대해 값이 아닌 참조로 접근하기 때문입니다. 
// //즉, 클로저는 최종 갱신된 변수(i)에 대해서만 접근할 수 있으므로, 
// //외부 함수가 전체 for문을 실행하고 리턴한 최종 i의 값을 리턴하게 됩니다. 100+3=103.


// //이런 부작용을 고치기 위해서 “즉시 호출된 함수 표현식
// //(Immediately Invoked Function Expression. IIFE)”를 사용할 수 있습니다.
// function celebrityIDcreator(theCelebrities){
//     var i;
//     var uniqueID=100;
//     for(i=0; i<theCelebrities.length; i++){
//         theCelebrities[i]["id"] = function(j){
//             //j파라미터는 호출시 즉시 넘겨받은 (IIFE) i의 값이 된다.
//             return function(){
//                 //for문이 순환될때마다 현재i의 값을 넘겨주고, 배열에 저장한다.
//                 return uniqueID + j;
//             }()//함수의 마지막에 ()를 추가하므로써 함수를 리턴하는 대신 즉시
//                 //실행하고 그 결과값을 리턴한다.
//         }(i) //i 변수를 파라미터로 즉시 함수를 호출한다.
//     }
//     return theCelebrities;
// }
// var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
// var createIdForActionCelebs = celebrityIDcreator(actionCelebs);
// console.log(createIdForActionCelebs);
// // [ { name: 'Stallone', id: 100 },
// //   { name: 'Cruise', id: 101 },
// //   { name: 'Willis', id: 102 } ]





// //////////////////////////////////////
// //함수 스코프와 호이스팅
// //ES6에서 let을 도입하기 전에 var으로 변수선언을 했고, 이것으로 함수 스코프를 가졌다.
// //아래의 예로 let과 var의 차이를 알아보자

// x; //x is not defined  x가 정의되지 않았다.
// let x = 3;  //에러가 발생하여 여기까지 도달하지 못한다.
// console.log(x);

// // 하지만 아래의 예를 보면 var는 다른걸 알 수 있다.
// x; //undefined
// var x = 3;
// console.log(x); //3 
// // var로 선언한 변수는 위로 끌어올리는 호이스팅이 적용되기 때문에
// // 에러가 발생하지 않는다.

// //아래의 예에서 원래코드와 자바스크립트가 해석한 코드를 보면서 비교해보자
// // 책에 있는거 복사하기...


// //함수 호이스팅(클래스는 선언시 호이스팅 안됨)
// //var로 선언된 변수처럼 함수선언도 스코프 맨위로 끌어올려진다.
// f();
// function f(){
//     console.log('f'); //f 가 찍힌다.
// }

// //하지만 아래처럼 let을(var도 마찬가지) 사용하는 경우 에러가 발생한다.
// //이유는 함수는 var let과 달리 function 함수명(){} 과 같은 함수 선언식이 호이스팅되고
// //const 함수명 = ()=>{} 과 같은 함수 표현식은 호이스팅되지 않기 때문이다
// f(); //f is not defined
// let f = function(){
//     console.log('f');
// }