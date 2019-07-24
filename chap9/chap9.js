//객체와 객체지향 프로그래밍.
//배열과 객체는 비슷한게 많다. 하지만 두가지 측면의 차이가 있다.
//1. 배열은 값을 가지고 각 값에는 숫자형 인덱스가 있다.
//   객체는 프로퍼티를 가지고 각 프로퍼티에는 문자열, 심볼 인덱스가 있다.
//2. 배열은 인덱스라는 숫자가 있다.
//   객체는 순서가 보장되지 않는다. (그래서 스마트미러 remote를 불러올때 랜덤으로 불러진 것이다.)

// // /////////////
// //객체의 프로퍼티를 나열해보자
// // for in을 써서 문자열 프로퍼티, 심볼 프로퍼티를 나열해보자
// const SYM = Symbol();
// const o = {a:1, b:2, c:3, [SYM]:4};
// for(let prop in o){
//     if(!o.hasOwnProperty(prop)){continue} 
//     else{console.log(`${prop}: ${o[prop]}`)};
// }
// //hasOwnProperty()는 프로퍼티가 그 객체에 있는지 true false로 보여준다.
// //뒤에 나오지만 프로토타입으로 객체의 프로퍼티를 추가시킬때 프로토체인으로 연결되는데
// //이건 그 해당 프로퍼티가 클래스에 포함된게 아니기 때문에 false 값이 나온다.

// // a: 1
// // b: 2
// // c: 3


// ////////////////
// //Object.keys (for in 과 비교해서 보자)
// //Object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환한다. key : value로 구성되기 때문
// const SYM = Symbol();
// const o = {a:1, b:2, c:3, [SYM]:4};
// Object.keys(o).forEach(prop => console.log(`${prop} : ${o[prop]}`));
// // a : 1
// // b : 2
// // c : 3
// console.log(o); //{ a: 1, b: 2, c: 3, [Symbol()]: 4 }
// //
// //for in 과 같은 결과가 나오고 hasOwnProperty를 체크할 필요가 없다.
// //위의 코드를 조금 바꿔서 객체에서 X로 시작하는 프로퍼티를 다 가져와 보자
// const o1 = {apple:1, xochitl:2, ballon:3, guitar:4, xylophone:5,};
// Object.keys(o1)
//         .filter(prop => prop.match(/^x/))
//         .forEach(prop => console.log(`${prop} : ${o1[prop]}`));
// // xochitl : 2
// // xylophone : 5



// /////////////////////////
// //static 메소드와 프로퍼티에 대해 알아보자 (자바의 statuc 개념과 같다.)
// //https://jaeworld.github.io/2018-09-03/Javascript_static 
// //(위의 사이트를 참조하였다.)
// //static : 자바스크립트의 클래스에는 여러가지 프로퍼티가 있는데 그 중 prototype에 
// //         할당되지 않은 프로퍼티들을 static이라 한다. (static으로 지정한 메서드는 클래스를 직접 호출해야한다.)
// //static 메소드, 프로퍼티는 1급 객체인 함수로서 호출되는 값이다.
// //prototype 프로퍼티에 할당된 메소드들을 prototype method라고 한다.
// // 즉!! 클래스는 아래와 같은 요소를 가지고 있다.
// // *static methods, static properties
// // *(prototype) methods
// // 
// //두가지의 차이는 인스턴스의 접근 차이가 있다.
// //*prototype 프로퍼티의 method  <-------- _proto_ ----------> 인스턴스
// // 위와 같은 관계 이므로 인스턴스에서 접근이 가능하다.
// //*static 프로퍼티의 method  <-------------------> 접근 불가....
// // 접근이 안되기 떄문에 생성자 constructor()에서 직접 접근해야한다.
// // 
// function Person(name, age){
//     this.name = name;
//     this.age = age;
// }
// Person.getInfomations = function(instance){ //static 으로 선언
//     return{                                 //(생성자객체로 바로 접근한것은 class내에서 static쓰는것과 같다)
//         name:instance.name,
//         age:instance.age,
//     }
// }
// Person.prototype.getName = function(){ //prototype 메소드로 선언
//     return this.name;
// }
// Person.prototype.getAge = function(){ //prototype 메소드로 선언
//     return this.age;
// }
// //인스턴스를 생성하자
// var son = new Person("Son",25);
// //정보를 가져와보자
// console.log(son.getAge()); //25
// console.log(son.getName()); //Son
// //console.log(son.getInfomations()); // 에러발생 son.getInfomations is not a function
// console.log(Person.getInfomations(son)); //{ name: 'Son', age: 25 }
// //getInfomation()을 이용하기 위해선 직접 Person 클래스에 접근 후 이용해야한다.



