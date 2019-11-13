// //싱글턴패턴 (trun.js / turnGame.html 은 싱글턴 패턴을 이용한 것이다.)
// //싱글턴은 필요에 의해 단 하나의 객체만을 만들 때 사용합니다
// var obj = {
//     a:'hello',
//     b: function(){
//         alert(this,a);
//     }
// };
// //사실 객체 리터럴이 바로 싱글턴 패턴의 대표적인 예입니다. 
// //저 객체는 단 하나밖에 존재하지 않죠. 하지만 모든 속성이 다 공개되어 있다는 단점이 있습니다. 
// //비공개로 만드는 게 바로 제대로 된 싱글턴입니다.(아래를 보자)

// var singleton = (function(){
//     var instance;
//     var a = 'hello';
//     function initiate(){
//         return{
//             a: a,
//             b: function(){
//                 alert(a);
//             }
//         };
//     }
//     return{
//         getInstance : function(){
//             if(!instance){
//                 instance = initiate();
//             }
//             return instance;
//         }
//     }
// })();
// var first = singleton.getInstance();
// var second = singleton.getInstance();
// console.log(first === second); //true

// //싱글턴을 언제 써야할 지 잘 모르겠나요? 
// //처음 네임스페이스를 만들 때 사용하면 됩니다! 
// //예를 들어 게임을 만든다고 치면, 게임 객체를 싱글턴으로 만드는 겁니다. 
// //게임 내의 모든 것을 감싸고 있는 객체를 말이죠. 
// //게임을 실행했을 때 게임은 한 번만 켜져야하기 때문에 싱글턴이 적절합니다

// //생성자부분에서 활용해보자
// function Vehicle(name,speed){
//     this.name = name;
//     this.speed = speed;
// }
// Vehicle.prototype.drive = function(){
//     console.log(this.name + ' runs at' + this.speed);
// };
// //위의 두개를 하나로 합쳐보자 
// var Vehicle = (function(){
//     function Vehicle(name,speed){
//         this.name = name;
//         this.speed = speed;
//     }
//     Vehicle.prototype.drive = function(){
//         console.log(this.name + ' runs at' + this.speed);
//     };
//     return Vehicle;
// })();
// //성자와 프로토타입을 모두 Vehicle 변수 안에 넣었습니다.
// //변수 Vehicle과 생성자 Vehicle 이름이 같아서 걱정하시는 분이 있을 수도 있는데 IIFE라서 
// //바로 변수 Vehicle에 생성자 Vehicle이 덮어씌워집니다.




// ////////////////////////////////////////////////
// //Currying(커링) vs Partial application
// //
// //Partial application : 여러 개의 인자를 받는 함수가 있을 때 일부의 인자를 고정한 함수를 만드는 기법입니다
// //
// var plus = function(a,b,c){
//     return a+b+c;
// };
// //위와 같은 평범한 함수에서, partial application을 구현하기 위해 함수의 prototype에 특별한 메소드를 추가합니다
// //그래야 모든 함수에서 partial application을 사용할 수 있으니까요
// Function.prototype.partial = function(){
//     var args = [].slice.apply(arguments);
//     var self = this;
//     return function(){
//         return self.apply(null, args.concat([].slice.apply(arguments)));
//     };
// };
// //args는 arguments를 복사한 겁니다. 그리고 함수를 return 하는데 args는 클로저의 변수로 저장됩니다. 
// //그리고 이제 새로운 함수에 인자가 들어왔을 때 기존에 있던 args와 concat하는거죠.
// //args를 고정한 후 더하는 방식이 partial application이다.
// var plusa = plus.partial(1);
// console.log(plusa(2,3));//6
// var plusb = plusa.partial(2);
// console.log(plusb(4));//7    (plusa 에 추가하였으므로 7이 된다.)
// var plusab = plus.partial(1,3);
// console.log(plusab(5));//9
// //bind함수를 쓰면 더 깔끔해진다.
// var plusa = plus.bind(null,1);
// console.log(plusa(2,3));//6
// var plusb = plusa.bind(null,2);
// console.log(plusb(4));//7
// var plusab = plus.bind(null, 1,3);
// console.log(plusab(5));//9

// //Currying : currying도 partial application처럼 인자를 미리 고정할 수 있지만 하나씩만 
// //          고정한다는 것이 특징입니다. 또한, 모든 인자를 받을 때까지 계속 함수를 생성합니다. 
// //          매 번 인자를 1개씩 고정하는 연속적인 partial application으로 볼 수도 있습니다.
// //
// function multiplyThree(x){
//     return function(y){
//         return function(z){
//             return x*y*z;
//         }
//     };
// }
// console.log(multiplyThree(4)(8)(2));//64
// //위의 함수는 일종의 커링입니다. 인자를 하나씩 세 번 받아야 호출됩니다.
// //그런데 인자가 100개라면, 저렇게 일일이 함수를 만들 수는 없겠죠? curry를 구현해봅시다
// //
// Function.prototype.curry = function(one){
//   var origFunc = this;
//   var target = origFunc.length;
//   var args = [];
//   function next(nextone){
//     args = args.concat(nextone);
//     if(args.length === target){
//       return origFunc.apply(null,args);
//     }else{
//       return function(nextone){return next(nextone)};
//     }
//   }
//   return next(one);
// }
// //이제 인자를 네 개를 받는 multiplyFour 함수에 커링을 적용해봅시다.
// function multiplyFour1(w,x,y,z){
//     return w*x*y*z;
// }
// console.log(multiplyFour1.curry(2)(3)(4)(5));//120

