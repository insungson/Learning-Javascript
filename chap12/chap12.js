//https://poiemaweb.com/es6-iteration-for-of
// 이터레이터를 좀더 자세히 알수 있다

// ES6에서 제공하는 빌트인 이터레이터@@@@@@@@@@
// Array, String, Map, Set, 
// TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, 
//     Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array),
// DOM data structure(NodeList, HTMLCollection), Arguments

//이터레이터와 제너레이터
//이터레이터는 '지금 어디있는지' 파악할 수 있도록 돕는다는 면에서 일종의 책갈피 개념이다.
//배열이 이터러블(iterable)객체의 좋은 예이다. 
//책에 여러 페이지가 있는것처럼 배열에는 여러 요소가 들어있으므로,
//책에 책갈피를 끼울수 있듯 배열에는 이터레이터를 사용할 수 있다.

//책과 책갈피를 예제에 넣어 이터레이터를 알아보자
//book 이란 배열이 있고, 이 배열의 각 요소는 책의 문자열이다.
////////////////////////////////////////////////////////////////
//require('core-js/features/array/values');
//책에서 나온것과 달리 values.js는 다른 폴더에 들어가 있다.. 
//위와 같이 바꾸면 실행된다.
///////////////////////////////////////////////////////////////
// const book = [
//     "Twinkle, twinkle, little bat!",
//     "How I wonder what you're at!",
//     "Up above the world you fly,",
//     "Like a tea tray in the sky.",
//     "Twinkle, twinkle, little bat!",
//     "How I wonder what you're at!",
//    ];
// //book 배열에 values() 메서드를 써서 이터레이터를 만들 수 있다.
// const it = book.values();
// console.log(it); //{}
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// // { value: 'Twinkle, twinkle, little bat!', done: false }
// // { value: 'How I wonder what you\'re at!', done: false }
// // { value: 'Up above the world you fly,', done: false }
// // { value: 'Like a tea tray in the sky.', done: false }
// // { value: 'Twinkle, twinkle, little bat!', done: false }
// // { value: 'How I wonder what you\'re at!', done: false }
// // { value: undefined, done: true }
// // { value: undefined, done: true }


// //이터레이터는 value 와 done(value값이 없으면 true값) 프로퍼티가 있다. 
// //value가 undefined가 되어도 next는 계속 호출할 수 있다.
// //이터레이터는 for of 루프를 사용할 수 있다. for of 대신 while을 써서 나타내보자
// //아래의 예를 보자
// const book = [
//     "Twinkle, twinkle, little bat!",
//     "How I wonder what you're at!",
//     "Up above the world you fly,",
//     "Like a tea tray in the sky.",
//     "Twinkle, twinkle, little bat!",
//     "How I wonder what you're at!",
//    ];
// const it = book.values();
// let current = it.next();
// while(!current.done){
//     console.log(current.value);
//     current = it.next();
// }
// // Twinkle, twinkle, little bat!
// // How I wonder what you're at!
// // Up above the world you fly,
// // Like a tea tray in the sky.
// // Twinkle, twinkle, little bat!
// // How I wonder what you're at!

// //또한 이터레이터는 독립적이다. 즉! 새로운 이터레이터를 만들때마다 처음에서 시작한다.
// //아래의 예를 보자
// const it1 = book.values();
// const it2 = book.values();
// //어느 이터레이터도 아직 시작하지 않았다.

// //it1으로 두 페이지를 읽는다.
// console.log(it1.next()); //{ value: 'Twinkle, twinkle, little bat!', done: false }
// console.log(it1.next()); //{ value: 'How I wonder what you\'re at!', done: false }

// //it2으로 한 페이지를 읽는다.
// console.log(it2.next()); //{ value: 'Twinkle, twinkle, little bat!', done: false }

// //it1으로 한 한페이지를 읽는다.
// console.log(it1.next()); //{ value: 'Up above the world you fly,', done: false }

// //위의 예에서 보는것처럼 두 이터레이터가 서로 독립적이고 같은 배열에서 따로 움직이는걸 볼 수 있다.



//////////////////////////
// 이터레이션 프로토콜
// 이터레이터는 그 자체로 크게 쓸모있다기 보단... 더 쓸모있는 동작이 가능해지도록 한다는데 의미가 있다.
// ** 이터레이터 프로토콜은 모든 객체를 이터러블 객체로 바꿀 수 있다. !!

// iterable
// [Symbol.iterator]() //순회가능한 자료구조

// iterator// 위의 것을 정의할때 아래와 같은 구조로 한다!! 
// { next(){return{value : any, done : boolean};} }

// 위의 사항 자세한건 https://poiemaweb.com/es6-iteration-for-of 여기서 그림 가져다 쓰기


//아래의 예는 추가되는 메시지에 내적으로 타입스탬프를 붙여서 그 메시지를 배열에 저장한다.
// class Log{
//     constructor(){
//         this.messages = [];
//     }
//     add(message){
//         this.messages.push({message, timestamp : Date.now()});
//     }
// }