///////////////////////////////////////////
//ES6 클래스 및 mixin 사용해보기 (다른 블로거 참고)
//https://blog.seotory.com/post/2017/08/javascript-es6-use-class-and-mixin
//(위에서 참고했다.)

// 우선 prototype프로퍼티의 methods 는 인스턴스와 __proto__2로 연결되어있다.
// 그러므로 인스턴스에서 직접 접근이 가능하다.
// 반면 static methods는 직접 접근이 불가능하다.
// 접근하기 위해서는 인스턴스가 아니라 생성자 함수에서 직접 접근해야 한다.

// //클래스의 기초문법비교(ES5 vs ES6)
// //
// //es5
// function Testclass(){
//     Testclass.prototype.print = function(){
//         console.log("TestClass instance print method");
//     }
//     Testclass.staticMethod = function(){ //static 매서드를 쓰고 싶음 생성자랑 직접 붙여서 선언한다.
//         console.log("static method");
//     }
// }
// //es6
// class TestClass {
//     print(){
//         console.log("TestClass instance print method");
//     }
//     static staticMethod(){                   //Class 내부에서는 static 을 붙여서 선언한다.
//         console.log("static method");
//     }
// }
// //test
// TestClass.staticMethod();
// var tc = new TestClass();
// tc.print();
// console.log(TestClass); //[Function: TestClass]
// //es5를 주석처리하고 찍은건데... TestClass는 자바처럼 클래스로 사용되고 있지만.. 
// //본질은 es5처럼 함수인 것이다...


// //생성자
// //es5에서는 클래스역활을 하는 함수에서 생성자 역할을 한다.
// //es6에서는 클래스 안에 constructor로 생성자를 따로 명시한다.
// //es5
// function TestClass(){
//     this.val = '값';
// }
// //es6
// class TestClass{
//     constructor(){
//         this.val = '값';
//     }
// }
// //test
// var tc = new TestClass();
// console.log(tc.val); //값   
// //둘다 쓰면 이름이 같은 함수로 에러가 발생하기에 주석처리후 실행(ES5,ES6 따로 실행)


// //기본문법과 생성자를 복합해서 사용해보자
// //es5
// function Job(name){
//     this.name = name;
// }
// Job.prototype.work = function(){
//     console.log(this.name + ` 일을 합니다.`);
// }
// //es6
// class Job{
//     constructor(name){
//         this.name = name;
//     }
//     work(){
//         console.log(this.name + ` 일을 합니다.`);
//     }
// }
// //test
// var newjob = new Job('프로그래머');
// newjob.work(); //프로그래머 일을 합니다.
// //둘다 쓰면 이름이 같은 함수로 에러가 발생하기에 주석처리후 실행


// //상속에 대해 알아보자
// //es5
// function Job(name){
//     this.name = name;
// }
// Job.prototype.work = function(){
//     console.log(this.name + ` 일을 합니다.`);
// }
// function Developer(){
//     Job.call(this, '프로그래머'); 
//     //6장 함수에서 배운 call()메서드를 써서 Job함수의 값을 바꾼다.
// }
// Developer.prototype = Object.create(Job.prototype); //Developer{}객체 생성 
// //(객체의 프로토타입에 job 추가 == 상속시킨것과 같은 효과)
// Developer.prototype.constructor = Developer; //Developer{}객체에 constuctor 프로퍼티추가(super와 같은 효과)
// Developer.prototype.coding = function(){ //Developer{}객체에 coding 프로퍼티추가
//     console.log(` 코딩을 합니다. `);
// }

// //es6 (이건 뭐... 자바랑 비슷하다.)
// class Job{
//     constructor(name){
//         this.name = name;
//     }
//     work(){
//         console.log(this.name + ` 일을 합니다.`);
//     }
// }
// class Developer extends Job{
//     constructor(){
//         super('프로그래머');
//     }
//     coding(){
//         console.log(` 코딩을 합니다.`);
//     }
// }

// //test
// var itJob = new Developer();
// itJob.work(); //프로그래머 일을 합니다.
// itJob.coding(); // 코딩을 합니다.
// console.log(itJob instanceof Developer); //true
// console.log(itJob instanceof Job); //true

