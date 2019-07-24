// //예외와 에러처리

// //Error 객체
// //자바스크립트에는 내장된 Error 객체가 있고 객체는 에러처리에 간편하게 사용할 수 있다.
// //Error 인스턴스를 만들면서 에러메시지를 만들 수 있다.
// const err = new Error(`invalid email`); 
// //위와같이 Error 인스턴스를 만드는 것만으로는 아무일도 일어나지 않는다.
// //이 인스턴스는 에러와 통신하는 수단이다!!

// //아래의 코드를 보자 
// //이코드는 이메일 주소가 올바르면 이메일 주소를 문자열로 반환한다.
// //바르지 않다면 Error 인스턴스를 반환한다.
// function validateEmail(email){
//     return email.match(/@/) ? email : new Error(`invalid email : ${email}`);
// }

// const email = "jane@doe.com";

// const validatedEmail = validateEmail(email);
// if(validatedEmail instanceof Error){    //instanceof 연산자로 Error 인스턴스가  
//     console.log(`Error : ${validateEmaild.message}`); //반환되었는지 확인한다.
// }else{                                  //실제 Error 메시지는 message 프로퍼티에 있다.
//     console.log(`Valid email : ${validatedEmail}`)
// }
// //Valid email : jane@doe.com


// //////////////
// //try/catch와 예외처리
// //try catch 문은 뭔가를 시도하고 예외가 있으면 그것을 캐치한다.
// //예를 들면 위의 코드에서 프로그래머가 실수로 email에 문자열이 아닌 것을 할당할때 
// //지금의 코드에서 에러가 발생하고, 프로그램은 멈춰버린다. 
// function validateEmail(email){
//     return email.match(/@/) ? email : new Error(`invalid email : ${email}`);
// }

// const email = null // 프로그래머가 실수로 문자열이 아닌 null을 넣었다.
// try{
//     const validatedEmail = validateEmail(email);
//     // 위에서 에러 발생시 아래의 if문으로 안가고 catch 문으로 바로 간다.
//     console.log("/////////////////////////////"); // 이건 안찍힐것이다.
//     if (validatedEmail instanceof Error){
//         console.error(`Error : ${validatedEmail.message}`);
//     }else{
//         console.log(`Valid email: ${validatedEmail}`);
//     }
// }catch(err){
//     console.log(`Error : ${err.message}`);
// }
// // Error : Cannot read property 'match' of null


// ////////////////
// //에러일으키기
// //앞의 예제에서 try catch 문을 써서 문자열이 아닌 것에서 
// //match 메서드를 통해 자바스크립트에서 일어난 에러를 캐치했다.
// //직접 에러를 일으켜서 throw raise 예외 처리 작업을 시작할 수 있다.

// //예외 처리 기능이 있는 다른 언어와 달리 자바스크립트는 에러를 일으킬때 꼭 객체만이
// //아니라 숫자나 문자열 등 어떤 값이든 catch절에 넘길 수 있다.
// //하지만 Error 인스턴스를 넘기는게 가장 편하다. 
// //대부분 catch 블럭들은 Error 인스턴스를 받을 것이라 간주하고 만든다.
// //예를 들면 당신이 만든 함수를 동료가 사용한다면 그 동료는 Error인스턴스를 받을 것으로 생각할 것이다.

// //은행 앱에 사용할 현금 인출 기능을 만든다고 생각해보자
// //계좌의 잔고가 요청받은 금액보다 적다면 예외를 일으켜야 한다. 
// //(현금 인출 단계에 들어가기 전에 잔고를 체크하는게 먼저이기 때문에 잔고가 부족한건 예외적인 상황이다.)
// //아래의 코드를 보자
// function billPay(amount, payee, account){
//     if(amount > account.balance)    //계좌금액보다 찾는돈이 많으면 
//         throw new Error("insufficient funds"); //에러 발생시킨다.
//     account.transfer(payee, amount); //그가 아니면 돈을 찾는다.
// }



// /////////////////////////
// //예외 처리와 호출스택
// //a함수 -> b함수 -> c함수 이런 식으로 함수를 호출하게 코드를 연결한다.
// //만약 c함수가 실행중이라면 a,b 함수는 완료될 수가 없다. 이렇게 함수가 쌓이는것을 
// //호출스택(call stack)이라고 한다
// //만약 c함수에서 에러가 발생한다면 거슬러 올라가 c -> b -> a 식으로 에러가 호출될때까지 
// //역으로 호출스택에 따라 올라간다.

// //아래의 예를 보자
// function a(){
//     console.log('a : calling b');
//     b();
//     console.log('a : done');
// }
// function b(){
//     console.log('b : calling c');
//     c();
//     console.log('b : done');
// }
// function c(){
//     console.log('c : throwing error');
//     throw new Error('c error');
//     console.log('c : done');
// }
// function d(){
//     console.log('d : calling c');
//     c();
//     console.log('d : done');
// }

// try{
//     a();
// }catch(err){
//     console.log(err.stack);
// }

// try{
//     d();
// }catch(err){
//     console.log(err.stack);
// }
// // a : calling b
// // b : calling c
// // c : throwing error
// // Error: c error
// //     at c (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:100:11)
// //     at b (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:95:5)
// //     at a (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:90:5)
// //     at Object.<anonymous> (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:110:5)
// //     at Module._compile (module.js:653:30)
// //     at Object.Module._extensions..js (module.js:664:10)
// //     at Module.load (module.js:566:32)
// //     at tryModuleLoad (module.js:506:12)
// //     at Function.Module._load (module.js:498:3)
// //     at Function.Module.runMain (module.js:694:10)
// // d : calling c
// // c : throwing error
// // Error: c error
// //     at c (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:100:11)
// //     at d (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:105:5)
// //     at Object.<anonymous> (C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\chap11.js:116:5)
// //     at Module._compile (module.js:653:30)
// //     at Object.Module._extensions..js (module.js:664:10)
// //     at Module.load (module.js:566:32)
// //     at tryModuleLoad (module.js:506:12)
// //     at Function.Module._load (module.js:498:3)
// //     at Function.Module.runMain (module.js:694:10)
// //     at startup (bootstrap_node.js:204:16)

// //err.stack은 위와 같이 호출 스택의 역으로 볼수 있게 도와준다.



// /////////////////////////
// //try  catch   finally
// //try 블록의 코드가 HTTP 연결이나 파일 같은 일종의 '자원'을 처리할 때가 있다.
// //프로그램에서 이 자원을 계속 가지고 있을 수 없으므로 에러가 있든 없든 어느시점에선
// //이 자원을 해체해야한다!!
// //try 블록에서는 문을 원하는 만큼 쓸 수 있지만, 그중 어디서든 에러가 일어나서 자원을 
// //해체할 기회가 없어질수도 있기 때문에 try블록에서 자원을 해체하는건 안전하지 않다.
// //에러가 일어나야 실행되는 catch 블록도 안전하지 않다.
// //이런 이유로 finally가 필요한 것이다. 
// //finally블럭은 에러가 발생하든 발생하지 않든 반드시 호출되기 때문이다.

// try{
//     console.log("this line is executed...");
//     throw new Error("whoops");  //여길 주석처리하면 catch문 실행 안되고 아래는 실행됨.
//     console.log("this line is not...."); //throw 문이 있으면 if문 실행 안됨.
// }catch(err){
//     console.log("there was an error...")
// }finally{
//     console.log("...always executed");
//     console.log("perform cleanup here");
// }

// // this line is executed...
// // there was an error...
// // ...always executed
// // perform cleanup here