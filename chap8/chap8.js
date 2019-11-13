// //배열의 기초

// //배열 리터럴
// const arr1 = [1,2,3]; //숫자로 구성된 배열
// const arr2 = ["one",2,"three"]; //비균질적 배열
// const arr3 = [[1,2,3],["one",2,"three"]]; //배열을 포함한 배열
// const arr4 = [                  //비균질적 배열
//     {name:"Fred", type:"object", luckyNumbers=[5,7,13]},
//     [
//         {name:"Susan", type:"object"},
//         {name:"Anthony", type:"object"},
//     ],
//     1,
//     function(){return "arrays can contain functions too";},
//     "three",
// ];
// //배열 요소에 접근하기
// arr1[0]; //1
// arr2[2]; //3
// arr3[1]; //["one",2,"three"]
// arr4[1][0]; //{name:"Susan", type:"object"}
// //배열길이
// arr1.length; //3
// arr4.length; //5
// arr4[1].length; //2
// //배열 길이 늘리기
// arr1[4] = 5;
// arr1;   //[1,2,3,undefined,5]
// arr1.length; //5
// //배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의
// //길이가 늘어나지는 않는다.
// arr2[10]; //undefined
// arr2.length; //3
// //Array 생성자(거의 사용하지 않습니다.)
// const arr5 = new Array(); //빈 배열
// const arr6 = new Array(1,2,3); //[1,2,3]
// const arr7 = new Array(2); //길이가 2인 배열, 요소는 모두 undefined이다.
// const arr8 = new Array("2"); //["2"]


// //배열 요소 추가 및 제거하기
// //push : 배열의 끝에 추가시킨다. (스택)
// //pop : 배열의 끝을 제거한다. (스택)
// //unshift : 배열의 앞을 추가시킨다. (큐)
// //shift : 배열의 앞을 제거한다. (큐)
// //위의 4개 전부 기존의 배열이 수정된다.
// const arr = ["b","c","d"];
// arr.push("e");//e추가
// console.log(arr); //[ 'b', 'c', 'd', 'e' ]
// arr.pop();//e제거
// console.log(arr); //[ 'b', 'c', 'd' ]  
// arr.unshift("a"); //a 추가(앞에)
// console.log(arr); //[ 'a', 'b', 'c', 'd' ]
// arr.shift();//a 제거(앞에)
// console.log(arr); //[ 'b', 'c', 'd' ]

// //배열 끝에 여러요소 추가하기
// // concat 메서드 : 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 return
// //                 기존의 배열이 수정되진 않는다.
// const arr =[1,2,3];
// console.log(arr.concat(4,5,6));//[ 1, 2, 3, 4, 5, 6 ]
// console.log(arr);//[ 1, 2, 3 ] 배열이 수정되진 않는다.
// console.log(arr.concat([4,5,6])); //[ 1, 2, 3, 4, 5, 6 ]
// console.log(arr.concat([4,5],6)); //[ 1, 2, 3, 4, 5, 6 ]
// console.log(arr.concat([4,[5,6]])); //[ 1, 2, 3, 4, [ 5, 6 ] ]

//배열의 일부 가져오기
// slice메서드 : 배열의 일부를 가져옴 첫번째는 시작위치, 두번째는 마지막이다.
//              두번째위치는 인덱스로 바로전까지이다.
//              (*slice도 배열이 수정되진 않는다.)
// const arr = [1,2,3,4,5];
// console.log(arr.slice(3)); //[ 4, 5 ]
// console.log(arr.slice(2,4)); //[ 3, 4 ]
// console.log(arr); //[ 1, 2, 3, 4, 5 ] 
// console.log(arr.slice(-2)); //[ 4, 5 ]
// console.log(arr.slice(1,-2)); //[ 2, 3 ]
// console.log(arr.slice(-2,-1)); //[ 4 ]

//임의의 위치에 요소 추가하거나 제거하기
//splice메서드 : 배열을 원하는데로 수정할 수 있다.(*배열이 수정된다!!)
//               첫번쨰 매게변수는 수정시작할 인덱스
//               두번쨰 매게변수는 제거할 인덱스 수
//               나머지 매게변수는 배열에 추가할 요소들
// const arr = [1,5,7];
// arr.splice(1,0,2,3,4); //1번쨰 인덱스에서 0개 제거 그자리에 2,3,4 추가
// console.log(arr); //[ 1, 2, 3, 4, 5, 7 ]  
// arr.splice(5,0,6);//5번째 인덱스에서(7) 0개 제거 그자리에 6 추가
// console.log(arr); //[ 1, 2, 3, 4, 5, 6, 7 ]
// arr.splice(1,2); //1번쨰 인덱스에서 2개 제거 [2,3] 제거
// console.log(arr); //[ 1, 4, 5, 6, 7 ]
// arr.splice(2,1,'a','b'); // 2번째 인덱스에서 1개 제거[5] 'a','b'  추가
// console.log(arr); //[ 1, 4, 'a', 'b', 6, 7 ]