// console.log(Developer.prototype);
// //@@es5의 구조이다.
// //Developer { constructor: [Function: Developer], coding: [Function] }
// //@@es6의 구조이다.(프로토타입에 저장되는게 아니다.)
// //Developer {}
// console.log(itJob);
// //Developer { name: '프로그래머' }



//클래스 mixin(다중상속 흉내내기)
//javascript는 단일 extends는 제공하지만 다중 상속은 제공하지 않는다. 
// mixin 패턴을 이용해서 다중 extends를 흉내 낼 수 있다. 
//이 방법은 MDN(Mozilla Developer Network) 사이트에 나와 있는 방법이다.
//방법은 Base클래스를 인자로 받아서 Base클래스를 extends한 클래스를 리턴받는 것이다.

// //아래의 코드를 보자(화살표방식)
// var calculatorMixin = Base => class extends Base{
//     calc(){}
// };
// var randomizerMixin = Base => class extends Base{
//     randomize(){}
// };
// //위의 코드를 알아보기 쉽게 바꿔보자(일반함수방식)
// var calculatorMixin = function(Base){
//     return class extends Base{
//         calc(){}
//     };
// }
// var randomizerMixin = function(Base){
//     return class extends Base{
//         randomize(){}
//     };
// }
// //위의 코드들은 아래와 같이 사용할 수 있다.
// class foo{}
// class Bar extends calculatorMixin(randomizerMixin(foo)){};
// //foo 가 두개의 함수를 통과하면서 extends를 통해 함수 내의 클래스들이 상속되는 것이다.
// //extends를 한번밖에 못쓰므로 이렇게 함...

// //reduce를 쓰면 좀더 보기 좋게 바꿀 수 있다.
// class MixinBuilder{
//     constructor(superclass){
//         this.superclass = superclass;
//     }
//     with(...mixins){
//         return mixins.reduce((c, mixin) => mixin(c), this.superclass);
//         //위의 코드는 이와 같다.
//         // return minxins.reduce(function(c, mixin){
//         //     return mixin(c)
//         // }, this.superclass)
//     }
// }
// let mix = (superclass) => new MixinBuilder(superclass);
// // reduce에서 본것처럼 초기값을 this.superclass로 설정하고 with에서 함수들을 다 받고 
// // 계속해서 with 의 ...으로 나열된 함수들을 차례로 인자로 집어넣어 넣는다. 
// // 예를 들면 a(),b(),c() 가있으면 b(a()),c() 그리고 c(b(a())) 이렇게 되는 것이다.
// // a(),b(),c() 는 각각 클래스라고 보면 된다.
// //
// //위에서 작성된 코드는 아래같이 사용하면 된다.
// class Foo{}
// class MyClass extends mix(Foo).with(calculatorMixin, randomizerMixin) {}

// // // ** es6 class에서는 호이스팅이 되지 않는다.
// // // ** 표현식으로도 작성이 가능하다.


// /////////////////////////
// //클래스와 인스턴스 생성 (책으로 돌아와서)
// //instanceof : 객체가 클래스의 인스턴스인지 확인해준다.
// class car{
//     constructor(){
//     }
// }
// const car1 = new car();
// console.log(car1 instanceof car); //true
// console.log(car1 instanceof Array); //false


// //좀더 복잡한 class 예제를 보자
// //make:제조사, model:차량모델, shift:변속
// class Car{
//     constructor(make, model){
//         this.make = make;
//         this.model = model;
//         this.userGears = ['P','N','R','D'];
//         this.userGear = this.userGears[0];  //초기값은 P
//     }
//     shift(gear){
//         if(this.userGears.indexOf(gear)<0){ //indexof로 요고 찾고 없으면 에러처리
//             throw new Error(`Invalid gear: ${gear}`);
//         }
//         this.userGear = gear;
//     }
// }
// //test
// const car1 = new Car("Tesla", "Model S");
// const car2 = new Car("Mazda", "3i");
// car1.shift('D');
// car2.shift('R');
// //호출
// console.log(car1.userGear); //D
// console.log(car2.userGear); //R