// //차이점 정리 
// //partial application : 기존 함수의 매개변수들 중 일부를 미리 넣어둔 새로운 함수를 만드는 것입니다. 
// //                      만들어진 partial application 함수는 다음 번 호출 시에는 결과를 반환해야 합니다.
// //currying : 기존 함수의 매개변수를 하나씩 받는 방법입니다. 매개변수를 모두 받을 때까지 새로운 함수를 반환하고요.
// //           인자가 두 개일 때는 커링이나 파샬 어플리케이션이나 별 차이가 없습니다.(한 개일 때는... ㅎㅎ).
// //           그리고 인자가 세 개 이상인 경우는 Partial application이나 커링 중에 선택하면 됩니다.




// //////////////////////////////////////////////////////
// //재귀
// //재귀 : 함수가 자기 자신을 호출하는 것을 의미합니다. 간단하게 팩토리얼(!)을 알려주는 함수를 만들어볼까요?
// var factorial = function(number){
//   var result = 1;
//   for(var i=1; i<=number; i++){
//     result *=i;
//   }
//   return result;
// };
// console.log(factorial(3));//6
// console.log(factorial(4));//24
// //재귀를 사용해서 위와 같은 코드를 만들어보겠습니다.
// var factorial1 = function(number){
//   if(number>0){
//     return number*factorial1(number-1);
//   }else{
//     return 1;
//   }
// };
// console.log(factorial1(3));//6
// console.log(factorial1(4));//24
// //처음 코드처럼 한 번에 풀지 않고, 재귀적으로 푸는 것은 분할 정복 알고리즘 중의 하나입니다. 
// //어떤 문제를 한 번에 풀기 힘들 때, 작은 조각으로 쪼개어 푸는 것을 분할 정복 알고리즘이라고 합니다.
// //이렇게 재귀를 사용하는 것은 컴퓨터에게는 많은 부담을 주지만, 사람에게는 가독성을 높혀 줍니다.
// // 따라서 성능을 중시한다면 재귀를 쓰지 않는 게 좋습니다. 
// //하지만 재귀는 많은 곳에서 사용되기 때문에 꼭 알아두셔야 합니다. 
// //다음으로는 재귀를 사용할 때 자주 쓰이는 코딩 기법을 소개합니다


// //@@메모이제이션
// //메모이제이션 : 프로그래밍을 할 때 반복되는 결과를 메모리에 저장해서 다음에 같은 결과가 나올 때 
// //              빨리 실행하는 코딩 기법을 말합니다.
// //
// //다음과 같이 클로저를 사용해 계속 유지되는 저장 공간을 만든 후 코드를 바꿔봅시다.
// var factorial2 = (function(){
//   var save = {};
//   var fact = function(number){
//     if(number>0){
//       var saved = save[number-1] || fact(number-1); //처음 실행하면 뒤의 fact()가 실행되고 두번째 실행은
//       var result = number * saved;                  //앞의 save[]가 실행된다.(메모리에 저장되기 때문이다.)
//       save[number] = result;
//       console.log(saved, result);
//       //console.log('1save:',save); //이걸로 찍으면 좀더 확실하게 알 수 있다.
//       return result;
//     }else{
//       return 1;
//     }
//   };
//   console.log('save:',save); //save: {}
//   return fact;
// })();
// console.log(factorial2(7));
// // 1 1
// // 1 2
// // 2 6
// // 6 24
// // 24 120
// // 120 720
// // 720 5040
// // 5040
// console.log(factorial2(7));
// // 720 5040
// // 5040
// //처음 호출 때는 처음 계산하는 것이기 때문에 계산이 여러 번 실행됩니다.
// //console에 나오는 게 계산을 실행하는 과정입니다. 두 번째 호출 때는 한 번 만에 실행 결과가 나옵니다. 
// //이전에 했던 계산이 메모리에 저장되어있기 때문이죠.
// //
// //아래의 과정으로 생성된다.
// //                               fact(0)=1
// // save[1]=1                     fact(1)=1
// // save[2]=2*1(save[1])=2        fact(2)=2
// // save[3]=3*2(save[2]=6         fact(3)=6
// // save[4]=4*6(save[3])=24       fact(4)=24
// // save[5]=5*24(save[4])=120     fact(5)=120
// // save[6]=6*120(save[5])=720    fact(6)=720
// // save[7]=7*720(save[6])=5040   fact(7)=5040