//배열안에서 요소 교체하기(실제랑 책이랑 좀 다르다...)
//copyWithin메서드 : 배열이 수정된다. 
//                  첫번쨰 요소는 선택된 인덱스를 삭제한다.(2번쨰 3번째에서 복사한만큼 앞에서 삭제한다.)
//                  두번째 요소는 선택된 인덱스 부터 복사 시작한다.(default:0)
//                  세번째 요소는 선택된 인덱스전까지 복사한다. (default : arr.length)
//*중요한건 2,3번째에서 복사한만큼 첫번쨰선택한 인덱스에서 삭제한다는 것이다.(전체배열길이는 같다)
// const arr = [1,2,3,4,5,6,7];
// arr.copyWithin(1,-4,-1); //1번쨰 인덱스[2] 선택, -4번인덱스[4]부터, -1번인덱스[7]전까지 복사
//                         //4~6까지 복사 후 2에 붙여넣는다. 그리고 복사한만큼 나머지수도 없어진다.
//                         //그래서 아래와 같은 결과가 나온다. (*전체배열길이는 그대로이다.)
// console.log(arr); //[ 1, 4, 5, 6, 5, 6, 7 ]
// arr.copyWithin(4,1,4); //위의 수가 보기싫어 456을 연속하는 수로 바꿔보자
//                     // 바꿀 인덱스 선택 4번째인덱스 선택,
//                     // 1번인덱스[4] 부터 4번인덱스까지(*전인덱스 기준이므로[6]선택한것임) 
//                     // 복사를 선택한게 [4,5,6] 이고 수정할 위치는 [5] 부터이므로
//                     // [4,5,6] -> [5] 자리로 들어가는것인데 배열의 길이가 같아야 하므로
//                     // [5,6,7] -> [4,5,6]으로 바뀌는 것이다.
// console.log(arr); //[ 1, 4, 5, 6, 4, 5, 6 ]


//특정값으로 배열 채우기
//fill메서드 : 배열의 내부를 채운다.(배열 수정됨!!)
//             첫번째 요소는 추가할 인자이다.
//             두번째 요소는 시작 인덱스이다.
//             세번째 요소는 끝 인덱스이다(선택된 인덱스 전까지임!!)
// const arr = new Array(5).fill(1);
// console.log(arr); //[ 1, 1, 1, 1, 1 ]
// arr.fill("a");
// console.log(arr); //[ 'a', 'a', 'a', 'a', 'a' ]
// arr.fill("b",1);
// console.log(arr); //[ 'a', 'b', 'b', 'b', 'b' ]
// arr.fill("c",2,4);
// console.log(arr); //[ 'a', 'b', 'c', 'c', 'b' ]
// arr.fill(5.5,-4);
// console.log(arr); //[ 'a', 5.5, 5.5, 5.5, 5.5 ]
// arr.fill(0,-3,-1);
// console.log(arr); //[ 'a', 5.5, 0, 0, 5.5 ]

//배열 정렬과 역순 정렬
//reverse메서드 : 기존의 배열을 반대로 바꾼다.
//sort메서드 : 기존의 배열을 순서대로 바꾼다.
//위의 두개 메서드는 배열 안의 프로퍼티에 대해서도 정렬이 된다.
// const arr = [1,2,3,4,5];
// arr.reverse();
// console.log(arr); //[ 5, 4, 3, 2, 1 ]
// arr.sort();
// console.log(arr); //[ 1, 2, 3, 4, 5 ]
// const arr1 = [{name:"Trevor"},{name:"Suzanne"},{name:"Jim"},{name:"Amanda"}];
// arr1.sort();    //arr1은 그대로이다.
// console.log(arr1);
// // [ { name: 'Trevor' },
// //   { name: 'Suzanne' },
// //   { name: 'Jim' },
// //   { name: 'Amanda' } ]
// // 그냥 원래 쓴 순서대로이다.
// arr1.sort((a,b)=>a.name>b.name); //arr1은 name프로퍼티의 알파벳순으로 정렬된다.
// console.log(arr1);
// // [ { name: 'Amanda' },
// //   { name: 'Jim' },
// //   { name: 'Suzanne' },
// //   { name: 'Trevor' } ]
// arr1.sort((a,b)=>a.name[1]<b.name[1]);
// //arr1은 name 프로퍼티의 두번째 글자의 알파벳 역순으로 정렬된다.
// console.log(arr1);
// // [ { name: 'Suzanne' },
// //   { name: 'Trevor' },
// //   { name: 'Amanda' },
// //   { name: 'Jim' } ]
// arr1.sort((a,b)=>a.name[-3]>b.name[-3]);
// console.log(arr1);
// // [ { name: 'Suzanne' },
// //   { name: 'Trevor' },
// //   { name: 'Amanda' },
// //   { name: 'Jim' } ]
// // sort를 하고 배열에 -3,-1 같은 음수를 넣으면 실행이 안된다.. 그냥 이전꺼 그대로 나옴..
// arr1.reverse((a,b)=>a.name[3]>b.name[3]);
// console.log(arr1);
// // [ { name: 'Jim' },
// //   { name: 'Amanda' },
// //   { name: 'Trevor' },
// //   { name: 'Suzanne' } ]
// // reverse메서드는 어떤 수를 넣던간에... 그냥 reverse()만 실행되는 것을 확인할 수 있다.
// //참고로 숫자정렬시 sort는 2자리 숫자가 있으면 그냥 정렬되기 때문에 아래와 같이 사용해야한다
// //(reverse()도 아래와 같이 써도 되고 sort((a,b) => b-a); 로 하면 reverse()와 같은 효과가 난다
// let abc = [1,2,11,13];
// abc.sort();
// console.log(abc);//[ 1, 11, 13, 2 ]
// abc.sort((a,b) => a-b);
// console.log(abc);//[ 1, 2, 11, 13 ]