// //위의 코드는 car1.userGear = 'X' 라고 설정하면 값이 바뀌므로 다음과 같이 바꿔보자
// class Car{
//     constructor(name, model){
//         this.name = name;
//         this.model = model;
//         this._userGears = ['P','N','R','D'];
//         this._userGear = this._userGears[0];
//     }
//     get userGear(){return this._userGear;}
//     set userGear(value){
//         if(this._userGears.indexOf(value)<0){
//             throw new Error(`Invalid gear: ${value}`);
//         }
//         this._userGear = value
//     }
//     shift(gear){this.userGear = gear} //this.userGear(gear) 되는지 테스트해보자
// }                                    //this.userGear is not a function 이렇게 에러뜸..
// //test
// const car1 = new Car("Tesla", "Model S");
// const car2 = new Car("Mazda", "3i");
// car1.shift('D');
// car2.shift('R');
// //호출
// console.log(car1.userGear); //D
// console.log(car2.userGear); //R
// console.log(car1);
// // Car {
// //     name: 'Tesla',
// //     model: 'Model S',
// //     _userGears: [ 'P', 'N', 'R', 'D' ],
// //     _userGear: 'D' }
// //위에선 _userGear가 출력된다. 만약 이부분을 숨기고 싶다면 WeakMap() 메서드를 사용하는데 사용방법은 아래 나와있다.


// //위 처럼 바꿔도 car1._userGear = 'x' 를 하면 _userGear를 바꿀 수 있기 때문에 다시 수정해보자
// //여기서 왜 IIEF 방식을 쓰는지 이해가 안되는데... 일단 책에서 시키는데로 짜고 내가 바꿔보자
// //WeakMap을 쓰려고 IIEF 방식을 쓰는 것이다..
// const Car = (function(){
//     const carProps = new WeakMap();
//     class Car{
//         constructor(make, model){
//             this.make = make;
//             this.model = model;
//             this._userGears = ['P','N','R','D'];
//             carProps.set(this,{userGear:this._userGears[0]}); 
//             //WeakMap에서 set(a,b) a는 key값, b는 value값이다.
//         }
//         get userGear(){return carProps.get(this).userGear;}
//         //get도 같은 원리다. WeakMap에서 get(a,b) a는 key값, b는 value값이다.
//         set userGear(value){
//             if(this._userGears.indexOf(value)<0){
//                 throw new Error(`Invalid gear: ${value}`);
//             }
//             carProps.get(this).userGear = value; 
//         }
//         shift(gear){this.userGear = gear;}//이건 set userGear() 와 같다.(set userGear(value) 삭제시 에러발생)
//     }
//     return Car; //앞에서 클래스를 다 끝내고 WeakMap()을 쓰고 Car 클래스를 리턴한다.
// })(); //그래서 IIEF가 들어갔다.

// //test
// const car1 = new Car("Tesla", "Model S");
// const car2 = new Car("Mazda", "3i");
// car1.shift('D');
// car2.shift('R');
// //호출
// console.log(car1.userGear); //D
// console.log(car2.userGear); //R
// console.log(car1);
// // Car {
// //     make: 'Tesla',
// //     model: 'Model S',
// //     _userGears: [ 'P', 'N', 'R', 'D' ] }

// //WeakMap을 쓰는 이유
// //WeakMap 오브젝트에는 set(), get(), has(), delete() 메서드만 제공합니다. 
// //WeakMap 키는 enumerable이 아니기 때문에 당연히 foreach(), entries() 메서드는 사용못한다.
// //WeakMap 객체를 사용하는 이유중 하나는 객체의 private data를 저장할때나 세부적으로 실행할 어떤 것에 대해 
// //숨기기 위해 사용한다  (위의 Car 객체를 보면 기어에 대해 WeakMap()처리를 했기 때문에 숨겨진 것을 볼 수 있다.)
// //chap10에서 나오지만 WeakMap()은 기존의 Map()에서 키의 객체 o가 있다면, 자바스크립트에선 Map이 존재하는 한
// // o를 메모리에 계속 유지한다. 하지만 WeakMap에서는 그렇지 않다. 그래서 WeakMap은 enumerable이 될 수 없다.


// //프로토타입
// //클래스의 인스턴스에서 사용할수 있는 메서드 = 프로토타입 메서드
// //함수의 protorype 프로퍼티가 중요해 지는 시점은 new 키워드로 새로운 인스턴스를 만들 때.
// //new 키워드로 만든 새 객체는 생성자의 protype프로퍼티에 접근할 수 있다. 
// //객체 인스턴스는 생성자의 prototype 프로퍼티를 __proto__ 프로퍼티에 저장한다.

