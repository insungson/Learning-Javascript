// //ES6에서 제너레이터를 이용한 비동기 프로그래밍
// //https://meetup.toast.com/posts/73
// //위의 링크에서 자료를 가져왔다.

// //기존의 콜백 헬 -> 프로미스 -> 제너레이터
// //이런 형식으로 조금씩 나은 방법이 생기고 있다.

// //제너레이터 : 함수의 실행을 중간에 멈추었다가 필요한 시점에 다시 재개할 수 있다. (러닐자바스크립트p267보기)
// //일종의 코루틴(coroutine)인데(이건 찾아보기) 코루틴과는 다르게 멈출 때 돌아갈 위치를
// //직접 지정할 수 없고, 단순히 호출자에게 제어권을 넘겨주게 된다.(그래서 세미코루틴이라 불리운다.)
// function* myGen(){
//     yield 1;
//     yield 2;
//     yield 3;
//     return 4;
// }
// const myItr = myGen();
// console.log(myItr.next()); //{ value: 1, done: false }
// console.log(myItr.next()); //{ value: 2, done: false }
// console.log(myItr.next()); //{ value: 3, done: false }
// console.log(myItr.next()); //{ value: 4, done: true }
// console.log(myItr.next()); //{ value: undefined, done: true }

// //myGen 제너레이터는 실행될때 이터레이터를 반환한다. 
// //그리고 함수내부에서 next()함수를 호출할때 마다 호출되는 곳의 위치를 기억해 둔채로 실행된다. 
// //그리고 함수 내부에서 yield를 만날때마다 기억해둔 위치로 제어권을 넘겨준다. 
// //이런식으로 next() -> yield -> next() -> yield 의 순환흐름이 만들어지고 이렇게 끝까지
// //(return을 만나거나 마지막 라인이 실행될때까지) 진행된다.

// //여기서 중요한 점은 next()와 yield가 서로 데이터를 주고 받을 수 있다는 점이다!!
// //예제에서 보이듯이 yield 키워드 뒤의 값이 next()함수의 반환값으로 전달된다.(정확히는 value 프로퍼티값으로)

// //그렇다면 반대로 호출자(실행코드)가 제너레이터에게 값을 전달할 수 있을까?  가능하다!!
// //next(인자)로 next()에 인자를 넣어서 넘기면 된다.

// function* myGen1(){
//     const x = yield 1;
//     const y = yield (x+1);
//     const z = yield (y+2);
//     return x+y+z;
// }
// const myItr1 = myGen1();
// console.log(myItr1.next());     //{ value: 1, done: false }
// console.log(myItr1.next(10));   //{ value: 11, done: false }
// console.log(myItr1.next(20));   //{ value: 22, done: false }
// console.log(myItr1.next(30));   //{ value: 60, done: true }
// //next()에 인수 값을 넣으면 yield 키워드가 있는 대입문에 값이 할당되는걸 볼수있다.
// //*제너레이터와 호출자(함수호출,실행코드)는 서로 제어권뿐만 아니라 데이터도 주고받을 수 있다.



// ////////////////////////
// //콜백 헬에 대해 살펴보자
// //커피주문 시스템을 코딩할 것이다.
// //우선 이 시스템은 굉장히 비효율적이라서, 
// //1. 핸드폰 번호를 알아야 아이디를 알 수 있고, 
// //2. 아이디를 알아야 이메일을 알 수 있고, 
// //3. 이메일을 알아야 이름을 알 수 있고, 
// //4. 이름을 알아야만 주문을 할 수 있다

// function getId(phoneNumber){/* */}
// function getEmail(id){/** */}
// function getName(email){/** */}
// function order(name, menu){/** */}

// function orderCoffee(phoneNumber){
//     const id = getId(phoneNumber);
//     const email = getEmail(id);
//     const name = getName(email);
//     const result = order(name, 'coffee');
//     return result;
// }
// //데이터들을 외부네트워크에 있는 서버에서 가져온다고 생각할 때
// //싱글스레드인 자바스크립트는 이런 코드를 짤 수 없다.
// //위의 코드를 자바스크립트에서 사용하는 코드로 짜보자
// function getId(phoneNumber, callback){/** */}
// function getEmail(id, callback){/** */}
// function getName(email, callback){/** */}
// function order(name, menu, callback){/** */}