//배열 검색
//indexOf() : 배열안에서 요소를 찾는다. 찾는 요소의 인덱스값을 리턴한다.
//            첫번째 요소는 찾고자하는 요소
//            두번째 요소는 선택된 인덱스부터 검색시작
//lastIndexOf() : 배열안에서 요소를 찾는다. 찾는 요소의 인덱스값을 리턴한다.(뒤에서 검색)
//                첫번쨰 요소는 찾고자하는 요소
//                두번째 요소는 뒤에서 시작한 인덱스부터 검색시작
// const o ={name:"Jerry"};
// const arr = [1,5,"a",o,true,5,[1,2],"9"];
// console.log(arr.indexOf(5)); //1
// console.log(arr.lastIndexOf(5)); //5 
// console.log(arr.indexOf("a")); //2
// console.log(arr.lastIndexOf("a")); //2
// console.log(arr.indexOf({name:"Jerry"})); //-1 arr배열에 없으므로 -1 리턴함.
// console.log(arr.indexOf(o)); //3
// console.log(arr.indexOf([1,2])); //-1  배열안의 배열은 검색이 안되는것 같다....
// console.log(arr[6]); //[ 1, 2 ]
// console.log(arr[6][1]); //2
// console.log(arr.indexOf("9")); //7
// console.log(arr.indexOf(9)); //-1
// console.log(arr.indexOf("a",5)); //-1 5번째 인덱스 이후는 "a"가 배열에 없으므로 -1 리턴
// console.log(arr.indexOf(5,5)); //5
// console.log(arr.lastIndexOf(5,4)); //1 뒤에서4번째 인덱스[o] 앞을 검색 
// console.log(arr.lastIndexOf(true,3)); //-1  뒤에서3번째 인덱스[true] 앞을 검색하기
//                                     //때문에 없어서 -1 리턴함..


// //findIndex() : 일치하는 요소가 없을때 -1리턴하고 있으면 indexOf()랑 같지만 
// // 보조함수를 써서 검색조건을 지정할 수 있다.
// //find() : 인덱스가 아닌 요소 자체를 원할때 find 사용.
// // 역시 보조함수를 써서 검색할 수 있다. 요소가 없으면 undefined 출력
// const arr = [{id:5, name:"Judith"},{id:7, name:"Francis"}];
// console.log(arr.findIndex(o=>o.id === 5)); //0
// console.log(arr.findIndex(o=>o.name === "Francis")); //1
// console.log(arr.findIndex(o=>o.id === 3)); //-1
// console.log(arr.findIndex(o=>o === 1)); //-1
// //
// console.log(arr.find(o=>o.id === 5)); //{ id: 5, name: 'Judith' }
// console.log(arr.find(o=>o.id === 2)); //undefined
// // find() 는 응용해서 좀 더 제대로 쓸 수 있다. 아래의 예제를 보자
// const arr1 = [1,17,16,5,4,16,10,3,49];
// console.log(arr1.find((x,i)=>i>2 && Number.isInteger(Math.sqrt(x)))); //4
// console.log(arr1.find((x,i)=>x>2 && Number.isInteger(Math.sqrt(i)))); //17 
// //제곱수인덱스부터검색 그래서 인덱스 1부터 검색함
// //
// //아래에 좀 더 자세히 옵션에 대해 썻지만 첫번째요소는 배열내 요소값으로 Math.sqrt를 통해
// //배열 내에 제곱수가 있는지 확인을 하고, 두번째요소는 배열내 인덱스 값으로 인덱스2[16]
// //find(currentValue, index, arr)이다.
// //currentValue : 무조껀 써야하는 것이고, 배열의 요소값이다.(검색조건!)
// //index : 검색을 시작할 인덱스위치번호이다.(옵션사항이다.)
// //arr : find 함수를 호출할 배열 객체(옵션사항이다.)(이건 어떻게쓰는지 잘모르겠다...)
// //왜냐하면 arr1.find() 이렇게 배열객체를 지정하고 쓰는건데.. 모르겠다..


// //find에서 this 매개변수를 이용하여 찾는 방법을 알아보자
// class Person{           //Person 클래스 생성 및 생성자 만듬..
//     constructor(name){
//         this.name = name;
//         this.id = Person.nextId++;
//     }
// }
// Person.nextId = 0;  //초기값 설정
// const jamie = new Person("Jamie"),
//     juliet = new Person("Juliet"),
//     peter = new Person("Peter"),
//     jay = new Person("Jay");
// const arr = [jamie, juliet, peter, jay];    //위에서 만든 객체들 배열에 넣음.
// //옵션1: ID를 직접 비교하는 방법
// console.log(arr.find(p=>p.id === juliet.id)); //Person { name: 'Juliet', id: 1 }
// //옵션2: "this" 매개변수를 이용하는 방법
// console.log(arr.find(function(p){
//     return p.id === this.id
// }, juliet)); //Person { name: 'Juliet', id: 1 }
// //
// console.log(arr.find(p=>p.id === this.id),juliet);
// //undefined Person { name: 'Juliet', id: 1 } 앞에 undefined가 뜬다 화살표함수는 this를 가지고 있기 때문이다
// console.log(typeof juliet);
// //object
// //=> 화살표함수를 쓴건.. find(currentValue, index, arr) 의 세번째 요소인 배열객체가 안 들어갔고, 
// //첫번째는 ()로 arr이 juliet 객체가 들어가서 잘 나오는 것이다.