// //아래의 예를 보자 (위의 예에서 이어간다.)
// console.log(car1.shift === Car.prototype.shift); //true
// car1.shift('D');
// //car1.shift('d'); //에러 발생 (위에서 Error 처리한 곳에서 걸림)
// console.log(car1.userGear); //D
// console.log(car1.shift === car2.shift); //true

// car1.shift = function(gear){this.userGear = gear.toUpperCase();} //소문자 -> 대문자로 바꿈
// console.log(car1.shift === Car.prototype.shift); //false
// console.log(car1.shift === car2.shift); //false
// car1.shift('d');
// console.log(car1.userGear, typeof car1.userGear); //D String
// //String 값이 데이터타입인 것으로 봐서 return 값을 변수로 갖는 것이다.



// ////////////////
// //정적 메서드 (static 메서드)
// //정적 메서드는 특정 인스턴스에 적용되지 않는다.
// //정적 메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶인다.!! 
// //*일반적으로 정적메서드에는 this 대신 클래스 이름을 사용하는게 좋은 습관이다!!
// //아래의 예를 보자

// class Car{
//     static getNestVin(){
//         return Car.nextVin ++; //this.nextVin ++ 라고 써도 되지만,
//                                //Car를 앞에 쓰면 정적 변수라는 것을
//                                //알기 쉽다!!
//     }
//     constructor(make, model){
//         this.make = make;
//         this.model = model;
//         this.vin = Car.getNestVin(); //static 메서드이기 때문에 클래스명으로 직접 접근.
//     }                                //이제 객체 생성시 숫자가하나씩 늘음
//     static areSimilar(car1, car2){
//         return car1.make === car2.make && car1.model === car2.model;
//     }
//     static areSame(car1, car2){
//         return car1.vin === car2.vin;
//     }
// }
// Car.nextVin = 0; //초기값 설정

// const car1 = new Car("Tesla","S");
// const car2 = new Car("Mazda", "3");
// const car3 = new Car("Mazda", "3");
// console.log(car1.vin, car2.vin, car3.vin); // 0  1  2
// console.log(Car.areSimilar(car1, car2)); //false
// console.log(Car.areSimilar(car2, car3)); //true
// console.log(Car.areSame(car2, car3)); //false
// console.log(Car.areSame(car2, car2)); //true





/////////////////////////////
// //상속
// //클래스의 인스턴스는 클래스의 모든 기능을 상속받는다.
// //상속은 한단계에서 다 끝나는게 아니다.
// //객체의 프로토타입에서 메서드를 찾지 못하면 자바스크립트는 
// //조건에 맞는 프로토타입을 찾을때까지 프로토타입체인을 계속
// //거슬러 올라가고, 조건에 맞는 프로토타입이 없을 때 에러가 발생한다.
// //그래서 프로토타입 체인에서 가장 적절한 위치에 메서드를 정의해야한다.

// //아래의 예를 보자
// class Vehicle{
//     constructor(){
//         this.passengers =[];
//         console.log("Vehicle created");
//     }
//     addPassenger(p){
//         this.passengers.push(p);
//     }
// }

// class Car extends Vehicle{
//     constructor(){
//         super(); //슈퍼클래스(부모클래스)의 생성자를 호출
//         console.log("Car Created");
//     }
//     deployAirbags(){
//         console.log("BWOOSH!");
//     }
// }

// //test
// const v = new Vehicle(); //Vehicle created
// v.addPassenger("Frank");
// v.addPassenger("Judy");
// console.log(v.passengers); //[ 'Frank', 'Judy' ]

// const c = new Car(); //Vehicle created
//                      //Car Created
// c.addPassenger("Alice");
// c.addPassenger("Cameron");
// console.log(c.passengers); //[ 'Alice', 'Cameron' ]

// //v.deployAirbags(); //v.deployAirbags is not a function 에러발생!!
// c.deployAirbags(); //BWOOSH!



