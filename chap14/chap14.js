//비동기적 프로그래밍
//자바스크립트 애플리케이션은 단일스레드에서 동작한다.
//즉 자바스크립트는 한번에 한가지 일만 할 수 있다.
//한번에 여러작업을 하기 위해 비동기적 프로그래밍이 생기게 되었다.
//자바스크립트의 비동기적 프로그래밍에는 세가지 페러다임이 있다.
//첫번째는 콜백. 두번째는 프로미스(promise), 세번째는 제너레이터(generator)이다.
//제너레이터는 자체에 비동기적 프로그래밍을 전혀 지원하지 않는다.  그래서 
//프로미스나 특수한 콜백을 같이 사용해하고 프로미스 역시 콜백에 의존한다. 
//콜백은 제너레이터나 프로미스외에도 이벤트 처리에도 유용하게 쓰인다.

//비동기적 테크닉을 사용하는 경우는 크게 아래의 3가지가 있다.
//1. Ajax 호출을 비릇한 네트워크 요청
//2. 파일을 읽고 쓰는 등의 파일시스템 작업
//3. 의도적으로 시간 지연을 사용하는 기능(알람 등)

//콜백과 프로미스의 비유비교
//콜백 : 음식점에서 너가 줄을 서서 기다리지 않도록, 너의 전화번호를 받아서 자리가 나면 전화해줌
//프로미스 : 음식점에서 전동벨을 너한테 주고, 자리가 날때 전동벨을 울린다.

// //콜백함수는 간단하게 반복문을 함수화 시킨것이라고 생각하면 된다
// function repeat(num) {
//   console.log(num);
//   if(num < 5){ //조건문을 넣지 않으면 컴터 메모리에 무리가 간다
//     repeat(num + 1);  //for문을 사용한것이라 생각하면 된다
//   }
// }
// repeat(1);

// ///////////
// //콜백
// //콜백은 일반적으로 다른 함수에 넘기거나 객체의 프로퍼티로 사용한다.
// //익명함수로도 많이 사용한다.
// //setTimeout()을 예로 보자
// console.log("Before timeout : "+ new Date());
// function f(){
//     console.log("After timeout : "+new Date());
// }
// setTimeout(f, 10*1000); //10초
// console.log("I happen after setTimeout!");
// console.log("Me, too!");
// // Before timeout : Tue Apr 09 2019 15:09:18 GMT+0900 (대한민국 표준시)
// // I happen after setTimeout!
// // Me, too!
// // After timeout : Tue Apr 09 2019 15:09:28 GMT+0900 (대한민국 표준시)

// //비동기적 테크닉은 중간에 멈추면서 일을 지연시키는게 아니라 뛰어넘고 다음에 실행하게 해준다.


// //setTimeout : 콜백함수를 한번 만 실행하고 멈춘다.
// //setInterval : 콜백을 정해진 주기마다 호출한다.
// //clearInterval : 실행하는 콜백함수를 멈추게 한다.(이게 없음 계속 실행됨.)
// //                실행하는 함수(시간함수나, setTimeout이나)를 clearInterval(요기에) 집어넣어 멈추게 한다.
// //사용 예시 : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_clearinterval
// const start = new Date();
// let i=0;
// const intervalId = setInterval(function(){
//     let now = new Date();
//     if(now.getMinutes() !== start.getMinutes() || ++i>10){
//         return clearInterval(intervalId);
//     }
//     console.log(`${i} : ${now}`);
// }, 5*1000);
// //1 : Tue Apr 09 2019 15:21:53 GMT+0900 (대한민국 표준시)
// //2 : Tue Apr 09 2019 15:21:58 GMT+0900 (대한민국 표준시)

// //위의 예제는 setTimeout이 ID를 반환하고 ID를 clearInterval에 넣어 실행을 멈춘다.
// //clearInterval을 넣지 않으면 멈추지 않고 계속 실행된다.