// //some과 every (둘다 값을 찾기만 함.. 배열값 수정안함!!)
// //some() : 배열에서 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true값 리턴 없으면 false 리턴
// //every() : 배열의 모든 요소가 조건에 맞아야 true값 리턴 아니면 false 리턴
// const arr = [5,7,12,15,17];
// console.log(arr.some(x => x%2 === 0)); //true  12가 짝수이므로 true 값 리턴
// console.log(arr); //[ 5, 7, 12, 15, 17 ]
// console.log(arr.some(x => Number.isInteger(Math.sqrt(x)))); //false  제곱수가 없으므로 false값 반환

// const arr1 = [4,6,16,36];
// console.log(arr1.every(x => x%2 === 0)); //true  배열에서 홀수가 없다.
// console.log(arr1.every(x => Number.isInteger(Math.sqrt(x)))); //false  배열안에서 6이 제곱수가 아니다.


// // map, filter 메서드 (*둘다 원래의 배열을 수정하진 않는다.)
// //map() : 지정한 함수의 리턴값으로 배열을 생성한다.(콜백함수의 리턴을 모아 배열생성)
// //어떠한 배열에 특정 규칙을 적용시켜 새로운 배열을 만든다.
// //filter() : 지정한 함수의 리턴값으로 배열을 생성한다.(기존의 배열에서 값을 걸러 배열에넣음)
// //배열에 조건을 주어 조건에 만족하지 못하는 원소들을 걸러낸다.
// const cart = [{name: "widget", price:9.95}, {name:"Gadget",price:22.95}];
// const names = cart.map(x => x.name);
// console.log(names); //[ 'widget', 'Gadget' ]
// console.log(cart); //기존의 배열은 그대로이다.
// // [ { name: 'widget', price: 9.95 },
// //   { name: 'Gadget', price: 22.95 } ]
// const prices = cart.map(x => x.price);
// console.log(prices); //[ 9.95, 22.95 ]
// const discountprices = prices.map(x=>x*0.8);
// console.log(discountprices); //[ 7.96, 18.36 ]
// //위의 분리된 객체를 하나로 합쳐보자 (분리된것을 cart1에 합칠 예정)
// const cart1 = names.map((x,i)=>({name:x, price:prices[i]}));
// //{}객체를 ()로 감싼 이유는 이렇게 하지 않으면 화살표 표기법에서 
// //객체리터럴의 중괄호를 블록으로 판단하기 때문이다.
// // const cart1 = names.map((x,i)=>{name:x, price:prices[i]});
// //                                              ^
// // Unexpected token :
// //위와같은 에러 발생 ({}) 를 해주면 괜찮다.
// console.log(cart1);
// // [ { name: 'widget', price: 9.95 },
// //   { name: 'Gadget', price: 22.95 } ]



// //다른 예제를 살펴보자
// //카드 덱을 만든다.
// const cards =[];
// for(let suit of ['H','C','D','S']){ //하트, 클로버, 다이아몬드, 스페이드
//     for(let value=1; value<=13; value++){ //숫자를 1~13까지 2중 for문으로 문자에 13개 숫자추가
//         cards.push({suit,value}); //{}는 객체의 프로퍼티에 값을 할당하기 위해 씀.
//     }
// }
// //value 가 2인 카드
// console.log(cards.filter(c=>c.value === 2));
// // [ { suit: 'H', value: 2 },
// //   { suit: 'C', value: 2 },
// //   { suit: 'D', value: 2 },
// //   { suit: 'S', value: 2 } ]
// // filter로 도출한 값을 변수에 넣지않으면 그냥 검색에 지나지 않는다.

// //다이아몬드 검색
// console.log(cards.filter(c=>c.suit === "D"));
// // [ { suit: 'D', value: 1 },
// //   { suit: 'D', value: 2 },
// //   { suit: 'D', value: 3 },
// //   { suit: 'D', value: 4 },
// //   { suit: 'D', value: 5 },
// //   { suit: 'D', value: 6 },
// //   { suit: 'D', value: 7 },
// //   { suit: 'D', value: 8 },
// //   { suit: 'D', value: 9 },
// //   { suit: 'D', value: 10 },
// //   { suit: 'D', value: 11 },
// //   { suit: 'D', value: 12 },
// //   { suit: 'D', value: 13 } ]