// //다형성(위와 이어진다.)
// //다형성은 객체지향 언어에서 여러 슈퍼클래스의 맴버인 인스턴스를 가르키는 말이다!!
// //instanceof : 자바스크립트에서 객체가 클래스의 인스턴스인지 확인하는 연산자! 사용은 아래 예시를 보자
// //(prototype과 __proto__ 프로퍼티를 수정하지 않는 한 정확한 결과가 나온다.)
// // 아래의 예를 보자
// class Motocycle extends Vehicle{}
// const m = new Motocycle()
// console.log(c instanceof Car); //true
// console.log(c instanceof Vehicle); //true
// console.log(m instanceof Car); //false
// console.log(m instanceof Motocycle); //true
// console.log(m instanceof Vehicle); //true
// //**자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스이다. (자바와 같은 개념)
// //즉! 객체 o에서  o instanceof Object는 항상 true이다!! (만약__proto__ 를건들지 않는다면...)
// //모든 객체가 Object의 인스턴스인 이유는 toString 같은 중요한 메서드를 상속하기 위함이다!!



// //////////////////////////////////
// //객체 프로퍼티 나열 다시보기!!(hasOwnProperty 의 중요성!!!!!)
// //객체 obj와 프로퍼티 x에서, obj.hasOwnProperty(x)는 obj에 프로퍼티x가 있으면 true
// //프로퍼티x가 obj에 정의되지 않았거나 프로토타입 체인(__proto__)에만 정의되었다면 false를 반환한다.

// //ES6 클래스의 설계의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인(__proto__)가 아니라 
// //인스턴스에 정의 해야한다!! 하지만 자바스크립트는 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치가 없다.
// // 그러므로 확실하게 확인하려면 항상 hasOwnProperty 를 사용하는게 좋다!!
// //아래의 예를 보자
// class Super{
//     constructor(){
//         this.name = 'Super';
//         this.isSuper = true;
//     }
// }
// Super.prototype.sneky = 'not recommanded!!';
// //이렇게 해도 되긴하지만... ES6 클래스 설계의도대로 사용하려면... 이렇게 쓰면 안된다!!! 
// //여기서는 hasOwnProperty의 기능을 보기 위해 쓴다..

// class Sub extends Super{
//     constructor(){
//         super();
//         this.name = 'Sub';
//         this.isSub = true;
//     }
// }
// //test
// const obj = new Sub();

// for(let p in obj){
//     console.log(`${p} : ${obj[p]}` + (obj.hasOwnProperty(p) ? '' : ' (inherited)'));
// }
// // name : Sub
// // isSuper : true
// // isSub : true
// // sneky : not recommanded!! (inherited)

// //위의 출력결과를 보면... name,isSuper,isSub 모두 프로토타입 체인이 아닌 인스턴스에 정의 된것을 볼 수 있다.
// //반면 sneaky 프로퍼티는 슈퍼클래스(부모클래스)의 프로토타입에 직접 정의 했다...
// //(그 값이 들어가긴 하지만 본연의 프로퍼티는 아닌 것이다.)

// Object.keys(obj).forEach(prop => console.log(`${prop} : ${obj[prop]}`));
// // name : Sub
// // isSuper : true
// // isSub : true

// //위와 같이 Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있다.
// //sneky 프로퍼티가 출력 안됨...

// console.log(obj); //Sub { name: 'Sub', isSuper: true, isSub: true }
// //결국 prototype 형태는 ES6 방식의 상속으로는 상속이 안되는것이다!! 

// //console.log(Super());
// //TypeError: Class constructor Super cannot be invoked without 'new'
// //위와 같은 에러 발생

// //////////////////////////////////////////////



// /////////////////
// //문자열의 표현
// //자바스크립트의 모든 객체는 Object를 상속하므로 Objecr 메서드는 기본적으로 모든 객체에서 사용이 가능하다!!
// //toString() 메서드 사용의 예를 보며 한번 살펴보자
// class Car{
//     toString(){
//         return `${this.make} ${this.model} ${this.vin}`;
//     }
// }



// /////////////////////////
// //다중상속, 믹스인, 인터페이스
// //자바에선 인터페이스에서 다른 클래스에서 같은 이름의 메서드가 존재하면 에러표시를 보내 사전에 막는다.(다중상속불가)
// //자바스크립트는 자바의 제한성이 없어서(자유로움..) 다중상속에 문제가 발생한다..  그래서 만들어진게 mixin 이다.
// class Vehicle{
//     constructor(){
//         this.passengers =[];
//         console.log("Vehicle created");
//     }
//     addPassenger(p){
//         this.passengers.push(p);
//     }
// }
// class Car extends Vehicle{
//     constructor(){
//         super(); //슈퍼클래스(부모클래스)의 생성자를 호출
//         console.log("Car Created");
//     }
//     deployAirbags(){
//         console.log("BWOOSH!");
//     }
// }

