// //객체 프로퍼티 설정과 프록시

// //접근자 프로퍼티 getter와 setter
// //객체 프로퍼티는
// //1. 데이터 프로퍼티
// //2. 접근자 프로퍼티
// //  1) getter 함수
// //  2) setter 함수
// //위의 구성요소로 이뤄져있다.

// const USER_EMAIL = Symbol();
// class User{
//     setEmail(value){
//         if(!/@/.test(value)) throw new Error(`invalid email : ${value}`); //@가 빠질때 에러처리
//         this[USER_EMAIL] = value;
//     }
//     getEmail(){
//         return this[USER_EMAIL];
//     }
// }
// //위의 클래스는 아래와 같이 사용한다.
// const u = new User();
// u.setEmail("john@doe.com");
// console.log(`User email : ${u.getEmail()}`); //User email : john@doe.com
// console.log(u);                              //User { [Symbol()]: 'john@doe.com' }

// //아래의 방식으로 지금까지 만들긴 했다.(이런 방식이 좀 더 자연스럽다)
// const u1 = new User();
// u1.email = "joe@doe.com";
// console.log(`User email : ${u1.email}`);     //User email : joe@doe.com
// console.log(u1);                             //User { email: 'joe@doe.com' }

// //위의 것을 클래스를 자연스럽게 바꿔보자 ()
// const USER_EMAIL1 = Symbol();
// class User1{
//     set email(value){
//         if(!/@/.test(value)) throw new Error(`invalid email : ${value}`);
//         this[USER_EMAIL1] = value;
//     }
//     get email(){
//         return this[USER_EMAIL1];
//     }
// }

// const u2 = new User1();
// u2.email="is@gmail.com";
// console.log(`User1 email : ${u2.email}`);    //User1 email : is@gmail.com
// console.log(u2);                             //User1 { [Symbol()]: 'is@gmail.com' }


// //자바의 생성자 개념을 사용하면 setter 없이 getter만 만들 수 있다.
// class Rectangle{
//     constructor(width, height){
//         this.width = width;
//         this.height = height;
//     }
//     get perimeter(){
//         return this.width*2 + this.height*2;
//     }
// }

// const nemo = new Rectangle(10,20);
// console.log(`Rectangel : ${nemo.perimeter}`); //Rectangel : 60



// //////////////////
// //객체 프로퍼티 속성
// //프로퍼티 - 키(문자열, 심볼), 값(어떤 타입이든 가능) 
// //객체 프로퍼티에 접근 시  - 점연산자, 대괄호 연산자
// //'use strict';
// const obj = {foo:"bar"};
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
// // { value: 'bar',
// //   writable: true,
// //   enumerable: true,
// //   configurable: true }
// //getOwnPropertyDescriptors는 객체의 상세한 정보를 가져온다.
// //*위의 사항을 알아보자
// //writable : 프로퍼티 값을 바꿀 수 있는지 아닌지 판단한다.
// //enumerable : for...in 문이나 Object.keys, 확산 연산자에서 객체 프로퍼티를 나열할 때 
// //              해당 프로퍼티가 포함될지 아닌지를 판단한다. (앞에서 symbol은 포함안되는것을 봤다.)
// //configurable : 프로퍼티를 객체에서 삭제하거나 속성을 수정할 수 있는지 아닌지 판단한다.

// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// //위의 링크에 Object.defineProperty에 대해 자세히 나와있다.

// //이제 Object.defineProperty로 프로퍼티의 속성을 컨트롤 해보자
// Object.defineProperty(obj, 'foo', {writable: false});
// obj.foo = 3;
// //TypeError: Cannot assign to read only property 'foo' of object '#<Object>'
// // 'use strict';  를 추가하여 스트릭 모드일 때는 위와 같은 에러가 발생하고 아닐땐
// // 3의 값이 할당되진 않지만 에러는 일어나지 않는다.

// //Object.defineProperty(obj, prop, descriptor)
// //obj  : 프로퍼티를 정의할 객체 인스턴스
// //prop : 정의하거나 수정할 이름 or 프로퍼티의 심볼 
// //descriptor : 프로퍼티를 정의하거나 수정
// //데이터 접근을 위한 옵션키들
// //configurable : true  수정할지 말지 여부
// //enumerable : true enumerable할지 말지의 여부
// //데이터 수정을 위한 옵션키들
// //value : 프로퍼티의 값 설정
// //writable : ture value 값 수정할지말지 여부
// //get : 프로퍼티 값을 가져오는 역할(자바 getter)
// //set : 프로퍼티 값을 설정하는 역할(자바 setter)