// /////////////
// //스코프와 비동기적 실행
// //비동기적 실행에서 가장 자주 에러가 일어나는 부분은 스코프와 클로저가 비동기적
// //실행에 영향을 미치는 부분이다.
// //
// //13장에서 한 것이지만 한번더 보자
// function countdown(){
//     let i;                  //i를 for 루프 밖에서 선언했다.
//     console.log("Countdown : ");
//     for(i=5; i>=0; i--){
//         setTimeout(function(){
//             console.log(i === 0 ? "GO" : i);
//         }, (5-i)*1000);
//     }
// }
// countdown();
// // -1
// // -1
// // -1
// // -1
// // -1
// // -1
// // 스코프의 범위때문에 -1이 출력된다. 
// //해결 방법으론 IIFE와 for루프 let 선언으로 해결가능하다.
// function countdown1(){
//     console.log("Countdown : ");
//     for(let i=5; i>=0; i--){        //이제 i는 블록 스코프 변수이다.
//         setTimeout(function(){
//             console.log(i === 0 ? "Go" : i);
//         }, (5-i)*1000);
//     }
// }
// countdown1();
// //* 주의할 점은 콜백이 어느 스코프에서 선언되었는가 이다!!
// //콜백은 자신을 선언한 스코프(클로저)에 있는것에 접근할 수 있다.
// // 따라서 i의 값은 콜백이 실제 실행되는 순간마다 다를 수 있다.


// ///////////////////
// //오류 우선 콜백
// //노드가 인기를 얻으면서 오류 우선 콜백(error-first-callback)이라는 패턴이 생겼다.
// //콜백을 사용하면 예외처리가 어려워지기때문에, 콜백과 관련된 에러를 처리할 방법이 필요했다.
// //이에 나타난 패턴이 첫번째 매개변수에 에러 객체를 쓰는것이다.
// //만약 에러가 null 이나 undefined 이면 에러가 없는 것이다.
// //*오류 우선 콜백을 다룰때 가장 먼저 생각해야할 것은 에러 매개변수 체크이다.
// //그리고 err가 참의 값이면 파일을 읽는데 문제가 있다는 뜻이므로 콘솔에 보고하고 바로 빠져나와야 한다.
// //(console.error가 그 기능해줌.) 오류우선 콜백을 사용할때 가장 많이 일어나는 실수는 이부분이다.
// //에러객체 체크 -> 로그남기기 -> 빠져나오기(여기를 많이 빼먹음..)
// //아래의 예를 보자
// const fs = require('fs');
// const fname = 'may_or_may_not_exist.txt';
// fs.readFile(fname, function(err,data){
//     if(err){return console.error(`error reading file ${fname} : ${err.message}`);}
//     console.log(`${fname} constents : ${data}`);
// });
// //error reading file may_or_may_not_exist.txt : ENOENT: no such file or directory, 
// //open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\may_or_may_not_exist.txt'
// //위의 메시지 뜸
// //프로미스를 사용하지 않으면 오류우선 콜백은 노드 개발의 표준이다! 
// //콜백을 사용하는 인터페이스를 다룰땐 반드시 오류우선콜백을 사용하자!!


// ///////////////////////
// //콜백헬
// const fs = require('fs');
// fs.readFile('a.txt', function(err, dataA){
//     if(err){console.error(err);}
//     fs.readFile('b.txt', function(err,dataB){
//         if(err){console.error(err);}
//         fs.readFile('c.txt', function(err,dataC){
//             if(err){console.error(err);}
//             setTimeout(function(){
//                 fs.readFile('d.txt', function(err,dataD){
//                     if(err){console.error(err);}
//                 });
//             }, 10*1000); //10초 후 출력
//         });
//     });
// });

// // error reading file may_or_may_not_exist.txt : ENOENT: no such file or directory, open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\may_or_may_not_exist.txt'
// // PS C:\Users\son\Desktop\cording\러닝자바스크립트\chap3> node .\chap14.js
// // { Error: ENOENT: no such file or directory, open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\a.txt'
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'open',
// //   path: 'C:\\Users\\son\\Desktop\\cording\\러닝자바스크립트\\chap3\\a.txt' }
// // { Error: ENOENT: no such file or directory, open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\b.txt'
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'open',
// //   path: 'C:\\Users\\son\\Desktop\\cording\\러닝자바스크립트\\chap3\\b.txt' }
// // { Error: ENOENT: no such file or directory, open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\c.txt'
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'open',
// //   path: 'C:\\Users\\son\\Desktop\\cording\\러닝자바스크립트\\chap3\\c.txt' }
// // { Error: ENOENT: no such file or directory, open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap3\d.txt'
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'open',
// //   path: 'C:\\Users\\son\\Desktop\\cording\\러닝자바스크립트\\chap3\\d.txt' }