// //위의 예제를 iterable 하게 바꾸고 싶으면 아래와 같이 이터레이터 프로토콜을 쓴다. 
// //**이터레이터 프로토콜은 클래스에 심볼메서드 Symbol.iterator가 있고 이 메서드가 이터레이터처럼 동작하는 
// //객체 value, done 프로퍼티가 있는 객체를 리턴하는 next 메서드를 가진 객체를 리턴하면 그 클래스의 인스턴스는
// //이터러블 객체이다.
// class Log{
//     constructor(){
//         this.messages = [];
//     }
//     add(message){
//         this.messages.push({message, timestamp : Date.now()});
//     }
//     [Symbol.iterator](){ //messages 배열에서 이터레이터를 가져와 이터레이터 프로토콜 구현
//         return this.messages.values();

//         //아래처럼 직접 구현해도 된다.
//         // let i=0;
//         // const messages = this.messages;
//         // return {
//         //     next(){
//         //         if(i >= messages.length){
//         //             return {value : undefined, done : true};
//         //         }else{
//         //             return {value : messages[i++], done : false};
//         //         }
//         //     }
//         // }
//         // //위의 messages 배열을 직접 가져오는 것 말고 직접구현해도 된다.

//     }
// }

// //이제 Log 인스턴스를 배열처럼 순회할 수 있다.
// const log = new Log();
// log.add("first dat at sea");
// log.add("spotted whale");
// log.add("spotted another vessel");

// //로그를 배열처럼 순회(iterator)이 가능하다.
// for(let entry of log){
//     console.log(`${entry.message} : ${entry.timestamp}`);
// }
// // first dat at sea : 1554274812416
// // spotted whale : 1554274812416
// // spotted another vessel : 1554274812416



// // 다른예를 보자
// // 피보나치 수열을 10회 계산하는 코드 예를 보자
// class FibonacciSequence {
//     [Symbol.iterator](){
//         let a = 0, b = 1;
//         return {
//             next(){
//                 let rval = {value : b, done : false};
//                 b += a;
//                 a = rval.value;
//                 return rval;
//             }
//         };
//     }
// }
// //for of 루프로 FibonacciSequence클래스 인스턴스를 계산하면 무한루프가 된다.
// //아래의 코드에서 10회로 제한해 보자
// const fib = new FibonacciSequence();
// let i =0;
// for(let n of fib){
//     console.log(n);
//     if(++i>9){
//         break;
//     }
// }
// // 1
// // 1
// // 2
// // 3
// // 5
// // 8
// // 13
// // 21
// // 34
// // 55



// ///////////////////////////////
// //제너레이터
// //제너레이터는 이터레이터를 사용해 자신의 실행을 제어하는 함수이다.
// //**일반함수 VS 제너레이터!!! (https://velog.io/@rohkorea86/ge) 참조
// //1. 일반함수는 매개변수를 주면 값 반환 (매개변수 외에 그 함수를 제어할 방법이 없음!)
// //2. 제너레이터는 호출자에게 제어권 넘길(yield) 수 있음.
// //3. 제너레이터는 직접호출되지 않고 이터레이터를 리턴하고, 이터레이터의 next()메서드를 호출하여 실행된다.

//yield 에 대해서(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield)
//[rv] = yield [expression];
//expression : 제너레이터 함수에서 제너레이터 프로토콜을 통해 반환할 값을 정의합니다.  
//             값이 생략되면, undefined를 반환합니다.
//rv : 제너레이터 실행을 재개 하기 위해서, optional value을 제너레이터의 next() 메서드로 전달하여 반환합니다.

//**yield 키워드는 실질적으로  value 와 done 이라는 두 개의 속성을 가진 IteratorResult 객체를 리턴한다.
//**제너레이터 버전의 return 키워드로 생각 할 수 있다. 
//value 속성은 yield 표현(expression)의 실행 결과를 나타내고, done 속성은 제너레이터 함수가 완전히 
//종료되었는지 여부를 불린(Boolean) 형태로 보여줍니다.

//yield 표현식에서 중지되면 ,제너레이터의 next()가 메서드가 호출될 때까지 제너레이터의 코드 실행이 중지된다. 
//제너레이터의 next()메서드를 호출할 때마다 제너레이터는 실행을 재개하며 그리고 다음의 같은 경우에 진행될 때 
//실행된다:

//1. yield 는 제너레이터가  한번 멈추게 하고 제너레이터의 새로운 값을 반환한다.
//   다음번의 next()가 호출된 후, yield 이후에 선언된 코드가 바로 실행된다.
//2. throw는 제네레이터에서 예외를 설정할 때 사용된다. 예외가 발생할 경우 제너레이터의 전체적으로 
//   실행이 중지되고, 그리고  다시 켜는 것이 일반적으로 실행됩니다.
//3. 제너레이터 함수가 종료가 되었다; 이 경우, 제너레이터 실행이 종료되고  
//   IteratorResult는 caller 로  값이 undefined이고 done의 값이 true 로 리턴한다.
//4. return 문에 도달했다. 이 경우에는, 이 값이 종료되고 IteratorResult는 caller 로 
//   return 문에 의해 반환되는 값과 done의 값이 true  로 리턴한다. (제너레이터에서 선언한 return문이다.)


