const arr = ["b","c","d"];
arr.push("e");
console.log(arr);//[ 'b', 'c', 'd', 'e' ]
arr.pop();
console.log(arr);//[ 'b', 'c', 'd' ]
arr.unshift("a");
console.log(arr);//[ 'a', 'b', 'c', 'd' ]
arr.shift();
console.log(arr);//[ 'b', 'c', 'd' ]
arr.concat("e","f","g")// concat()은 기존의 배열이 변하지 않음
console.log(arr.concat("e","f"));//[ 'b', 'c', 'd', 'e', 'f' ]
arr.slice(0,1); //slice()는 기존의 배열이 변하지 않는다.
console.log(arr.slice(0,1));//[ 'b' ]
arr.splice(0,0,"a");
console.log(arr);//[ 'a', 'b', 'c', 'd' ]
arr.splice(arr.length,0,'e');
console.log(arr);//[ 'a', 'b', 'c', 'd', 'e' ]
arr.copyWithin(0,1,5);
console.log(arr);//[ 'b', 'c', 'd', 'e', 'e' ]
arr.fill('f',4,arr.length);
console.log(arr);//[ 'b', 'c', 'd', 'e', 'f' ]
arr.reverse();
console.log(arr);//[ 'f', 'e', 'd', 'c', 'b' ]
arr.sort();
console.log(arr);//[ 'b', 'c', 'd', 'e', 'f' ]
console.log(arr.indexOf('b'));//0     당연한 이야기지만 기존의 배열이 변하지 않는다.
console.log(arr.some((a)=>a === 'a'));//false
console.log(arr.some((a)=>a === 'b'));//true
console.log(arr.every((a)=>a === 'a'));//false
console.log(arr.every((a)=>a === 'b'));//false


const arr1 = [{name:"Trevor"},{name:"Suzanne"},{name:"Jim"},{name:"Amanda"}];
arr1.sort((a,b)=>(a.name>b.name));
console.log(arr1);
// [ { name: 'Amanda' },
//   { name: 'Jim' },
//   { name: 'Suzanne' },
//   { name: 'Trevor' } ]
arr1.sort((a,b)=>(a.name[1]>b.name[1]));
console.log(arr1);
// [ { name: 'Jim' },
//   { name: 'Amanda' },
//   { name: 'Trevor' },
//   { name: 'Suzanne' } ]
console.log(arr1.findIndex(a=>a.name === 'Amanda')); //1
console.log(arr1.findIndex(a=>a.name === 'pole'));//-1
console.log(arr1.find((x,i)=>x.name === 'Trevor' && i>1)); //{ name: 'Trevor' }
const mapEx = arr1.map((a)=>a.name);
console.log(mapEx);//[ 'Jim', 'Amanda', 'Trevor', 'Suzanne' ]


const arr2 = [1,17,16,5,4,16,10,3,49];
console.log(arr2.find((x,i) => x>15 && i>2));//16  두번째 16임.
console.log(arr2.find((x,i) => i>2 && Number.isInteger(Math.sqrt(x)))); //4  ****find() 사용방법보기


class Person {
    constructor(name){
        this.name = name;
        this.id = Person.nextId++;
    }
}
Person.nextId = 0;
const jamie = new Person("Jamie"),
    juliet = new Person("Juliet"),
    peter = new Person("Peter"),
    jay = new Person("Jay");
const arr3 = [jamie, juliet, peter, jay];
console.log(arr3.find((a)=>a.id === 2));//Person { name: 'Peter', id: 2 }
console.log(arr3.find((a)=>a.id===juliet.id));//Person { name: 'Juliet', id: 1 }
console.log(arr3.find(((a)=>a.id === this.id),juliet));//undefined      화살표함수는 사용이 안된다!!
console.log(arr3.find((function(a){return a.id === this.id}),juliet));//Person { name: 'Juliet', id: 1 }