// //다른 예제로 피보나치 수열이 있습니다. 피보나치 수열은 특이하게도 함수 안에서 두 번의 재귀 호출을 합니다. 
// //재귀가 빛을 발하는 순간이죠.
// var fibonacci = (function(){
//   var save={};
//   var fibo = function(number){
//     if(number<2){
//       return number;
//     }else{
//       var saved1 = save[number-1] || fibo(number-1);
//       var saved2 = save[number-2] || fibo(number-2);
//       var result = saved1 + saved2;
//       save[number] = result;
//       console.log(saved1,saved2,result);
//       console.log('save: ',save)
//       return result;
//     }
//   };
//   return fibo;
// })();
// console.log(fibonacci(5));
// // 1 0 1
// // 1 1 2
// // 2 1 3
// // 3 2 5
// // 5
// console.log(fibonacci(5));
// // 3 2 5
// // 5
// //아래의 과정으로 생성됨.
// //                                      fibo(1)=1,fibo(0)=0
// // save[2] = save[1](1)+save[0](0) = 1	fibo(2)=1,fibo(1)=1
// // save[3] = save[2](1)+save[1](1) = 2	fibo(3)=2,fibo(2)=1
// // save[4] = save[3](2)+save[2](1) = 3	fibo(4)=3,fibo(3)=2
// // save[5] = save[4](3)+save[3](2) = 5	fibo(5)=5,fibo(4)=3
// //
// //메모이제이션은 반복되는 계산이 많을수록 효과가 높아집니다.
// //특히 반복 작업이 많을 경우에는, 숫자가 커질수록 반복 횟수가 기하급수적으로 늘어납니다. 
// //메모이제이션을 사용하지 않은 코드로 한 번 fibonacci(40)을 해보세요. 
// //얼마나 많은 반복이 일어나는지 바로 알 수 있습니다. 
// //그리고 메모이제이션을 사용한 코드로 fibonacci(40)을 해보세요. 사소한 차이가 결과에 엄청난 영향을 미칩니다.





// /////////////////////////////////////////////////////////////
// //추상 팩토리, abstract factory
// //추상 팩토리 패턴: 하나의 팩토리로 여러 종류의 팩토리를 동시에 운영할 수 있습니다 (중복사용방지)
// var abstractCharacterFactory  = (function(){
//   var jobs = {};
//   return {
//     addJob: function(job,Character){
//       if(Character.prototype.attack){
//         jobs[job] = Character;
//       }
//     },
//     create: function(job,options){
//       var Character = jobs[job];
//       return (Character ? new Character(options) : null);
//     }
//   };
// })();

// var Emperor = (function(){
//   function Emperor(options){
//     this.name = options.name;
//   }
//   Emperor.prototype.attack = function(target){
//     console.log(this.name + '가 '+target.name+'을 공격합니다.');
//   };
//   Emperor.prototype.proclaim = function(){
//     console.log(this.name +'가 스스로를 황제라고 칭했습니다.');
//   };
//   return Emperor;
// })();

// var Governor = (function(){
//   function Governor(options){
//     this.name = options.name;
//   }
//   Governor.prototype.attack = function(target){
//     console.log(this.name + '가 '+target.name+'을 공격합니다.');
//   };
//   Governor.prototype.betray = function(){
//     console.log(this.name + '가 황제를 배신합니다.');
//   };
//   return Governor;
// })();

// abstractCharacterFactory.addJob('emperor',Emperor);
// abstractCharacterFactory.addJob('governor',Governor);
// var nero = abstractCharacterFactory.create('emperor',{name:'Nero'});
// var vindex = abstractCharacterFactory.create('governor',{name:'Vindex'});
// var galba = abstractCharacterFactory.create('governor',{name:'Galba'});
// var otho = abstractCharacterFactory.create('governor',{name:'Otho'});
// var vitellius = abstractCharacterFactory.create('governor',{name:'Vitellius'});
// var rufus = abstractCharacterFactory.create('governor',{name:'Rufus'});
// vindex.betray();
// galba.betray();
// otho.betray();
// vitellius.betray();