// //콜백헬은 예외를 알아보기 힘들다.
// //아래와 같이 바꿔보자
// const fs = require('fs');
// function readSketchyFile(){
//     try{
//         fs.readFile('does_not_exist.txt', function(err,data){
//             if(err){throw err;}
//         });
//     }catch(err){
//         console.log('warning : minor issue occurred, program continuing');
//     }
// }
// readSketchyFile();
// //예외처리를 해도 에러가 발생하며 실행이 멈춘다.
// //에러가 의도대로 처리되지 않은 이유는 try catch 블록은 같은 함수 안에서만 동작하기 때문이다.
// //try catch블록은 readSketchyFile 함수안에 있지만, 정작 예외는 fs.readFile이 콜백으로
// //호출하는 익명함수 안에서 일어났다..

// // 또한 콜백이 우연히 두번 호출되거나, 아예 호출되지 않는 경우를 방지하는 안전장치도 없다.
// // 콜백이 정확히 한 번만 호출될 것을 가정하고 코드를 작성하면, 애석하게도 자바스크립트는 
// // 그런걸 보장하지 않는다.  
// // 그래서 비동기적 코드가 늘어날 수록 버그가 없고, 관리하기 쉬운 코드를 작성하기가 어려워진다.
// // 프로미스가 등장한 이유이다!!


// // //////////////////////////
// // 프로미스
// // 콜백의 단점을 보완하기 위해 쓰임.
// // 프로미스가 콜백을 대체하는건 아니다. 프로미스에서도 콜백을 사용한다.
// // 프로미스는 콜백을 예측가능한 패턴으로 사용할 수 있게 하고, 프로미스 없이 콜백만
// // 사용했을때 나타날 수 있는 엉뚱한 현상이나 찾기 힘든 버그를 상당수 해결한다.
// // 프로미스의 기본개념은 프로미스 기반 비동기적 함수를 호출하면 그 함수를 프로미스 인스턴스를 리턴한다.
// // 프로미스는 성공(resolve)하거나, 실패(rejected)하거나 단 두가지중 하나이다.
// // 성공한 프로미스가 나중에 실패하는일은 절대 없다. (성공이든 실패든 한번만 일어난다.)
// // 프로미스가 결정되면 결정되었다(settled) 고한다.
// // **프로미스는 객체이므로 어디든 전달할수 있다는 점도 콜백에 비해 장점이다.
// // **비동기적 처리를 여기서 안하고 다른 함수에서 처리하게 하고 싶다면 프로미스를 넘기면 된다.
// // 마치 음식점에서 받은 호출기를 친구에게 맡긴것과 비슷하다. 예약된 시간에 오기만 하면 
// // 누구든 호출기를 가지고 있으면 된다

// //프로미스 만들기
// //**프로미스는 resolve(성공)과 reject(실패) 콜백이 있는 함수로 새 promise인스턴스를 만듦면 된다.
// //resolve, reject를 typeof 로 찍어보면 function으로 나오는 것을 확인할 수 있고 문자열이나 데이터만 넣어도
// //데이터를 보낼 수 있다.
// //반면 resolve, reject의 데이터를 받을 then, catch 는 함수가 아니기 때문에 함수를 넣어야 한다.
// //아래의 코드를 보자 매개변수를 받아서 5초 카운트다운에 매이지 않게하고, 카운트다운이 끝나면
// //프로미스를 반환하게 한다.
// //resolve, reject 로 보내고(함수정의), then, catch로 받는다(함수호출)
// function countdown(seconds){
//     return new Promise(function(resolve, reject){
//         for(let i=seconds; i>=0; i--){
//             setTimeout(function(){
//                 if(i>0){console.log(i+'....');}
//                 else{resolve(console.log("GO!"))}
//             },(seconds-i)*1000);
//         }
//     });
// }
// // resolve와 reject는 함수이다. resolve와 reject는 여러번 호출하든 섞어서 호출하든 결과는 같다.
// // 첫번째로 호출한 것만 의미가 있다. 

