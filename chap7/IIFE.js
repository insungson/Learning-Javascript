//http://blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=221027225353&beginTime=0&jumpingVid=&from=search&redirect=Log&widgetTypeCall=true&directAccess=false
//위의 블로거 내용 참조
////////////IIFE(Immediately Invoked Function Expression)에 대해 알아보자!!
//IIEF는 뜻 그대로 즉각적으로 실행되는 Function Expression을 말한다.
//우선 Function Expression은 아래처럼 변수에 이름 없는 함수를 대입한 구조를 말한다.

//function Expression
var greet = function(){
    return 'Hello';
}; //greet 는 함수이다.
console.log(greet()); //Hello
console.log(typeof greet); //function

//IIEF는 이런 function Expression 뒤에 ()를 붙여서 즉각적으로 실행시키는 것을 말한다.
//()를 붙이면 function -> String 으로 변환된다.
// IIEF 1단계!!
var greet1 = function(){
    return 'Hello';
}(); //greet1은 Hello가 된다.
console.log(greet1); //Hello
console.log(typeof greet1); //String

//IIEF는 아래처럼 인자를 대입할 수도 있다.
var greet2 = function(name){
    return 'Hello' + " " +name;
}('Son');
console.log(greet2); //Hello Son
//console.log(greet2()); //greet2 is not a function 
//greet2() 함수를 실행하면 에러발생 더이상 함수가 아니라 String이기 때문이다.
console.log(typeof greet2); //String


//자바스크립트는 function expression을 변수 대입없이 선언하면 에러가 발생한다.
//이는 Syntax parser가 코드를 한줄한줄 읽다가 'function' 이라는 키워드가 오게 되면
//functino statement로 인지하여 function expression 에는 없는 함수의 이름을 요구하기 때문이다.

// //정상(function statement)
// function greet3(){
//     return 'Hello';
// }
// //에러발생 (function expression)
// function(){         //식별자가 필요하다고 메시지 뜸..
//     return 'hello';
// }

//하지만!! 아래처럼 function expression를 ()괄호 안에 넣어주면 Syntax Parser을 속일 수 있다.

(function(){        //더이상 식별자가 필요하단 에러가 안뜬다.
    return 'Hello';
})
// 이렇게 ()소괄호로 Wrap 한 Function Expression은 뒤에 ()를 붙여서 바로 실행할 수 있게 된다.
// 그리고 이것이 IIEF의 완전체이다!!
//*참고로 뒤에 붙이는 ()는 아래의 예시처럼 ()소괄호 Wrapper 안쪽에 들어가도 되고 바깥쪽에 붙여도 된다.

//IIEF 2단계!!! (최종)  뒤에 붙이는 ()를 Wrapper 안쪽에 쓴것
console.log((function(name){
    var greet = 'Hello';
    return greet + ' ' + name;
}('Javascript'))); //Hello Javascript 

//뒤에 붙이는 ()를 Wrapper 바깥쪽에 쓴것
console.log((function(name){
    var greet = 'Hello';
    return greet + ' ' + name;
})('Javascript')); //Hello Javascript 


// IIFR의 활용
var user = (function(){
    var password = 12345;
    return {
        get : function(){
            return password;
        },
        set : function(newPassword){
            return password = newPassword;
        }
    };
})(); //
console.log(user.password); //undefined (이는 function 안의 var password가 아님)
console.log(user.get()); //12345
user.set(112233);
console.log(user.get()); //112233