// //Object.defineProperty를 써서 새 프로퍼티를 추가할 수 있다.(obj에 color 프로퍼티를 추가해보자)
// Object.defineProperty(obj, 'color', {
//     get : function(){return this._color;},
//     set : function(value){return this._color = value;},
// });

// //Object.defineProperty로 데이터 프로퍼티를 추가할 때는 value 프로퍼티를 사용하면 된다.
// Object.defineProperty(obj, 'name', {
//     value: 'Cynthia',
//     enumerable : true, //이걸 넣어야 obj를 콘솔로 찍으면 나온다. enumerable 속성이 추가되지 않아서이다.
// });
// Object.defineProperty(obj, 'greet', {
//     value: function(){return `Hello, my name is ${this.name}!`},
//     //enumerable : true, //이걸 추가하면 obj 콘솔찍으면 나옴.
// });
// obj.color='red';
// console.log(obj);  //{ foo: 'bar', name: 'Cynthia', _color: 'red' }


// //Object.defineProperty는 배열 프로퍼티를 나열할 수 없게 만들 때 주로 사용한다.
// //*배열은 원래 프로퍼티를 사용하지 않도록 설계되었으므로 문자열이나 심볼 프로퍼티는 사용하지 않는게 좋다.
// //배열에서 for in이나 Object.keys를 사용하는 것을 권장하지 않지않지만 다른 개발자가 사용하는 걸 막을 수는 없다.
// //그래서 배열에서 숫자형 프로퍼티가 아닌 프로퍼티를 추가할 때 다른 누군가가  for in이나 Object.keys를 사용하여
// //노출되지 않게 나열할 수 없게 만들어야 한다.

// //아래의 코드를 보자(sum, avg 메서드를 추가해보자)
// const arr = [3, 1.5, 9, 2, 5.2];
// arr.sum = function(){return this.reduce((a,x)=>a+x);}
// arr.avg = function(){return this.sum()/this.length;}
// Object.defineProperty(arr, 'sum', {enumerable : false});
// Object.defineProperty(arr, 'avg', {enumerable : false});

// //아래와 같이 프로퍼티 하나를 문하나로 완결하는 방법도 있다.
// const arr = [3, 1.5, 9, 2, 5.2];
// Object.defineProperty(arr, 'sum', {
//     value : function(){return this.reduce((a,x) => a+x);},
//     enumerable : false
// });
// Object.defineProperty(arr, 'avg', {
//     value : function(){return this.sum()/this.length;},
//     enumerable : false
// });


// //* Object.defineProperties(복수형)을 이용하면 객체 프로퍼티 이름 - 프로퍼티 정의를 연결할 수있다.
// //위의 예제를 Object.defineProperties를 써서 바꿔보자
// const arr = [3, 1.5, 9, 2, 5.2];
// Object.defineProperties(arr, {
//     sum : {
//         value : function(){return this.reduce((a,x) => a+x);},
//         enumerable : false
//     },
//     avg : {
//         value : function(){return this.sum()/this.length;},
//         enumerable : false
//     }
// });



// /////////////////////////
// //객체 보호: freezing(동결), sealing(봉인), preventing extension(확장 금지)

// //객체 보호 옵션
// //동작               일반객체(object)  동결객체(freezing)  봉인객체(sealing)   확장금지객체(preventing extension)
// //프로퍼티 추가       허용됨            금지됨              금지됨              금지됨
// //프로퍼티 읽기       허용됨            허용됨              허용됨              허용됨  
// //프로퍼티 값 설정    허용됨            금지됨              허용됨              허용됨
// //프로퍼티 속성 변경  허용됨            금지됨              금지됨              허용됨
// //프로퍼티 삭제       허용됨            금지됨              금지됨              허용됨

// //1. freezing (동결)
// //객체를 동결하면 그 객체는 문자열이나 숫자처럼 불변이 된다.
// //(객체를 동결하면 상태를 바꾸는 메서드가 모두 쓸모없어지므로 데이터만 들어있는 객체에서 가장 유용하다.)
// //freezing일때 아래의 작업이 안된다
// //  1)프로퍼티 값 수정 및 할당
// //  2)프로퍼티 값을 수정하는 메서드 호출
// //  3)setter 호출
// //  4)새 프로퍼티 추가
// //  5)새 메서드 추가
// //  6)기존 프로퍼티나 메서드의 설정 변경