// class InsurancePolicy {}
// function makeInsurable(o){ //보험가입 관련 메서드 만듬..
//     o.addInsurancePolicy = function(p){this.insurancePolicy = p;} //insurance 프로퍼티에 p값 저장
//     o.getInsurancePolicy = function(){return this.insurancePolicy;} //insurance 프로퍼티 불러옴
//     o.isInsured = function(){return !!this.insurancePolicy;}
// }

// const car1 = new Car();
// makeInsurable(car1);
// car1.addInsurancePolicy(new InsurancePolicy()); //works
// console.log(car1);
// // Car {
// //     passengers: [],
// //     addInsurancePolicy: [Function],
// //     getInsurancePolicy: [Function],
// //     isInsured: [Function],
// //     insurancePolicy: InsurancePolicy {} } //
// //위와 같은 결과가 만들어진다.
// //위의 코드는 동작하지만.. 문제는 모든 자동차에서 makeinsurable을 호출해야한다.. 
// //Car의 생성자에 추가할 수 있지만.. 그렇게 하면.. 이 기능을 모든 자동차에 복사하는 형식이 된다..
// //그러니 아래와 같이 해보자!!

// makeInsurable(Car.prototype);
// const car2 = new Car();
// car2.addInsurancePolicy(new InsurancePolicy()); //works
// console.log(car2);
// //Car { passengers: [], insurancePolicy: InsurancePolicy {} }
// //위의 값이 나온 이유는 위에서 나온 prototype형태로 들어가기 떄문에 출력하면 makeInsurable의 프로퍼티가
// //안들어간 것이다. 하지만 연결은 되어 있기 때문에 사용은 할 수 있다.

// //@@(위에서 만든 다중 mixin의 reduce()메서드를 사용한것과 비슷한 원리이다.)@@
// //위의 코드는 보험클래스에서 Car 클래스와 같은 이름의 메서드가 생기면 문제가 발생한다. 그러므로 
// //@@@아래와 같이 symbol()을 사용하면 클래스의 메서드 충돌 가능성이 없어진다.@@@




// ////////////////////////////////////////
// //우선 Symbol()에 대해 알아보자 (http://hacks.mozilla.or.kr/2015/09/es6-in-depth-symbols/) 참고
// //ES5 자바스크립트의 원시적 타입은 아래의 종류가 있다.
// //1. Undefined
// //2. Null
// //3. Boolean
// //4. Number
// //5. String
// //6. Object
// //7. Symbol (ES6부터 원시적 타입이 추가되었다.)
// //ES6에서 심볼을 사용하는 방식
// //1. instanceof 의 기능을 확장시킨다.
// //  ES6에서 instanceof constructor의 구문은 생성자(constructor)의 메서드인 
// //  constructor[Symbol.hasInstance](object) 로 규정이 된다. =>이는 구문의 확장이 가능하단 뜻이다.
// //2. 새로운 기능과 예전 기능의 충돌을 제거한다.
// //  ES6 Array 메소드들이 단지 정의되어 있다는 이유로 기존 웹사이트들의 동작에 오류를 일으켰고, 
// //  다른 웹표준, 그리고 브라우저에 새로운 메소드 추가시 오류가 발생했다. 
// //  이는 동적스코핑(Dynamic scoping)때문이다. Symbol.unscopable은 동적스코핑에 관여되는걸 막아준다.
// //3. 새로운 종류의 문자열 검색을 지원한다.(Symbol.for 를 말하는것 같다.)
// //  ES5에서 str.match(myObject) 코드는 myObject를 RegExp로 변환시키려고 시도한다.
// //
// // ** 심볼에 대해서 **
// //심볼 키(key)는 충돌을 피하기 위해 만들어진 것이기 때문에, 
// //JavaScript의 일반적인 객체 조사(object-inspection) 기능들은 심볼 키(key)를 그냥 무시한다.
// //예를 들어 for-in 루프의 경우, 객체의 문자열 키(key)들만 루프의 실행 대상으로 조회한다.
// //심볼 키(key)는 건너뜁니다. Object.keys(obj)와 Object.getOwnPropertyNames(obj)도 마찬가지이다. 
// //하지만 심볼이 철저히 감춰지기만 하는 것은 아닙니다. 
// //새로운 API Object.getOwnPropertySymbols(obj)를 사용하면 객체 안에 존재하는 심볼 키(key) 목록을 
// //조회하는 것이 가능합니다. 또다른 새로운 API Reflect.ownKeys(obj)는 문자열 키(key)와 
// //심볼 키(key)를 모두 리턴합니다.
// //
// //심볼은 생성되면 변경되지 않는다. 그리고 심볼은 속성을 부여할 수 없다.
// //(만약 Strict mode에서 속성 부여시 type error 발생) 여기까진 문자열과 비슷하다.
// //반면 심볼은 고유하다! 생성하면 새로운 객체를 생성하는 것이다.
// //(ES6에서 Symbol은  Lisp나 Ruby와 비슷하다.  Lisp나 Ruby가 모든 식별자가 symbol이라면 
// //JS(자바스크립트)의 경우 대부분의 식별자들과 속성 키(key)들은 여전히 문자열이다.)
// //
// //아래의 예로 심볼에 대한 주의사항을 살펴보자
// //Symbol은 문자열로 자동변환되지 않는다.
// var sym = Symbol("<3");
// //var sym = sym.toString(); //문자열로 바꾸는 방법1
// //var sym = String(sym); //문자열로 바꾸는 방법1
// console.log(`your symbol is ${sym}`); //Cannot convert a Symbol value to a string
// console.log("your symbol is "+sym); //Cannot convert a Symbol value to a string
// //Cannot convert a Symbol value to a string 라는 에러가 뜬다.(굳이 문자열로 바꾸겠다면 위의 주석방법사용)


