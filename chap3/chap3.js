let val; //이렇게만 하면 콘솔 결과값은 undefined 가 뜬다.
console.log(val);
let targetC, room1 = "conference room1", room2 = "lobby"; 
//위에 처럼 한번에 선언하는게 가능하다.
console.log(targetC,room1,room2);

//변수는 let 초기값 설정안하면 undefined 이고 값을 언제든지 바꿀 수 있다.
//상수는 const 한번 값을 할당하면 값을 바꿀 수 없다.

const room_num = 1; // 더 변경할 수 없는 고정값 (왠만하면 변수보단 상수를 사용해야한다.)
console.log(room_num); //이유는 바뀌는 값보단 고정된 값이 제어하기 편하고, 에러를 방지할 수 있기 때문..
// room_num = room1;//값을 바꾸려고 하면 에러발생 (에러발생으로 주석처리함...)
// console.log(room_num);

//리터럴: 1과 같이 변하지 않는 데이터(boolean, char, double, long, int, etc...)를 리터럴(literal)이라고 부른다.
//식별자="리터럴"   따옴표로 리터럴과 식별자 구분한다.
//var a =1; 
//const a = 1;  a는 상수 1은 리터럴 {} 를 사용해서 다른 수를 가져오는게 리터럴이다.
//이스케이프 : \ 는 다른 문자 앞에 붙여 넣으면 이스케이프 처리되어서 문자열로 인식이 된다. ""쓸때 사용
const message = `hello world! ${room_num}`;  //저렇게 하면 앞의 변수를 받을 수 있다. `` 백틱은 문자열 선언
console.log(message); //hello world! 1  출력됨

const result = 3 + '30';    //330   + 연산은 숫자 -> 문자
const result1 = 3*'30';     //90    * 연산은 문자 -> 숫자
console.log(result,result1);

//심볼은 symbol() 메서드를 통해서 생성되는데 생성될때마다 유일하고 객체와 비슷하다. 
//new 같은 생성자를 붙이지 않아도 생성가능하다.
const RED = Symbol("The color of a sunset!");
const ORANGE = Symbol("The color of a sunset!");
console.log(RED === ORANGE); //false 출력
console.log('RED : ',RED);
//RED :  Symbol(The color of a sunset!) 출력


//null은 프로그래머에게 허용된 데이터 타입이다.
//undefined는 자바스크립트 자체에서 사용한다고 기억하자
// 공통점은 모두 존재하지 않는 것을 나타낸다는 점이고 다른점은
//null 은 프로그래머에게 허용된 데이터 타입이며 undefined는 JS 자체에서 사용한다
let currentTemp;     //암시적으로 undefined이다.
const targetTemp = null; //대상온도는 null, 즉 "아직 모르는" 값입니다.
currentTemp = 19.5;      //currentTemp에는 이제 값이 있다.
currentTemp = undefined  //currentTemp는 초기화되지 않은 듯하다.. 권장하지 않는 방법이다.


console.log("////////////////////////////")
//객체와 프로퍼티
const sam1 = { 1 : "1ilsang", b : "blog" }
const sam2 = {
  1 : "1ilsang",
  b : "blog"
}
console.log(sam1 === sam2); //false
const a = 1;
const b = 1;
console.log(a === b); //true
// 위의 코드에서 sam1,sam2의 프로퍼티는 같은 값을 가지고 있지만 서로 다른 객체이다,
//하지만 a,b는 1이라는 같은 원시값을 가르키게 된다 그래서 같다.

const sam3 = {
    classification : {
      a : 'hi',
      b : '1ilsang'
    }
  }
//1ilsang에 접근하는 4가지 방법은 아래와 같다.
sam3.classification.b;
sam3["classification"].b;
sam3.classification["b"];
sam3["classification"]["b"];
//객체에 함수를 담을 수 있다.
sam3.speak = function(){return "Moew!"};
console.log(sam3.speak()); //Moew!
// delete sam3.speak;
// console.log(sam3.speak()); //위의 delete에서 삭제했기 때문에 sam3.speak is not a function 에러발생