// //예를보자(회사,버전, 빌ㄷID, 저작권정보 등 앞으로 바뀔일이 없는 프로그램 정보를 객체에 보관한다고 생각하자)
// 'use strict';
// const appInfo = {
//     conmpany : 'White knight Software, Inc.',
//     version : '1.3.5',
//     buildID  : '0a995448-ead4-4a8b-b050-9c9083279ea2',
//     //이 함수는 getter이므로 동결한 상태에서도 계속 작동한다.
//     copyright(){
//         return `© ${new Date().getFullYear()}, ${this.conmpany}`;
//     },
// };
// Object.freeze(appInfo); //Object freezing
// console.log(Object.isFrozen(appInfo));  //true

// appInfo.newProp = 'test'; //프로퍼티 추가 시 에러발생
// //TypeError: Cannot add property newProp, object is not extensible
// delete appInfo.conmpany; //프로퍼티 삭제 시 에러발생
// //TypeError: Cannot delete property 'conmpany' of #<Object>
// appInfo.conmpany = "test"; //프로퍼티 값 변경 시 에러발생
// //TypeError: Cannot assign to read only property 'conmpany' of object '#<Object>'
// Object.defineProperty(appInfo, 'company', {enumerable:false}); //프로퍼티 속성 재 정의시 에러발생
// //TypeError: Cannot define property company, object is not extensible



// //2. sealing(봉인)
// //새 프로퍼티를 추가하거나 기존 프로퍼티를 변경, 삭제할 수 없다.
// //클래스의 인스턴스를 수정하는 메서드 사용가능하다.
// 'use strict';
// class Logger{
//     constructor(name){
//         this.name = name;
//         this.log = [];
//     }
//     add(entry){
//         this.log.push({
//             log : entry,
//             timetamp : Date.now(),
//         });
//     }
// }
// const log = new Logger("Captain's Log");
// Object.seal(log);       //seal 처리함.
// console.log(Object.isSealed(log));      //true

// console.log(log);   //Logger { name: 'Captain\'s Log', log: [] }
// log.name = "Captain's Boring Log";
// log.add("Another boring dat at sea...");    //인스턴스를 수정하기 위한 메서드 사용
// console.log(log);
// // Logger {
// //     name: 'Captain\'s Boring Log',
// //     log:
// //      [ { log: 'Another boring dat at sea...', timetamp: 1556804850004 } ] }

// log.newProp = 'test';       //인스턴스에 프로퍼티 추가 에러발생
// //TypeError: Cannot add property newProp, object is not extensible
// log.name = 'test';      //프로퍼티 값변경 됨.
// console.log(log);
// delete log.name;        //프로퍼티 삭제  에러발생
// //TypeError: Cannot delete property 'name' of #<Logger>
// Object.defineProperty(log, 'log', {enumerable : false}); //프로퍼티 속성 변경 시도시 에러발생
// //TypeError: Cannot redefine property: log



// //3. preventing extension(확장 금지)
// //preventing extension 사용은 객채에 새 프로퍼티를 추가하는것만 금지된다.
// // 프로퍼티에 값을 할당하거나, 삭제하거나, 속성을 변경하는 작업은 모두 허용됨.
// 'use strict';
// class Logger{
//     constructor(name){
//         this.name = name;
//         this.log = [];
//     }
//     add(entry){
//         this.log.push({
//             log : entry,
//             timetamp : Date.now(),
//         });
//     }
// }
// const log2 = new Logger("First Mate's Log");
// Object.preventExtensions(log2); //log2  preventExtensions 처리함.
// console.log(Object.isExtensible(log2));     //false

// console.log(log2);
// log2.name = "First Mate's Boring Log";  //프로퍼티 값 변경
// log2.add("Another Boring Day at sea..."); //메서드를 통해 프로퍼티 값 변경
// console.log(log2);

// //log2.newProp = 'test';  //새 프로퍼티 추가시 에러 발생
// //TypeError: Cannot add property newProp, object is not extensible

// log2.name = 'test';     //인스턴스 프로퍼티 값 변경
// console.log(log2);      
// delete log2.name;       //인스턴스 프로퍼티 삭제
// console.log(log2);
// Object.defineProperty(log2, 'log', {enumerable : false});   //객체 프로퍼티 속성 변경
// console.log(log2);



// ////////////////////////////////////
// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
// //프록시(집에 와서 하기)
// //프록시는 ES6부터 추가된 메타프로그래밍 기능이다. (메타프로그래밍은 자기 자신을 수정하는 것을 말한다.)
// //객체 프록시는 간단히 말해 객체에 대한 작업을 가로채고, 필요하다면 작업 자체를 수정하는 기능이다.
// //예를 보자
// const coefficients = {
//     a : 1,
//     b : 2,
//     c : 5,
// };
// function evaluate(x, co){
//     return co.a + co.b * x + co.c * Math.pow(x,2);
// }