// ////////////////////////////////////////////////////
// //빌더, builder
// //
// //추상 팩토리 패턴은 여러 팩토리를 동시에 사용하고 싶을 때 사용했었죠
// //빌더 패턴은 옵션이 많을 때 사용합니다. 로봇을 조립한다고 생각하시면 됩니다.
// //
// //아래의 예는 군단을 편성할때를 가정하여 코드르 짠 것이다.
// var makeLegion = function(leader){
//   var adjutants = null;
//   var army = 0;
//   return{
//     setAdjutant: function(list){
//       adjutants = list;
//       return this;
//     },
//     setArmy: function(number){
//       army = number;
//       return this;
//     },
//     build: function(){
//       return{
//         leader: leader,
//         adjutants: adjutants,
//         army: army
//       };
//     }
//   };
// };
// var galbaLegion = makeLegion('galba').setAdjutant(['otho', 'vindex', 'vitellius']).setArmy(8000).build();
// var rufusLegion = makeLegion('rufus').setArmy(10000).build();
// console.log(galbaLegion);
// // { leader: 'galba',
// //   adjutants: [ 'otho', 'vindex', 'vitellius' ],
// //   army: 8000 }
// console.log(rufusLegion);
// //{ leader: 'rufus', adjutants: null, army: 10000 }
// //
// //공격을 하는 메서드를 만들어보자(위의것 주석처리하고 실행)
// var Legion = (function(){
//   function Legion(leader,adjutants,number){
//     this.leader = leader;
//     this.adjutants = adjutants || null;
//     this.number = number || 0;
//   }
//   Legion.prototype.attack = function(target){
//     console.log(this.leader + '가 '+target.leader+'를 공격합니다.');
//   };
//   return Legion;
// })(); //IIFE로 생성자랑 공격까지 묶었다.
// var makeLegion = function(leader){
//   var adjutants = null;
//   var army = 0;
//   return{
//     setAdjutant: function(list){
//       adjutants = list;
//       return this;
//     },
//     setArmy: function(number){
//       army = number;
//       return this;
//     },
//     build: function(){
//       return new Legion(leader,adjutants,army);
//     }
//   };
// };
// var galbaLegion = makeLegion('galba').setAdjutant(['otho', 'vindex', 'vitellius']).setArmy(8000).build();
// var rufusLegion = makeLegion('rufus').setArmy(10000).build();
// console.log(galbaLegion);
// // Legion {
// //   leader: 'galba',
// //   adjutants: [ 'otho', 'vindex', 'vitellius' ],
// //   number: 8000 }
// console.log(rufusLegion);
// //Legion { leader: 'rufus', adjutants: null, number: 10000 }
// rufusLegion.attack(galbaLegion);
// //rufus가 galba를 공격합니다.




// //////////////////////////////////////////
// //적응자, adapter
// //적응자 패턴은 추상 팩토리나 빌더 패턴처럼 객체를 생성하는 패턴이 아닙니다. 
// //기존에 있던 구조를 새 구조로 유연하게 전환하거나 새 구조에서 기존의 구조로 전환하는 데 사용하는 패턴입니다.
// var SenateSystem  = (function(){
//   function SenateSystem(adapter){
//     this.adapter = adapter;
//   }
//   SenateSystem.prototype.vote = function(){
//     this.adapter.vote();
//   };
//   return SenateSystem;
// })();

// var currentAdapter = {
//   vote: function(){
//     console.log('현 황제를 계속 지지합니다');
//   }
// };
// var rufusAdapter = {
//   vote: function() {
//     console.log('루푸스를 황제로 추대합시다');
//   }
// };
// senateSystem = new SenateSystem(currentAdapter);
// senateSystem.vote();//현 황제를 계속 지지합니다
// senateSystem = new SenateSystem(rufusAdapter);
// senateSystem.vote();//루푸스를 황제로 추대합시다

// var galbaAdapter = {
//   vote: function(){
//     console.log('갈바를 황제로 추대합시다');
//   }
// };
// senateSystem = new SenateSystem(galbaAdapter);
// senateSystem.vote();//갈바를 황제로 추대합시다




// //////////////////////////////////////
// //복합체, composite
// //복합체 패턴은 트리 구조에 사용되는 패턴인데요. 사실 자바스크립트를 하는 사람이면 한 번 쯤은 써본 패턴일 겁니다
// //jQuery가 복합체 패턴을 따릅니다. jQuery는 하나의 태그를 선택하든, 여러 개의 태그를 동시에 선택하든 
// //모두 같은 메소드를 쓸 수 있습니다.
// //예를 들면, $('#zero')로 하나의 태그를 선택할 수도 있고, $('p')로 모든 p 태그를 선택할 수도 있습니다. 
// //하지만 개수와 상관 없이 모두 attr이나 css같은 메소드를 사용할 수 있습니다

// //군단(Legion) 대대(Cohort)가 있습니다. 한 개의 대대 아래에는 6개의 중대(Century), 
// //각 단위(군단, 대대, 중대)는 모두 병력의 수와 리더의 이름을 알려주는 메소드를 가지고 있습니다. 
// var Century = (function(){
//   function Century(leader){
//     this.leader = leader;
//   }
//   Century.prototype.getLeader = function(){
//     return this.leader;
//   };
//   Century.prototype.getNumber = function(){
//     return 80;
//   }
//   return Century;
// })();

// var Cohort = (function() {
//   function Cohort(leader) {
//     this.leader = leader;
//     this.centuries = [];
//   }
//   Cohort.prototype.getLeader = function() {
//     return this.leader;
//   };
//   Cohort.prototype.getNumber = function() {
//     var sum = 0;
//     this.centuries.forEach(function(century) {
//       sum += century.getNumber();
//     });
//     return sum;
//   };
//   Cohort.prototype.addCentury = function(century) {
//     this.centuries.push(century);
//     return this;
//   };
//   return Cohort;
// })();