// //아래에서 프로미스의 사용에 대해 알아보자
// countdown(5).then(  //then핸들러는 성공 콜백과 실패 콜백을 받는다.
//     function(){
//         console.log("countdown completed successfully"); //여기도 아래처럼 
//     },                                    //function()삭제해도 실행은 잘된다.
//     function(err){
//         console.log("countdown experienced an error : "+err.message);
//     },
// );

// //catch핸들러는 실패 콜백을 받는다.위의 코드를 아래와 같이 바꿔보자
// const p = countdown(5);
// p.then(function(){
//     console.log("countdown completed successfully");  //빈 function을 가져오는 것이므로
// });                                                   //function부분을 삭제해도 잘 된다.
// p.catch(function(err){
//     console.log("countdown experienced an error : "+ err.message);
// });
// // 5....
// // 4....
// // 3....
// // 2....
// // 1....
// // GO!
// // countdown completed successfully

// //위의 코드를 바꿔서 13일때는 일부러 에러를 내보자
// function countdown(seconds){
//     return new Promise(function(resolve, reject){
//         for(let i=seconds; i>=0; i--){
//             setTimeout(function(){
//                 if(i === 13){return reject(new Error("Oh My God"));}
//                 else if(i>0){console.log(i + "......");}
//                 else{resolve(console.log("Go!"));}
//             }, (seconds-i)*1000);
//         }
//     });
// }

// const p = countdown(15);
// p.then(function(){
//     console.log("countdown completed successfully");
// }).catch(function(err){
//     console.log("countdown experienced an error : " + err.message);
// });
// // 15......
// // 14......
// // countdown experienced an error : Oh My God
// // 12......
// // 11......
// // 10......
// // 9......
// // 8......
// // 7......
// // 6......
// // 5......
// // 4......
// // 3......
// // 2......
// // 1......
// // Go!
// //13에서 에러가 발생하지만 계속 진행되는걸 볼 수 있다. 
// //즉 resolve, reject는 함수를 멈추지 않는다. 그저 프로미스의 상태를 관리할 뿐이다.
// //위의 함수에서 resolve든 reject든 한쪽으로 결정되면(settled) 멈춰야되는데 
// //계속 진행되는것을 볼 수 있다.. 이제 카운트다운을 컨트롤 하는 기능을 한번 알아보자



// ////////////////////////////////////
// //이벤트
// //이벤트가 일어나면 이벤트 발생을 담당하는 개체(emitter)에서 이벤트가 일어났음을 알린다.
// //필요한 이벤트는 콜백을 통해 받을 수있다.(listen) 
// //노드에는 EventEmitter가 내장되어 있기 때문에 이를 이용하면 된다.
// //기존의 countdown을 수정해보자
// const EventEmitter = require('events').EventEmitter;

// class Countdown extends EventEmitter{
//     constructor(seconds, superstitious){
//         super();
//         this.seconds = seconds;
//         this.superstitious = !!superstitious;
//     }
//     go(){
//         const countdown = this;   //Countdown의 객체를 옮긴다.(this는 클래스 Countdown을 가르킴)
//         return new Promise(function(resolve, reject){ //새로 생성한 인스턴스를 리턴으로 보냄
//             for(let i=countdown.seconds; i>=0; i--){
//                 setTimeout(function(){
//                     if(countdown.superstitious && i === 13){
//                         return reject(new Error("Oh My God"));
//                     }
//                     countdown.emit('tick', i); //emit(이벤트명, 변수) 변수는 여러개를 사용할 수 있다
//                     if(i === 0){resolve();}    //변수에 대한 출력은 .on(이벤트,함수) 함수로 위의 변수를
//                 },(countdown.seconds-i)*1000); //출력하면된다 
//             }
//         });
//     }
// }
// //실제로 카운트다운을 시작하고 프로미스를 반환하는 부분은 go메서드이다.
// //go메서드 안에서 가장 먼저 한일은 Class countdown를 this로 가져오고, 
// //countdown 변수로 카운트다운 값에 접근하여 13인지 아닌지를 콜백안에서 접근한다.
// //클래스에 저정된 변수는 this로 현재값을 다른 변수에 저장히여 프로미스 안에서 쓸 수 있다.

