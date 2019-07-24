// let user ={
//     name: 'Irena',
//     age: 25,
// }
// function greet(user){
//     console.log(`Hello, ${user.name}`);
// }
// function getBirthday(user){
//     return new Date().getFullYear() - user.age;
// }
// greet(user);//Hello, Irena
// console.log(getBirthday(user));//1994


// function closerEx(firstname, lastname){
//     var nameIntro = "Your name is ";
//     function makeFullName(){
//         return nameIntro + firstname + ' ' + lastname;
//     }
//     return makeFullName();
// }
// console.log(closerEx('Son','Insung'));

// function closerEx1(){
//     var celebrityID = 999;
//     return {
//         getID: ()=>{
//             return celebrityID;
//         },
//         setID: (newID)=>{
//             celebrityID = newID;
//         },
//     };
// };
// var EX1 = closerEx1();
// console.log(EX1.getID());//999
// EX1.setID(123);
// console.log(EX1.getID());//123

// var arr = [];
// for(var i=0; i<=5; i++){
//     arr[i] = function(){
//         return i;
//     }(i);
// }
// for(a in arr){
//     console.log(arr[a]);
// }
// for(a of arr){
//     console.log(arr[a]);
// }
// // 0
// // 1
// // 2
// // 3
// // 4
// // 5
// // 0
// // 1
// // 2
// // 3
// // 4
// // 5


// function celebrityIDCreater(celebrity){
//     var i;
//     var uniqueID = 100;
//     for(i = 0; i<celebrity.length; i++){
//         celebrity[i]["id"] = (()=>uniqueID + i)(i);
//     }
//     return celebrity;
// }
// var actionCelebs = [{name:"Stallone",id:0},{name:"Cruise",id:0},{name:"Willis",id:0}];
// var test = celebrityIDCreater(actionCelebs);
// console.log(test);
// // [ { name: 'Stallone', id: 100 },
// //   { name: 'Cruise', id: 101 },
// //   { name: 'Willis', id: 102 } ]