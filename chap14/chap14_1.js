// // 이부분은 비동기적 promise, generator 부분이 많이 했깔려서 블로그 자료들을 정리한 것이다.
// //https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
// // 위의 링크에서 참조했다.
// //
// //비동기처리란?
// //-> 특정코드의 연산이 끝날때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 특성이다.

// //비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax이다.
// //제이쿼리로 실제 웹서비스를 개발할때 ajax 통신을 빼놓을 수가 없다.
// //(보통화면에 표시된 이미지나 텍스트를 불러올 떄 서버에서 ajax통신을 통해 가져온다.)
// function getData(){
//     var tableData;
//     $.get('https://domain.com/product/1', function(response){
//         tableData = response;
//     });
//     return tableData;
// }
// console.log(getData()); //undefined
// // $.get()이 ajax통신을 하는 부분이다. 
// //https://domain.com 주소에 HTTP GET요청을 날려 1번 상품(prodect) 정보를 요청하는 코드이다.
// //위의 과정으로 데이터를 받으면 response 인자에 담기고 tableData에 데이터를 넣는다.
// //undefined가 출력된 이유는 $.get()이 데이터를 요청하고 받아올때까지 기다려주지 않고
// //다음코드인 return tableData; 를 실행했기 때문이다. 그래서 처음에 tableData가 설정하지 않아서 
// //undefined가 뜬 것이다.

// //위의 코드를 콜백을 이용하여 다시 짜보자
// function getData(callbackFunc){
//     $.get('https://domain.com/product/1', function(response){
//         callbackFunc(response); //서버에서 받은 데이터 response를 
//     });                         //callbackFunc() 함수로 넘김
// }

// getData(function(tableData){
//     console.log(tableData); //$.get()의 response값이 tableData에 전달됨.
// });

// ////////////////////
// //콜백 헬
// //비동기 동작을 위해 콜백함수를 계속 쓰는 경우이다.
// $.get('url', function(response){
//     parseValue(response, function(id){
//         auth(id, function(result){
//             display(result, function(test){
//                 console.log(test);
//             });
//         });
//     });
// });

// //콜백 헬 해결 방법
// //Promise나 Async가 있지만 일단 콜백헬을 분리하는 방식으로 이를 해결해보자
// function parseValueDone(id){
//     auth(id, authDone);
// }
// function authDone(result){
//     display(result, displayDone);
// }
// function displayDone(test){
//     console.log(test);
// }
// $.get('url', function(response){
//     parseValue(response, parseValueDone);
// });
// // 위의 콜백 헬을 좀더 개선한 것이다. 
// // 먼저 ajax 통신으로 받은 데이터를 parseValue()메서드로 파싱한다.
// //parseValueDone()에 파싱 한 데이터 id 값이 전달되고, auth()메서드가 실행된다.
// //auth()메서드에서 인증을 마치면 콜백함수 authDone()이 실행된다.
// //인증결과값인 result로 display()를 호출하면 마지막으로 displayDone()메서드가 
// //수행되면서 test가 출력된다.


// ////////////////////////////////
// //https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
// //위의 링크 블로그에서 가져왔다.
// //프로미스
// //처음의 콜백함수를 보자
// function getData(callbackFunc){
//     $.get('url주소/product/1', function(response){
//         callbackFunc(response); //서버에서 받은 response데이터 -> callbackFunc()함수에 넘김
//     });
// }
// getData(function(tableData){
//     console.log(tableData); //$.get()의 response값이 tabledata에 전달됨.
// });

// //위의 코드를 프로미스에 적용시켜보자
// function getData(callback){
//     //Promise 인스턴스 추가
//     return new Promise(function(resolve, reject){
//         $.get('url주소/product/1', function(response){
//             //데이터를 받으면 resolve()를 호출한다.
//             resolve(response);
//         });
//     });
// }
// //getData()의 실행이 끝나면 실해되는 then()
// getData().then(function(tableData){
//     //resolve()의 결과가 여기 실행됨. then()으로 받음
//     console.log(tableData); //$.get() 의 response 값이 tableData로 전달됨.
// });