const cart = [{name: "widget", price:9.95}, {name:"Gadget",price:22.95}];
const name = cart.map((a)=>a.name);
const price = cart.map((a)=>a.price);
const discount = cart.map((a)=>a.price*0.8);
const discount1 = function(){
    let dd=[];
    for(a of price){
        dd[a]=a*0.8;
    }
    return dd;
}()
const discount2 = function(){
    let dd=[];
    for(let i=0;i<price.length;i++){
        dd[i]=price[i]*0.8;
    }
    return dd;
}()
console.log(name,price,discount,discount1,discount2);
// [ 'widget', 'Gadget' ] [ 9.95, 22.95 ] [ 7.96, 18.36 ] [ '9.95': 7.96, '22.95': 18.36 ] [ 7.96, 18.36 ]
const cartAssemble = name.map((x,i)=>({name:x,price:discount[i]})); //()문제!! 
console.log(cartAssemble);
// [ { name: 'widget', price: 7.96 },
//   { name: 'Gadget', price: 18.36 } ]


const cards = [];
for(let suit of ['H','C','D','S']){
    for(let value = 1; value<=13; value++){
        cards.push({suit,value});
    }
}
console.log(cards.filter((c)=>c.value === 2));
// [ { suit: 'H', value: 2 },
//   { suit: 'C', value: 2 },
//   { suit: 'D', value: 2 },
//   { suit: 'S', value: 2 } ]
console.log(cards.filter(function(a){return a.value>12}));
// [ { suit: 'H', value: 13 },
//   { suit: 'C', value: 13 },
//   { suit: 'D', value: 13 },
//   { suit: 'S', value: 13 } ]
function cardToString(c){
    const suits =  {'H':'\u2665', 'C':'\u2663', 'D':'\u2666', 'S':'\u2660'};
    const values = {1:'A', 11:'J', 12:'Q', 13:'K'};
    for(let i=2; i<=10; i++){
        values[i]=i;
    }
    return suits[c.suit] + values[c.value];
}
console.log(cards.filter(function(a){return a.value>10}).map(cardToString));
//[ '♥J', '♥Q', '♥K', '♣J', '♣Q', '♣K', '♦J', '♦Q', '♦K', '♠J', '♠Q', '♠K' ]


// const words = ["Beachball", "Rodeo", "Angel",
//  "Aardvark", "Xylophone", "November", "Chocolate",
//  "Papaya", "Uniform", "Joker", "Clover", "Bali"];
// let alphabetical = words.reduce((pre,next)=>{
//     if(!pre[next[0]]){
//         pre[next[0]]=[];
//     }   //else를 넣으면 처음인자로 빈 배열을 만들기 때문에 값이 잘 안나온다.
//     pre[next[0]].push(next);
//     return pre;
// },{});
// console.log(alphabetical);


// const bubble = [1,17,16,5,4,16,10,3,49];

// function bubble_sort_normal(array){
//     let length = array.length;
//     let temp;
//     for(let i=0; i<length-1; i++){
//         for(let j=0; j<length-1-i;j++){
//             if(array[j]>array[j+1]){
//                 temp = array[j];
//                 array[j] = array[j+1];
//                 array[j+1] = temp;
//             }
//         }
//     }
//     return array;
// };
// console.log(bubble_sort_normal(bubble)); //[ 1, 3, 4, 5, 10, 16, 16, 17, 49 ]

// console.log(bubble.reduce(function(pre,next){
//     let nextInt = pre.findIndex(i=>next<i);
//     let index = nextInt > -1 ? nextInt : pre.length;
//     return pre.splice(index,0,next);                     //중간 값을 리턴을 줘버리면 빈 배열 생성된다.
// },[])); //[]

// let bubble_sort_reduce = bubble.reduce(function(pre,value){
//     let nextInt = pre.findIndex(i=>value<i);
//     let index = nextInt > -1 ? nextInt : pre.length;
//     pre.splice(index,0,value);
//     return pre;
// },[]);
// console.log(bubble_sort_reduce);//[ 1, 3, 4, 5, 10, 16, 16, 17, 49 ]