// var Legion = (function() {
//   function Legion(leader) {
//     this.leader = leader;
//     this.cohorts= [];
//   }
//   Legion.prototype.getLeader = function() {
//     return this.leader;
//   };
//   Legion.prototype.getNumber = function() {
//     var sum = 0;
//     this.cohorts.forEach(function(cohort) {
//       sum += cohort.getNumber();
//     });
//     return sum;
//   }
//   Legion.prototype.addCohort = function(cohort) {
//     this.cohorts.push(cohort);
//     return this;
//   };
//   return Legion;
// })();
// //군단 편성
// var century1 = new Century('Maximus');
// var century2 = new Century('Tiberius');
// var century3 = new Century('Lukius');
// var century4 = new Century('Marcus');
// var century5 = new Century('Pompeius');
// var century6 = new Century('Zero');
// var cohort1 = new Cohort('Vitellius');
// var cohort2 = new Cohort('Otho');
// var legion = new Legion('Galba');
// //군단정리
// cohort1.addCentury(century1).addCentury(century2).addCentury(century3);
// cohort2.addCentury(century4).addCentury(century5).addCentury(century6);
// legion.addCohort(cohort1).addCohort(cohort2);
// //결과를 보자
// console.log(legion.getLeader());//Galba
// console.log(legion.getNumber());//480
// console.log(cohort1.getNumber());//240




// ////////////////////////////
// //플라이급, flyweight
// //플라이급 : 프로토타입을 공유하지만 따로 특성을 관리한다. 메모리를 아끼면서 특성도 관리할 수 있다. (코드를 보자)
// var Legionary  = (function(){
//   function Legionary(name){
//     this.name = name;
//     this.hp = hp;
//     this.att = 5;
//     this.attack = function(target) {
//       console.log(this.name + '가 ' + target + '를 공격합니다.');
//     };
//   }
//   return Legionary;
// })();
// //this.attack 메소드가 객체를 생성할 때마다 메모리를 잡아먹는 다는 것을 깨닫습니다. 
// //그래서 다음과 같이 수정합니다.
// var Legionary = (function(){
//   function Legionary(name){
//     this.name = name;
//     this.hp = hp;
//     this.att = 5;
//   }
//   Legionary.prototype.attack = function(target){
//     console.log(this.name + '가 ' + target + '를 공격합니다');
//   };
//   return Legionary;
// })();
// //이제 모든 객체가 하나의 프로토타입을 공유하고 있기 때문에 메소드는 프로토타입 안에 있는 것 
// //단 한 번만 만들어집니다. 여기서 한 발 더 나아가서 이름을 제외한 모든 속성을 프로토타입으로 넘겨줍니다.
// var Legionary = (function(){
//   function Legionary(name){
//     this.name = name;
//   }
//   Legionary.prototype.hp = 50;
//   Legionary.prototype.att = 5;
//   Legionary.prototype.attack = function(target) {
//     console.log(this.name + '가 ' + target + '를 공격합니다');
//   };
//   return Legionary;
// })();

// var soldier1 = new Legionary('Marcus');
// var soldier2 = new Legionary('Tiberius');
// var soldier3 = new Legionary('Zero');

// console.log(soldier1.hp);//50
// soldier1.hp = 40;
// console.log(soldier1.hp);//40
// console.log(soldier2.hp);//50





// ////////////////////////////////////////////////////
// //퍼사드, facade
// //퍼사드 : 외관이라는 뜻, 외관이라는 이름답게 겉만 볼 수 있습니다. 
// //        속은 보이지 않죠. 복잡한 것들, 세부적인 것들은 감추고, 간단한 것만 보여주는 패턴입니다.
// var Galba = (function(){
//   function Galba(){
//     this.legions = [];
//     this.legions.push(new Legion(1));
//     this.legions.push(new Legion(2));
//     this.legions.push(new Legion(3));
//   }
//   Galba.prototype.march = function(){
//     this.legions.forEach(function(legion){
//       legion.supply();
//       legion.makeFormation();
//       legion.goForward();
//     });
//   };
//   Galba.prototype.attack = function(){
//     this.legions.forEach(function(legion){
//       legion.makeFormation();
//       legion.pullOutSword();
//       legion.runToEnemy();
//     });
//   };
//   Galba.prototype.halt = function(){
//     this.legions.forEach(function(legion){
//       legion.halt();
//     });
//   };
//   Galba.prototype.retreat = function(){
//     this.legions.forEach(function (legion){
//       legion.halt();
//     });
//   };
//   return Galba;
// })();

// var Legion = (function(){
//   function Legion(number){
//     this.number = number;
//   };
//   Legion.prototype.supply = function() {
//   };
//   Legion.prototype.makeFormation = function() {
//   };
//   Legion.prototype.goForward = function() {
//   };
//   Legion.prototype.pullOutSword = function() {
//   };
//   Legion.prototype.runToEnemy = function() {
//   };
//   Legion.prototype.halt = function() {
//   };
//   Legion.prototype.retreat = function() {
//   };
//   return Legion;
// })();

