//함수와 추상적 사고

// 윤년의 알고리즘
//윤년이란 ? 
//"윤년"이란 그레고리력에서 여분의 하루인 2월 29일을 추가하여 1년 동안 날짜의 수가 366일이 되는 해를 말한다
//윤년의 규칙
//1) 4로 나누어 떨어지는 해는 윤년, 그 밖의 해는 평년으로 한다.
//2) 4로 나누어 떨어지지만 100으로 나누어 떨어지는 해는 평년으로 한다.
//3) 단, 400으로 나누어 떨어지는 해는 윤년으로 한다
// const year = new Date().getFullYear();
// if(year % 4 !== 0){console.log(`${year} is Not a leap year.`)}
// else if(year % 100 != 0){console.log(`${year} IS a leap year.`)}
// else if(year % 400 != 0){console.log(`${year} is NOT a leap year`)}
// else {console.log(`${year} IS a leap year`)}
// //2019 is Not a leap year.

// //위의 코드를 몇번이든 사용하려면 함수화해야한다. 아래처럼 바꿔보자
// function printLeapYearStatus(){
//     const year = new Date().getFullYear();
//     if(year % 4 !== 0){console.log(`${year} is Not a leap year`)}
//     else if(year % 100 != 0){console.log(`${year} IS a leap year`)}
//     else if(year % 400 != 0){console.log(`${year} is NOT a leap year`)}
//     else (console.log(`${year} IS a leap year`));
// }
// printLeapYearStatus();
// //2019 is Not a leap year

// //위의 함수가 윤년인지 아닌지 판단하는 함수로 바꿔보자
// function isCurrentYearLeapYear(){
//     const year = new Date().getFullYear();
//     if(year % 4 !== 0){return false;}
//     else if(year % 100 != 0){return true;}
//     else if(year % 400 !=0){return false;}
//     else return true;
// }
// console.log(isCurrentYearLeapYear()); //false

// const daysInMonth = [31, isCurrentYearLeapYear()?29:28, 31,30,31,30,31,31,30,31,30,31];
// if(isCurrentYearLeapYear()){console.log('it is a leap year')}
// else(console.log('not a leap year'))
// console.log(daysInMonth);
// //not a leap year
// //[ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]


// //////////////////////
// //**순수한 함수로서의 요건
// //1. 입력이 같으면 결과도 반드시 같다.
// //2. 부수효과가(side effect) 없다. 즉 함수를 호출해서 프로그램의 상태가 바뀌어서는 안된다.
// //함수로서의 함수
// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
// let colorIndex = -1;
// function getNextRainbowColor(){
//     if(++colorIndex >= colors.length){colorIndex = 0}
//     return colors[colorIndex];
// }
// for(let i=0; i<8
//     ; i++){
//     console.log(getNextRainbowColor());
// }
// // red
// // orange
// // yellow
// // green
// // blue
// // indigo
// // violet
// // red


// //위의 함수는 결과가 항상 다르고, 함수를 호출할 때마다 변수 colorIndex가 바뀌는 부수효과가 있다. 
// //아래와 같이 바꿔보자
// //위의 함수에서 외부변수를 클로저로 감쌌다.
// const getNextRainbowColor = (function(){
//     const colors=['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
//     let colorIndex = -1;
//     return function(){
//         if(++colorIndex >= colors.length){colorIndex = 0;}
//         return colors[colorIndex];
//     };
// })()

// //외부 변수를 감싸서 부수효과는 없어졌지만, 아직은 입력이 같아도 결과가 다르기 때문에 순수함수는 아니다.
// //아래의코드는 자바스크립트 브라우저에서 쓰이는건데... 
// //클래스가 rainbow인 HTML 요소의 색을 바꿔주는 것으로 의도가 명확하다.
// setInterval(function(){
//     document.querySelector(`.rainbow`)
//             .style['background-color'] = getNextRainbowColor();
// },500);
// //다만 위의 코드는 다른 프로그램에서 호출하면 영향을 받는다.
// //예를 들면 다른 프로그램에서 호출했다면 red orange 가 연속으로 나와서
// //red를 원할때 다른곳에서 미리 호출한다음 호출되어 orange가 호출될 수 있다.


// //이터레이터를 사용한다면 위의 문제를 해결할 수 있다. 아래의 코드를 보자
// function getRainbowIterator(){
//     const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
//     let colorIndex = -1;
//     return {
//         next(){
//             if(++colorIndex >= colors.length){colorIndex = 0;}
//             return{value : colors[colorIndex], done : false};
//         }
//     };
// }