// //킹, 퀸, 주니어 
// console.log(cards.filter(c=>c.value>10));
// // [ { suit: 'H', value: 11 },
// //   { suit: 'H', value: 12 },
// //   { suit: 'H', value: 13 },
// //   { suit: 'C', value: 11 },
// //   { suit: 'C', value: 12 },
// //   { suit: 'C', value: 13 },
// //   { suit: 'D', value: 11 },
// //   { suit: 'D', value: 12 },
// //   { suit: 'D', value: 13 },
// //   { suit: 'S', value: 11 },
// //   { suit: 'S', value: 12 },
// //   { suit: 'S', value: 13 } ]

// //하트의 킹, 퀸, 주니어
// console.log(cards.filter(c => c.value > 10 && c.suit === 'H'));
// // [ { suit: 'H', value: 11 },
// //   { suit: 'H', value: 12 },
// //   { suit: 'H', value: 13 } ]

// //위의 코드에서 추가한 것이다.
// //진짜 카드처럼 그림은 유니코드로 바꾸고, 숫자는 몇개는 문자로 바꾼다.. 
// function cardToString(c){ //suits와 values 객체배열을 만들고 원하는 문자열을 리턴으로 합친다.
//     const suits = {'H':'\u2665', 'C':'\u2663', 'D':'\u2666', 'S':'\u2660'};
//     const values = {1:'A', 11:'J', 12:'Q', 13:'K'};
//     //cardToString을 호출할때 마다 매번 값을 만드는 건 그리 효율적인 방법이 아니다.
//     //더 효율적인건 독자의 연습문제로 남긴다.. (아마 관련 배열 객체를 만드는게 나은거같다)
//     for(let i=2; i<=10; i++){ //함수를 실행할 때마다 values를 추가한다.
//         values[i] = i; //처음 객체의 프로퍼티 만들때만 :를 쓰고 그 다음은 =을 써도 된다.
//     }
//     return values[c.value] + suits[c.suit];
// }
// //value가 2인 카드
// console.log(cards.filter(c => c.value === 2).map(cardToString));
// //[ '2♥', '2♣', '2♦', '2♠' ]
// //.map(cardToString)를 안붙였을때는 아래와 같이 출력됨.
// // [ { suit: 'H', value: 2 },
// //   { suit: 'C', value: 2 },
// //   { suit: 'D', value: 2 },
// //   { suit: 'S', value: 2 } ]

// //하트의 킹,퀸, 주니어출력
// console.log(cards.filter(c => c.value > 10 && c.suit === 'H').map(cardToString));
// //[ 'J♥', 'Q♥', 'K♥' ]

// // *나중에 저자가 낸 연습문제 한번 풀어보자

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


//////////////////
//https://bblog.tistory.com/300  사이트 + 교재 참고
//reduce()메서드 : 
// map이 배열의 각 요소를 변형한다면.. reduce는 배열 자체를 변형한다.
// reduce라는 이름이 붙은 이유는 배열을 값 하나로 줄이는데 사용되기 때문이다.
// 예를 들면 배열에 들어있는 숫자를 더하거나 평균을 구할때 배열을 값하나로 줄인다.
// 하지만!! reduce가 리턴하는 값은 객체일수도 있고, 다른 배열일 수도 있다.
// reduce는 map,filter,find를 대신할 수 있다
//
// @@reduce는 for..of 문처럼 배열 내에서 한칸씩 계속 돌며 배열안을 전부 돌린다.@@
// (만약 어떤 함수를 만들면 그 함수를 배열내에서 for of 문으로 계속 돌린다.)

// //책의 예제 (0을 줘서 초기값 설정)
// const ex1 = [5,7,2,4];
// const sum = ex1.reduce((a,x) => a += x, 0);
// console.log(sum); //18

// //책의 예제 (초기값 설정x)
// const sum1 = ex1.reduce((a,x) => a += x);
// console.log(sum1); //18 

//책의 예제는 결과값은 똑같이 나오지만.. 내부에서 얼마나 호출됬는지 알 수 없다..
//그래서 블로그의 예제를 사용해서 count를 추가했다..

// //블로그 예제(0을 줘서 초기값 설정)
// const book1 = [5,7,2,4];
// let count =0;
// const booksum1 = book1.reduce(function(pre,value){
//     count ++;
//     return pre + value;
// },0); //초기값0 설정
// console.log(booksum1,count);  //18 4
// //배열의 길이가 4이고 초기값을 0으로 줘서 4번 실행됨

// //블로그 예제(초기값 0 설정X)
// let count1 = 0;
// const booksum2 = book1.reduce(function(pre, value){
//     count1 ++;
//     return pre + value;
// });
// console.log(booksum2, count1); //18 3
// //배열의 길이가 4이고 초기값을 설정안 했기 때문에 3번 실행됨.
// //배열의 2번째부터 실행됨.. 