// var galba = new Galba();
// galba.march();
// galba.attack();
// console.log(galba);
// // Galba {
// //   legions:
// //    [ Legion { number: 1 },
// //      Legion { number: 2 },
// //      Legion { number: 3 } ] }
// //코드를 보면 Legion이 Galba에 비해 훨씬 더 복잡합니다. (구현은 하지 않았지만 메소드가 훨씬 더 많습니다.) 
// //그리고 Galba는 여러 개의 군단을 동시에 통솔하고 있고요. 
// //Legion 안에는 대대를 조작하는 메소드가 있을 겁니다. Galba는 사용자와 같습니다. 
// //그냥 간단하게 march(진군), attack(공격), halt(정지), retreat(후퇴) 메소드를 호출하면 
// //내부적으로 하위 시스템(Legion)이 알아서 처리하는 겁니다.

// // 프로그래밍을 잘 모르는 사용자에게는 최소한의 API만 공개하는 게 좋습니다. 
// //이렇게 일부만 노출하는 패턴을 퍼사드 패턴이라고 합니다. 사실 대부분의 프로그래머가 사용하고 있는 것이기도 합니다.






// //////////////////////////////////////////////////////
// //프록시, proxy
// //프록시는 대리인이라는 뜻입니다. 즉 사용자가 원하는 행동을 하기 전에 한 번 거쳐가는 단계를 뜻합니다. 
// //좋은 프록시는 사용자의 요청을 캐싱하여 성능을 높일 수도 있고, 에러를 잡아낼 수도 있지만, 
// //나쁜 프록시는 사용자의 요청을 왜곡하여 다른 동작을 하도록 만들 수도 있습니다. 양날의 검과 같습니다.

// var Praetorian  = (function(){
//   function Praetorian(){}; //prototype을 만들기 위한 객체생성(프록시로 사용)
//   Praetorian.prototype.report = function(fact){
//     console.log('황제에게 ' + fact + '을 보고드립니다!');
//   };
//   Praetorian.prototype.assassinate = function(target){
//     console.log(target + ' 암살 명령을 받았습니다');
//   };
//   return Praetorian;
// })();

// var PraetorianProxy = (function(){
//   function PraetorianProxy(master){
//     this.master = master;
//     this.praetorian = new Praetorian();
//   }
//   PraetorianProxy.prototype.report = function(fact){
//     var lie = '거짓';
//     console.log(this.master + '에게 ' + fact + '을 보고드립니다');
//     this.praetorian.report(lie);
//   }
//   PraetorianProxy.prototype.assassinate = function(target){
//     console.log('더 이상 ' + target + '을 암살하지 않습니다');
//     this.praetorian.assassinate('Galba');
//   }
//   return PraetorianProxy;
// })();

// var praetorian = new PraetorianProxy('Otho');
// praetorian.report('사실');
// // Otho에게 사실을 보고드립니다
// // 황제에게 거짓을 보고드립니다!
// praetorian.assassinate('Otho');
// // 더 이상 Otho을 암살하지 않습니다
// // Galba 암살 명령을 받았습니다

// //프록시 패턴은 중간 단계를 거쳐 원래 객체로 도달하게 만드는 패턴입니다. 
// //중간 단계에서는 아까 말했듯이 캐싱이나 에러 처리 같은 것을 할 수 있습니다.






// //////////////////////////////////////////////////////////////
// //명령, command
// //명령 패턴은 이름 그대로 명령을 내리는 패턴입니다. 
// //퍼사드 패턴 시간에 갈바가 군단에게 명령을 내리는 것 같이요. 
// //다른 점은 명령이 독립적으로 있기 때문에 얼마든지 새로운 명령을 추가할 수 있다는 점입니다
// //또한 undo 메소드를 만들어서 잘못된 명령을 내렸을 때 이전으로 되돌릴 수 있죠. 코드로 보겠습니다.

// var Vitellius = (function(){
//   function Vitellius (){};
//   Vitellius.prototype.approve = function(commander){
//     commander.execute();
//   };
//   return Vitellius;
// })();

// var Commander = (function(){
//   function Commander(){
//     this.commands = [];
//   };
//   Commander.prototype.execute = function(){
//     this.commands.forEach(function(commend){
//       commend();
//     });
//   };
//   Commander.prototype.do = function(command, args){
//     this.commands.push(function(){
//       command.call(null,args);
//     });
//     //console.log(`${command}를 추가합니다.`)
//   };
//   Commander.prototype.undo = function(){
//     this.commands.pop();
//     console.log('기존의 명령들을 제거합니다.');
//   };
//   return Commander;
// })();

// var strategy = {
//   climbAlps : function(){
//     console.log('알프스를 오릅니다');
//   },
//   prepareSupply : function(number){
//     console.log('보급품을 ' + number + '만큼 준비합니다');
//   },
//   attackRome : function(){
//     console.log('로마를 공격합니다');
//   },
// };

