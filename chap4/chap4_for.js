//for문 VS while문 비교

// //for문
// for([initializtion]; [condition]; [final-expression]){
//     statement
// }
// //while문
// [initializtion]
// while([condition]){
//     statement
//     [final-expression]
// }

// //switch문
// switch(expression){
//     case value1:
//         //expression 결과가 value1일때 실행
//         [break;]
//     case value2:
//         //expression 결과가 value2일때 실행
//         [break;]
//     case value3:
//         //expression 결과가 value3일때 실행
//         [break;]
//     default:
//         //expression 결과에 맞는 값이 없을 때 실행
//         [break;]
// }

// //for... in 루프
// for(variable in Object){
//     statement
// }

const player = {name: 'Thomas', rank: 'Midshipman', age:25};
for(let prop in player){
    if(!player.hasOwnProperty(prop)) continue; 
    //hasOwnProperty() 는 객체가 프로퍼티를 가졌는지 아닌지 판단후boolean값으로 return해준다
    console.log(prop + ':' + player[prop]);
}