// //getRainbowIterator는 순수한 함수이다. 이 함수는 항상 같은 것(이터레이터)을 반환해도 
// //외부에 아무런 영향을 주지 않는다.
// const rainbowIterator = getRainbowIterator();
// setInterval(function(){
//     document.querySelector('.rainbow')
//             .style['background-color'] = rainbowIterator.next().value;
// },500);

// //*next() 메서드는 함수가 아니라 메서드이다!! 
// //메서드는 자신이 속한 객체라는 컨텍스트 안에서 동작한다.
// // 때문에 메서드의 동작은 그 객체에 의해 좌우된다.
// //프로그램의 다른 부분에서 getRainbowItrator를 호출하더라도 독립적인 이터레이터가 생성되어
// // 다른 이터레이터에 간섭하지 않는다.


// //////////////////////////////////////
// //IIFE와 비동기적 코드
// //IIFE로 클로저를 만드는 것을 앞에서 했다. 이제 비동기적코드를 처리하는 법을 알아보자
// setTimeout(function(){console.log("hello");}, 1500);
// // 1.5초 후 hello 가 출력됨.

// //아래 카운트가 출력되는 함수를 만들어보자
// var i;
// for(i=5; i>=0; i--){
//     setTimeout(function(){
//         console.log(i === 0 ? "go!" : i);
//     }, (5-i)*1000);
// }
// // -1
// // -1
// // hello
// // -1
// // -1
// // -1
// // -1
// //시간차가 발생하고 위의 코드가 찍힌다.
// //스코프문제로 전역처리되어 계속 -1이 찍힌다.
// //간단하게 for문안에서 let i 로 해주면 다 해결된다.


// //함수를 만들어서 살짝 변형을 줘보자
// function loopBody(i){
//     setTimeout(function(){
//         console.log(i === 0 ? "go" : i);
//     }, (5-i)*1000);
// }
// var i;
// for(i=5;i>=0;i--){
//     loopBody(i)
// }
// // 5
// // 4
// // 3
// // 2
// // 1
// // go

// // 위의 코드는 알맞은 값이 출력되지만 루프에 한번쓰고 말 함수를 일일이 붙이느넌 성가신 일이다.
// // 이럴땐 IIFE로 즉시처리하는게 낫다.

// //아래의 코드를 보자
// var i
// for(i=5;i>=0;i--){
//     (function(i){
//         setTimeout(function(){
//             console.log(i === 0 ? "go" : i);
//         }, (5-i)*1000);
//     })(i);
// }
// // 위의 코드는 아래의 사진처럼 (13장 함수와 추상적사고1 사진 넣기) 대체한것이라 생각하면 이해가 쉽다.
// //
// //더쉽게는 아래처럼 for문안에 let을 쓰는것이다
// for(let i=5; i>=0; i--){
//     setTimeout(function(){
//         console.log(i === 0 ? "go" : i);
//     }, (5-i)*1000);
// }

// ////////////////////////////
// //변수로서의 함수
// //변수로 있을수 있는 곳에 함수로도 있을 수 있다 아래의 예를 보며 생각해보자
// //1. 함수를 가르키는 변수를 만들어 별명을 정할 수 있다.
// //2. 배열에 함수를 넣을 수 있다. 물론 다른 타입의 데이터와 섞을 수 있다.
// //3. 함수를 객체의 프로퍼티로 사용할 수 있다.(9장에서 나왔다.)
// //4. 함수를 함수에 전달할 수 있다.
// //5. 함수가 함수를 반환할 수 있다.
// //6. 함수를 매개변수로 받는 함수를 반환하는것도 가능하다.

// //1번의 예를 보자
// function addThreeSquareAddFiveTakeSquareRoot(x){
//     //이런 긴 이름을....
//     return Math.sqrt(Math.pow(x+3,2)+5);
// }
// //별명을 쓰기 전
// const answer = (addThreeSquareAddFiveTakeSquareRoot(5) + addThreeSquareAddFiveTakeSquareRoot(2)) /
// addThreeSquareAddFiveTakeSquareRoot(7);

// console.log(answer); //1.3451659672026264

// //별명을 쓰면 이렇게 바뀐다.
// const f = addThreeSquareAddFiveTakeSquareRoot;
// const answer1 = (f(5)+f(2))/f(7);
// console.log(answer1) //1.3451659672026264

// const Money = require('math-money');

// const oneDollar = Money.Dollar(1);
// console.log(oneDollar); //Money {}

// //Money.Dollar도 길게 느껴지면 아래와 같이 해도 된다.
// const Dollar = Money.Dollar;
// const twoDollars = Dollar(2);
// console.log(twoDollars); //Money {}
// // oneDollar와 twoDollar는 같은 타입의 인스턴스이다.