// var vitellius = new Vitellius();
// var caecina = new Commander();
// caecina.do(strategy.prepareSupply,5000);
// caecina.undo(); //기존의 명령들을 제거합니다.
// caecina.do(strategy.prepareSupply,10000);
// caecina.do(strategy.climbAlps);
// caecina.do(strategy.attackRome);
// vitellius.approve(caecina);
// // 보급품을 10000만큼 준비합니다
// // 알프스를 오릅니다
// // 로마를 공격합니다





// ///////////////////////////////////////////////
// //책임 연쇄, chain of responsibility
// //책임 연쇄라고 하니 뭔가 거창하게 들리지만 사실 별 거 없습니다. 
// //동작의 수행을 다른 객체에게 떠넘기는 패턴일 뿐입니다. 
//   //(가장 쉽게 접하는 예로 이벤트 버블링이 있습니다. 어떤 태그에 이벤트가 발생하면 그 이벤트는 
//   //해당 태그의 부모나 조상에게도 순서대로 발생합니다. 이 때 사용자가 이벤트 리스너를 달아서 
//   //어떤 태그에서 이벤트를 처리할 지, 또는 다음 태그로 이벤트 처리 수행을 넘길지 결정할 수 있습니다.) 
// //이와 같이 동작의 처리를 자신이 할 지 다음으로 넘길 지 결정하는 패턴이 책임 연쇄입니다
// var General = (function(){
//   function General(){}
//   General.prototype.canMakeDecision = function(){
//     // 복잡한 확인 코드
//     return false;
//   };
//   General.prototype.makeDecision = function(){
//     console.log('맞서 싸운다');
//   };
//   return General;
// })();
// var Senator = (function(){
//   function Senator(){}
//   Senator.prototype.canMakeDecision = function(){
//     //복잡한 확인 코드
//     return false;
//   };
//   Senator.prototype.makeDecision = function(){
//     console.log('눈치를 본다.');
//   };
//   return Senator;
// })();
// var Emperor = (function(){
//   function Emperor(){}
//   Emperor.prototype.canMakeDecision = function(){
//     //복잡한 확인 코드
//     return true;
//   };
//   Emperor.prototype.makeDecision = function(){
//     console.log('항복한다');
//     console.log('자결한다');
//   };
//   return Emperor;
// })();
// var DecisionMaker = (function(){
//   function DecisionMaker(){
//     this.decisionMakers = [];
//     this.decisionMakers.push(new General());
//     this.decisionMakers.push(new Senator());
//     this.decisionMakers.push(new Emperor());
//   }
//   DecisionMaker.prototype.makeDecision = function(){
//     for(var i=0; i<this.decisionMakers.length; i++){
//       if(this.decisionMakers[i].canMakeDecision()){
//         return this.decisionMakers[i].makeDecision();
//       }
//     }
//   };
//   return DecisionMaker;
// })();

// var choice = new DecisionMaker();
// console.log(choice);
// //DecisionMaker { decisionMakers: [ General {}, Senator {}, Emperor {} ] }
// choice.makeDecision();
// //항복한다
// //자결한다

//DecisonMaker 생성자를 보면 makeDecision을 통해 장군, 원로원, 황제 순서대로 결정을 내릴 수 있는지를 판단하고, 
//결정을 내릴 수 있으면 결정을 내리고 종료합니다. 아까 장군과 원로원은 결정을 내릴 수 없었기 때문에 
//황제가 결정을 내리게 됩니다. (황제는 return true를 했습니다. 이 부분도 내부는 직접 구현하시면 됩니다) 
//결국 최종적으로 this.decisionMakers[i]는 황제가 되어 황제의 makeDecision 메소드가 호출됩니다.

//이렇게 책임을 다음 순서에게 떠넘기기 때문에 책임 연쇄 패턴이라고 이름지어졌습니다. 
//또한 중간 단계의 누군가가 책임을 처리하면 다음 순번에게는 넘어가지 않죠. 
//황제 오토는 승산이 없음을 직감하고 로마 제국이 더이상의 혼란에 휩싸이지 않도록 항복을 선택하고 자결합니다. 
//비텔리우스는 쉽사리 로마로 입성해서 황제에 등극합니다. 
//오토는 나중에 로마를 위해 자결한 것으로 평가받아 권위가 회복됩니다.





// //////////////////////////////////////////
// //반복자, iterator
// //순서가 있는 것들(수열, 배열 등)을 편리하게 탐색할 수 있는 패턴
// var Beehives = (function(){
//   function Beehives(hiveList){
//     this.hiveList = hiveList;
//     this.index = 0;
//   }
//   Beehives.prototype.next = function(){
//     console.log(this.hiveList[this.index++]+'에서 끝을 걷습니다.');
//   };
//   Beehives.prototype.done = function(){
//     return this.hiveList.length === this.index;
//   };
//   Beehives.prototype.tryCountinue = function(){
//     do{
//       this.next();
//     }while(!this.done())
//   }
//   return Beehives;
// })();

// var beehives = new Beehives(['hive1', 'hive2', 'hive3', 'hive4', 'hive5', 'hive6', 'hive7', 'hive8', 'hive9']);

// beehives.tryCountinue();
// // while(!beehives.done()){
// //   beehives.next();
// // }