// // const c = new Countdown(5);
// // c.on('tick', function(i){       //on메서드에서 이벤트를 listen 한다.(go메서드 안에 있는것이지만 그냥 받는다)
// //     if(i>0){console.log(i+"......");}
// // });
// // c.go().then(function(){         //resolve()실행 후 일로 온다.
// //     console.log("GO!");         //GO도 위의 함수에 넣을 수 있지만 
// // })                              //이해를 위래 여기 넣는다.
// //     .catch(function(err){
// //         console.error(err.message);
// //     })
// // // 5......
// // // 4......
// // // 3......
// // // 2......
// // // 1......
// // // GO!

// //15를 넣을때 어떻게 바뀌는지 보자
// const c1 = new Countdown(15,true) //false나 두번째 값을 안넣으면 13도 출력됨.
//     .on('tick', function(i){          //이렇게 체인 연결도 가능하다.
//         if(i>0){console.log(i+"......");} //위의 emit(이벤트,변수) 를 .on(이벤트,함수) 로 출력한다
//     });
// c1.go()
//     .then(function(){
//         console.log("GO!!");
//     })
//     .catch(function(err){
//         console.error(err.message);
//     });
//     // 15......
//     // 14......
//     // Oh My God
//     // 12......
//     // 11......
//     // 10......
//     // 9......
//     // 8......
//     // 7......
//     // 6......
//     // 5......
//     // 4......
//     // 3......
//     // 2......
//     // 1......

// // 프로미스는 resolve 아니면 reject가 나온다는걸 여기서 알 수 있다.
// // Countdown 인스턴스 생성시 두번째 값을 true로 하면 조건식에 따라 reject 이기 때문에
// // new Error("Oh My God") 가 실행된다. 프로미스는 resolve, reject 둘중 하나
// // 이기 때문에 resolve에 해당하는 console.log("GO!!") 가 실행이 안된다.

// //////////////////////////
// //위의 함수는 13에서 에러를 발생시켜도 여전히 실행이 되기 때문에 13에서 실행이 안되게 해보자
// //힌트는 대기중인 타입아웃을 모두 취소하면 된다.
// const EventEmitter = require('events').EventEmitter;

// class Countdown extends EventEmitter{
//     constructor(seconds, superstitious){
//         super();
//         this.seconds = seconds;
//         this.superstitious = !!superstitious; //!!가 뭔지 한번 테스트 해보자
//     }                                        //(true,false값(boolean값을 받기위한 설정이다.))
//     go(){
//         const countdown = this;
//         const timeoutId=[];
//         return new Promise(function(resolve, reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 timeoutId.push(setTimeout(function(){
//                     if(countdown.superstitious && i === 13){
//                         //대기중인 타임아웃을 모두 취소한다.
//                         timeoutId.forEach(clearTimeout); //clearTimeout은 setTimeout을
//                         return reject(new Error("OH MY GOD")); //초기화시킨다.
//                     }
//                     countdown.emit('tick',i);
//                     if(i === 0){resolve();}
//                 },(countdown.seconds-i)*1000));
//             }
//         });
//     }
// }

// //프로미스 체인
// //프로미스는 체인으로 연결할 수 있다.
// //즉 프로미스가 완료되면 다른 프로미스를 반환하는 함수를 즉시 호출할 수 있다.
// //아래의 launch 함수로 카운트다운을 끝나게 실행해보자
// function launch(){
//     return new Promise(function(resolve, reject){
//         console.log("Lift off!");
//         setTimeout(function(){
//             resolve("In orbit!");
//         }, 2*1000); //2초만에 궤도에 도달하다니...
//     });
// }