// // 2번의 예를 보자(배열안의 함수) 
// //파이프라인을 이용한 2차원 변형의 예제이다.
// const sin = Math.sin;
// const cos = Math.cos;
// const theta = Math.PI/4;
// const zoom = 2;
// const offset = [1, -3];

// const pipeline = [
//     function rotate(p){
//         return{
//             x: p.x*cos(theta) - p.y*sin(theta),
//             y: p.x*sin(theta) + p.y*cos(theta),
//         };
//     },
//     function scale(p){
//         return{
//             x: p.x*zoom,
//             y: p.y*zoom,
//             };
//     },
//     function translate(p){
//         return{
//             x:p.x+offset[0],
//             y:p.y+offset[1],
//         };
//     },
// ];

// //이제 pipeline은 2D 변형에 필요한 함수의 배열이다.
// //점 하나를 변형해보자
// const p = {x:1, y:1};
// let p2 = p;
// for(let i=0; i<pipeline.length; i++){
//     p2 = pipeline[i](p2);
// }
// console.log(p,p2) //{ x: 1, y: 1 } { x: 1.0000000000000002, y: 3.82842712474619 }
// //p2는 이제 p1을 좌표 원점 기준으로 45도 회전하고(rotate)
// //원점에서 2단위만큼 떨어뜨린 후(scale)
// //1단위 오른쪽, 3단위 아래쪽으로 움직인(translate) 점입니다.


// //3번의 예를 보자(함수에 함수전달)
// //함수에 함수를 전달하는 대표적인 사례가 콜백이지만, 전부는 아니다.. 함수는 동작이고,
// //함수를 받은 함수는 그 동작을 활용할 수 있다.
// //숫자의 제곱 세제곱을 해야하는 함수를 만들어보자
// function sum(arr, f){
//     //함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null함수를 쓴다.
//     if(typeof f != 'function'){f = x =>x;}
//     return arr.reduce((a,x) => a += f(x), 0);
// }
// console.log(sum([1,2,3]));  //6
// console.log(sum([1,2,3], x=> x*x)); //14
// console.log(sum([1,2,3], x => Math.pow(x,3)));  //36


// //4번의 예를 보자(함수를 반환하는 함수)
// //함수를 반환하는 함수를 일종의 3D프린터라고 생각할 때 3D 프린터의 설계도를 바꾸는것 처럼 
// //반환 받는 함수 역시 마음대로 바꿀 수 있다.

// //반환받는 함수가 제곱이라면 아래와 같이 만들면 된다.
// //function sumOfSquares(arr){return sumOfSquares(arr,x => x*x)}
// //하지만 세제곱근이나 다른 걸 원하면 위의 것은 재사용이 불가능하다.
// //아래와 같이 함수의 틀을 만들면 어떨까?

// function sum(arr, f){
//     //함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null함수를 쓴다.
//     if(typeof f != 'function'){f = x =>x;}
//     return arr.reduce((a,x) => a += f(x), 0);
// }
// function newSummer(f){
//     return arr => sum(arr, f);
// }
// //이제 중간에 원하는 함수를 넣어서 반환 받아보자
// const sumOfSquares = newSummer(x => x*x);        
// const sumOfCubes = newSummer(x => Math.pow(x,3));
// console.log(sumOfSquares([1,2,3]));    //f만 받아서 위의 sum(arr,f) 인상태이다.arr만 넣으면 된다.
// console.log(sumOfCubes([1,2,3]));


// //////////////
// //재귀
// //재귀는 자기 자신을 호출하는 함수이다. 
// //같은 일을 반복하면서 그 대상이 점차 줄어드는 상황에서 재귀는 유용하게 활용된다.

// //건초에서 바늘찾는 예제인데 아래와 같은 단계로 찾을 것이다.
// //1. 건초더미에서 바늘이 보이면 3단계로 이동한다.
// //2. 건초더미에서 건초(hay)를 하나 덜어낸다. 1단계로 이동한다.
// //3. 찾았다!
// function findNeedle(haystack){
//     if(haystack.length === 0){
//         return "no haystack here!";
//     }else if(haystack.shift() === 'needle'){
//         return "found it";
//     }
//     return findNeedle(haystack); //건초더미에 들어있는 건초가 하나 줄었다.
// }
// console.log(findNeedle(['hay', 'hay', 'hay', 'needle', 'hay', 'hay']));
// //found it

// //shift() 메서드는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환한다.
// //여기서 재귀함수로 자기 자신을 호출하여 계속 반복하게 한것이다.

// var array1 = [1, 2, 3];
// var firstElement = array1.shift();
// console.log(array1);
// // expected output: Array [2, 3]
// console.log(firstElement);
// // expected output: 1