// //////////////////////////////////////////////
// //중재자, mediator
// //중재자 패턴 : 여러 개의 객체들을 모두 관리하는 관제탑 같은 역할을 합니다. 
// //             등록된 객체들의 상황을 통제하고 관리할 수 있습니다. 이름처럼 중재자로서의 역할도 수행할 수 있고요. 
// //             채팅방 외에도 자원 분배기나 가계부같은 것에도 이 패턴을 사용할 수 있겠네요. 
// //             등록된 통장이나, 카드 등의 잔액을 한 번에 관리할 수 있습니다. 
// var Josephus = (function(){
//   function Josephus(){
//     this.participants = [];
//   }
//   Josephus.prototype.register = function(participant){
//     this.participants.push(participant);
//   };
//   Josephus.prototype.deliver = function(sender, message){
//     this.participants.forEach(function(participant){
//       if(participant !== sender){
//         console.log(sender+'님이 '+participant+'님에게 '+message+'라고 말합니다.');
//       }
//     });
//   };
//   return Josephus;
// })();

// var josephus = new Josephus();
// josephus.register('Jew');
// josephus.register('Roman');
// josephus.deliver('Jew','우리땅에서 물러가라');
// //Jew님이 Roman님에게 우리땅에서 물러가라라고 말합니다.
// josephus.deliver('Roman','네놈들을 멸망시켜주겠다.');
// //Roman님이 Jew님에게 네놈들을 멸망시켜주겠다.라고 말합니다.





///////////////////////////////////////////////////////////
//관찰자, 옵저버, observer (이부분은 나중에 보기... )
//옵저버 패턴, 관찰자 패턴 : 항상 어딘가에서 여러분을 관찰하고 있죠.
//                        (브라우저에도 똑같은 역할을 하는 게 있습니다. 바로 이벤트 핸들러죠. 
//                         이벤트를 등록만 해 두면, 나중에 이벤트가 발생했을 때 알려줍니다. 
//                         그 후에는 콜백 함수가 실행됩니다. 다시 말하면, 콜백 함수가 실행되기 전까지의 과정이 
//                         바로 옵저버 패턴을 활용한 예라고 할 수 있습니다.)
var Vespasianus = (function() {
  function Vespasianus() {
    this.subscribers = [];
  }
  Vespasianus.prototype.publish = function() {
    var self = this;
    this.subscribers.every(function(subscriber) {
      subscriber.fire(self);
      return true;
    });
  };
  Vespasianus.prototype.register = function(target) {
    this.subscribers.push(target);
  };
  return Vespasianus;
})();

var Mucianus = (function() {
  function Mucianus() {
    this.list = [];
  }
  Mucianus.prototype.subscribe = function(target) {
    this.list.push({
      target: target,
      point: 0,
    });
    target.register(this);
  };
  Mucianus.prototype.unsubscribe = function(target) {
    this.list = this.list.filter(function(person) {
      return person.target !== target;
    });
  };
  Mucianus.prototype.fire = function(target) {
    this.list.some(function(person) {
      console.log('person.target:',person.target, 'target:',target, '비교:',person.target === target);
      if (person.target === target) {
        ++person.point;
        return true;
      }
    });
  };
  return Mucianus;
})();

var vespasianus = new Vespasianus();
var mucianus = new Mucianus();
mucianus.subscribe(vespasianus);
vespasianus.publish();
mucianus.list;
// person.target: Vespasianus { subscribers: [ Mucianus { list: [Array] } ] } 
// target:        Vespasianus { subscribers: [ Mucianus { list: [Array] } ] }
// 비교: true
console.log(mucianus.list);
//[ { target: Vespasianus { subscribers: [Array] }, point: 1 } ]






///////////////////////////////////////////////////////////////
//전략, strategy
//전략 : 간단히 말해서 객체가 할 수 있는 행위들 각각을 전략으로 만들어 놓고, 
//       동적으로 행위의 수정이 필요한 경우 전략을 바꾸는 것만으로 행위의 수정이 가능하도록 만든 패턴입니다.

var Strategy = (function(){
  function Strategy(){
    this.strategy = null;
  }
  Strategy.prototype.setStrategy = function(strategy){
    this.strategy = strategy;
  };
  Strategy.prototype.execute = function(){
    this.strategy.execute();
  };
  return Strategy;
})();

var ShipStrategy = (function(){
  function ShipStrategy(){}
  ShipStrategy.prototype.execute = function(){
    console.log('배로 이탈리아에 갑니다');
  };
  return ShipStrategy;
})();

var LandStrategy = (function(){
  function LandStrategy(){}
  LandStrategy.prototype.execute = function(){
    console.log('육로로 이탈리아에 갑니다');
  };
  return LandStrategy;
})();

var start = new Strategy();
var ship = new ShipStrategy();
var land = new LandStrategy();
start.setStrategy(ship);
start.execute();//배로 이탈리아에 갑니다
start.setStrategy(land);
start.execute();//육로로 이탈리아에 갑니다