// const coefficients1 = {
//     a : 1,
//     c : 3,
// }
// console.log(evaluate(5, coefficients1));    //NaN
// //coefficients1 는 b라는 프로퍼티가 없다. 그래서 NaN 값이 나오는 것이다
// //coefficients1 에 b 프로퍼티를 할당하는 것도 방법이긴 하지만 프록시를 쓰는 방법이 더 낫다.
// //프록시는 객체를 대상으로 한 작업을 가로채므로, 정의되지 않은 프로퍼티는 항상0을 반환하게 만들 수 있다.
// const betterCoefficients = new Proxy(coefficients1, {
//     get(target, key){
//         return target[key] || 0;
//     },
// });
// //proxy 생성자에 넘기는 첫 번째 매개변수는 타겟, 즉 프락시할 객체이다.
// //두번째 매개변수는 가로챌 동작을 가르키는 핸들러이다.
// //(프로퍼티 접근자 get과는 다르다. 이 핸들러는 일반적인 프로퍼티, 접근자 프로퍼티 모두 동작한다.)
// //get함수는 매개변수로 타겟,프로퍼티 키(문자열 또는 심볼),수신자(프락시 자체 또는 프락시에서 파생되는것)를 받는다.
// console.log(betterCoefficients.a);          //1
// console.log(betterCoefficients.b);          //0
// console.log(betterCoefficients.c);          //3
// console.log(betterCoefficients.d);          //0
// console.log(betterCoefficients.anything);   //0
// console.log(betterCoefficients);            //{ a: 1, c: 3 }
// //coefficients1 객체의 프록시에는 무한한 프로퍼티가 있고, 직접 정의한 프로퍼티를 제외하면 모두 값이
// // 0이나 다름없으므로 위의 결과가 나오는 것이다.

// //이제 키로 소문자 한글자를 받았을 때만 프록시가 동작하게 만들어보자
// const betterCoefficients1 = new Proxy(coefficients1, {
//     get(target, key){
//         if(!/^[a-z]$/.test(key)) return target[key];
//         return target[key] || 0;
//     },
// });
// console.log(betterCoefficients1.a);          //1
// console.log(betterCoefficients1.b);          //0
// console.log(betterCoefficients1.c);          //3
// console.log(betterCoefficients1.d);          //0
// console.log(betterCoefficients1.anything);   //undefined


// //마찬가지로 프로퍼티에 값을 할당할 때 set핸들러로 가로챌 수 있다.
// //객체에 위험한 프로퍼티가 있어서 한단계를 거치지 않으면 값을 할당하거나
// //매서드를 호출할 수 없게 하려고 한다.  이때 거쳐야할 단계는 allowDangerousOperations setter 이다.
// //값이 true일 떄만 위험한 프로퍼티에 접근할 수 있다.
// const cook = {
//     name : "Walt",
//     redPhosphorus : 100,  //위험하다.
//     water : 500,          //안전하다.
// };
// const protectedCook = new Proxy(cook, {
//     set(target, key, value){
//         if(key === 'redPhosphorus'){
//             if(target.allowDangerousOperations){
//                 return target.redPhosphorus = value;
//             }else{
//                 return console.log("Too dangerous!");
//             }
//             //다른 프로퍼티들은 모두 안전하다.
//         }
//     },
// });

// console.log(protectedCook.water = 550); //550
// console.log(protectedCook.redPhosphorus = 150);
// // Too dangerous!
// // 150

// console.log(protectedCook.allowDangerousOperations = true); //true
// console.log(protectedCook.redPhosphorus = 150);
// //Too dangerous!
// //150

// //set을 핸들러로 쓸때 프로퍼티의 값을 설정하게 되면 자동으로 그 값을 리턴한다.




// //set의 다른 이용법이다.
// const cook = {
//     name : "Walt",
//     redPhosphorus : 100,  //위험하다.
//     water : 500,          //안전하다.
// };

// var p = new Proxy(cook, {
//   set: function(target, prop, value) {
//     target[prop] = value;    
//     console.log('property set: ' + prop + ' = ' + value);
//     return true;
//   }
// })

// console.log('a' in p);  // false

// p.a = 10;               // "property set: a = 10"
// console.log('a' in p);  // true
// console.log(p.a);       // 10
// console.log(cook);
// p.water = 777;
// console.log(cook);

// // false
// // property set: a = 10
// // true
// // 10
// // { name: 'Walt', redPhosphorus: 100, water: 500, a: 10 }
// // property set: water = 777
// // { name: 'Walt', redPhosphorus: 100, water: 777, a: 10 }