// //책에 나온 다른 예제를 보자
// const words = ["Beachball", "Rodeo", "Angel",
//  "Aardvark", "Xylophone", "November", "Chocolate",
//  "Papaya", "Uniform", "Joker", "Clover", "Bali"];
// const alphabetical = words.reduce((a,x)=>{
//     if(!a[x[0]]){
//         a[x[0]] = [];
//         console.log('=>>',a);
//     }
//     a[x[0]].push(x);
//     return a;
// },{});
// console.log(words[1][0]); //R
// console.log(alphabetical);
// // { B: [ 'Beachball', 'Bali' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [ 'Chocolate', 'Clover' ],
// //   P: [ 'Papaya' ],
// //   U: [ 'Uniform' ],
// //   J: [ 'Joker' ] }
// //
// //위의 코드를 디버그 한 결과를 아래 캡쳐해놨다. 기본원리는 이렇다.
// // =>> { B: [] }
// // =>> { B: [ 'Beachball' ], R: [] }
// // =>> { B: [ 'Beachball' ], R: [ 'Rodeo' ], A: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [ 'Chocolate' ],
// //   P: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [ 'Chocolate' ],
// //   P: [ 'Papaya' ],
// //   U: [] }
// // =>> { B: [ 'Beachball' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [ 'Chocolate' ],
// //   P: [ 'Papaya' ],
// //   U: [ 'Uniform' ],
// //   J: [] }
// // R
// // { B: [ 'Beachball', 'Bali' ],
// //   R: [ 'Rodeo' ],
// //   A: [ 'Angel', 'Aardvark' ],
// //   X: [ 'Xylophone' ],
// //   N: [ 'November' ],
// //   C: [ 'Chocolate', 'Clover' ],
// //   P: [ 'Papaya' ],
// //   U: [ 'Uniform' ],
// //   J: [ 'Joker' ] }
// //reduce에 a,x 인자중 처음 {} 빈객체가 초기값이므로 
// //a{} 객체가 생성되고, words의 첫번째요소 첫번째단어가 있는지 확인(if문)
// //없으면 첫단어의 빈 배열 생성 a{B[]} 가 생성되는 것이다.
// //이후 생성된 a{B[]} 에 x인자("Beachball")를 추가시킨다.
// //추가시킨 후 리턴을 통해 다음인자("Rodeo")로 넘어간다.
// //
// //위의 예제에서 좀 다르게 바꾼 것이다.
// const longWords = words.reduce((a,w) => w.length>6 ? a + " " + w : a, "").trim();
// console.log(longWords);
// //Beachball Aardvark Xylophone November Chocolate Uniform 
// // Beachball Aardvark Xylophone November Chocolate Uniform
// // 위는 trim()을 쓴것이고 아래는 안쓴것... 양끝의 빈공간을 없애준다.



//책의 다른 예제를 보자

// 분산구하는법(까먹었다... 젠장)
//[1,2,3,4,5] 가 있을때  평균은 3이다.(1+2+3+4+5)/5 = 3
//[-2,-1,0,1,2] 각 인자에서 평균을 뺸다.
//[4,1,0,1,4] 그 인자들을 제곱하고 총합을 구한다.
//(4+1+0+1+4)/5 = 2    총합/인자수 = 분산이다.
//여기서 분산은 2,  표준편차는 루트2 이다! 

// const data =[3.3, 5, 7.2, 12, 4, 5, 10.3];
// //도널드 커누스(Donald Knuth가 분산 계산을 위해 만든 알고리즘이다.
// //'컴퓨터 프로그래밍의 예술 : 준수치적 알고리즘(개정 3판)'
// const stats = data.reduce((a,x) => {
//     a.N++;
//     let delta = x - a.mean;
//     a.mean += delta/a.N;
//     a.M2 += delta*(x - a.mean);
//     return a;
// },{N:0, mean:0, M2:0});
// if(stats.N > 2){
//     stats.variance = stats.M2 / (stats.N - 1);
//     stats.stdec = Math.sqrt(stats.variance); //Math.sqrt() 는 값에 루트를 씌워준다.
// }
// console.log(stats);
// // { N: 7,
// //     mean: 6.685714285714286,
// //     M2: 65.92857142857143,
// //     variance: 10.988095238095239,
// //     stdec: 3.3148295941262558 }

// //위의 순서를 보면 reduce함수를 전부 돌리고 나서 if(stats.N)으로 넘어간다.




// //아래는 블로그의 예제들이다.


// // map - 문자열 배열에서 문자열 길이만 획득하기
// // reduce로 구현
// var arr = ['foo', 'hello', 'diamond', 'A'];
// var arr4 = arr.map(function(str){
//     return str.length;
// });
// var arr2 = arr.reduce(function (pre, value) {
//     pre.push(value.length);
//     return pre;
// }, []);
// console.log(arr2); // [3, 5, 7, 1]  reduce사용
// console.log(arr4); //[ 3, 5, 7, 1 ] map사용
// // arr2의 끝에 []를 줘서 빈배열을 주고, pre는 그 빈 배열의 index값이고,
// // value는 arr[value]의 값이다. 그리고 그걸 pre.push를 통해 빈배열에 추가하고,
// // 그것을 return 하는 개념인것 같다. 
// // reduce가 왼쪽 -> 오른쪽으로 배열을 이동하기 때문에 자동으로 배열이 끝날때까지
// // 이작업이 반복되면 빈배열에 함수의 리턴값이 쌓이기 때문에 원하는 구문이 완성된다.

// //위의 예를 살짝 바꿔보자
// const arr3 = arr.reduce(function(pre,value){
//     pre.push(value);
//     return pre;
// },[]);
// console.log(arr3); //[ 'foo', 'hello', 'diamond', 'A' ]  위의 내용을 그대로 복사한것이다.