// //아래에 실행 코드를 적는다. 
// const c = new Countdown(5, true)
//     .on('tick', i => console.log(i + "......"));
// c.go()          //참고로 여기도 체인을 걸어서 실행해도 잘 된다.
//     .then(launch) //launch를 먼저써야 뒤에서 In orbit 메시지를 받을 수 있다.
//     .then(function(msg){ //이부분이 In orbit이 뜨게 한다.
//         console.log(msg); 
//     })
//     .catch(function(err){
//         console.error("Houston, we have a problem......");
//     })
// // 15......
// // 14......
// // Houston, we have a problem......
// //15,true로 찍을땐 위와 같이 중간에 튕기게 된다. clearTimeout으로인해서(14이상이면 다 튕김)
// // 5......
// // 4......
// // 3......
// // 2......
// // 1......
// // 0......
// // Lift off!
// // In orbit!
// //5, true로 할땐 이렇게 launch까지 잘 나온다.



// /////////////////////////
// //결정되지 않는 프로미스 방지하기
// //프로미스는 비동기적 코드를 단순화하고 콜백이 두번이상 실행되는것을 막아준다.
// //하지만 실수로 reject, resolve 호출을 잊는다면 자동으로 이 문제를 해결해주지 않는다.
// //이걸 해결하는 방법은 시간제한을 걸어두는 것이다. 
// //(물론 복잡한 알고리즘에 1초 타임아웃을 거는건 말이 안된다.)

// //기존의 클래스도 위에껄 써도 되는데 햇깔리니... 여기 다시 작성한다. (클래스 맨위로 올려야함.)
// const EventEmitter = require('events').EventEmitter;

// class Countdown extends EventEmitter{
//     constructor(seconds, superstitious){
//         super();
//         this.seconds = seconds;
//         this.superstitious = superstitious;
//     }
//     go(){
//         const countdown = this;
//         const timeoutId = [];    //clearTimeout을 사용하기 위해 []로 묶었다.
//         return new Promise(function(resolve,reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 timeoutId.push(setTimeout(function(){
//                     if(countdown.superstitious && i === 13){
//                         //대기중인 타임아웃 모두 취소 cleartimeout으로
//                         timeoutId.forEach(clearTimeout);
//                         return reject(new Error("OH MY GOD"));
//                     }
//                     countdown.emit('tick', i);
//                     if(i === 0){resolve();}
//                 }, (countdown.seconds-i)*1000));
//             }
//         });
//     }
// }

// //아래의 함수에서 발사하는 로켓은 열번에 다섯번은 실패하는 매우 실험적인 로켓이다.
// function launch(){
//     return new Promise(function(resolve, reject){
//         if(Math.random() < 0.5){return ;} //문재 발생 일부러 문제 일으킴..
//         console.log("Lit off!");
//         setTimeout(function(){
//             resolve("In Orbit!");
//         }, 2*1000);
//     });
// }
// //위의 코드는 reject를 호출 안했고, 콘솔에 기록도 하지 않았다.
// //열번 시도하면 다섯번은 영문도 모른채 실패하는 셈이다... 
// //아래의 코드는 타임아웃을 거는 함수의 코드이다.
// //setTimeout(function, milliseconds, param1, param2, ...)
// //function, milliseconds : 이거 두개야 아는 것이니깐..
// //param1, param2, ... : function으로 들어가는 인자들이다
// //예를 들면 setTimeout(function(param1,param2){} , milliseconds)  과 같은 것이다
// //
// function addTimeout(fn, timeout){
//     if(timeout === undefined){timeout = 1000;} //타임아웃의 기본값 설정
//     return function(...args){
//         return new Promise(function(resolve, reject){
//             const tid = setTimeout(reject, timeout, new Error("promise timed out"));
//             //그렇기 때문에 위의 코드에서 reject(new Error("promise timed out")) 가 들어가는것과 같다
//             fn(...args)
//                 .then(function(...args){
//                     clearTimeout(tid);
//                     resolve(...args);
//                 })
//                 .catch(function(...args){
//                     clearTimeout(tid);
//                     reject(...args);
//                 });
//         });
//     }
// }



