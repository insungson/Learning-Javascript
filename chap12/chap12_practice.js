// class Fibonachi{
//     [Symbol.iterator](){
//         let a = 0, b=1;
//         return {
//             next(){
//                 let rval = {value:b, done:false};
//                 b += a;
//                 a = rval.value;
//                 return rval;
//             }
//         };
//     }
// }
// var fib = new Fibonachi();
// let i = 0;
// let fibarray = []
// for(let a of fib){
//     console.log(a);
//     fibarray.push(a);
//     console.log(fibarray);
//     if(++i>9){
//         break;
//     }
// }

//////////////////////////////////////////

// function* rainbow(){
//     yield 'red';
//     yield 'orange';
//     yield 'yellow';
//     yield 'green';
//     yield 'blue';
//     yield 'indigo';
//     yield 'violet';
// }
// let colorArr = [];
// for(let color of rainbow()){
//     colorArr.push(color);
// }
// console.log(colorArr);//[ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ]

// let itzy = rainbow();
// console.log(itzy);       //{}
// console.log(itzy.next());//{ value: 'red', done: false }
// console.log(itzy.next());//{ value: 'orange', done: false }
// console.log(itzy.next());//{ value: 'yellow', done: false }
// console.log(itzy.next());//{ value: 'green', done: false }
// console.log(itzy.next());//{ value: 'blue', done: false }
// console.log(itzy.next());//{ value: 'indigo', done: false }
// console.log(itzy.next());//{ value: 'violet', done: false }
// console.log(itzy.next());//{ value: undefined, done: true }

// console.log('/////////////////');

// let it = rainbow();
// do{
//     console.log(it.next());
// }while(!it.next().done)
// // { value: 'red', done: false }
// // { value: 'yellow', done: false }
// // { value: 'blue', done: false }
// // { value: 'violet', done: false }

// console.log('/////////////////');

// let it1 = rainbow();
// while(it1.next()){
//     console.log(it1.next());
//     if(it1.next().done) break;
// }
// // { value: 'orange', done: false }
// // { value: 'blue', done: false }
// // { value: undefined, done: true }

//////////////////////////////////////

// function* gen() {
//     var bar = yield 'foo';
//     console.log(bar); // bar1
// }
// var g = gen();
// console.log(g.next()); // {value: 'foo', done: false}
// console.log(g.next('bar1'));
// console.log(g.next('bar2'));
// // { value: 'foo', done: false }
// // bar1
// // { value: undefined, done: true }
// // { value: undefined, done: true }

// function* gen1(){
//     yield 1;
//     return 1.5;
//     yield 2;
// }
// var g1 = gen1();
// console.log(g1.next());//{ value: 1, done: false }
// console.log(g1.next());//{ value: 1.5, done: true }
// console.log(g1.next());//{ value: undefined, done: true }

// function* gen2(){
//     yield 1;
//     yield 2;
// }
// function* gen3(){
//     //yield* 가 gen2를 위임한다.
//     yield* gen2();
//     yield 3;
// }
// var g2 = gen3();
// console.log(g2.next());//{ value: 1, done: false }
// console.log(g2.next());//{ value: 2, done: false }
// console.log(g2.next());//{ value: 3, done: false }
// console.log(g2.next());//{ value: undefined, done: true }

////////////////////////////

// function* gen4(){
//     yield 1;
//     yield 2;
//     yield 3;
// }
// var g3 = gen4();
// console.log(g3.next());     //{ value: 1, done: false }
// console.log(g3.return(123));//{ value: 123, done: true }
// var g4 = gen4();
// console.log(g4.next());     //{ value: 1, done: false }
// console.log(g4.throw('error 호출'));//error 호출 (종료됨)

//위의 gen() 과 비교
function* interrogate(){
    const name = yield "What is your name?";
    const color = yield "what is your favorite color?";
    return `${name}'s favorite color is ${color}!`;
}
const iter = interrogate();
// console.log(iter.next());       //{ value: 'What is your name?', done: false }
// console.log(iter.next('ethen'));//{ value: 'what is your favorite color?', done: false }
// console.log(iter.next('red'));  //{ value: 'ethen\'s favorite color is red!', done: true }

// console.log(iter.next('Ethan'));  // { value: 'What is your name?', done: false }
// console.log(iter.next());         // { value: 'what is your favorite color?', done: false }
// console.log(iter.next('orange')); // { value: 'undefined\'s favorite color is orange.', done: true }

// console.log(iter.next('Ethan')); // { value: 'What is your name?', done: false }
// console.log(iter.next());        // { value: 'what is your favorite color?', done: false }
// console.log(iter.next());        // { value: 'undefined\'s favorite color is undefined.',done: true }
// console.log(iter.next('Ethan')); // { value: undefined, done: true } 

function* abc(){
    yield 'a';
    yield 'b';
    return 'c';
    yield 'd';
}
const abcEx = abc();
console.log(abcEx.next());//{ value: 'a', done: false }
console.log(abcEx.next());//{ value: 'b', done: false }
console.log(abcEx.next());//{ value: 'c', done: true }
console.log(abcEx.next());//{ value: undefined, done: true }

let b = '';
for(let a of abc()){
    b += a;
}
console.log(b);//ab     c는 출력되지 않는다.

/////////////////////////////////////
//콜백
function getId(phoneNumber, callback){/* … */ }
function getEmail(id, callback) { /* … */ }
function getName(email, callback) { /* … */ }
function order(name, menu, callback) { /* … */ }
function orderCoffee(phoneNumber, callback) {
    getId(phoneNumber, function(id) {
        getEmail(id, function(email) {
            getName(email, function(name) {
                order(name, 'coffee', function(result) {
                    callback(result);
                });
            });
        });
    });
}
//제너레이터
function* orderCoffee(phoneNumber){
    const id = yield getId(phoneNumber);
    const email = yield getEmail(id);
    const name = yield getName(email);
    const result = yield order(name,'coffee');
    return result;
}