//객체의 이해(일반 객체와 원시타입(문자열,숫자)의 변수는 다르다)
const s = "hello";
console.log(s.toUpperCase()); //HELLO 출력됨
s.rating = 3; //에러가 없다... 성공일까?  (문자열 -> 프로퍼티에 숫자대입)
console.log(s.rating); //undefined 가 나옴..... 
//일시적인 String 객체에 프로퍼티를 할당한것.
const see = 3;
see.rating = "son"; //에러가 없다... 성공일까? (숫자 -> 프로퍼티에 문자 대입)
console.log(see.rating); //undefined 가 나옴.....
see.rating = 4;
console.log(see.rating); //undefined 나옴.. (숫자 -> 프로퍼티에 숫자 대입)
console.log(see.rating=6);//이렇게 하면 6이 나옴...
// 맨위에서 s는 함수 프로퍼티를 가진것 처럼 보이지만 s가 원시 문자열 타입이다.. 
// 자바스크립트는 일시적으로 String 객체를 만든것이다... 이 임시 객체에는 
// toUpperCase 함수가 들어있다. 자바스크립트는 함수를 호출하는 즉시 임시객체를 파괴한다.

//날짜보기
const now = new Date();
console.log(now); //날짜 나옴..
const ts = now.valueOf();
console.log(ts); // 1970/1/1 부터 몇 밀리초가 지났는지 나타내는 숫자

//데이터 타입의 변환
const numStr = "33.3"; //String 타입
const num = Number(numStr);//number 타입
//parseInt, parseFloat 함수로 데이터 변환 가능하다.
const first = parseInt("16 volts", 10); //16만 10진수 숫자로 바꿔준다.
const second = parseInt("3a", 16);   //16진수 3a를 10진수로 바꾼다.
const third = parseFloat("15.5 kph");
console.log(typeof first, typeof second, typeof third); //number number number
console.log(first, second, third); // 16 58 15.5

const n = 33.5;
const s1 = n.toString(); //String 으로 형 변환 함.
console.log(typeof s1);

// 번외!!
// argument 와 parameter 의 차이
// argument : 함수를 호출할 때 인자로 넣어주는 값
// parameter : 호출받은 함수가 요소로 받는 값
function sumOf(x,y) {
	var total=0;
	for(var i=0; i<arguments.length;i++) {
		total+=arguments[i];
	}
	return total;
}    
console.log(sumOf(1)); // 결과 : 1
console.log(sumOf(1,2));// 결과 : 3
console.log(sumOf(1,2,3));// 결과 :6
console.log(sumOf(1,2,3,4,5));// 결과 :15

//@@@arguments에 대해 알아보자@@!!!
//함수에는 arguments라는 변수에 담긴 숨겨진 유사 배열이 있다. 이 배열에는 함수를 호출할 때 입력한 인자가 담겨있다
//arguments는 사실 배열은 아니다. 실제로는 arguments 객체의 인스턴스다.
function example() {
    console.log(arguments);
}
example(1, 'string', true); // [1, 'string', true]
//함수에 들어온 인자를 배열 형식으로(배열은 아닙니다. 유사 배열이라고 부릅니다.) 리턴하기 때문에 
//[] 배열안에 들어온 것이다.
//
function example2() {
    console.log(arguments.join());
}
example2(1, 'string', true); // Uncaught TypeError: arguments.join is not a function
//arguments는 모양만 배열이지 실제 배열이 아니라서 배열의 메소드를 쓰면 에러가 발생합니다. 
//이 때 바로 call이나 apply가 효력을 발휘합니다.
//
function example3() {
    console.log(Array.prototype.join.call(arguments));
}
example3(1, 'string', true); // '1,string,true'
//배열의 프로토타입에 있는 join 함수를 빌려 쓰는겁니다. 
//this는 arguments를 가리키게 하고요. 
//join 외에도 slice, concat 등등 모든 메소드를 이 방식으로 사용할 수 있습니다.




