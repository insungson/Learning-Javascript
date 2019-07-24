// //자바스크립트의 숫자는 모두 더블 형식이다.
// //더블형식은 근사치이므로, 자바스크립틍서 숫자를 비교할때
// //경악스런 결과가 나온다.
// //자바스크립트에서 정수를 비교할때 그 정수가 안전한범위라면
// //(Number.MIN_SAFE_INTEGER ~ Number.MAX_SAFE_INTEGER 사이)
// //안심하고 정수를 사용할 수 있지만.. 소수점이 있는 숫자를 비교할땐
// //자바스크립트에서 쓰이는 특별한 숫자형 상수인 Number.EPSILON를 
// //써야한다. 아래의 예를 보자
// console.log(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
// //-9007199254740991 9007199254740991
// console.log(Number.EPSILON);
// //2.220446049250313e-16
// //// 예시

// let n =0;
// while(true){
//     n += 0.1;
//     if(n === 0.3){
//         break;
//     }
// }
// console.log(`Stopped at ${n}`);

// //위의 코드를 돌리면 멈추지않고 무한루프가 되는것을 확인할 수 있다. 
// //0.1이 더블형식으로 정확히 나타낼 수 없는 값이기 때문에
// //위의 코드는 0.3에서 멈추지 않고 그 값을 살짝 피해서 계속 실행된다.

// //이것은 Number.EPSILON 과 관계연산자를 사용해서 '느슨하게' 비교하여
// //반복문을 나갈 수 있게 한다. 아래의 코드를 보자

// let n =0;
// while(true){
//     n += 0.1;
//     if(Math.abs(n - 0.3) < Number.EPSILON) break;
// }
// console.log(`Stopped at ${n}`); //Stopped at 0.30000000000000004

// //Math.abs() 은 음수든 양수든 절대값으로 나오게 하는 함수이다.

// //문자열 병합
// //자바스크립트는 왼쪽 => 오른쪽으로 읽는다. 아래의 예를 보자
// console.log(3+5+"8"); //88 나옴 처음이 숫자 + 문자일땐 숫자로 읽는다.
// console.log("3"+5+8); //358 나옴 처음이 문자면 계속 문자열로 읽는다.

// x            y       x && y      x || y
// false      false      false      false
// false      true       false      true
// true       false      false      true
// true       true       true       true


//해체 할당
//=>객체나 배열을 변수로 헤체할 수 있다. 우선 객체해체부터 보자

// //객체를 선언한다.
// const obj = {b:2, c:3, d:4};
// //객체 해체할당
// const {a, b, c} = obj;
// console.log(a); // undefined  기존의 obj에 "a"프로처티가 없다.
// console.log(b); // 2
// console.log(c); // 3
// console.log(d); // ReferenceError: d is not defined 

// ** 객체를 해체할때는 반드시 변수이름과 객체의 프로퍼티 이름이 일치해야한다.
//위의 예제에서 a는 프로퍼티가 없어서 undefined로 할당되고, d는 프로퍼티가
//없으므로 선언조차되지 않는 것이다.(배열의 경우는 좀 다르다. 좀있다가 보자)

//** 다음 예제를 보자 **
//객체 선언
const obj = {b:2, c:3, d:4};
let a,b,c;
//아래의 코드는 에러가 일어난다.   ()를 안써서 그렇다.
//{a,b,c} = obj; //SyntaxError: Identifier 'obj' has already been declared
//아래의 코드는 오류없이 실행된다.
//해체 할당 : 객체나 배열을 변수로 해체할수 있다.
({a,b,c} = obj);
console.log(a,b,c); //undefined 2 3   
//위의 예제처럼 객체해체는 할당만으로 이뤄질 수 있지만, 할당만 하고 싶다면 ()를 써야한다.
//그래서 위에서 () 안쓴것이 에러가 난 것이다

//베열선언
const arr = [1,2,3];
//배열 해체 할당
let[x,y] = arr;
console.log(x,y); //1 2

//확산연산자 사용
const arr1 = [1,2,3,4,5];
let [x1,y1, ...rest] = arr1; //...  를 사용하면 남은 요소를 새배열에 할당가능
console.log(x1,y1,rest); //1 2 [ 3, 4, 5 ]

let a2=5, b2=10;
[a2,b2] = [b2,a2];
console.log(a2,b2); //10 5    배열은 프로퍼티완 달리 순서로 변경 가능


//if문의 다른 형식 표현방법
if(isPrime(n)){
    label = 'prime';
}else{
    label = 'non-prime';
}
//위의 코드는 아래와 같이 바꿀 수 있다.
label = isPrime(n) ? 'prime' : 'non-prime';

//아래의 if문도 한번 살펴보자
if(!options)options = {};
//위의 표션식은 OR문으로 간단하게 바꿀 수 있다.
options = options || {};