// function orderCoffee(phoneNumber, callback){
//     getId(phoneNumber, function(id){
//         getEmail(id, function(email){
//             getName(email, function(name){
//                 order(name, 'coffee', function(result){
//                     callback(result);
//                 });
//             });
//         });
//     });
// }
// //*콜백의 문제점은 가독성이 좋지 않은것뿐만이 아니다.
// // 더 중요한 문제점은 콜백함수를 다른 함수로 전달하는 순간 그 콜백함수에 대한 제어권을 잃는다.
// // 즉, 내가 제공한 콜백이 언제 실행되는지, 몇 번 실행되는지 등에 대해 신뢰할 수가 없게 된다.
// //프로그램의 예측이 어렵고, 에러가 발생하기 쉬우며 디버깅도 어렵다.

// //위의 콜백헬을 프로미스로 바꿔보자
// function getId(phoneNumber){}
// function getEmail(id){}
// function getName(email){}
// function order(name, menu){}

// function orderCoffee(phoneNumber){
//     return getId(phoneNumber)
//         .then(function(id){
//             return getEmail(id);
//         })
//         .then(function(email){
//             return getName(email);
//         })
//         .then(function(name){
//             return order(name, 'coffee');
//         });
// }
// //위의 코드를 화살표함수로 바꾸면 좀더 간결해진다.
// function orderCoffee(phoneNumber){
//     return getId(phoneNumber)
//         .then(id => getEmail(id))
//         .then(email => getName(email))
//         .then(name => order(name,'coffee'));
// }
// //자바스크립트 언어는 싱글스레드언어이기 때문에 각각의 네트워크 값을 반환하기 전까지
// //프로그램 전체가 멈춰서 대기해야 하는데 그렇게 되면 프로그램이 너무 느려지게 된다.
// //이럴때 제너레이터를 이용해보자
// //제너레이터는 각 함수를 도중에 멈추고 제어권을 다른곳으로 줄 수 도 있고, 값도 전달할 수 있다.
// //이런 방식을 위의 코드에 적용시켜보자

// //기존의 함수앞에 *를 추가하여 제너레이터로 변경하고, 각 할당문에 yield를 추가하자
// function* orderCoffee(phoneNumber){
//     const id = yield getId(phoneNumber);
//     const email = yield getEmail(id);
//     const name = yield getName(email);
//     const result = yield order(name, 'coffee');
//     return result;
// }
// //yield를 통해 제어권을 넘겨주는건 좋았지만... getId()가 작업을 완료하고 다음 반환값과 
// //제어권을 가져오려면 next()함수를 호출해야한다. 
// //각 함수의 제어권이 끝나는 마지막에 next()를 붙여 이터레이터처럼 사용해보자
// const iterator = orderCoffee('010-1234-1234');
// iterator.next();
// function getId(phoneNumber) {
//     // …
//     iterator.next(result);
// }
// function getEmail(id) {
//     // …
//     iterator.next(result);
// }
// function getName(email) {
//     // …
//     iterator.next(result);
// }
// function order(name, menu) {
//     // …
//     iterator.next(result);
// }
// //(실제로 iterator.next()는 등의 함수 내부에서 의존하고 있는 사용하는 
// //라이브러리에 따라 콜백 형식으로 호출되겠지만, 여기서는 설명을 위해 단순하게 제일 아랫줄에 추가했다.)

// //위의 코드에서 제너레이터에서 범용적인 함수를 사용할 수 없다.(호출 함수를 다 써야한다...) 
// //또한 콜백과는 다른 방식으로 제너레이터 본인의 제어권을 상실했다.

// //만약 모든 함수가 프라미스를 반환한다면 각각의 함수가 제어권을 직접 다루지 않고, 
// //제3자에게 위임할 수 있지 않을까? 시도해 보자. 
// //우선 프라미스의 예제에서처럼 모든 getXXX 함수는 프라미스를 반환한다고 가정하자. 
// //이제 누군가가 이터레이터를 생성해서 함수가 끝날때까지 반복해서 실행시켜 주면 된다.