// //이제 위에 만든 2개의 함수들과 클래스를 이용하여 실행 문을 만들어보자
// const c = new Countdown(5);
// c.on('tick', i => console.log(i + "...."))
//     .go()
//         .then(addTimeout(launch, 11*1000))
//         .then(msg => console.log(msg))
//         .catch(err => console.error("Houston, we have a problem : " + err.message));
//          //그래서 위의 catch에서 addTimeout의 에러가 여기서 잡힌다
// //
// // 5....
// // 4....
// // 3....
// // 2....
// // 1....
// // 0....
// // Houston, we have a problem : promise timed out


// ///////////////////////////////////
// //제너레이터
// //12장에서 나온것 처럼 제너레이터는 함수와 호출자 사이의 양방향 통신이 가능하다. (field 통해서)
// //제너리이터는 동기적인 성격을 가졌고, 프로미스는 비동기적 성격을 가졌기 때문에 섞으면 효율적이 된다.
// //아래의 예를 보자
// //파일 세개를 읽고 1분간 기다리고 세개의 파일을 합쳐서 네번째 파일을 만든다.
// //dataA = read contents of 'a.txt'
// //dataB = read contents of 'b.txt'
// //dataC = read contents of 'c.txt'
// //wait 60 seconds
// //write dataA + dataB + dataC to 'd.txt'

// //위의 순서대로 하기 전에 가장 먼저 할일은 노드의 오류 우선 콜백을
// //(function(err,인자값)이런식으로 오류 먼저 콜백으로 작업하는것) 프로미스로 바꾸는 것이다.
// //이 기능을 nfcall(Node function call) 함수로 만든다.
// function nfcall(f, ...args){
//     return new Promise(function(resolve, reject){
//         f.call(null, ...args, function(err, ...args){   //call() 메서드는 그 함수의 인자를 가져온다(상속처럼)
//             if(err){return reject(err);}    //에러발생시 refect처리
//             resolve(args.length < 2 ? args[0] : args);  //아니면 resolve처리
//         });
//     });
// } 

// //setTimeout을 써야 하는데 , setTimeout은 노드보다 먼저 나왔고 오류 우선 콜백의 패턴을 따르지 않는다.
// //(앞의 addTimeout()을 기준으로 말하는 것이다.)
// //타임아웃 기능을 promise화 해보자 pTimeout(promise timeout) 아래의 코드를 보자
// function pTimeout(delay){
//     return new Promise(function(resolve,reject){
//         setTimeout(resolve, delay);
//     });
// }

// //이제 필요한 것은 제너레이터 실행기이다.
// // 제너레이터는 원래 동기적이다. 
// //하지만 제너레이터는 함수와 호출자간 통신을 관리하고 비동기적 호출을 처리하는 함수를 만들 수 있다.
// //grun(generator run)을 만들어보자
// function grun(g){
//     const it = g();
//     (function iterator(val){
//         const x =it.next(val);
//         if(!x.done){        //이터레이터의 value, done (밑에서 재귀형태로 돌리기에 이걸 넣음)
//             if(x.value instanceof Promise){
//                 x.value.then(iterator).catch(err => it.throw(err));
//             }else{
//                 setTimeout(iterator, 0, x.value); //다시 위로 보내서 반복 (재귀적 기능)
//             }       //setTimeout(1,2,3)
//         }           //1=함수,코드 2=delay시간 3=문구,인자
//     })();
// }
// //grun에 제너레이터 함수를 넘기면 해당 함수가 실행된다. 
// //6장에서 본것처럼 yield로 값을 넘기면 제너레이터는 이터레이터에서 next를 호출할때까지 기다린다.
// //grun은 이걸 재귀적으로 반복한다.          -->setTimeout(iterator, 0, x.value);  다시 위로 올림.
// //이터레이터에서 프로미스를 리턴하면        --> (function iterator(val)) 에서 val 로 리턴받음.
// //grun은 프로미스가 완료될때까지           --> if(!x.done){    여기부터 if문의 실행들을 하고
// //기다리고 다음값을 받아 이터레이터를 실행한다.      --> const x =it.next(val);  여기서 다음껄 실행함.