// // filter - 정수 배열에서 5의 배수인 정수만 모으기
// // reduce로 구현
// var arr5 = [4, 15, 377, 395, 400, 1024, 3000];
// var arr6 = arr5.filter(function(n){ //filter 쓴것
//     return n % 5 == 0;
// })
// var arr7 = arr5.reduce(function(pre,value){ //reduce 쓴것
//     if(value % 5 == 0){
//         pre.push(value);
//     }
//     return pre;
// },[])
// console.log(arr6); //[15, 395, 400, 3000]
// console.log(arr7); //[15, 395, 400, 3000]


// // find - 정수 배열에서 5의 배수인 정수 '하나' 찾기
// // reduce로 구현
// var arr8 = [4, 15, 377, 395, 400, 1024, 3000];
// var arr9 = arr8.find(function(x){
//     return x % 5 == 0;
// });
// var arr10 = arr8.reduce(function(pre,value){
//     if(pre === undefined && value % 5 == 0){
//         pre = value;
//     }
//     return pre;
// },undefined);
// console.log(arr9); //15
// console.log(arr10); //3000 (초기값을 undefined로 안하면 끝까지 실행되기 떄문에)
//                     //15 (초기값을 undefined로 설정하고 if문제 조건문을 주면)

              

// /////////////////////////
// //문자열 병합
// //join() : 기본값은 , 이고(합칠때 아무것도 안쓰면 , 로 구분한다.)
// // 문자열을 합칠때 null, undefined, 삭제된 요소 전부 빈 문자열 취급한다.
// const arr11 = [1,null, "hello", "world", true, undefined];
// delete arr11[3];
// console.log(arr11); //[ 1, null, 'hello', <1 empty item>, true, undefined ]
// const arr12 = arr11.join();
// console.log(arr12); //1,,hello,,true,    
// console.log(arr11.join(' ')); //1  hello  true
// console.log(arr11.join(' -- ')); //1 --  -- hello --  -- true --

// ////////////////////////////////
// //문자열 관련
// //split() : 기존의 문자열에 변화를 주지는 않는다.
// var string = "hello";
// string.split('');
// console.log(string.split(''));
// console.log(string);
// // [ 'h', 'e', 'l', 'l', 'o' ]
// // hello
// console.log(string.slice(1,3));
// //el
// var a = 'hello', b='world', c='  Programmer  ';
// a.concat(b);
// console.log(a);
// console.log(a.concat(b));
// // hello
// // helloworld
// console.log(c);
// console.log(c.trim());
// //   Programmer
// // Programmer
// console.log(a.toUpperCase());
// console.log(a.toLowerCase());
// // HELLO
// // hello


///////////////////////////////////////////////////
// //reduece로 구현한 버블정렬
// const sortingReducer = (accumulator, value) => {
//     //accumulator[] 안의 요소값 보다 작은 요소 인덱스 찾음 (findIndex()는 배열을 돌며 찾으면 해당인덱스 없으면 -1)
//     const nextIndex = accumulator.findIndex(i => value < i );
//     console.log('=>',nextIndex,accumulator.length);  //i는 배열내에서 순환하는 인덱스, value는 그다음 인덱스
//     //accumulator[] 안의 요소값들보다 작은 요소값이 있다면 그 인덱스를 선택, 없다면 맨뒤로 인덱스 선택
//     const index = nextIndex > -1 ? nextIndex : accumulator.length;
//     console.log('index=>>',index);
//     console.log('value=>>',value);
//     //accumulator[] 안에 splice로 인덱스에 맞는 값을 넣는다
//     accumulator.splice(index, 0, value);
//     console.log(accumulator);
//     return accumulator;
//   }
// const input = [6,4,9,5];
// const output = input.reduce(sortingReducer, []);
// console.log(output);
// // => -1 0
// // index=>> 0
// // value=>> 6
// // [ 6 ]
// // => 0 1
// // index=>> 0
// // value=>> 4
// // [ 4, 6 ]
// // => -1 2
// // index=>> 2
// // value=>> 9
// // [ 4, 6, 9 ]
// // => 1 3
// // index=>> 1
// // value=>> 5
// // [ 4, 5, 6, 9 ]
// // [ 4, 5, 6, 9 ]

// //////////////////////다른 방식의 버블정렬
// let bubble_sort = (array)=>{
//     var length = array.length;
//     var temp;
//     for(let i=0; i<length-1; i++){
//         for(let j=0; j<length-1-i; j++){
//             if(array[j]>array[j+1]){
//                 temp = array[j];
//                 array[j] = array[j+1];
//                 array[j+1] = temp;
//             }
//         }
//     }
//     return array;
// };
// let input1 = [6,4,9,5];
// console.log(input1);
// console.log(bubble_sort(input1));