// const iterator = orderCoffee('010-2312-1114');//이터레이터 생성 후
// let ret;

// (function runNext(val){
//     ret = iterator.next(val); //next()를 실행하면 결과의 value 값으로 프라미스를 반환하고
//     if(!ret.done){
//         ret.value.then(runNext); //프라미스의 then() 메서드에서 다시 이터레이터의 next() 함수를 실행한다
//     }else{
//         console.log('result : ', ret.value); // done:true를 반환할 때까지 순환하면서 호출
//     }
// })();
// //next() -> yield -> then() -> next()의 순환흐름에 따라 실행된다.

// //(runNext() 함수가 재귀적으로 호출되고 있다)

// //프라미스와 제너레이터를 함께 사용하면 각각의 함수에서 제너레이터를 신경 쓰지 않고도 외부에서 제어할 수가 있다. 
// //이제 제너레이터를 활용하여 비동기인 코드를 마치 동기식 코드인 것처럼 작성할 수 있는 길이 열린 것이다.




// ////////////////////////////
// //여기서 좀더 들어가 보자
// //$ npm install co
// // 로 co를 설치하면 아래와 같이 코드를 바꿀 수 있다.
// co(function* (){
//     const id = yield getId('010-2123-1231');
//     const email = yield getEmail('id');
//     const name = yield getName(email);
//     return yield order(name, 'coffee');
// }).then(result => {
//     console.log(result);
// });
// //굳이 번거롭게 제너레이터를 직접 제어하지 않아도 된다. 
// //한걸음 더 나아가 wrap 함수를 사용하면 제너레이터 함수를 프라미스를 반환하는 함수로 변환할 수도 있다.
// const orderCoffee = co.wrap(function* (){
//     const id = yield getId('010-1234-5678');
//     const email = yield getEmail(id);
//     const name = yield getName(email);
//     return yield order(name, 'coffee');
// });
// orderCoffee.then(result => {console.log(result);
// });
// //이제 이렇게 생성된 함수를 또 다른 제너레이터가 yield로 사용할 수 있을 것이다
// //co 에서는 프라미스뿐만 아니라 함수, 배열, 객체, 제너레이터 등을 모두 yield 할 수 있다
// //자세한 사항은 https://github.com/tj/co 에서 확인하자

// //아래에서 try /catch를 넣어 코드를 짜보자
// co(function* (){
//     let result = false;
//     try{
//         const id = yield getId('010-1234-5678');
//         const email = yield getEmail(id);
//         const name = yield getName(email);
//         return yield order(name, 'coffee');
//     }catch(err){
//         console.log('이또한 지나가리라..ㅋㅋ', err); //에러처리 로직
//     }
//     return result;
// }).then(result => {
//     console.log(result);
// });

// // 또 다른 방법으로  async, await가 있다. 아래의 코드를 보자
// async function orderCoffee(phoneNumber){
//     const id = await getId(phoneNumber);
//     const email = await getEmail(id);
//     const name = await getName(email);
//     return order(name, 'coffee');
// }
// orderCoffee('010-1233-1234').then(result => {console.log(result);});



// ////////////////////////////////////////
// // 이건 다른 것이지만 그냥 보자 (아직 안배워서 잘 모르지만 일단 보자)
// //Koa 에 대한 것이다.(미들웨어의 일종)
// //Koa는 Express의 업그레이드 버전이라고 보면 되는데, 
// //Express와 동일한 기능이 제너레이터 기반으로 작성되었기 때문에 아주 편하게 비동기 코드를 작성할 수 있다. 
// //먼저 기존의 라우터코드를 보자
// router.post('/login', function(req, res, next) {
//     const {email, password} = req.body;
//     return userDB.get(email)
//         .then(user => crypter.compare(password, user.password)
//         .then(valid => {
//             // …
//             next();
//         }));
// });

// //그리고 아래는 koa를 적용시킨 코드이다.
// //https://github.com/ZijianHe/koa-router 여기가 참조사이트이다.

// router.post('/login', function*() {
//     const {email, password} = this.request.body;
//     const user = yield userDB.get(email);
//     const valid = yield crypter.compare(password, user.password);
//   //     …
// });