// /////////////////////////
// //프로미스의 3가지 상태
// //Pending(대기) : 비동기처리 로직이 아직 완료되지 않은 상태
// //Fulfilled(이행) : 비동기처리가 완료되어 프로미스가 결과값을 리턴해준 상태
// //Reject(실패) : 비동기처리가 실패되거나 오류가 발생한 상태


// //Pending(대기) 
// //아래와 같이 new Promise() 메서드를 호출하면 Pending 상태가 된다.
// new Promise();
// //이제 new Promise() 메서드를 호출할때 콜백 함수의 인자로 resolve, reject에 접근이 가능하다.
// new Promise(function(resolve, reject){
//     //.....
// });


// //Fulfilled(이행) 또는 완료
// //아래와 같이 콜백함수의 인자 resolve를 실행시키면 Fulfilled(이행)상태가 된다.
// new Promise(function(resolve, reject){
//     resolve();
// });
// //그리고 이행상태에서 아래와 같이 then()을 통해 처리결과 값을 받을 수 있다.
// function getData(){
//     return new Promise(function(resolve,reject){
//         var data = 100;
//         resolve(data);
//     });
// }
// //resolve()의 결과 값 data를 resolveData로 받음
// getData().then(function(resolveData){
//     console.log(resolveData); //100
// });


// //Reject(실패) 
// //new Promise()로 프로미스 객체를 생성하면 콜백함수인자로 resolve,reject 를 사용할 수있다.
// //reject를 인자로 reject()를 이용하면 실패상태(Reject)가 된다.
// function getData(){
//     return new Promise(function(resolve,reject){
//         reject(new Error("Request is failed"));
//     });
// }
// //reject()의 결과 값 Error를 콜백함수로 err 인자에 받음
// getData().then().catch(function(err){
//     console.log(err); //Error: Request is failed
// });


// //아래 프로미스 처리흐름 그림 넣기


// //프로미스의 예제
// function getData(){
//     return new Promise(function(resolve,reject){
//         $.get('url주소/product/1', function(response){
//             if(response){
//                 resolve(response);
//             }
//             reject(new Error("Request is failed"));
//         });
//     });
// }
// //fulfilled 또는 Rejected의 결과값 출력
// getData().then(function(data){
//     console.log(data); //response 값 출력
// })
//     .catch(function(err){
//         console.log(err); //Error 값 출력
//     });



// ///////////////////////////
// //여러개의 프로미스 연결하기
// new Promise(function(resolve, reject){
//     setTimeout(function(){
//         resolve(1);
//     },2*1000);
// })
//     .then(function(result){
//         console.log(result);    //1
//         return result + 10;
//     })
//     .then(function(result){
//         console.log(result);    //11
//         return result + 20;
//     })
//     .then(function(result){
//         console.log(result);    //31
//     });
// //프로미스 객체를 하나 생성 후 setTimeout()을 통해 2초 후에 resolve()를 호출한다.
// //resolve() 호출시 : 프로미스 대기상태 -> 이행상태
// //첫번째 then()에서 1값을 받고 10을 더하고 .then()으로 넘김
// //두번째 .then()에서 11값을 받고 20을 더해 .then()으로 넘겨짐
// //마지막으로 .then()에서 31을 출력


// /////////////////////
// //실무에서 쓰일법한 프로미스의 사례
// //만약 페이지에 입력된 사용자의 정보를 받아서 파싱, 인증, 출력 작업을 거친다고 할때 
// //아래와 같이 코드가 사용된다.
// var userInfo = {
//     id : 'james Bond',
//     password : '007',
// };
// function parseValue(){
//     return new Promise(function(resolve, reject){
//         //....
//     });
// }
// function auth(){
//     return new Promise(function(resolve, reject){
//         //...
//     })
// }
// function display(){
//     return new Promise(function(resolve,reject){
//         //....
//     })
// }
// //위의 함수를 사용하여 출력
// getData(userInfo)
//     .then(parseValue)
//     .then(auth)
//     .then(display);


// /////////////////////////////////
// //then(), catch()를 나눠서 처리하자(resolve -> then, reject -> catch)
// // *then()으로 에러처리도 할 수 있지만 then()의 콜백 함수에서 에러를 일으킬땐 감지가 안된다.
// // then()의 두 번째 인자로는 감지하지 못하는 오류
// function getData() {
//     return new Promise(function (resolve, reject) {
//       resolve('hi');
//     });
//   }
  