// //*grun에서 iterator를 바로 쓰지않고 setTimeout을 사용한 이유는 효율성 때문이다.
// // 자바스크립트 엔진은 재귀호출을 비동기적으로 실행할때 메모리를 좀 더 빨리 회수한다!!

// //위의 함수들 정리
// //nfcall : 과거의 방법인 노드 오류 우선 콜백 -> 현재의 방법인 프로미스로 적용
// //grun : 미래의 기능을 현재로 가져온다. ES7에서 지원될꺼라 예상되는 await 키워드는
// //grun과 비슷한 기능을 지원할 것이다.

// //이제 사용방법에 대해 알아보자
// const fs = require('fs');
// function* theFutureIsNow(){
//     const dataA = yield nfcall(fs.readFile, 'a.txt');
//     const dataB = yield nfcall(fs.readFile, 'b.txt');
//     const dataC = yield nfcall(fs.readFile, 'c.txt');
//     yield pTimeout(15*1000);
//     yield nfcall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
// }
// //콜백 헬보다 훨씬 간단하고 프로미스 하나만 쓸때보다 단순하다.
// //처음에 로직짠것과 비슷하다.
// //실행은 더 간단하다.
// grun(theFutureIsNow); //파일이 없어서 에러가 발생한다.


// //좀더 다르게 생각해보자!
// //만약 3개의 파일을 동시에 읽으면 효율적이지 않을까? 라는 생각으로 코드를 이에 맞게 바꿔보자
// //Promise.all 은 배열로(정확히는 이터러블 객체) 받은 프로미스가 전부 완료될때 완료되고, 
// //(반대로 하나의 객체라도 reject라면 전부 안된다.)
// //비동기적으로 동시에 실행된다. 

// //promise.all을 위의 함수에 적용시켜보자
// function* theFutureIsNow(){
//     const data = yield Promise.all([ //promise.all이 반환하는 프로미스는 매개변수로 주어진
//         nfcall(fs.readFile, 'a,txt'), //각 프로미스의 완료값이 배열에 들어있었던 순서대로 
//         nfcall(fs.readFile, 'b.txt'), //들어있다. c.txt를 a.txt 보다 먼저 읽더라도
//         nfcall(fs.readFile, 'c.txt'), //data[0]에는 a.txt가 data[2]에는 c.txt의 내용이 있다.
//     ]);
//     yield pTimeout(60*1000);
//     yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
// }
// // 세가지 파일을 읽은 다음 60초를 기다리고 병합결과를 파일에 저장하는게 중요하다면 그 답은 앞의 예제에 있다.
// // 하지만 세파일을 읽는 것과 무관하게 60초 이상이 흐른다음 네번째 파일에 결과를 저장하는 것이 중요하다면
// // promise.all을 사용하면 된다.



// //제너레이터 실행기를 이용한 예외처리
// //제너레이터 실행기를 쓰면 try/catch 문으로 예외처리를 할 수 있다.
// //(콜백, 프로미스는 예외처리가 쉽지 않다.) 콜백에서 일으킨 예외는 그 콜백 밖에서 캐치할 수 없다.
// //제너레이터 실행기는 비동기적으로 실행하면서 동기적인 동작방식을 유지하므로 try/catch문을 사용할수 있다.

// function* theFutureIsNow(){
//     let data;
//     try{
//         data = yield Promise.all([
//             nfcall(hs.readFile, 'a.txt'),
//             nfcall(fs.readFile, 'b.txt'),
//             nfcall(readFile, 'c.txt'),
//         ]);
//     }catch(err){
//         console.error("Unable to read one or more input files : " + err.message);
//         throw err;
//     }
//     yield pTimeout(60*1000);
//     try{
//         yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
//     }catch(err){
//         console.error("Unable to write output file : " + err.message);
//         throw err;
//     }
// }
// // try  catch의 예외처리가 프로미스의 catch핸들러나 오류우선콜백보다 나은건 아니다.
// // 하지만 동기적 처리가 익숙하다면 try/catch가 좋다.