//자바스크립트의 유연함이 보인다.
//함수에서 선언하지 않은 파라메터까지도 모두 받아서 연산이 가능하다..
//arguments.callee() 메서드는 자기 자신을 참조해서 재귀호출을 구현할 수 있다.
function factorial(x) {
	if(x<=1) {
		return 1;
	}
	else {
		return x*arguments.callee(x-1);
	}
}
console.log(factorial(5));// 결과값 120 나옴.. 이유는 1*2*3*4*5 이기 때문이다.

// //익명함수
// var v = function(x,y) { return x+y; };
// // 함수를 정의하고 변수에 저장
// var o;
// o.func(function(x,y){ return x+y; });
// // 함수를 정의하고 그 함수의 주소값을 바로 인자에 전달
// var added = (function(x,y) {return x+y;})(1,2);
// // 함수를 정의하고 바로 실행


//변수 Scope
//자바스크립트는 함수단위로 변수를 관리한다.
var scopeex = 1;
function f(){
    if(true){
        var scopeex1 = 2; //if 블럭안에서 변수 선언
    }
    return scopeex1; // if 블럭 밖에서 C 값을 참조해 리턴함.
}
console.log(f()); //2 출력
//if 블럭 안에서 정의된 변수도 함수내에서는 얼마든지 참조가능하다.

function z(){
    g = "global"; //var없이 변수명에 값을 넣으면 전역변수로 자동선언됨!!
}
z();
console.log(g);//global이 뜬다!!! 
//var을 제외하고 변수 선언을 하면 전역변수처리되어 어디서든 참조가 가능하게 된다.
//자바스크립트만의 유연함이다. 그러므로 var를 선언하여 scope를 명확하게 해주는게 좋다.


//렉시컬(lexical)의 특성
//-> 자바스크립트는 실행기준이 아니라 코드그대로의 환경을 기준으로 정의한 변수 스코프내에서 검색을 한다.
var x1 = "global";
function f1(){
    console.log(x1); //undefined가 뜬다...
    var x1 = "local";
    console.log(x1); // local이 뜬다.
}

console.log(f1()); // undefined 리턴값이 없어서 그런것이다.


// 객체를 생성하는 함수
//선언한 함수 내의 this는 새로 생성된 객체를 가르킨다.
/*
function Person(name,age){
    this.name = name;
    this.age = age;
    this.IncreaseAge = function(i){this.age = this.age + 1}
}
var newObject = new Person("jack", 30);
console.log(newObject); //Person { name: 'jack', age: 30, IncreaseAge: [Function] }
*/

//맴버관리구조와 prototype
function Person(name){
    var firstname = "홍";
    this.name = name;
    this.speak = function(){console.log(firstname + this.name)}
    this.getfirstname = function(){return firstname} //함수로 return값 설정->firstname 호출가능
    this.setfirstname = function(x){
        firstname = x; 
        return firstname;
     }
}
console.log(Person.firstname); //undefined 뜸.. 접근할 수 없다.

var p1 = new Person("길동"); //객체생성
console.log(p1); //Person { name: '길동', speak: [Function] } 
Person.prototype.tellme = function(){console.log('zzz')}; //Person 객체에 메서드 추가
p1.tellme(); //zzz 뜸... 객체 프로토타입으로 변경가능.
console.log(p1);//Person { name: '길동', speak: [Function] } tellme를 추가해도 안뜸.. 
delete p1.name;
console.log(p1); //Person { speak: [Function] }   delete로 객체맴버인 name을 지움...
console.log(p1.getfirstname()); // 홍  이뜸.. return 값을 설정하면 뜸..
console.log(p1.setfirstname("손")) //손  바뀜..