//   getData().then(function (result) {
//     console.log(result);
//     throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
//   }, function (err) {
//     console.log('then error : ', err);
//   });
// //throw new Error("Error in then()"); 여기서 일부러 에러를 일으킬때
// //밑의 err에서 에러를 잡지 못하고 Uncaught (in promise) Error: Error in then()
// //이런 에러 메시지가 뜬다..
// //그러므로 반드시 catch()사용을 하자

// // catch()로 오류를 감지하는 코드
// function getData() {
//     return new Promise(function (resolve, reject) {
//       resolve('hi');
//     });
//   }
//   getData().then(function (result) {
//     console.log(result); // hi
//     throw new Error("Error in then()");
//   }).catch(function (err) {
//     console.log('then error : ', err); // then error :  Error: Error in then()
//   });

//   //재밌는점이 catch 사용X를 1, catch사용O를 2라고 할때
//   //hi (1번)
//   //hi (2번)
//   //에러(2번)
//   //에러(1번)
//   //으로 실행이 된다. (비동기동작으로 처리를 해서 처리순대로 실행이 되는것이다.)





// /////////////////
// //promise&async&await
// //https://medium.com/@shlee1353/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-async-await-promise-ae659eb1cb7e
// //위의 링크에서 참고하여 아래 자료 작성함

// //*프로미스
// //-> 프로미스는 하나의 객체로 미래의 특정 값을 생성하며 3가지의 상태값을 가지고 있다.
// //프로미스의 상태3가지는 아래와 같다
// //pending(대기) : 비동기처리 로직이 아직 완료되지 않은 상태
// //Fulfilled(이행) : 비동기처리가 완료되어 프로미스가 결과값을 반환해준 상태
// //reject(실패) : 비동기처리가 실패하거나 오류가 발생한 상태

// function create(){
//     return new Promise(function(resolve,reject){
//         resolve();
//         console.log("Step1");
//     });
// };

// create().then(function(){
//     console.log("Step3-succed");
// }).catch(function(err){
//     reject(new Error("Step3-failed"));
// });
// console.log("Step2");
// // Step1
// // Step2
// // Step3-succed
// //위 코드의 실행 순서를 살펴보자
// //1. create().then(function(){ 에서 create()함수 실행됨.
// //2. new Promise()의 인스턴스(새로생성된 프로미스의 인스턴스)가 리턴되며 
// //콜백함수로 선언한 function(){} 이 실행된다.
// //3. resolve()는 선언되었지만 조건이 충족되기 전까지 실행되지 않으며 Step1이 실행된다.
// //4. create() 실행이 완료되면 이어서 then()을 호출 할 수 있지만 바로 아래 코드인 step2가 실행된다.
// //5. Promise 비동기의 핵심은
// //   1)resolve()는 호출할 수 있는 환경이되면 호출된다.
// //   2)then()을 실행하지 않고 아래 코드로 이동한다.
// //6. Step2가 완료되면 then()내부에 작성된 function()이 실행되는데, true/false값에 따라
// //실행된다.


// //////////////////////
// //async&await
// //기존의 프로미스 보다 사용방법이 더 간단하고 직관적이다. 
// //함수앞에 async를 붙이고, 비동기처리 되는곳에 await를 추가하면 된다.
// //주의할 점은 await뒷 부분은 반드시 promise를 반환해야하고,
// //async함수 자체도 promise를 반환한다.

// function doubleAfter2Seconds(x){
//     console.log('value : ' + x);
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(x*2);
//         },2*1000);
//     });
// }
// async function addAsync(x){
//     const a = await doubleAfter2Seconds(10);
//     const b = await doubleAfter2Seconds(20);
//     const c = await doubleAfter2Seconds(30);
//     return x+a+b+c;
// }
// //위의 함수 이용
// addAsync(10).then((sum)=>{
//     console.log("result : " + sum);
// });
// // value : 10
// // value : 20
// // value : 30
// // result : 130
// //위의 코드들이 순차적으로 뜨는걸 확인할 수 있다.
