class Fivonachi{
    [Symbol.iterator](){
        let a=0,b=1;
        return {
            next(){
                let rval = {value:b,done:false};
                b += a;
                a = rval.value;
                return rval;
            }
        }
    }
}
let fib = new Fivonachi();
let fibarray = [];
let i=0;
for(let a of fib){
    console.log(a);
    fibarray.push(a);
    console.log(fibarray);
    if(++i>9){
        break;
    }
}



function* rainbow(){
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}
let rainarray = [];
for(let a of rainbow()){
    rainarray.push(a);
    console.log(rainarray);
}



// function* gen(){
//     var bar = yield 'foo';
//     console.log(bar);
// }
// var g = gen();
// console.log(g.next('bar1'));
// console.log(g.next('bar2'));

// function* gen1(){
//     yield 1;
//     return 1.5;
//     yield 2;
// }
// var g1 = gen1();
// console.log(g1.next());
// console.log(g1.next());
// console.log(g1.next());

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
// console.log(g2.next());
// console.log(g2.next());
// console.log(g2.next());
// console.log(g2.next());

// function* gen4(){
//     yield 1;
//     yield 2;
//     yield 3;
// }
// var g3 = gen4();
// console.log(g3.next());
// console.log(g3.return(123));
// console.log(g3.next());

// var g4 = gen4();
// console.log(g4.next());
// console.log(g4.throw('error 호출'));

function* abcd(){
    yield 'a';
    yield 'b';
    return 'c';
    yield 'd';
}
const abc = abcd();
console.log(abc.next());
console.log(abc.next());
console.log(abc.next());
console.log(abc.next());
let b ='';
for(let a of abcd()){
    b += a;
}
console.log(b); //ab



function* interrogate(){
    const name = yield "what's your name?";
    const color = yield "what is your favorite color?";
    return `${name}'s favorite color is ${color}!`; 
}
const iter = interrogate();
console.log(iter.next());
console.log(iter.next('James'));
console.log(iter.next('yellow'));