// //무지개 색을 반환하는 간단한 제너레이터의 예를 보자 
// //(yield를 rainbow함수 제너레이터의 리턴이라 생각하자)(호출은 객체.next() 로 한다)
// function* rainbow(){
//     yield 'red';
//     yield 'orange';
//     yield 'yellow';
//     yield 'green';
//     yield 'blue';
//     yield 'indigo';
//     yield 'violet';
// }

// //아래와 같이 제너레이터를 호출하면 된다.
// const it = rainbow();
// console.log(it); //{}
// console.log(rainbow()); //{}
// //위의 결과를 통해 next()를 사용하지 않으면 {} 빈객체로 나옴을 알 수 있다...
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// // { value: 'red', done: false }
// // { value: 'orange', done: false }
// // { value: 'yellow', done: false }
// // { value: 'green', done: false }
// // { value: 'blue', done: false }
// // { value: 'indigo', done: false }
// // { value: 'violet', done: false }
// // { value: undefined, done: true }

// console.log(it); //{}
// console.log(rainbow()); //{}

// //**위의 rainbow제너레이션은 이터레이터를 반환하기 떄문에 아래처럼 for of 루프가 사용가능하다.
// for(let color of rainbow()){
//     console.log(color);
// }
// // red
// // orange
// // yellow
// // green
// // blue
// // indigo
// // violet


// /////////////////////////////
// //yield 표현식의 기능과 양방향 통신(next()에 값을 넣어보자)
// //yield 표현식을 통해 제너레이터와 호출자 사이에 양방향 통신이 가능하다!
// //yield 표현식의 값은 호출자가 제너레이터의 이터레이터에서 next를 호출할 때 제공하는 매개변수이다.

// function* interrogate(){
//     const name = yield "What is your name?";
//     const color = yield "what is your favorite color?";
//     return `${name}'s favorite color is ${color}.`;
// }
// //위의 제너레이터를 호출하면 이터레이터를 얻는다. 이터레이터는 next()를 호출해야 실행된다.
// //next를 호출하면 제너레이터는 첫행을 실행하려 하지만 첫행에 yield 표션식이 있으므로 
// //제너레이터는 반드시 제어권을 호출자에게 넘겨야 한다.
// //제너레이터의 첫번째 행이 완료되려면 호출자가 next를 다시 호출해야한다!
// //그러면 name은 두번째 next에서 전달하는 값을 받는다.

// // //아래의 예를 보자
// // const it = interrogate();        
// // console.log(it.next());          // { value: 'What is your name?', done: false }
// // console.log(it.next('Ethan'));   // { value: 'what is your favorite color?', done: false }
// // console.log(it.next('orange'));  // { value: 'Ethan\'s favorite color is orange.', done: true }

// // //저위의 설명이 맞는지 좀 바꿔서 실행해보자
// // const it1 = interrogate();       
// // console.log(it1.next('Ethan'));  // { value: 'What is your name?', done: false }
// // console.log(it1.next());         // { value: 'what is your favorite color?', done: false }
// // console.log(it1.next('orange')); // { value: 'undefined\'s favorite color is orange.', done: true }
// // //첫번째 next() 에 인자를 넣었더니 undefined가 나왔다... 

// const it2 = interrogate();
// console.log(it2.next('Ethan')); // { value: 'What is your name?', done: false }
// console.log(it2.next());        // { value: 'what is your favorite color?', done: false }
// console.log(it2.next());        // { value: 'undefined\'s favorite color is undefined.',done: true }
// console.log(it2.next('Ethan')); // { value: undefined, done: true } 

// // 제너레이터 함수의 모든 행이 끝나면 이터레이터처럼 done이 true 값이 나온다.
// // 아래 그림에서 제너레이터의 원리에 대해 한번 살펴보자

// //제너레이터 설명 그림 2개 넣기


// ////////////////////////
// //제너레이터와 return
// //제너레이터에서 return문을 사용하면 그 위치와 관계없이 done : true 가 되고, 
// //value : return 값  이 된다. 
// //아래의 예제를 보자
// function* abc(){
//     yield 'a';
//     yield 'b';
//     return 'c';
//     yield 'd'; //return 이후엔 실행이 안되기 때문에 추가해도 의미가 없다.
// }

// const it = abc();
// console.log(it.next()); //{ value: 'a', done: false }
// console.log(it.next()); //{ value: 'b', done: false }
// console.log(it.next()); //{ value: 'c', done: true }
// //제너레이터를 사용할때는 보통 done이 true면 value프로퍼티에 주의를 기울이지 않는다.
// //예를 들면 for of 루프를 쓰면 c는 절대 출력되지 않는다!!
// for(let n of abc()){
//     console.log(n);
// }
// // a
// // b
// // "a"와 "b"는 출력이 되지만 "c"는 출력이 되지 않는다.

// //**제너레이터에서 중요한 값을 return으로 받지말자!!
// //제너레이터에서 반환값을 받을때는 yield를 써야하고 , return은 제너레이터를 중간에 종료하는 것을 목적으로
// //써야한다. 
// // 절대 제너레이터에서는 return을 쓸때 반환값을 쓰지 않는 습관을 들이자!! 