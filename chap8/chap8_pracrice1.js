// const arr1 = [{name:"Trevor"},{name:"Suzanne"},{name:"Jim"},{name:"Amanda"}];
// arr1.sort(function(a,b){return a.name>b.name});
// console.log(arr1);
// console.log(arr1.findIndex(function(a){return a.name === "Jim"}));

// const arr2 = [1,17,16,5,4,16,10,3,49];
// console.log(arr2.find(function(x,i){return i>3 && Number.isInteger(Math.sqrt(x))}));

// class Person{
//     constructor(name){
//         this.name = name;
//         this.id = Person.nextId++;
//     }
// }
// Person.nextId=0;
// const jamie = new Person("Jamie"),
// juliet = new Person("Juliet"),
// peter = new Person("Peter"),
// jay = new Person("Jay");
// const arr3 = [jamie, juliet, peter, jay];
// console.log(jamie, juliet, peter, jay);
// console.log(arr3.find(function(a){return a.id === 2}));
// console.log(arr3.find(function(a){return a.id === juliet.id}));
// console.log(arr3.find(function(a){return a.id === this.id},jay));

// const cart = [{name: "widget", price:9.95}, {name:"Gadget",price:22.95}];
// const name = cart.map(function(a){return a.name});
// console.log('name',name,'type:',typeof name);
// const price = cart.map(function(a){return a.price});
// console.log('price',price,'type:',typeof price);
// const discount = cart.map(function(a){return a.price*0.8});
// console.log('discount',discount,'type:',typeof discount);
// const assemble = cart.map(function(a,b){return {name : a.name, price : discount[b]}});
// console.log(assemble);
// const discount1 = [];
// for(let i of price){
//     let a = i*0.8;
//     discount1.push(a);
// }
// console.log(discount1);
// const assemble1 = [name,discount];
// console.log(assemble1);
// let assemble2 = {};
// for(let a=0;a<name.length;a++){
//     assemble2 = {name : name[a], price : discount[a]};
// }
// console.log(assemble2);
// //{ name: 'Gadget', price: 18.36 }



// const cards = [];
// for(let suit of ['H','C','D','S']){
//     for(let value=0;value<=13;value++){
//         cards.push({suit,value});
//     }
// }
// // console.log(cards);

// console.log(cards.filter(function(c){return c.value === 12}));
// // [ { suit: 'H', value: 12 },
// //   { suit: 'C', value: 12 },
// //   { suit: 'D', value: 12 },
// //   { suit: 'S', value: 12 } ]
// function cardToString(c){
//     const suits = {'H':'\u2665', 'C':'\u2663', 'D':'\u2666', 'S':'\u2660'};
//     const values = {1:'A', 11:'J', 12:'Q', 13:'K'};
//     for(let i=0;i<=10;i++){
//         values[i]=i;
//     }
//     return suits[c.suit]+values[c.value];
// }
// console.log(cards.filter(function(a){return a.value>10}).map(cardToString));


// const cards1 = [];
// for(let suit of ['\u2665', '\u2663', '\u2666', '\u2660']){
//     for(let value=1;value<=13;value++){
//         if(value<2){
//             cards1.push({suit,value});
//         }else if(value>10){
//             cards1.push({suit,value});
//         }else{
//             cards1.push({suit,value});
//         }
//     }
// }
// console.log(cards1);



const words = ["Beachball", "Rodeo", "Angel",
 "Aardvark", "Xylophone", "November", "Chocolate",
 "Papaya", "Uniform", "Joker", "Clover", "Bali"];
let alphabet = words.reduce((pre,next)=>{
    if(!pre[next[0]]){
        pre[next[0]] = [];
    }
    pre[next[0]].push(next);
    return pre;
},[]);
console.log(alphabet);



// const bubble = [1,17,16,5,4,16,10,3,49];
// let temp ;
// function bubble_sort(array){
//     for(let a=0;a<array.length-1;a++){
//         for(let b=0;b<array.length-1-a;b++){
//             if(array[b]>array[b+1]){
//                 temp = array[b];
//                 array[b] = array[b+1];
//                 array[b+1] = temp;
//             }
//         }
//     }
//     return array;
// }
// console.log(bubble_sort(bubble));

// const bubble_sort_reduce = bubble.reduce((pre,next)=>{
//     const index = pre.findIndex(i=>i>next);
//     const lastIndex = index>-1?index:pre.length;
//     pre.splice(lastIndex,0,next);
//     return pre;
// },[])
// console.log(bubble_sort_reduce);