// //SYmbol의 예시
// let s = Symbol("test");
// console.log(s === Symbol("test")) //false
// let sf = Symbol.for("test");
// console.log(sf === Symbol.for("test")); //true

// let obj = {k1:1};
// let k2 = Symbol("k2");
// let k3 = Symbol("k3");
// obj[k2] = "value1";
// obj[k3] = "value2";
// console.log(obj); //{ k1: 1, [Symbol(k2)]: 'value1', [Symbol(k3)]: 'value2' }
// console.log(Object.keys(obj)); //[ 'k1' ]
// console.log(Object.getOwnPropertyNames(obj)); //[ 'k1' ]
// for(let ex in obj){
//     console.log(ex,obj[ex]); //k1 1
// }
// console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(k2), Symbol(k3) ]
// console.log(Object.getOwnPropertySymbols(obj)[0] === k2); //true


// //////////////////////////////
// //존나게 돌아왔다... 이제 객체 코드에 symbol을 넣어 메서드간의 충돌을 막는 코드를 보자
// class Vehicle{
//     constructor(){
//         this.passengers =[];
//         console.log("Vehicle created");
//     }
//     addPassenger(p){
//         this.passengers.push(p);
//     }
// }
// class Car extends Vehicle{
//     constructor(){
//         super(); //슈퍼클래스(부모클래스)의 생성자를 호출
//         console.log("Car Created");
//     }
//     deployAirbags(){
//         console.log("BWOOSH!");
//     }
// }//여까진 이전의 코드이다.

// class InsurancePolicy{}
// var ADD_POLICY = Symbol();
// var GET_POLICY = Symbol();
// var IS_INSURED = Symbol();
// const _POLICY = Symbol();
// function makeInsurable1(o){
//     o[ADD_POLICY] = function(p){this[_POLICY] = p;} //set 기능
//     o[GET_POLICY] = function(){return this[_POLICY];} //get 기능
//     o[IS_INSURED] = function(){return !!this[_POLICY];} //boolean 기능
// }

// const car3 = new Car();
// makeInsurable1(car3);
// console.log(car3);
// // Car {
// //     passengers: [],
// //     [Symbol()]: [Function],
// //     [Symbol()]: [Function],
// //     [Symbol()]: [Function] }
// //
// console.log(Object.getOwnPropertySymbols(car3)); //[ Symbol(), Symbol(), Symbol() ]
// car3[ADD_POLICY](2); 
// console.log(Object.getOwnPropertySymbols(car3)); //[ Symbol(), Symbol(), Symbol(), Symbol() ]
// let chan = car3[GET_POLICY]().toString();  //입력한 2를 출력하기 위한 명시적 변환
// console.log(chan); //2
// //위와 같이 Car 클래스의 키값이 symbol로 들어가기 때문에 충돌은 없다!!
// //메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY 같은 심볼을 쓰는 절충안이다.
// //입력한 값을 출력하기 위해선 String(인스턴스), .toString(인스턴스) 를 통해 명시적으로 문자열로 바꿔야한다.