// //////////////////////////////////////////////////////////
// //Map,reduce 에 대해  (https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d)
// //map 메서드는 다음과 같이 사용합니다. 
// //=> 배열.map((요소, 인덱스, 배열) => { return 요소 });
// //map의 기본 원리는 간단합니다. 반복문을 돌며 배열 안의 요소들을 1대1로 짝지어 주는 것입니다
// const oneTwoThree = [1,2,3];
// let result = oneTwoThree.map((v)=>{
//     console.log(v);
//     return v
// });
// console.log(oneTwoThree);//[ 1, 2, 3 ]
// console.log(result);//[ 1, 2, 3 ]
// console.log(oneTwoThree === result);//false
// //반복문으로 요소를 순회(1, 2, 3 순서로)하면서 각 요소를 어떻게 짝지어줄지 알려줍니다. 
// //함수가 그냥 return v를 하기 때문에 같은 값을 그대로 짝짓습니다. 
// //알아둘 점은, map을 실행하는 배열과 결과로 나오는 배열이 다른 객체라는 것입니다. 
// //기존 배열을 수정하지 않고 새로운 배열을 만들어냅니다. 
// //!!!!단, 배열 안에 객체가 들어있는 경우, 객체는 공유됩니다.!!
// result1 = oneTwoThree.map((v)=>{
//     return v+1;
// });
// console.log(result1);//[ 2, 3, 4 ]

// result2 = oneTwoThree.map((v)=>{
//     if(v % 2){
//         return '홀수';
//     }
//     return '짝수';
// });
// console.log(result2);//[ '홀수', '짝수', '홀수' ]


// //reduce
// //reduce 메서드는 다음과 같이 사용합니다. 
// //배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);

// //위 map의 예제를 reduce로 바꿔보자
// var result3 = oneTwoThree.reduce((acc,cur)=>{
//     acc.push(cur%2 ? '홀수' : '짝수');
//     return acc;
// },[]);
// console.log(result3);//[ '홀수', '짝수', '홀수' ]

// var result4 = oneTwoThree.reduce((acc,cur)=>{
//     if(cur%2) acc.push(cur);
//     return acc;
// },[]);
// console.log(result4);//[ 1, 3 ]

// //reduce는 비동기 프로그래밍을 할 때에도 유용합니다.
// const promiseFactory = (time)=>{
//     return new Promise((resolve,reject)=>{ //프로미스 방식으로 보냄(resolve,reject 포함)
//         console.log(time);
//         setTimeout(resolve,time); //resolve일때 setTimeout 작동
//     });
// };
// [1000, 2000, 3000, 4000].reduce((acc,cur)=>{
//     return acc.then(()=>promiseFactory(cur)); //resolve.then으로 받아서 함수 실행 배열의 순서대로 실행
// },Promise.resolve());  //초기값 resolve




/////////////////////////////////////////////////////////
//배열과 유사배열 (https://www.zerocho.com/category/JavaScript/post/5af6f9e707d77a001bb579d2)
var array = [1, 2, 3];
array; // [1, 2, 3]
var nodes = document.querySelectorAll('div'); // NodeList [div, div, div, div, div, ...]
var els = document.body.children; // HTMLCollection [noscript, link, div, script, ...]
//array는 배열이고, nodes와 els는 유사배열입니다.
Array.isArray(array); // true
Array.isArray(nodes); // false
Array.isArray(els); // false
//직접 배열 리터럴로 선언한 array만 배열입니다
//nodes나 els처럼 []로 감싸져있지만 배열이 아닌 친구들을 유사배열이라고 부릅니다. 

//배열과 유사배열을 구분해야 하는 이유는, 유사배열의 경우 배열의 메서드를 쓸 수 없기 때문입니다
array.forEach(function(el) { console.log(el); }); // 1, 2, 3
els.forEach(function(el) { console.log(el); }); // Uncaught TypeError: els.forEach is not a function
//els에 forEach같은 배열 메서드를 사용하면 에러가 발생합니다. (nodes는 프로토타입에 forEach가 있어서 됩니다.) 
//배열이 아니므로 발생하는 것입니다. 이럴 때 메서드를 빌려 쓰는 방법이 있습니다. 
//배열 프로토타입에서 forEach 메서드를 빌려오는 것이죠. 바로 call이나 apply입니다.
Array.prototype.forEach.call(nodes, function(el) { console.log(el); });
[].forEach.call(els, function(el) { console.log(el); });
//이제 유사배열에도 forEach를 사용할 수 있습니다.

//최신 자바스크립트에서는 Array.from으로 더 간단하게 할 수 있습니다.
Array.from(nodes).forEach(function(el) { console.log(el) });

//자주 보는(ES6에서는 더 이상 안 보이지만) 유사배열이 하나 더 있습니다. 
//function의 arguments입니다. 함수선언문에 넣은 인자 목록을 표시하죠.
function arrayLike() {
    console.log(arguments);
  }
arrayLike(4, 5, 6); // Arguments [4, 5, 6, callee, Symbol]

//역시 forEach같은 배열 메서드를 쓸 수 없으므로 문제가 됩니다. 위에서 설명한 방법을 적용해야 합니다
function arrayLike() {
    console.log(arguments);
    [].forEach.call(arguments, function(el) { console.log(el) });
  }
arrayLike(4, 5, 6);

//유사배열, 별 거 아니죠? 
//1) []로 감싸져 있다고 다 같은 배열이 아니라는 것과, 
//2) Array.isArray로 판별하는 방법, 
//3) 배열 프로토타입에서 메서드를 빌려쓰는 방법에 대해서 알아두시면 좋습니다!