//클로저를 통한 접근
function outer(){
    var _x = 0;
    function _privateA(){
        return ++_x;
    }
    function _privateB(){
        return _x += 2;
    }
    return {publicA : _privateA, publicB : _privateB} //객체를 리턴
}
var o11 = outer(); //새로운 인스턴스 생성
console.log(o11.publicA()); //1 1씩 증가시킴
console.log(o11.publicB()); //3 2씩 증가시킴


//프로토타입 체인!!
//인스턴스는 내부에 자신의 프로토타입 객체를 가르키는 숨겨진맴버 _proto_를 가진다.
//이 맴버를 이용해서 프로토타입 체인이 구성된다.
//모든 객체의 최상의 부모는 Object다. 자바스크립트의 상속은 프로토타입 기반의 상속이다.
//예를 들어 
//A라는 생성자(function()으로 만든 객체나 {}로 만든 객체)로 인스턴스를 생성하면 
//맴버를 찾을 경우 먼저 생성자에서 찾을 것이고, 못찾으면 A.prototype으로 가고,
//여기 없으면 A.prototype == New Object이므로 더 상위 Object로 가고 
//그 다음 Object.prototype에서 찾는다.
//Person.prototype = new Korean();
//위의 방식으로 자바스크립트에서도 상속이 가능하다.

//프로토타입은 new로 객체를 여러개 생성할때 속성값을 한방에 추가하거나 바꿔줄 수 있다

function Person1(name){this.name = name}; //사람 객체 선언
function Korean(age){this.age = age}; //한국인 객체 선언

Person1.prototype.species = "Human"; //이렇게하면 Person원형에 species 변수가 추가된다.
Korean.prototype.nationality = "Korea"; //Korean원형에 nationality 변수 추가

var kildong = new Person1("kil-dong"); //길동이라는 사람객체 생성
console.log(kildong.species); //Human이 뜸.
Person1.prototype.speak = function(){console.log(this.name + "입니다.");};///////////////////////////비교1
kildong.speak(); //kildong입니다. 뜸.. 위에서 바꾼게 바로 적용이 된다.

var boy = new Korean(29); //소년이라는 한국인 객체 생성
console.log(boy.age); //29 뜸
console.log(boy.nationality); //korea 뜸

Korean.prototype = new Person1(); // Korean원형의 prototype(_proto_)에 상속///////////////////////////비교1
console.log(boy.species); // undefined  이뜸... 즉! 상속받기 전에 생성한 객체에는 적용이 안됨.

var newboy = new Korean(18); //그래서 다시 새로운 소년이라는 한국인 객체 생성
console.log(newboy.species); //Human 으로 잘 뜸! 
console.log(newboy.nationality); //undefined 뜸...기존의 nationality는 날라갔다... korea안뜸..

// 위의 데이터구조는 이렇게 되어있다.. (기존의 nationality는 Person1로 대체됨.)
// **데이터값을 찾을 때 Person1안의 name 단계에서 찾고 없으면 __proto__를 찾고 없으면 그 밑의 단계로 들어간다
// 그래도 값이 없을때 undefined가 뜬다
// Korean.prototype
// 	▶Person1
// 		▶name: undefined
// 		▶__proto__: Person1
// 			▶constructor: function Person1(name){ this.name = name }
// 			▶speak: function (){ console.log(this.name + "입니다."); }
// 			▶species: "Human"
// 			▶__proto__: Object




//네임스페이스 구현

var People = People || {}; //루트 객체 생성

People.createNamespace = 
	function(namespace) {
		var parts = namespace.split('.');
		var current = this;

		for (var i in parts) {
			if(!current[parts[i]]) { //A.a 는 A[a]로 표현할 수 있다!!
				current[parts[i]] = {}; //없으면 네임스페이스(=객체) 생성
			}
			current = current[parts[i]];
		}
};
People.createNamespace("People.Korea.Seoul");
console.log(People); 
//{ createNamespace: [Function],
//People: { Korea: { Seoul: {} } } }