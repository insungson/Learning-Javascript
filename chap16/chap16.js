//Math 관련
//고정소숫점
const x = 19.51;
console.log(x.toFixed(3)); //19.510
console.log(x.toFixed(2)); //19.51
console.log(x.toFixed(1)); //19.5
console.log(x.toFixed(0)); //20
//이 숫자는 버림이 아니라 반올림이다.(round)
//Math.floor(값) : 소숫점 내림
//Math.ceil(값) : 소숫점 올림
//Math.round(값) : 소숫점 반올림
console.log(Math.floor(x));//19
console.log(Math.ceil(x));//20
console.log(Math.round(x));//20


//지수표기법
//toExponential()
const x = 3800.5;
console.log(x.toExponential(4)); //3.8005e+3
console.log(x.toExponential(3)); //3.801e+3
console.log(x.toExponential(2)); //3.80e+3
console.log(x.toExponential(1)); //3.8e+3
console.log(x.toExponential(0)); //4e+3
//앞과 마찬가지로 반올림한 결과가 출력된다.

//고정 전체 자리수
//소수점이 어디 나타나든 관계없이 숫자 몇개로 표현하느냐가 중요하다면 toprecision()을 사용
let x = 1000;
console.log(x.toPrecision(5)); //1000.0
console.log(x.toPrecision(4)); //1000
console.log(x.toPrecision(3)); //1.00e+3
console.log(x.toPrecision(2)); //1.0e+3
console.log(x.toPrecision(1)); //1e+3
x=15.335;
console.log(x.toPrecision(6)); //15.3350
console.log(x.toPrecision(5)); //15.335
console.log(x.toPrecision(4)); //15.34
console.log(x.toPrecision(3)); //15.3
console.log(x.toPrecision(2)); //15
console.log(x.toPrecision(1)); //2e+1

//다른 진수
//toString() 은 진수를 바꿔준다.
const x = 12;
console.log(x.toString()); //12 (10진수)
console.log(x.toString(10));//12 (10진수)
console.log(x.toString(16));//C (16진수)
console.log(x.toString(8)); //14 (8진수)
console.log(x.toString(2)); //1100(2진수)

// 상수
//기본적인 상수
console.log(Math.E); //2.718281828459045 자연로그의 밀수 log
console.log(Math.PI); //3.141592653589793

//로그 관련 상수는 Math 객체의 프로퍼티로 호출해도 되지만, 자주
//사용한다면 따로 상수에 할당하여 편리하게 사용하는게 좋다.
console.log(Math.LN2); //0.6931471805599453  (2의 자연로그)
console.log(Math.LN10); //2.302585092994046  (10의 자연로그)
console.log(Math.LOG2E); //1.4426950408889634 (Math.E의 밀수가 2인 로그 )
console.log(Math.LOG10E); //0.4342944819032518 (Math.E의 상용로그)

//대수 관련 상수
console.log(Math.SQRT1_2); //0.7071067811865476 (1/2의 제곱근)
console.log(Math.SQRT2);  //1.4142135623730951 (2의 제곱근)

//대수 함수
//거듭제곱
//Math.pow(x,y) : 
console.log(Math.pow(2,3)); //8
console.log(Math.sqrt(16)); //4
console.log(Math.cbrt(27)); //3
console.log(Math.exp(1)); //2.718281828459045

//거듭제곱 사진넣기
//로그함수 사진넣기
//기타함수 사진넣기 1,2
//난수함수 사진넣기
//삼각함수 사진넣기
//쌍곡선함수 사진넣기